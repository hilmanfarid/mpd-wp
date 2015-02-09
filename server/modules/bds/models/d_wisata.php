<?php
/**
 * d_wisata
 * class model for table bds_d_wisata 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class d_wisata extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_wisata';
    /* Alias for table */
    public $alias = 'd_wisata';
    /* List of table fields */
    public $fields = array('wisata_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Wisata'),
                           'wisata_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'wisata_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Tempat Wisata'),
                           'wisata_address_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 1'),
                           'wisata_address_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 2'),
                           'wisata_kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'wisata_kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'wisata_phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Telepon'),
                           'wisata_website' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Website'),
                           'wisata_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'wisata_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('wisata_code', 'wisata_name');
    /* Details table */
    public $details = array('bds_t_wisata_detail' => 't_wisata_detail');
    /* Primary key */
    public $pkey = 'wisata_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_wisata.*,to_char(d_wisata.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_wisata.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_d_wisata AS d_wisata';

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
    public function rekapWisata($tahun){
    	$query = "SELECT wisata_name,wisata_det_jml_wisman as wisman,wisata_det_jml_wisdom as wisdom,(wisata_det_jml_wisman+wisata_det_jml_wisdom) as jum_wis,wisata_det_jml_peg_pria as peg_pria,wisata_det_jml_peg_wanita as peg_wanita,(wisata_det_jml_peg_pria+wisata_det_jml_peg_wanita) as jum_peg FROM bds_d_wisata wisata left join (select * from bds_t_wisata_detail where wisata_det_tahun =".$tahun." ) detail on detail.wisata_id = wisata.wisata_id"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
}
?>