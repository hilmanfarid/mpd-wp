<?php
/**
 * t_ternak
 * class model for table bds_t_ternak 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class t_ternak extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_ternak';
    /* Alias for table */
    public $alias = 't_ternak';
    /* List of table fields */
    public $fields = array('ternak_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Ternak'),
                           'type_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'ternak_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'ternak_populasi' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Populasi'),
                           'ternak_jml_potong' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah Potong'),
                           'ternak_produksi_daging' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Produksi Daging'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'ternak_id';
    /* References */    
    public $refs = array('bds_t_ternak' => array('col' => 'type_id', 'class' => 't_ternak'));
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_ternak.*,to_char(t_ternak.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_ternak.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_parameter.param_code, p_parameter.param_name";
    public $fromClause = 'FROM bds_t_ternak AS t_ternak
							LEFT JOIN bds_p_parameter AS p_parameter ON t_ternak.type_id = p_parameter.param_id';

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
    
    public function getItem($tahun, $type_id) {
        $query = "SELECT * FROM ".$this->table." WHERE ternak_tahun = ? AND type_id = ?";
        $item = $this->dbconn->GetItem($query, array($tahun, $type_id));
        return $item;
    }
}
?>