<?php
/**
 * p_school_level
 * class model for table bds_p_school_level 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_school_level extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_school_level';
    /* Alias for table */
    public $alias = 'p_school_level';
    /* List of table fields */
    public $fields = array('p_school_level_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Level Sekolah'),
                           'code' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Kode Level'),
                           'listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Listing'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Description'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'p_school_level_id';
    /* References */    
    public $refs = array('bds_p_school_type' => 'level_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_school_level.*, to_char(p_school_level.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(p_school_level.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_p_school_level AS p_school_level';

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
            $this->record['creation_by'] = $userInfo['user_name'];
            
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