<?php
/**
 * d_bandung
 * class model for table bds_d_bandung 
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
class d_bandung extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_bandung';
    /* Alias for table */
    public $alias = 'd_bandung';
    /* List of table fields */
    public $fields = array('bandung_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Bandung'),
                           'bandung_luas_area' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Luas Area'),
                           'bandung_lintang1' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Lintang Utara'),
                           'bandung_lintang2' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Lintang Selatan'),
                           'bandung_bujur1' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Bujur Barat'),
                           'bandung_bujur2' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Bujur Timur'),
                           'bandung_tinggi_max' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Ketinggian Maksimum'),
                           'bandung_tinggi_min' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Ketinggian Minimum'),
                           'bandung_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'bandung_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_bandung.*,to_char(d_bandung.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_bandung.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_d_bandung AS d_bandung';

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
}
?>