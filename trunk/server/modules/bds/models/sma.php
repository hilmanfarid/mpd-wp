<?php
/**
 * sma
 * class model for table bds_sma 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class sma extends AbstractTable{
    /* Table name */
    public $table = 'bds_sma';
    /* Alias for table */
    public $alias = 'sma';
    /* List of table fields */
    public $fields = array('sma_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID SMA'),
                           'sma_tahun_ajaran' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tahun Ajaran'),
                           'sma_keterangan' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Keterangan'),
                           'sma_type' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tipe'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'sma_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT sma.*';
    public $fromClause = 'FROM bds_sma AS sma';

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