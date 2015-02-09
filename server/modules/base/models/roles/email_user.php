<?php
/**
 * user
 * class model for table core_user 
 *
 * @since 22-01-2010 13:23:17
 * @author agung.hp
 */
class email_user extends AbstractTable{
    /* Table name */
    public $table = 'shop_email_user';
    /* Alias for table */
    public $alias = 'email_user';
    /* List of table fields */
    public $fields = array(
                           'email_user_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'email_user_id'),
                           'setting_email_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'setting_email_id'),
                           'user_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'user_id')
                           );
    /* Display fields */
    public $displayFields = array('email_user.setting_email_id');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'email_user_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT email_user.*,core_user.user_realname,core_user.user_email,setting_email.setting_email_module';
    public $fromClause = 'FROM shop_email_user email_user 
                          LEFT JOIN core_user on email_user.user_id = core_user.user_id 
                          LEFT JOIN shop_setting_email setting_email on email_user.setting_email_id = setting_email.setting_email_id';

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