<?php
/**
 * d_skpd
 * class model for table bds_d_skpd 
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
class d_skpd extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_skpd';
    /* Alias for table */
    public $alias = 'd_skpd';
    /* List of table fields */
    public $fields = array('d_skpd_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID SKPD'),
                           'code' => array('type' => 'str', 'nullable' => true, 'unique' => true, 'display' => 'Kode'),
                           'skpd_name' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Nama SKPD'),
                           'address_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 1'),
                           'address_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat 2'),
                           'kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'No. Telepon'),
                           'website' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Website'),
                           'listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'),
                           'latitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Latitude'),
                           'longitude' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Longitude')
                           );
    /* Display fields */
    public $displayFields = array('code', 'skpd_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'd_skpd_id';
    /* References */    
    public $refs = array('bds_t_skpd_employee' => 'd_skpd_id');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_skpd.*, to_char(d_skpd.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_skpd.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_d_skpd AS d_skpd';
    
    
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