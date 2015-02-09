<?php
/**
 * t_skpd_employee
 * class model for table bds_t_skpd_employee 
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
class t_skpd_employee extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_skpd_employee';
    /* Alias for table */
    public $alias = 't_skpd_employee';
    /* List of table fields */
    public $fields = array('t_skpd_employee_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Employee SKPD'),
                           'd_skpd_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID SKPD'),
                           'tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'jml_peg_organik' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Pegawai (Organik)'),
                           'jml_peg_non_organik' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Pegawai (Non-Organik)'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_skpd_employee_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_skpd_employee.*,to_char(t_skpd_employee.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_skpd_employee.updated_date, 'yyyy-mm-dd') AS updated_date,
									d_skpd.code, d_skpd.skpd_name";
    public $fromClause = 'FROM bds_t_skpd_employee AS t_skpd_employee
							LEFT JOIN bds_d_skpd AS d_skpd ON t_skpd_employee.d_skpd_id = d_skpd.d_skpd_id';
    
    
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