<?php
/**
 * user_role
 * class model for table core_user_role 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class user_role extends AbstractTable{
    /* Table name */
    public $table = 'core_user_role';
    /* Alias for table */
    public $alias = 'user_role';
    /* List of table fields */
    public $fields = array('user_id' => array('type' => 'int', 'nullable' => false, 'display' => 'User'),
                           'role_id' => array('type' => 'int', 'nullable' => false, 'display' => 'Grup'),
                           'main_role' => array('type' => 'int', 'nullable' => true, 'display' => 'Grup Utama'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = '';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT user_role.user_id || '.' || user_role.role_id AS user_role_id,
                                   user_role.*,
								   core_user.user_name, core_user.user_email, 
								   core_user.user_realname, core_user.user_status,
								   core_role.role_name, core_role.role_status";
    public $fromClause = 'FROM core_user_role AS user_role
							LEFT JOIN core_user ON user_role.user_id = core_user.user_id
							LEFT JOIN core_role ON user_role.role_id = core_role.role_id';

    function __construct(){
        parent::__construct();
   	}

    /**
     * validate
     * input record validator
     */
    public function validate(){
        if ($this->actionType == 'CREATE'){
            $this->record['main_role'] = 0;
        }else if ($this->actionType == 'UPDATE'){
            $keys = explode('.', $this->item['user_role_id']);
            
            if (empty($keys[0]) || empty($keys[1])) throw new Exception('Invalid User Role ID');
            
            $this->record['user_id'] = $keys[0];
            $this->record['old_role_id'] = $keys[1];
        }

        $userRole = $this->get($this->record['user_id'], $this->record['role_id']);
        if (!empty($userRole['user_id'])) throw new Exception('User sudah terdaftar pada grup tersebut (ID: '.$this->record['role_id'].')');

        return true;
    }
    
    public function &get($user_id, $role_id, $raiseExceptionOnEmpty = false){
        $whereClause = "WHERE user_role.user_id = ?  AND user_role.role_id = ?";
        
        $query = $this->selectClause." ".$this->fromClause." ".$whereClause;
        $item =& $this->dbconn->GetItem($query, array($user_id, $role_id));
        
        if (!is_array($item)){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        if ($raiseExceptionOnEmpty === true){
            if (empty($item['user_id'])){
                throw new Exception("ID (".$user_id.'.'.$role_id.") tidak ada dalam database. Anda atau user lain mungkin sudah menghapus data tersebut");
            }
        }

        return $item;
    }

    public function update(){
        try {
            $this->validate();

            $query = "UPDATE core_user_role SET role_id = ? WHERE user_id = ? AND role_id = ?";
            $result =& $this->dbconn->Execute($query, array($this->record['role_id'], $this->record['user_id'], $this->record['old_role_id']));
    
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

    public function remove($user_id, $role_id){
        $item = $this->get($user_id, $role_id, true);
        
        if ($item['main_role'] == 1) throw new Exception('Grup tidak bisa dihapus karena merupakan Grup Utama');
        
        $query = "DELETE FROM core_user_role WHERE user_id = ?  AND role_id = ?";

        $result =& $this->dbconn->Execute($query, array($user_id, $role_id));
        
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