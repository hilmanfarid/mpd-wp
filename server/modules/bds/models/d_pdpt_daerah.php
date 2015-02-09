<?php
/**
 * d_pdpt_daerah
 * class model for table bds_d_pdpt_daerah 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class d_pdpt_daerah extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_pdpt_daerah';
    /* Alias for table */
    public $alias = 'd_pdpt_daerah';
    /* List of table fields */
    public $fields = array('pdpt_daerah_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Pendapatan'),
                           'jenis_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'pdpt_daerah_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'pdpt_daerah_target' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Target'),
                           'pdpt_daerah_realisasi' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Realisasi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'pdpt_daerah_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_pdpt_daerah.*,to_char(d_pdpt_daerah.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_pdpt_daerah.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_parameter.param_code, p_parameter.param_name";
    public $fromClause = 'FROM bds_d_pdpt_daerah AS d_pdpt_daerah
							LEFT JOIN bds_p_parameter AS p_parameter ON d_pdpt_daerah.jenis_id = p_parameter.param_id';

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