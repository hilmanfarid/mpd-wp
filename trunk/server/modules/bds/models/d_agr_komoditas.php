<?php
/**
 * d_agr_komoditas
 * class model for table bds_d_agr_komoditas 
 *
 * @since 13-12-2012 16:29:26
 * @author agung.hp
 */
class d_agr_komoditas extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_agr_komoditas';
    /* Alias for table */
    public $alias = 'd_agr_komoditas';
    /* List of table fields */
    public $fields = array('d_agr_komiditas_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Komoditas'),
                           'type_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'komoditas_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Komoditas'),
                           'phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No Telepon'),
                           'website' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Website'),
                           'listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('code', 'komoditas_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'd_agr_komiditas_id';
    /* References */    
    public $refs = array('bds_t_agr_komod_prod' => 'd_agr_komiditas_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_agr_komoditas.*, to_char(d_agr_komoditas.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_agr_komoditas.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_parameter.param_code, p_parameter.param_name";
    public $fromClause = 'FROM bds_d_agr_komoditas AS d_agr_komoditas
							LEFT JOIN bds_p_parameter AS p_parameter ON d_agr_komoditas.type_id = p_parameter.param_id';

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