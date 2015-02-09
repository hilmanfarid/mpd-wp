<?php
/**
 * bphtb_registration
 * class model for table bds_bphtb_registration 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class p_vat_type_dtl extends AbstractTable{
    /* Table name */
    public $table = 'p_vat_type_dtl';
    /* Alias for table */
    public $alias = 'vat_type_dtl';
    /* List of table fields */
    public $fields = array(
                           'p_vat_type_dtl_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'p_vat_type_dtl_id'),
                           'p_vat_type_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'p_vat_type_id'),
                           'code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'code'),
                           'vat_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'vat_code'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'description'),
                           'vat_pct' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'vat_pct'),
                           'created_by' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'created_by'),
                           'created_by' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'created_by'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_by')
                           );
                           
                           
    /* Display fields */
    public $displayFields = array('code','vat_code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'p_vat_type_dtl_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "select *";

    public $fromClause = "FROM sikp.p_vat_type_dtl vat_type_dtl";

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