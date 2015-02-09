<?php
/**
 * d_puskesmas
 * class model for table bds_d_puskesmas 
 *
 * @since 06-12-2012 11:58:40
 * @author agung.hp
 */
class d_puskesmas extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_puskesmas';
    /* Alias for table */
    public $alias = 'd_puskesmas';
    /* List of table fields */
    public $fields = array('puskesmas_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Puskesmas'),
                           'kecamatan_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kecamatan'),
                           'puskesmas_kode' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'puskesmas_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Puskesmas'),
                           'puskesmas_alamat' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat'),
                           'puskesmas_kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'puskesmas_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'puskesmas_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'puskesmas_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'puskesmas_created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'puskesmas_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'),
                           'puskesmas_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'),
                           'kecamatan' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'latitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Latitude'),
                           'longitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Longitude')
                           
                           );
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'puskesmas_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT d_puskesmas.*,
									p_wilayah.wilayah_kode, p_wilayah.wilayah_nama';
    public $fromClause = 'FROM bds_d_puskesmas AS d_puskesmas
							LEFT JOIN bds_p_wilayah AS p_wilayah ON d_puskesmas.kecamatan_id = p_wilayah.wilayah_id';

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
            $this->record['puskesmas_creation_date'] = date('Y-m-d');
            $this->record['puskesmas_created_by'] = $userInfo['user_name'];
            
            $this->record['puskesmas_updated_date'] = date('Y-m-d');
            $this->record['puskesmas_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['puskesmas_updated_date'] = date('Y-m-d');
            $this->record['puskesmas_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
    
    public function getJumlahPerKecamatan($kecamatan_id) {
        $query = "SELECT COUNT(1) FROM ".$this->table." WHERE kecamatan_id = ?";
        return $this->dbconn->GetOne($query, array($kecamatan_id));    
    }
}
?>