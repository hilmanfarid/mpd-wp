<?php
/**
 * t_siswa
 * class model for table bds_t_siswa 
 *
 * @since 02-11-2012 13:33:33
 * @author agung.hp
 */
class t_siswa extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_siswa';
    /* Alias for table */
    public $alias = 't_siswa';
    /* List of table fields */
    public $fields = array('t_siswa_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 't_siswa_id'),
                           'd_sekolah_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'd_sekolah_id'),
                           'tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'tahun'),
                           'jml_masuk' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'jml_masuk'),
                           'jml_lulus' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'jml_lulus'),
                           'jml_aktif' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'jml_aktif'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'description'),
                           'creation_date' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'creation_date'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'creation_by'),
                           'updated_date' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'updated_by'));
    /* Display fields */
    public $displayFields = array('tahun', 'jml_masuk');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_siswa_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_siswa.*, to_char(t_siswa.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_siswa.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_t_siswa AS t_siswa';

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