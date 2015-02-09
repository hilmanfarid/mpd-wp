<?php
/**
 * p_school_type
 * class model for table bds_p_school_type 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_school_type extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_school_type';
    /* Alias for table */
    public $alias = 'p_school_type';
    /* List of table fields */
    public $fields = array('p_school_type_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Type'),
                           'level_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Level Sekolah'),
                           'code' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Kode Jenis'),
                           'listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Listing'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Description'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('p_school_type.code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'p_school_type_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_school_type.*, to_char(p_school_type.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(p_school_type.updated_date, 'yyyy-mm-dd') AS updated_date,
									p_school_level.code level_code, p_school_level.listing_no level_listing_no, p_school_level.description level_description";
    public $fromClause = 'FROM bds_p_school_type AS p_school_type
							LEFT JOIN bds_p_school_level AS p_school_level ON p_school_type.level_id = p_school_level.p_school_level_id';

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
    
    public function getAllByLevelID($level_id, $tahun) {
        $query = "SELECT a.code, NVL(SUM(c.jml_masuk),0) AS jml_masuk, NVL(SUM(c.jml_lulus),0) AS jml_lulus, NVL(SUM(c.jml_aktif),0) AS jml_aktif 
                        FROM bds_p_school_type AS a
                        LEFT JOIN bds_d_sekolah AS b ON a.p_school_type_id = b.type_id 
                        LEFT JOIN bds_t_siswa AS c ON b.d_sekolah_id = c.d_sekolah_id AND c.tahun = ?
                        WHERE a.level_id = ?  
                        GROUP BY a.code, a.listing_no
                        ORDER BY a.listing_no ASC
                        ";
        $items = $this->dbconn->GetAllAssoc($query, array($tahun, $level_id));
        
        return $items;
    }
}
?>