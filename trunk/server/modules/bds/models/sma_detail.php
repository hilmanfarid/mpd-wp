<?php
/**
 * sma_detail
 * class model for table bds_sma_detail 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class sma_detail extends AbstractTable{
    /* Table name */
    public $table = 'bds_sma_detail';
    /* Alias for table */
    public $alias = 'sma_detail';
    /* List of table fields */
    public $fields = array('sma_det_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Det SMA'),
                           'sma_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID SMA'),
                           'sma_det_thn_ajaran' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Tahun Ajaran'),
                           'sma_det_jmlsekolah' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Sekolah'),
                           'sma_det_siswabaru' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Baru'),
                           'sma_det_siswa_lt_16_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa < 16 Thn'),
                           'sma_det_siswa_16_18_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa antara 16 s.d 18 Thn'),
                           'sma_det_siswa_gt_18_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa > 18 Thn'),
                           'sma_det_siswa_laki' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Laki-laki'),
                           'sma_det_siswa_perempuan' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Perempuan'),
                           'sma_det_jml_siswa_negeri' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Negeri'),
                           'sma_det_jml_siswa_swasta' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Swasta'),
                           'sma_det_jml_kelas10' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 10'),
                           'sma_det_jml_kelas11' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 11'),
                           'sma_det_jml_kelas12' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 12'),
                           'sma_det_ulang_kelas10' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 10'),
                           'sma_det_ulang_kelas11' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 11'),
                           'sma_det_ulang_kelas12' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 12'),
                           'sma_det_putus_kelas10' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 10'),
                           'sma_det_putus_kelas11' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 11'),
                           'sma_det_putus_kelas12' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 12'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'sma_det_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT sma_detail.*,
									sma.sma_tahun_ajaran, sma.sma_keterangan, sma.sma_type';
    public $fromClause = 'FROM bds_sma_detail AS sma_detail
							LEFT JOIN bds_sma AS sma ON sma_detail.sma_id = sma.sma_id';

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
        }
        
        return true;
    }
    
    public function isExistTahunAjaran($sma_id, $sma_det_thn_ajaran) {
        $query = "SELECT COUNT(1) FROM bds_sma_detail WHERE sma_id = ? AND sma_det_thn_ajaran = ?";
        $countitems = $this->dbconn->GetOne($query, array($sma_id, $sma_det_thn_ajaran));
        
        if($countitems > 0) return true;
        return false;
    }
}
?>