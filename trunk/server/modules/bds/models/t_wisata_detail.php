<?php
/**
 * t_wisata_detail
 * class model for table bds_t_wisata_detail 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class t_wisata_detail extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_wisata_detail';
    /* Alias for table */
    public $alias = 't_wisata_detail';
    /* List of table fields */
    public $fields = array('wisata_det_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Wisata Detail'),
                           'wisata_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Wisata'),
                           'wisata_det_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'wisata_det_jml_peg_pria' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Pegawai Pria'),
                           'wisata_det_jml_peg_wanita' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Pegawain Wanita'),
                           'wisata_det_jml_wisman' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Wisatawan Mancanegara'),
                           'wisata_det_jml_wisdom' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Wisatawan Domestic'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'wisata_det_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_wisata_detail.*,
									d_wisata.wisata_id, d_wisata.wisata_code, d_wisata.wisata_name, d_wisata.wisata_address_1, d_wisata.wisata_address_2, d_wisata.wisata_kota, d_wisata.wisata_kode_pos, d_wisata.wisata_phone_no, d_wisata.wisata_website, d_wisata.wisata_listing_no, d_wisata.wisata_description, d_wisata.creation_date, d_wisata.created_by, d_wisata.updated_date, d_wisata.updated_by,
									to_char(t_wisata_detail.creation_date, 'yyyy-mm-dd') AS creation_date, 
	                                to_char(t_wisata_detail.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_t_wisata_detail AS t_wisata_detail
							LEFT JOIN bds_d_wisata AS d_wisata ON t_wisata_detail.wisata_id = d_wisata.wisata_id';

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