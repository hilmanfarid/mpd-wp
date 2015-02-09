<?php
/**
 * d_hotel
 * class model for table bds_d_hotel 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class d_hotel extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_hotel';
    /* Alias for table */
    public $alias = 'd_hotel';
    /* List of table fields */
    public $fields = array('d_hotel_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Job Position'),
                           'code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'hotel_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Nama'),
                           'alias_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alias'),
                           'kelas_id' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Kelas'),
                           'jml_kamar' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Jml Kamar'),
                           'address_1' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Alamat-1'),
                           'address_2' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'alamat-2'),
                           'kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'phone_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Telepon'),
                           'website' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'URL'),
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
    public $displayFields = array('d_hotel.code','d_hotel.hotel_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'd_hotel_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_hotel.*, to_char(d_hotel.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_hotel.updated_date, 'yyyy-mm-dd') AS updated_date,
                                hotel_kelas.param_name kelas_code";

    public $fromClause = "FROM bds_d_hotel AS d_hotel
                            LEFT JOIN bds_p_parameter AS hotel_kelas ON d_hotel.kelas_id = hotel_kelas.param_id";

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