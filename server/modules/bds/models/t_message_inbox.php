<?php
/**
 * bphtb_registration
 * class model for table bds_bphtb_registration 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class t_message_inbox extends AbstractTable{
    /* Table name */
    public $table = 'sikp.t_message_inbox';
    /* Alias for table */
    public $alias = 'inbox';
    /* List of table fields */
    public $fields = array(
                           't_message_inbox_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 't_message_inbox_id'),
                           'p_message_type_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'p_message_type_id'),
                           't_cust_account_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 't_cust_account_id'),
                           'message_status' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'message_status'),
                           'message_body' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'message_body'),
                           'p_app_role_id_to' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'p_app_role_id_to'),
                           'closing_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'closing_date'),
                           'closed_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'closed_by'),
                           'creation_date' => array('type' => 'date', 'nullable' => false, 'unique' => false, 'display' => 'created_by'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'created_by'),
                           'update_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'update_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'updated_by')
                           );
                                                  
    /* Display fields */
    public $displayFields = array('t_message_inbox_id');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_message_inbox_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "select inbox.*,to_char(inbox.creation_date, 'yyyy-mm-dd') AS creation_date,to_char(inbox.creation_date, 'HH24:MI:SS PM') as creation_time, 
                                to_char(inbox.update_date, 'yyyy-mm-dd') AS update_date,mtype.message_type"; 
    public $fromClause = "from t_message_inbox inbox
                         left join sikp.p_message_type mtype on mtype.p_message_type_id = inbox.p_message_type_id";

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        $userInfo = wbUser::getSession();
        
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
            $this->record['creation_date'] = date('Y-m-d');
            $this->record['created_by'] = $userInfo['user_name'];
            
            $this->record['updated_date'] = date('Y-m-d');
            $this->record['updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['updated_date'] = date('Y-m-d');
            $this->record['updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>