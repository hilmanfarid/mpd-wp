<?php
/**
 * p_job_position
 * class model for table bds_p_job_position 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_job_position extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_job_position';
    /* Alias for table */
    public $alias = 'p_job_position';
    /* List of table fields */
    public $fields = array('jobpos_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Job Position'),
                           'jobpos_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Posisi'),
                           'jobpos_listing_no' => array('type' => 'str', 'nullable' => true, 'unique' => true, 'display' => 'No Urut'),
                           'jobpos_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'jobpos_status' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Status Wilayah'),                           
                           'jobpos_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'jobpos_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'jobpos_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'jobpos_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('jobpos_code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'jobpos_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_job_position.*, to_char(p_job_position.jobpos_creation_date, 'yyyy-mm-dd') AS jobpos_creation_date, 
                                to_char(p_job_position.jobpos_updated_date, 'yyyy-mm-dd') AS jobpos_updated_date";
    public $fromClause = 'FROM bds_p_job_position AS p_job_position';

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
            $this->record['jobpos_creation_date'] = date('Y-m-d');
            $this->record['jobpos_creation_by'] = $userInfo['user_name'];
            
            $this->record['jobpos_updated_date'] = date('Y-m-d');
            $this->record['jobpos_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['jobpos_updated_date'] = date('Y-m-d');
            $this->record['jobpos_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>