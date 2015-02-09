<?php
/**
 * t_industri
 * class model for table bds_t_industri 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class t_industri extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_industri';
    /* Alias for table */
    public $alias = 't_industri';
    /* List of table fields */
    public $fields = array('industri_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'industri_id'),
                           'type_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'industri_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'industri_tahun'),
                           'industri_jml_unit' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'industri_jml_unit'),
                           'industri_jml_naker' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'industri_jml_naker'),
                           'industri_peg_pria' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'industri_peg_pria'),
                           'industri_peg_wanita' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'industri_peg_wanita'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'creation_date'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'created_by'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'updated_date'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'updated_by'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'industri_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_industri.*,to_char(t_industri.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_industri.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_parameter.param_code, p_parameter.param_name";
    public $fromClause = 'FROM bds_t_industri AS t_industri
							LEFT JOIN bds_p_parameter AS p_parameter ON t_industri.type_id = p_parameter.param_id';

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
    public function rekapIndustriTahun($tahun_awal,$tahun_akhir){
    	$query = "SELECT industri_tahun,count(1) as tot_industri,sum(industri_peg_pria+industri_peg_wanita) tot_pekerja FROM bds_t_industri industri where industri_tahun <= ".$tahun_akhir." and industri_tahun >= ".$tahun_awal."  group by industri_tahun"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
    
    public function isExist($param_id, $industri_tahun) {
        $query = "SELECT COUNT(1) FROM bds_t_industri WHERE type_id = ? AND industri_tahun = ?";
        $countitems = $this->dbconn->GetOne($query, array($param_id, $industri_tahun));
        
        if($countitems > 0) return true;
        return false;
    } 
        
    public function cekValid($param_name, $industri_tahun) {
        
        $table =& wbModule::getModel('bds', 'p_parameter');
        $param_id = $table->getIDbyName($param_name);
        
        if(empty($param_id)) {
            return '- Kesalahan Penulisan Jenis Industri : '.$param_name.'<br> ';       
        }
        
        $isExist = $this->isExist($param_id, $industri_tahun);
        
        if($isExist) {
            return '- Data '.$param_name.' di Tahun '.$industri_tahun.' sudah ada <br>';    
        }
        return '';
        
    }
}
?>