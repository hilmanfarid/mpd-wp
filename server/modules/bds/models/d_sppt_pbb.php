<?php
/**
 * d_sppt_pbb
 * class model for table bds_d_sppt_pbb 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class d_sppt_pbb extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_sppt_pbb';
    /* Alias for table */
    public $alias = 'd_sppt_pbb';
    /* List of table fields */
    public $fields = array('sppt_pbb_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID SPPT PBB'),
                           'kecamatan_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'id wilayah'),
                           'sppt_pbb_tahun' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'Tahun'),
                           'sppt_pbb_buah' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Jumlah'),
                           'sppt_pbb_terhutang' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'PBB Terhutang'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'sppt_pbb_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_sppt_pbb.*, to_char(d_sppt_pbb.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_sppt_pbb.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_wilayah.wilayah_kode, p_wilayah.wilayah_nama";
    public $fromClause = 'FROM bds_d_sppt_pbb AS d_sppt_pbb
							LEFT JOIN bds_p_wilayah AS p_wilayah ON d_sppt_pbb.kecamatan_id = p_wilayah.wilayah_id';

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