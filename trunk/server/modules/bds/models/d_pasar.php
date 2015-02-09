<?php
/**
 * d_pasar
 * class model for table bds_d_pasar 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class d_pasar extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_pasar';
    /* Alias for table */
    public $alias = 'd_pasar';
    /* List of table fields */
    public $fields = array('pasar_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Pasar'),
                           'pasar_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'pasar_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Pasar'),
                           'pasar_address1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 1'),
                           'pasar_address2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 2'),
                           'pasar_kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'pasar_kodepos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'pasar_phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Telepon'),
                           'pasar_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'pasar_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('pasar_code', 'pasar_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'pasar_id';
    /* References */    
    public $refs = array('bds_t_pasar_detail' => 'pasar_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_pasar.*, to_char(d_pasar.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_pasar.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_d_pasar AS d_pasar';

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
    public function rekapPasar($tahun){
    	$query = "select pasar.pasar_name,detail.* from bds_d_pasar pasar left join (select pasar_id,pasar_det_jml_ruang as jum_ruang,pasar_det_jml_pedagang_aktif as aktif,pasar_det_jml_pedagang_pasif as pasif from bds_t_pasar_detail where pasar_det_tahun = ".$tahun." ) detail on detail.pasar_id = pasar.pasar_id"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
}
?>