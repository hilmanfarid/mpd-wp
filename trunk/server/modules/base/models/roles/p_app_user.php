<?php
/**
 * user
 * class model for table core_user 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class p_app_user extends AbstractTable{
    /* Table name */
    public $table = 'p_app_user';
    /* Alias for table */
    public $alias = 'p_app_user';
    /* List of table fields */
    public $fields = array('p_app_user_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID User'),
                           'app_user_name' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Nama User'),
                           'user_pwd' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Password'),
                           'email_address' => array('type' => 'str', 'nullable' => true, 'unique' => true, 'display' => 'Email'),
                           'full_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Lengkap'));
    /* Display fields */
    public $displayFields = array('user_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'p_app_user_id';
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
        if ($this->actionType == 'UPDATE'){
			if (isset($this->record['user_pwd'])){
                if (trim($this->record['user_pwd']) == '') throw new Exception('Password tidak boleh kosong');
                if (strlen($this->record['user_pwd']) < 5) throw new Exception('Panjang Password minimal 5 karakter');
                
                $this->record['user_pwd'] = md5($this->record['user_pwd']);
            }
        }

        return true;
    }    
}
?>