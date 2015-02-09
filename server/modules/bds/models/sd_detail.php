<?php
/**
 * sd_detail
 * class model for table bds_sd_detail 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class sd_detail extends AbstractTable{
    /* Table name */
    public $table = 'bds_sd_detail';
    /* Alias for table */
    public $alias = 'sd_detail';
    /* List of table fields */
    public $fields = array('sd_det_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Det SD'),
                           'sd_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID SD'),
                           'sd_det_thn_ajaran' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Tahun Ajaran'),
                           'sd_det_jmlsekolah' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Sekolah'),
                           'sd_det_siswabaru_6_7_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Siswa Baru (6 - 7 Tahun)'),
                           'sd_det_siswabaru_usialain' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Siswa Baru (Usia Lain)'),
                           'sd_det_siswabaru_asal_tk' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Siswa Baru (Asal TK)'),
                           'sd_det_siswabaru_asal_rt' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Siswa Baru (Asal Rumah Tangga)'),
                           'sd_det_siswa_lt_7_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa < 7 Thn'),
                           'sd_det_siswa_7_12_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa antara 7 s.d 12 Thn'),
                           'sd_det_siswa_gt_12_thn' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa > 12 Thn'),
                           'sd_det_siswa_laki' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Laki-laki'),
                           'sd_det_siswa_perempuan' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Perempuan'),
                           'sd_det_jml_siswa_negeri' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Negeri'),
                           'sd_det_jml_siswa_swasta' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Siswa Swasta'),
                           'sd_det_jml_kelas1' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 1'),
                           'sd_det_jml_kelas2' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 2'),
                           'sd_det_jml_kelas3' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 3'),
                           'sd_det_jml_kelas4' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 4'),
                           'sd_det_jml_kelas5' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 5'),
                           'sd_det_jml_kelas6' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kelas 6'),
                           'sd_det_ulang_kelas1' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 1'),
                           'sd_det_ulang_kelas2' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 2'),
                           'sd_det_ulang_kelas3' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 3'),
                           'sd_det_ulang_kelas4' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 4'),
                           'sd_det_ulang_kelas5' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 5'),
                           'sd_det_ulang_kelas6' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Mengulang Kelas 6'),
                           'sd_det_putus_kelas1' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 1'),
                           'sd_det_putus_kelas2' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 2'),
                           'sd_det_putus_kelas3' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 3'),
                           'sd_det_putus_kelas4' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 4'),
                           'sd_det_putus_kelas5' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 5'),
                           'sd_det_putus_kelas6' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Putus Sklh Kelas 6'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'sd_det_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT sd_detail.*,
									sd.sd_tahun_ajaran, sd.sd_keterangan, sd.sd_type';
    public $fromClause = 'FROM bds_sd_detail AS sd_detail
							LEFT JOIN bds_sd AS sd ON sd_detail.sd_id = sd.sd_id';

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
    
    public function isExistTahunAjaran($sd_id, $sd_det_thn_ajaran) {
        $query = "SELECT COUNT(1) FROM bds_sd_detail WHERE sd_id = ? AND sd_det_thn_ajaran = ?";
        $countitems = $this->dbconn->GetOne($query, array($sd_id, $sd_det_thn_ajaran));
        
        if($countitems > 0) return true;
        return false;
    }
}
?>