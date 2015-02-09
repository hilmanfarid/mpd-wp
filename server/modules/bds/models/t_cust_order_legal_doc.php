<?php
/**
 * bphtb_registration
 * class model for table bds_bphtb_registration 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class t_cust_order_legal_doc extends AbstractTable{
    /* Table name */
    public $table = 't_cust_order_legal_doc';
    /* Alias for table */
    public $alias = 't_cust_order_legal_doc';
    /* List of table fields */
    public $fields = array(
                           't_cust_order_legal_doc_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 't_cust_order_legal_doc_id'),
                           't_customer_order_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 't_customer_order_id'),
						   't_customer_order_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 't_customer_order_id'),
                           'p_legal_doc_type_id' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'p_legal_doc_type_id'),
						   'legal_doc_desc' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'legal_doc_desc'),
						   'origin_file_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'origin_file_name'),
						   'file_folder' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'file_folder'),
						   'file_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'file_name'),
						   'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'description'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_by')
                           );
                           
                           
    /* Display fields */
    public $displayFields = array('legal_doc_desc');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_cust_order_legal_doc_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "select *";

    public $fromClause = "FROM sikp.t_cust_order_legal_doc";

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