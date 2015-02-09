<?php
/**
 * d_rumahsakit
 * class model for table bds_d_rumahsakit 
 *
 * @since 05-12-2012 12:48:54
 * @author agung.hp
 */
class d_rumahsakit extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_rumahsakit';
    /* Alias for table */
    public $alias = 'd_rumahsakit';
    /* List of table fields */
    public $fields = array('rs_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Rumah Sakit'),
                           'jenis_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jenis Rumah Sakit'),
                           'kecamatan_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kecamatan'),
                           'rs_kode' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'rs_name' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Nama Rumah Sakit'),
                           'rs_alamat1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 1'),
                           'rs_alamat2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 2'),
                           'rs_kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'rs_phone' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Telepon'),
                           'rs_website' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Website'),
                           'rs_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => true, 'display' => 'No Urut'),
                           'rs_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'rs_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'rs_created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'rs_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'rs_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'),
                           'kecamatan' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kecamatan'),
                           'latitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Latitude'),
                           'longitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Longitude')
                           );
    /* Display fields */
    public $displayFields = array('rs_kode', 'rs_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'rs_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_rumahsakit.*,to_char(d_rumahsakit.rs_creation_date, 'yyyy-mm-dd') AS rs_creation_date, 
                                to_char(d_rumahsakit.rs_updated_date, 'yyyy-mm-dd') AS rs_updated_date,
									p_parameter.ptype_id, p_parameter.param_code, p_parameter.param_name,
									wilayah.wilayah_nama
									";
    public $fromClause = 'FROM bds_d_rumahsakit AS d_rumahsakit
							LEFT JOIN bds_p_parameter AS p_parameter ON d_rumahsakit.jenis_id = p_parameter.param_id
							LEFT JOIN bds_p_wilayah AS wilayah ON d_rumahsakit.kecamatan_id =  wilayah.wilayah_id
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
            $this->record['rs_creation_date'] = date('Y-m-d');
            $this->record['rs_created_by'] = $userInfo['user_name'];
            
            $this->record['rs_updated_date'] = date('Y-m-d');
            $this->record['rs_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['rs_updated_date'] = date('Y-m-d');
            $this->record['rs_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
    
    public function getJumlahPerKecamatan($kecamatan_id) {
        $query = "SELECT COUNT(1) FROM ".$this->table." WHERE kecamatan_id = ?";
        return $this->dbconn->GetOne($query, array($kecamatan_id));    
    }
    
    public function getJumlahPerJenis($jenis_id) {
        $query = "SELECT COUNT(1) FROM ".$this->table." WHERE jenis_id = ?";
        return $this->dbconn->GetOne($query, array($jenis_id));
    }
}
?>