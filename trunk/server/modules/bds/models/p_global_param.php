<?php
/**
 * p_global_param
 * class model for table bds_p_global_param 
 *
 * @since 23-10-2012 12:07:19
 * @author wiliamdecosta@gmail.com
 */
class p_global_param extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_global_param';
    /* Alias for table */
    public $alias = 'p_global_param';
    /* List of table fields */
    public $fields = array('gparam_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Global Param'),
                           'gtype_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Global Type'),
                           'gparam_code' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Kode Global Param'),
                           'gparam_value_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Value 1'),
                           'gparam_type_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Type 1'),
                           'gparam_is_range' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Is Range'),
                           'gparam_value_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Value 2'),
                           'gparam_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Description'),
                           'gparam_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'gparam_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'gparam_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'gparam_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('gparam_code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'gparam_id';
    /* References */    
    public $refs = array('bds_p_global_param' => array('col' => 'gtype_id', 'class' => 'p_global_param'));
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_global_param.*, to_char(p_global_param.gparam_creation_date, 'yyyy-mm-dd') AS gparam_creation_date, 
                                to_char(p_global_param.gparam_updated_date, 'yyyy-mm-dd') AS gparam_updated_date,
									p_global_type.gtype_code, p_global_type.gtype_description";
    public $fromClause = 'FROM bds_p_global_param AS p_global_param
							LEFT JOIN bds_p_global_type AS p_global_type ON p_global_param.gtype_id = p_global_type.gtype_id';

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
            
            $this->record['gparam_creation_date'] = date('Y-m-d');
            $this->record['gparam_creation_by'] = $userInfo['user_name'];
            
            $this->record['gparam_updated_date'] = date('Y-m-d');
            $this->record['gparam_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['gparam_updated_date'] = date('Y-m-d');
            $this->record['gparam_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>