<?php
/**
 * user
 * class model for table core_user 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class user extends AbstractTable{
    /* Table name */
    public $table = 'core_user';
    /* Alias for table */
    public $alias = 'core_user';
    /* List of table fields */
    public $fields = array('user_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID User'),
                           'user_name' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Nama User'),
                           'user_password' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Password'),
                           'user_email' => array('type' => 'str', 'nullable' => true, 'unique' => true, 'display' => 'Email'),
                           'user_realname' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Lengkap'),
                           'user_status' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Status'),
                           'user_branch_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'user_branch_id'));
    /* Display fields */
    public $displayFields = array('user_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'user_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT core_user.user_id, core_user.user_name, core_user.user_email, 
                                core_user.user_realname, core_user.user_status, core_user_role.role_id, core_role.role_name,user_branch_id';
    public $fromClause = 'FROM core_user
                            LEFT JOIN core_user_role ON core_user_role.user_id = core_user.user_id AND core_user_role.main_role = 1
                            LEFT JOIN core_role ON core_role.role_id = core_user_role.role_id';

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        if ($this->actionType == 'CREATE'){
            $this->record['user_name'] = trim($this->record['user_name']);
            $this->record['user_realname'] = trim($this->record['user_realname']);
            
            if (empty($this->record['user_name'])) throw new Exception('Nama User tidak boleh kosong');
            if (empty($this->record['user_realname'])) throw new Exception('Nama Lengkap tidak boleh kosong');
            
            if (trim($this->record['user_password']) == '') throw new Exception('Password tidak boleh kosong');
            
            if (strlen($this->record['user_password']) < 5) throw new Exception('Panjang Password minimal 5 karakter');
            
            $this->record['user_password'] = md5($this->record['user_password']);
            
            if (empty($this->item['role_id'])){
                throw new Exception('Grup tidak boleh kosong');
            }
            
        }else if ($this->actionType == 'UPDATE'){
            if (isset($this->record['user_name'])){
                $this->record['user_name'] = trim($this->record['user_name']);
                if (empty($this->record['user_name'])) throw new Exception('Nama User tidak boleh kosong');
            }
            
            if (isset($this->record['user_realname'])){
                $this->record['user_realname'] = trim($this->record['user_realname']);
                if (empty($this->record['user_realname'])) throw new Exception('Nama Lengkap tidak boleh kosong');
            }

            if (isset($this->record['user_password'])){
                if (trim($this->record['user_password']) == '') throw new Exception('Password tidak boleh kosong');
                if (strlen($this->record['user_password']) < 5) throw new Exception('Panjang Password minimal 5 karakter');
                
                $this->record['user_password'] = md5($this->record['user_password']);
            }
        }

        return true;
    }    

    public function afterWrite(){
        if (isset($this->item['role_id'])){
            $this->setMainRole($this->record['user_id'], $this->item['role_id']);
        }
    }

    public function setMainRole($user_id, $role_id){
        $query = "UPDATE core_user_role SET main_role = 0 WHERE user_id = ? AND main_role = 1";

        $result =& $this->dbconn->Execute($query, array($user_id));

        if (!$result){
            throw new Exception($this->dbconn->ErrorMsg());
        }

        $result->Close();

        $result = $this->dbconn->Replace('core_user_role', 
                                         array('user_id' => $user_id, 
                                               'role_id' => $role_id,
                                               'main_role' => 1), 
                                         array('user_id', 'role_id'));
                                         
        if ($result == 0){
            throw new Exception($this->dbconn->ErrorMsg());
        }                                  

        return true;
    }
    
    
    public function addUserRole($user_id, $role_id){
        $item = $this->getUserRole($user_id, $role_id);

        if (!empty($item['user_id'])) return true;

        $query = "INSERT INTO core_user_role (user_id, role_id, main_role) VALUES (?, ?, ?)";

        $result =& $this->dbconn->Execute($query, array($user_id, $role_id, 0));
        
        if (!$result){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        $result->Close();
        
        return true;
    }

    public function getUserRole($user_id, $role_id){
        $query = "select user_id, role_id, main_role 
                    from core_user_role
                    where user_id = ? AND role_id = ?";
        $params = array($user_id, $role_id);

        $item =& $this->dbconn->GetItem($query, $params);

        if (!is_array($item)){
            throw new Exception($this->dbconn->ErrorMsg());
        }

        return $item;
    }
	
	 /* Remove record by id */    
    public function remove($id){
        if ($this->isRefferenced($id)){
            throw new Exception('ID user'.$id.' tidak bisa di hapus karena sudah di referensi oleh data lain');
        }

        $query = "DELETE FROM core_user_permission WHERE ".$this->pkey." = ?";

        $result =& $this->dbconn->Execute($query, array($id));
        
        if (!$result){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        $result->Close();
		
		$query = "DELETE FROM core_user_role WHERE ".$this->pkey." = ?";

        $result =& $this->dbconn->Execute($query, array($id));
        
        if (!$result){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        $result->Close();


        $query = "DELETE FROM ".$this->table." WHERE ".$this->pkey." = ?";

        $result =& $this->dbconn->Execute($query, array($id));
        
        if (!$result){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        $result->Close();
        
        return true;
    }     
}
?>