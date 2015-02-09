<?php
/**
 * d_tmpt_ibadah
 * class model for table bds_d_tmpt_ibadah 
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
class d_tmpt_ibadah extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_tmpt_ibadah';
    /* Alias for table */
    public $alias = 'd_tmpt_ibadah';
    /* List of table fields */
    public $fields = array('tibdh_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Tempat Ibadah'),
                           'agama_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Param'),
                           'kecamatan_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kecamatan'),
                           'tibdh_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'tibdh_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama'),
                           'tibdh_alamat' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat'),
                           'tibdh_kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'tibdh_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'tibdh_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'),
                           'latitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Latitude'),
                           'longitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Longitude')
                           );
    /* Display fields */
    public $displayFields = array('tibdh_code', 'tibdh_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'tibdh_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_tmpt_ibadah.*,to_char(d_tmpt_ibadah.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_tmpt_ibadah.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_parameter.param_code, p_parameter.param_name,
									p_wilayah.wilayah_kode, p_wilayah.wilayah_nama";
    public $fromClause = 'FROM bds_d_tmpt_ibadah AS d_tmpt_ibadah
							LEFT JOIN bds_p_parameter AS p_parameter ON d_tmpt_ibadah.agama_id = p_parameter.param_id
							LEFT JOIN bds_p_wilayah AS p_wilayah ON d_tmpt_ibadah.kecamatan_id = p_wilayah.wilayah_id';

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