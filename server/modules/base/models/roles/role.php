<?php
/**
 * role
 * class model for table core_role 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class role extends AbstractTable{
    /* Table name */
    public $table = 'core_role';
    /* Alias for table */
    public $alias = 'role';
    /* List of table fields */
    public $fields = array('role_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'role_id'),
                           'role_name' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Nama Grup'),
                           'role_status' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Status'));
    /* Display fields */
    public $displayFields = array('role_name');
    /* Details table */
    public $details = array('core_role_permission' => 'role_permission');
    /* Primary key */
    public $pkey = 'role_id';
    /* References */
    public $refs = array('core_user_role' => 'role_id',
                         'core_role_permission' => 'role_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT role.*';
    public $fromClause = 'FROM core_role AS role';

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
        }
        
        return true;
    }
    
    public function afterWrite(){
        
    }
}
?>