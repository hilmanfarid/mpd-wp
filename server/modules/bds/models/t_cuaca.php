<?php
/**
 * t_cuaca
 * class model for table bds_t_cuaca 
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
class t_cuaca extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_cuaca';
    /* Alias for table */
    public $alias = 't_cuaca';
    /* List of table fields */
    public $fields = array('t_cuaca_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Cuaca'),
                           'tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'bulan' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Bulan'),
                           'penguapan' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Penguapan (mm)'),
                           'tekanan_udara' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Tekanan Udara (mb)'),
                           'kelembaban' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Kelembaban Nisbi(%)'),
                           'suhu_max' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Suhu Maksimum (C)'),
                           'suhu_min' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Suhu Minimum (C)'),
                           'suhu_rata2' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Suhu Rata-rata (C)'),
                           'curah_hujan' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Curah Hujan (mm)'),
                           'hari_hujan' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Hari Hujan (hari)'),
                           'prosen_sinar' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'LPM (%)'),
                           'angin_rata2' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Kecepatan Angin Rata-rata(km/jam)'),
                           'arah_rata2' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Arah Angin Rata-rata'),
                           'angin_max' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Kecepatan Angin Terbesar (km/jam)'),
                           'arah_max' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Arah Angin Saat Kecepatan Terbesar'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_cuaca_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_cuaca.*, to_char(t_cuaca.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_cuaca.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_t_cuaca AS t_cuaca';

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