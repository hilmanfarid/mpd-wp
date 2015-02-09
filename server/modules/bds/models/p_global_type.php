<?php
/**
 * p_global_type
 * class model for table bds_p_global_type 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_global_type extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_global_type';
    /* Alias for table */
    public $alias = 'p_global_type';
    /* List of table fields */
    public $fields = array('gtype_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Global Type'),
                           'gtype_code' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Kode Global Type'),
                           'gtype_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi Global Type'),
                           'gtype_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'gtype_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'gtype_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'gtype_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('gtype_code');
    /* Details table */
    public $details = array('bds_p_global_param' => 'p_global_param');
    /* Primary key */
    public $pkey = 'gtype_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_global_type.*, to_char(p_global_type.gtype_creation_date, 'yyyy-mm-dd') AS gtype_creation_date, 
                                to_char(p_global_type.gtype_updated_date, 'yyyy-mm-dd') AS gtype_updated_date";
    public $fromClause = 'FROM bds_p_global_type AS p_global_type';

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
            $this->record['gtype_creation_date'] = date('Y-m-d');
            $this->record['gtype_creation_by'] = $userInfo['user_name'];
            
            $this->record['gtype_updated_date'] = date('Y-m-d');
            $this->record['gtype_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['gtype_updated_date'] = date('Y-m-d');
            $this->record['gtype_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>