<?php
/**
 * bphtb_registration
 * class model for table bds_bphtb_registration 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class p_finance_period extends AbstractTable{
    /* Table name */
    public $table = 'p_finance_period';
    /* Alias for table */
    public $alias = 'finance';
    /* List of table fields */
    public $fields = array(
                           'p_finance_period_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'p_finance_period_id'),
                           'code' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'code'),
                           'p_year_period_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'p_year_period_id'),
                           'p_status_list_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'p_status_list_id'),
                           'start_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'start_date'),
                           'end_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'end_date'),
                           'created_by' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'created_by'),
                           'created_by' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'created_by'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_by')
                           );
                                                  
    /* Display fields */
    public $displayFields = array('code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'p_finance_period_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "select *,to_char(start_date,'dd-mm-yyyy') as start_date_string,to_char(end_date,'dd-mm-yyyy') as end_date_string"; 
    public $fromClause = "from view_finance_period_bayar finance";

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