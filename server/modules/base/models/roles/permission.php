<?php
/**
 * permission
 * class model for table core_permission 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class permission extends AbstractTable{
    /* Table name */
    public $table = 'core_permission';
    /* Alias for table */
    public $alias = 'permission';
    /* List of table fields */
    public $fields = array('permission_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'permission_id'),
                           'permission_name' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Nama Hak Akses'),
                           'permission_desc' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Keterangan'),
                           'permission_module' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Module'));
    /* Display fields */
    public $displayFields = array('permission_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'permission_id';
    /* References */    
    public $refs = array('core_user_permission' => 'permission_id',
                         'core_role_permission' => 'permission_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT permission.*';
    public $fromClause = 'FROM core_permission AS permission';

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
}
?>