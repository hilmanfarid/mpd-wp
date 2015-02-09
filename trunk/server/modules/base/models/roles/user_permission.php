<?php
/**
 * user_permission
 * class model for table core_user_permission 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class user_permission extends AbstractTable{
    /* Table name */
    public $table = 'core_user_permission';
    /* Alias for table */
    public $alias = 'user_permission';
    /* List of table fields */
    public $fields = array('user_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'User'),
                           'permission_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Hak Akses'),
                           'permission_level' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Level Akses'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = '';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT  user_permission.user_id || '.' || user_permission.permission_id AS user_permission_id,
                                    user_permission.*,
									core_user.user_name, core_user.user_email, 
									core_user.user_realname, core_user.user_status,
									permission.permission_name, permission.permission_desc, permission.permission_level";
    public $fromClause = 'FROM core_user_permission AS user_permission
							LEFT JOIN core_user ON user_permission.user_id = core_user.user_id
							LEFT JOIN core_permission AS permission ON user_permission.permission_id = permission.permission_id';

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        if ($this->actionType == 'CREATE'){
            
        }else if ($this->actionType == 'UPDATE'){
            $keys = explode('.', $this->item['user_permission_id']);
            
            if (empty($keys[0]) || empty($keys[1])) throw new Exception('Invalid User Permission ID');
            
            $this->record['user_id'] = $keys[0];
            $this->record['old_permission_id'] = $keys[1];
        }

        $userPermission = $this->get($this->record['user_id'], $this->record['permission_id']);
        if (!empty($userPermission['user_id'])) throw new Exception('User sudah memiliki Hak Akses tersebut (ID: '.$this->record['permission_id'].')');

        return true;
    }
    
    public function &get($user_id, $permission_id, $raiseExceptionOnEmpty = false){
        $whereClause = "WHERE user_permission.user_id = ?  AND user_permission.permission_id = ?";
        
        $query = $this->selectClause." ".$this->fromClause." ".$whereClause;
        $item =& $this->dbconn->GetItem($query, array($user_id, $permission_id));
        
        if (!is_array($item)){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        if ($raiseExceptionOnEmpty === true){
            if (empty($item['user_id'])){
                throw new Exception("ID (".$user_id.'.'.$permission_id.") tidak ada dalam database. Anda atau user lain mungkin sudah menghapus data tersebut");
            }
        }

        return $item;
    }

    public function update(){
        try {
            $this->validate();

            $query = "UPDATE core_user_permission SET permission_level = ? WHERE user_id = ? AND permission_id = ?";
            $result =& $this->dbconn->Execute($query, array($this->record['permission_level'], $this->record['user_id'], $this->record['old_permission_id']));
    
            if (!$result){
                throw new Exception($this->dbconn->ErrorMsg());
            }
    
            $result->Close();

            $this->afterWrite();
        }catch(Exception $e){
            throw $e;
        }
        
        return true;
    }

    public function remove($user_id, $permission_id){
        $query = "DELETE FROM core_user_permission WHERE user_id = ?  AND permission_id = ?";

        $result =& $this->dbconn->Execute($query, array($user_id, $permission_id));
        
        if (!$result){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        $result->Close();
        
        return true;
    }
    
    /* Set record */
    public function setRecord($record){
        $this->item = $record;
        $this->record = array();
        foreach ($this->fields as $key => $attrib){
            $value = '';
            if ($attrib['nullable']){
                if (isset($record[$key])){
                    if ($record[$key] == '')
                        $value = null;
                    else
                        $value = $record[$key];
                }else{
                    continue;
                }
            }            
            
            if ($this->actionType == 'CREATE'){
                if (!$attrib['nullable']){
                    if (!isset($record[$key]) || $record[$key] == ''){
                        throw new Exception("Nilai ".$attrib['display']." tidak boleh kosong");
                    }else{
                        $value = $record[$key];
                    }
                }
            }else if ($this->actionType == 'UPDATE'){
                if (!$attrib['nullable']){
                    if (!isset($record[$key])) continue;
                    
                    if ($record[$key] == ''){
                        throw new Exception("Nilai ".$attrib['display']." tidak boleh kosong");
                    }else{
                        $value = $record[$key];
                    }
                }
            }

            if (!empty($value)){
                if ($attrib['type'] == 'date'){
        			if (strlen($value) > 10) $value = substr($value, 0, 10);
        			
        			$pieces = explode('-', $value);
        			
        			if (count($pieces) != 3) throw new Exception("Format tanggal harus dd-mm-yyyy");
        			
        			if (!checkdate($pieces[1], $pieces[2],$pieces[0])) throw new Exception("Nilai tanggal '".$value."' tidak benar");        			
                }else if ($attrib['type'] == 'int' || $attrib['type'] == 'float'){
                    if (!is_numeric($value)) throw new Exception("Nilai ".$attrib['display']." harus berupa bilangan");
                }                
            }
            $this->record[$key] = $value;
        }

        return $this->record;
    }    
}
?>