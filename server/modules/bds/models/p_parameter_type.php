<?php
/**
 * p_parameter_type
 * class model for table bds_p_parameter_type 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_parameter_type extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_parameter_type';
    /* Alias for table */
    public $alias = 'p_parameter_type';
    /* List of table fields */
    public $fields = array('ptype_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Parameter Type'),
                           'ptype_code' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Kode Parameter Type'),
                           'ptype_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Listing'),
                           'ptype_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Description'),
                           'ptype_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'ptype_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'ptype_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'ptype_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('ptype_code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'ptype_id';
    /* References */    
    public $refs = array('bds_p_parameter' => 'ptype_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_parameter_type.*, to_char(p_parameter_type.ptype_creation_date, 'yyyy-mm-dd') AS ptype_creation_date, 
                                to_char(p_parameter_type.ptype_updated_date, 'yyyy-mm-dd') AS ptype_updated_date";
    public $fromClause = 'FROM bds_p_parameter_type AS p_parameter_type';

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
            $this->record['ptype_creation_date'] = date('Y-m-d');
            $this->record['ptype_creation_by'] = $userInfo['user_name'];
            
            $this->record['ptype_updated_date'] = date('Y-m-d');
            $this->record['ptype_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['ptype_updated_date'] = date('Y-m-d');
            $this->record['ptype_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>