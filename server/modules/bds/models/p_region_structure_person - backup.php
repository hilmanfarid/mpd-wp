<?php
/**
 * p_region_structure_person
 * class model for table bds_p_region_structure_person 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_region_structure_person extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_region_structure_person';
    /* Alias for table */
    public $alias = 'p_region_structure_person';
    /* List of table fields */
    public $fields = array('rsp_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Region Structure Person'),
                           'param_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'agama_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Agama'),
                           'jk_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Jenis Kelamin'),
                           'jobpos_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Job Position'),
                           'wilayah_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Wilayah'),
                           'rsp_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama'),
                           'rsp_start_position_year' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Thn Masuk'),
                           'rsp_end_position_year' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Thn Keluar'),
                           'rsp_valid_from' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Berlaku Dari'),
                           'rsp_valid_to' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Sampai'),
                           'rsp_date_of_birth' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Lahir'),
                           'rsp_place_of_birth' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Tempat Lahir'),
                           'rsp_age' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Umur'),
                           'rsp_address_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 1'),
                           'rsp_address_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 2'),
                           'rsp_address_3' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 3'),
                           'rsp_id_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Identitas'),
                           'rsp_phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Telepon'),
                           'rsp_mobile_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No HP'),
                           'rsp_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'rsp_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'rsp_created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'rsp_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'rsp_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('rsp_id_no', 'rsp_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'rsp_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_region_structure_person.*, to_char(p_region_structure_person.rsp_creation_date, 'yyyy-mm-dd') AS rsp_creation_date, 
                                    to_char(p_region_structure_person.rsp_updated_date, 'yyyy-mm-dd') AS rsp_updated_date,                                
									p_parameter.param_id, p_parameter.ptype_id, p_parameter.param_code, p_parameter.param_name, p_parameter.param_listing_no, p_parameter.param_description, 
									p_job_position.jobpos_status, p_job_position.jobpos_code, p_job_position.jobpos_description, 
									p_wilayah.wilayah_id, p_wilayah.wilayah_kode, p_wilayah.wilayah_nama, p_wilayah.wilayah_description, p_wilayah.wilayah_status";
    public $fromClause = 'FROM bds_p_region_structure_person AS p_region_structure_person
							LEFT JOIN bds_p_parameter AS p_parameter ON p_region_structure_person.param_id = p_parameter.param_id
							LEFT JOIN bds_p_job_position AS p_job_position ON p_region_structure_person.jobpos_id = p_job_position.jobpos_id
							LEFT JOIN bds_p_wilayah AS p_wilayah ON p_region_structure_person.wilayah_id = p_wilayah.wilayah_id';

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
            $this->record['rsp_creation_date'] = date('Y-m-d');
            $this->record['rsp_created_by'] = $userInfo['user_name'];
            
            $this->record['rsp_updated_date'] = date('Y-m-d');
            $this->record['rsp_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['rsp_updated_date'] = date('Y-m-d');
            $this->record['rsp_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>