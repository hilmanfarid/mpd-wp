<?php
/**
 * t_armada
 * class model for table bds_t_armada 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class t_armada extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_armada';
    /* Alias for table */
    public $alias = 't_armada';
    /* List of table fields */
    public $fields = array('armada_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'armada_id'),
                           'trayek_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Trayek'),
                           'armada_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'armada_tahun'),
                           'armada_jml' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'armada_jml_angkot'),
                           'armada_jml_angkot' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'armada_jml_angkot'),
                           'armada_jml_biskota' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'armada_jml_biskota'),
                           'armada_jml_lain' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'armada_jml_lain'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'creation_date'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'created_by'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'updated_by'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'armada_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_armada.*, to_char(t_armada.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_armada.updated_date, 'yyyy-mm-dd') AS updated_date,
									d_trayek.trayek_code, d_trayek.trayek_name";
    public $fromClause = 'FROM bds_t_armada AS t_armada
							LEFT JOIN bds_d_trayek AS d_trayek ON t_armada.trayek_id = d_trayek.trayek_id';

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
    
    public function getItem($tahun, $trayek_id) {
        
        $query = "SELECT * FROM ".$this->table." WHERE armada_tahun = ? AND trayek_id = ?";
        $item = $this->dbconn->GetItem($query, array($tahun, $trayek_id));
        
        return $item;
    }
}
?>