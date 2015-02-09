<?php
/**
 * sd
 * class model for table bds_sd 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class sd extends AbstractTable{
    /* Table name */
    public $table = 'bds_sd';
    /* Alias for table */
    public $alias = 'sd';
    /* List of table fields */
    public $fields = array('sd_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID SD'),
                           'sd_tahun_ajaran' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tahun Ajaran'),
                           'sd_keterangan' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Keterangan'),
                           'sd_type' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tipe'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'sd_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT sd.*';
    public $fromClause = 'FROM bds_sd AS sd';

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
        }
        
        return true;
    }
}
?>