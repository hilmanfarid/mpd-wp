<?php
/**
 * t_pasar_detail
 * class model for table bds_t_pasar_detail 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class t_pasar_detail extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_pasar_detail';
    /* Alias for table */
    public $alias = 't_pasar_detail';
    /* List of table fields */
    public $fields = array('pasar_det_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Pasar Detail'),
                           'pasar_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Pasar'),
                           'pasar_det_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'pasar_det_jml_ruang' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Ruang'),
                           'pasar_det_jml_pedagang_aktif' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Pedagang Aktif'),
                           'pasar_det_jml_pedagang_pasif' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Pedagang Pasif'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'pasar_det_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_pasar_detail.*, to_char(t_pasar_detail.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_pasar_detail.updated_date, 'yyyy-mm-dd') AS updated_date,
									d_pasar.pasar_code, d_pasar.pasar_name";
    public $fromClause = 'FROM bds_t_pasar_detail AS t_pasar_detail
							LEFT JOIN bds_d_pasar AS d_pasar ON t_pasar_detail.pasar_id = d_pasar.pasar_id';

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