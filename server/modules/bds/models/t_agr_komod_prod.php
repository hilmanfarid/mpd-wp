<?php
/**
 * t_agr_komod_prod
 * class model for table bds_t_agr_komod_prod 
 *
 * @since 13-12-2012 16:29:27
 * @author agung.hp
 */
class t_agr_komod_prod extends AbstractTable{
    /* Table name */
    public $table = 'bds_t_agr_komod_prod';
    /* Alias for table */
    public $alias = 't_agr_komod_prod';
    /* List of table fields */
    public $fields = array('t_agr_komod_prod_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Prod Komoditas'),
                           'd_agr_komiditas_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Komoditas'),
                           'tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'luas_tanam' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Luas Tanam'),
                           'luas_panen' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Luas Panen'),
                           'productivity' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Produktivitas'),
                           'produksi' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Produksi'),
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
    public $pkey = 't_agr_komod_prod_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT t_agr_komod_prod.*,to_char(t_agr_komod_prod.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(t_agr_komod_prod.updated_date, 'yyyy-mm-dd') AS updated_date,
									d_agr_komoditas.code, d_agr_komoditas.komoditas_name";
    public $fromClause = 'FROM bds_t_agr_komod_prod AS t_agr_komod_prod
							LEFT JOIN bds_d_agr_komoditas AS d_agr_komoditas ON t_agr_komod_prod.d_agr_komiditas_id = d_agr_komoditas.d_agr_komiditas_id';

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
    
    public function getProduksiKomoditas($tahun, $d_agr_komiditas_id) {
        $query = "SELECT * FROM ".$this->table." WHERE tahun = ? AND d_agr_komiditas_id = ?";
        return $this->dbconn->GetItem($query, array($tahun, $d_agr_komiditas_id));  
    }
}
?>