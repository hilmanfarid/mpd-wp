<?php
/**
 * role_permission
 * class model for table core_role_permission 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class role_permission extends AbstractTable{
    /* Table name */
    public $table = 'core_role_permission';
    /* Alias for table */
    public $alias = 'role_permission';
    /* List of table fields */
    public $fields = array('role_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Grup'),
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
    
    public $role_id = '';
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT  role_permission.role_id || '.' || role_permission.permission_id AS role_permission_id,
                                    role_permission.role_id, permission.permission_id, role_permission.permission_level,
									role.role_name, role.role_status,
									permission.permission_name, permission.permission_desc, permission.permission_module";
    public $fromClause = 'FROM core_permission AS permission
                            LEFT JOIN core_role_permission AS role_permission 
							    ON role_permission.permission_id = permission.permission_id %s
							LEFT JOIN core_role AS role 
							    ON role_permission.role_id = role.role_id';

    function __construct($role_id = ''){
        if (!empty($role_id)){
            $this->role_id = (int) $role_id;
            $this->fromClause = sprintf($this->fromClause, 'AND role_permission.role_id = '.$this->role_id);
        }else{
            $this->fromClause = sprintf($this->fromClause, '');
        }

        parent::__construct();        
   	}

    public function countAll(){
        $whereClause = $this->getCriteriaSQL();

        $query = "SELECT COUNT(1) ". $this->fromClause ." ".$whereClause;
        $countitems = $this->dbconn->GetOne($query);

        if ($countitems === false){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        return $countitems;
    }

    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        /*
        if ($this->actionType == 'CREATE'){
            
        }else if ($this->actionType == 'UPDATE'){
            $keys = explode('.', $this->item['role_permission_id']);
            
            if (empty($keys[0]) || empty($keys[1])) throw new Exception('Invalid User Permission ID');
            
            $this->record['role_id'] = $keys[0];
            $this->record['old_permission_id'] = $keys[1];
        }

        $rolePermission = $this->get($this->record['role_id'], $this->record['permission_id']);
        if (!empty($rolePermission['role_id'])) throw new Exception('User sudah memiliki Hak Akses tersebut (ID: '.$this->record['permission_id'].')');
            
        */
    }
    
    public function &get($role_id, $permission_id, $raiseExceptionOnEmpty = false){
        $whereClause = "WHERE role_permission.role_id = ?  AND role_permission.permission_id = ?";
        
        $query = $this->selectClause." ".$this->fromClause." ".$whereClause;
        $item =& $this->dbconn->GetItem($query, array($role_id, $permission_id));
        
        if (!is_array($item)){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        if ($raiseExceptionOnEmpty === true){
            if (empty($item['role_id'])){
                throw new Exception("ID (".$role_id.'.'.$permission_id.") tidak ada dalam database. Anda atau user lain mungkin sudah menghapus data tersebut");
            }
        }

        return $item;
    }

    public function create(&$dbconn = false){
        try{
            $this->validate();
            
            $result = $this->dbconn->Replace('core_role_permission', 
                                             $this->record, 
                                             array('role_id', 'permission_id'));
            
            if ($result == 0){
                throw new Exception($this->dbconn->ErrorMsg());
            }
            
            $this->record['role_permission_id'] = $this->record['role_id'].'.'.$this->record['permission_id'];
            
            $this->afterWrite();
        }catch(Exception $e){
            throw $e;
        }
        return true;
    }

    public function update(){
        try {
            $this->validate();

            if ($this->record['permission_level'] == '' || $this->record['permission_level'] == null){
                $this->remove($this->record['role_id'], $this->record['permission_id']);
                $this->record['role_permission_id'] = '';
            }else{
                $result = $this->dbconn->Replace('core_role_permission', 
                                                 $this->record, 
                                                 array('role_id', 'permission_id'));

                if ($result == 0){
                    throw new Exception($this->dbconn->ErrorMsg());
                }

                $this->record['role_permission_id'] = $this->record['role_id'].'.'.$this->record['permission_id'];
                $this->afterWrite();
            }
        }catch(Exception $e){
            throw $e;
        }
        
        return true;
    }

    public function remove($role_id, $permission_id){
        $query = "DELETE FROM core_role_permission WHERE role_id = ?  AND permission_id = ?";

        $result =& $this->dbconn->Execute($query, array($role_id, $permission_id));
        
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