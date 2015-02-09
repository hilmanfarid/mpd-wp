<?php
/**
 * d_warga
 * class model for table bds_d_warga 
 *
 * @since 31-10-2012 11:02:06
 * @author agung.hp
 */
class d_warga extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_warga';
    /* Alias for table */
    public $alias = 'd_warga';
    /* List of table fields */
    public $fields = array('warga_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Warga'),
                           'warga_pid' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Warga'),
                           'warga_kk_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No KK'),
                           'warga_ktp_no' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'No KTP'),
                           'warga_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama'),
                           'jk_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jenis Kelamin'),
                           'warga_ktp_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl KTP'),
                           'warga_ktpvalid_to' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Berlaku KTP'),
                           'warga_kkvalid_to' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Berlaku KK'),
                           'warga_tgl_lahir' => array('type' => 'date', 'nullable' => false, 'unique' => false, 'display' => 'Tgl Lahir'),
                           'warga_tempat_lahir' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tempat Lahir'),
                           'goldarah_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Gol. Darah'),
                           'agama_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Agama'),
                           'statnikah_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Status Nikah'),
                           'hubkel_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Hub. Keluarga'),
                           'warga_address_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 1'),
                           'warga_address_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 2'),
                           'warga_kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'warga_kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'pendidikan_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Pendidikan'),
                           'jobtype_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jenis Pekerjaan'),
                           'wilayah_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Wilayah'),
                           'warga_job_company' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Nama Tempat Pekerjaan'),
                           'warga_job_address' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat Pekerjaan'),
                           'warga_job_kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota Pekerjaan'),
                           'warga_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'warga_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'warga_created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'warga_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'warga_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('warga_ktp_no', 'warga_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'warga_id';
    /* References */    
    public $refs = array('bds_d_warga' => 'warga_pid');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_warga.*, to_char(d_warga.warga_creation_date, 'yyyy-mm-dd') AS warga_creation_date, 
                                to_char(d_warga.warga_updated_date, 'yyyy-mm-dd') AS warga_updated_date,
                                to_char(d_warga.warga_ktp_date, 'yyyy-mm-dd') AS warga_ktp_date,
                                to_char(d_warga.warga_ktpvalid_to, 'yyyy-mm-dd') AS warga_ktpvalid_to,
                                to_char(d_warga.warga_kkvalid_to, 'yyyy-mm-dd') AS warga_kkvalid_to,
                                to_char(d_warga.warga_tgl_lahir, 'yyyy-mm-dd') AS warga_tgl_lahir
                                ";
    public $fromClause = 'FROM bds_d_warga AS d_warga';

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
            $this->record['warga_creation_date'] = date('Y-m-d');
            $this->record['warga_created_by'] = $userInfo['user_name'];
            
            $this->record['warga_updated_date'] = date('Y-m-d');
            $this->record['warga_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['warga_updated_date'] = date('Y-m-d');
            $this->record['warga_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
    
    /*keperluan statistik*/
    public function getCountByAge($condition) {
        
        $query = "SELECT COUNT(1) FROM bds_d_warga
                    WHERE ".$condition;
        
        return $this->dbconn->GetOne($query);
        
    }
    
    public function getCountByPendidikanID($pendidikan_id, $jk_id = '') {
        $query = "SELECT COUNT(1) FROM bds_d_warga
                    WHERE pendidikan_id = ?";
        
        if(empty($jk_id)) {
            return $this->dbconn->GetOne($query, array($pendidikan_id));
        }else {
            $query .= "AND jk_id = ?";
            return $this->dbconn->GetOne($query, array($pendidikan_id, $jk_id));
        }
           
    }
}
?>