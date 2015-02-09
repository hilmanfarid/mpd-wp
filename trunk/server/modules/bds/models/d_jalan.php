<?php
/**
 * d_jalan
 * class model for table bds_d_jalan 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class d_jalan extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_jalan';
    /* Alias for table */
    public $alias = 'd_jalan';
    /* List of table fields */
    public $fields = array('d_jalan_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Job Position'),
                           'code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'jalan_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Nama'),
                           'klas_admin_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kelas (Admin)'),
                           'klas_fungsi_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kelas (Fungsi)'),
                           'klas_muat_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kelas (Muatan)'),
                           'panjang' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kamar'),
                           'listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));

                           
    /* Display fields */
    public $displayFields = array('d_jalan.code','d_jalan.jalan_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'd_jalan_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_jalan.*, to_char(d_jalan.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_jalan.updated_date, 'yyyy-mm-dd') AS updated_date,
                                jalan_klas_admin.param_name klas_admin_code,
                                jalan_klas_fungsi.param_name klas_fungsi_code,
                                jalan_klas_muat.param_name klas_muat_code";

    public $fromClause = "FROM bds_d_jalan AS d_jalan
                            LEFT JOIN bds_p_parameter AS jalan_klas_admin ON d_jalan.klas_admin_id = jalan_klas_admin.param_id
                            LEFT JOIN bds_p_parameter AS jalan_klas_fungsi ON d_jalan.klas_fungsi_id = jalan_klas_fungsi.param_id
                            LEFT JOIN bds_p_parameter AS jalan_klas_muat ON d_jalan.klas_muat_id = jalan_klas_muat.param_id";

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
    
    public function getAllByJenisJalan($jenis_jalan) {
        
        $the_id = '';
        if($jenis_jalan == 8) $the_id = 'c.klas_admin_id';
        if($jenis_jalan == 9) $the_id = 'c.klas_fungsi_id';
        if($jenis_jalan == 10) $the_id = 'c.klas_muat_id';
        
        $query = "SELECT a.param_code, a.param_name, NVL(SUM(c.panjang),0) AS panjang
                        FROM bds_p_parameter AS a
                        LEFT JOIN bds_d_jalan AS c ON a.param_id = ".$the_id."
                        LEFT JOIN bds_p_parameter_type AS b ON b.ptype_id = a.ptype_id 
                        WHERE b.ptype_id = ?
                        GROUP BY a.param_code, a.param_name, a.param_listing_no
                        ORDER BY a.param_listing_no ASC";
        
        $items = $this->dbconn->GetAllAssoc($query, array($jenis_jalan));
        
        return $items;
    }
}
?>