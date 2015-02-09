<?php
/**
 * d_trayek
 * class model for table bds_d_trayek 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class d_trayek extends AbstractTable{
    /* Table name */
    public $table = 'bds_d_trayek';
    /* Alias for table */
    public $alias = 'd_trayek';
    /* List of table fields */
    public $fields = array('trayek_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Trayek'),
                           'trayek_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'trayek_name' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Trayek'),
                           'trayek_panjang' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'Panjang (Km)'),
                           'trayek_listing_no' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'No Urut'),
                           'trayek_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('trayek_code', 'trayek_name');
    /* Details table */
    public $details = array('bds_t_armada' => 't_armada');
    /* Primary key */
    public $pkey = 'trayek_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT d_trayek.*, to_char(d_trayek.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(d_trayek.updated_date, 'yyyy-mm-dd') AS updated_date";
    public $fromClause = 'FROM bds_d_trayek AS d_trayek';

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