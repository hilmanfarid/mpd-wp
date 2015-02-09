<?php
/**
 * d_sekolah_pt
 * class model for table bds_d_sekolah_pt 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class d_sekolah extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_sekolah';
    /* Alias for table */
    public $alias = 'd_sekolah';
    /* List of table fields */
    public $fields = array('d_sekolah_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Job Position'),
                           'code' => array('type' => 'str', 'nullable' => true, 'unique' => true, 'display' => 'Kode'),
                           'sekolah_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Nama'),
                           'alias_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alias'),
                           'type_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Jenis'),
                           'status_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Status'),
                           'tgl_berdiri' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Berdiri'),
                           'address_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat-1'),
                           'address_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'alamat-2'),
                           'kecamatan_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'kecamatan_id'),
                           'kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Telepon'),
                           'website' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Website'),
                           'kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
                           
    /* Display fields */
    public $displayFields = array('d_sekolah.code','d_sekolah.sekolah_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'd_sekolah_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_sekolah.*, to_char(d_sekolah.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_sekolah.updated_date, 'yyyy-mm-dd') AS updated_date,
                                to_char(d_sekolah.tgl_berdiri, 'yyyy-mm-dd') AS tgl_berdiri,
                                school_type.code AS jenis_sekolah,
                                p_parameter.param_name AS status_sekolah,
                                kecamatan.wilayah_nama as kecamatan_nama
                                ";
    public $fromClause = 'FROM bds_d_sekolah AS d_sekolah
                            LEFT JOIN bds_p_school_type AS school_type ON d_sekolah.type_id = school_type.p_school_type_id
                            LEFT JOIN bds_p_school_level AS school_level ON school_type.level_id = school_level.p_school_level_id
                            LEFT JOIN bds_p_parameter AS p_parameter ON d_sekolah.status_id = p_parameter.param_id
                            LEFT JOIN bds_p_wilayah AS kecamatan ON d_sekolah.kecamatan_id = kecamatan.wilayah_id
                            ';

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