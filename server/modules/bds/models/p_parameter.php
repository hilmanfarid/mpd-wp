<?php
/**
 * p_parameter
 * class model for table bds_p_parameter 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_parameter extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_parameter';
    /* Alias for table */
    public $alias = 'p_parameter';
    /* List of table fields */
    public $fields = array('param_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Param'),
                           'ptype_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Parameter Type'),
                           'param_code' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Kode Parameter'),
                           'param_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Parameter'),
                           'param_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Listing'),
                           'param_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Description'),
                           'param_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'param_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'param_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'param_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('param_code', 'param_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'param_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_parameter.*, to_char(p_parameter.param_creation_date, 'yyyy-mm-dd') AS param_creation_date, 
                                to_char(p_parameter.param_updated_date, 'yyyy-mm-dd') AS param_updated_date,
									p_parameter_type.ptype_code, p_parameter_type.ptype_listing_no, p_parameter_type.ptype_description";
    public $fromClause = 'FROM bds_p_parameter AS p_parameter
							LEFT JOIN bds_p_parameter_type AS p_parameter_type ON p_parameter.ptype_id = p_parameter_type.ptype_id';

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
            $this->record['param_creation_date'] = date('Y-m-d');
            $this->record['param_creation_by'] = $userInfo['user_name'];
            
            $this->record['param_updated_date'] = date('Y-m-d');
            $this->record['param_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['param_updated_date'] = date('Y-m-d');
            $this->record['param_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
    public function pendapatanDaerah($tahun){
    	$query = "select params.param_name,pendapatan.* from (select param_id,param_name from bds_p_parameter where ptype_id=17) params left join (select * from bds_d_pdpt_daerah where pdpt_daerah_tahun=".$tahun.") pendapatan on params.param_id = pendapatan.jenis_id order by params.param_id ASC"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
    public function pajakDaerah($tahun){
    	$query = "select params.param_name,pajak.* from (select param_id,param_name from bds_p_parameter where ptype_id=18) params left join (select * from bds_d_pajak_daerah where pjk_daerah_tahun=".$tahun.") pajak on params.param_id = pajak.jenis_id order by params.param_id ASC"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
    public function pbb_sppt($tahun){
    	$query = "select kecamatan.*,pbb.* from (select wilayah_id,wilayah_nama from bds_p_wilayah where wilayah_status = 31) kecamatan left join (select * from bds_d_sppt_pbb where sppt_pbb_tahun = ".$tahun.") pbb on pbb.kecamatan_id = kecamatan.wilayah_id"; 
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
    
    public function getIDbyName($param_name) {
        $query = "SELECT param_id FROM bds_p_parameter WHERE param_name = '".$param_name."'";
        $item = $this->dbconn->getItem($query);
        return $item['param_id'];
    }
}
?>