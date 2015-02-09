<?php
/**
 * p_tahun
 * class model for table bds_p_tahun 
 *
 * @since 01-11-2012 10:52:31
 * @author agung.hp
 */
class p_tahun extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_tahun';
    /* Alias for table */
    public $alias = 'p_tahun';
    /* List of table fields */
    public $fields = array('tahun_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Tahun'),
                           'tahun_aktif' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Aktif ?'),
                           'tahun_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'tahun_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'tahun_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'tahun_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('tahun_id');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'tahun_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_tahun.*, to_char(p_tahun.tahun_creation_date, 'yyyy-mm-dd') AS tahun_creation_date, 
                                to_char(p_tahun.tahun_updated_date, 'yyyy-mm-dd') AS tahun_updated_date";
    public $fromClause = 'FROM bds_p_tahun AS p_tahun';

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        $userInfo = wbUser::getSession();
        if( $this->record['tahun_aktif']== 'Y' ){
            $this->updateStatus($this->record[$this->pkey]);
	    }
    
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
            $this->record['tahun_creation_date'] = date('Y-m-d');
            $this->record['tahun_creation_by'] = $userInfo['user_name'];
            
            $this->record['tahun_updated_date'] = date('Y-m-d');
            $this->record['tahun_updated_by'] = $userInfo['user_name'];
           
            if (!$this->isUnique($this->pkey, $this->record[$this->pkey])){
                throw new Exception('Duplicate entry: ID Tahun '.$this->record[$this->pkey].' sudah ada dalam database');
            }
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['tahun_updated_date'] = date('Y-m-d');
            $this->record['tahun_updated_by'] = $userInfo['user_name'];
           
        }
        
        return true;
    }
    
    public function updateStatus($id){
  		$query = "UPDATE bds_p_tahun SET tahun_aktif = 'T' WHERE tahun_id !=".$id." ";
        $countitems = $this->dbconn->Execute($query);
        return;
    }
}
?>