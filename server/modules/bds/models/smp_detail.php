<?php
/**
 * smp_detail
 * class model for table bds_smp_detail 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class smp_detail extends AbstractTable{
    /* Table name */
    public $table = 'bds_smp_detail';
    /* Alias for table */
    public $alias = 'smp_detail';
    /* List of table fields */
    public $fields = array('smp_det_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Det SMP'),
                           'smp_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID SMP'),
                           'smp_det_thn_ajaran' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Tahun Ajaran'),
                           'smp_det_jmlsekolah' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Sekolah'),
                           'smp_det_siswabaru' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Baru'),
                           'smp_det_siwa_lt_13_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa < 13 Thn'),
                           'smp_det_siswa_13_15_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa antara 13 s.d 15 Thn'),
                           'smp_det_siswa_gt_15_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa > 15 Thn'),
                           'smp_det_siswa_laki' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Laki-laki'),
                           'smp_det_siswa_perempuan' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Perempuan'),
                           'smp_det_jml_siswa_negeri' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Negeri'),
                           'smp_det_jml_siswa_swasta' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Swasta'),
                           'smp_det_jml_kelas7' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 7'),
                           'smp_det_jml_kelas8' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 8'),
                           'smp_det_jml_kelas9' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 9'),
                           'smp_det_ulang_kelas7' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 7'),
                           'smp_det_ulang_kelas8' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 8 '),
                           'smp_det_ulang_kelas9' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 9'),
                           'smp_det_putus_kelas7' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 7'),
                           'smp_det_putus_kelas8' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 8'),
                           'smp_det_putus_kelas9' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 9'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'smp_det_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT smp_detail.*,
									smp.smp_tahun_ajaran, smp.smp_keterangan, smp.smp_type';
    public $fromClause = 'FROM bds_smp_detail AS smp_detail
							LEFT JOIN bds_smp AS smp ON smp_detail.smp_id = smp.smp_id';

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
    
    public function isExistTahunAjaran($smp_id, $smp_det_thn_ajaran) {
        $query = "SELECT COUNT(1) FROM bds_smp_detail WHERE smp_id = ? AND smp_det_thn_ajaran = ?";
        $countitems = $this->dbconn->GetOne($query, array($smp_id, $smp_det_thn_ajaran));
        
        if($countitems > 0) return true;
        return false;
    }
}
?>