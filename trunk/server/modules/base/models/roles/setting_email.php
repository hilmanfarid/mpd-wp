<?php
/**
 * user
 * class model for table core_user 
 *
 * @since 22-01-2010 13:23:17
 * @author agung.hp
 */
class setting_email extends AbstractTable{
    /* Table name */
    public $table = 'shop_setting_email';
    /* Alias for table */
    public $alias = 'setting_email';
    /* List of table fields */
    public $fields = array('setting_email_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'setting_email_id'),
                           'setting_email_module' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'setting_email_module')
                           );
    /* Display fields */
    public $displayFields = array('setting_email_module');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'setting_email_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT setting_email.*';
    public $fromClause = 'FROM shop_setting_email setting_email';

    function __construct(){
        parent::__construct();
   	} 
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