<?php
/**
 * t_modern_mart
 * class model for table bds_t_modern_mart 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class t_modern_mart extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_modern_mart';
    /* Alias for table */
    public $alias = 't_modern_mart';
    /* List of table fields */
    public $fields = array('mmart_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'mmart_id'),
                           'type_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'mmart_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'mmart_tahun'),
                           'mmart_jml_unit' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'mmart_jml_unit'),
                           'mmart_jml_peg_pria' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'mmart_jml_peg_pria'),
                           'mmart_jml_peg_wanita' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'mmart_jml_peg_wanita'),
                           'mmart_luas_lt_2000' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Luas kurang dari 2000'),
                           'mmart_luas_gt_2000' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Luas lebih dari 2000'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'creation_date'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'creation_by'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'updated_by'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'mmart_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_modern_mart.*, to_char(t_modern_mart.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_modern_mart.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_parameter.param_code, p_parameter.param_name";
    public $fromClause = 'FROM bds_t_modern_mart AS t_modern_mart
							LEFT JOIN bds_p_parameter AS p_parameter ON t_modern_mart.type_id = p_parameter.param_id';

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
    
    public function rekapTahun($tahun){
    	$query = "select param.param_name, mmart_jml_unit, mmart_jml_peg_pria, mmart_jml_peg_wanita, mmart_luas_lt_2000, mmart_luas_gt_2000 from (select type_id, mmart_tahun, mmart_jml_unit, mmart_jml_peg_pria, mmart_jml_peg_wanita, mmart_luas_lt_2000, mmart_luas_gt_2000 from bds_t_modern_mart where mmart_tahun = ".$tahun." group by mmart_tahun, type_id, mmart_jml_unit, mmart_jml_peg_pria, mmart_jml_peg_wanita, mmart_luas_lt_2000, mmart_luas_gt_2000) modern right join (select * from bds_p_parameter where ptype_id = 20 ) param on modern.type_id = param.param_id"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
    
    public function isExist($param_id, $mmart_tahun) {
        $query = "SELECT COUNT(1) FROM bds_t_modern_mart WHERE type_id = ? AND mmart_tahun = ?";
        $countitems = $this->dbconn->GetOne($query, array($param_id, $mmart_tahun));
        
        if($countitems > 0) return true;
        return false;
    } 
        
    public function cekValid($param_name, $mmart_tahun) {
        
        $table =& wbModule::getModel('bds', 'p_parameter');
        $param_id = $table->getIDbyName($param_name);
        
        if(empty($param_id)) {
            return '- Kesalahan Penulisan Jenis Pasar : '.$param_name.'<br> ';       
        }
        
        $isExist = $this->isExist($param_id, $mmart_tahun);
        
        if($isExist) {
            return '- Data '.$param_name.' di Tahun '.$mmart_tahun.' sudah ada <br>';    
        }
        return '';
        
    }
    
    
}
?>