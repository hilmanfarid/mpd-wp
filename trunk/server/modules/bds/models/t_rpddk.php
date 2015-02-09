<?php
/**
 * d_wisata
 * class model for table bds_d_wisata 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class t_rpddk extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_rpddk';
    /* Alias for table */
    public $alias = 't_rpddk';
    /* List of table fields */
    public $fields = array('t_rpddk_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID rpddk'),
                           'jenisdata' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jenis Data'),
                           'kelompok_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Id kelompok'),
                           'tahun' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Tahun'),
                           'laki' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Laki-Laki'),
                           'perempuan' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Perempuan'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('t_rpddk_id', 'kelompok_id');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_rpddk_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_rpddk.*,to_char(t_rpddk.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_rpddk.updated_date, 'yyyy-mm-dd') AS updated_date,param.param_name as kelompok";
    public $fromClause = 'FROM bds_t_rpddk AS t_rpddk left join bds_p_parameter param on param.param_id = t_rpddk.kelompok_id';

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