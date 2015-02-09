<?php
/**
 * smp
 * class model for table bds_smp 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class smp extends AbstractTable{
    /* Table name */
    public $table = 'bds_smp';
    /* Alias for table */
    public $alias = 'smp';
    /* List of table fields */
    public $fields = array('smp_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID SMP'),
                           'smp_tahun_ajaran' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tahun Ajaran'),
                           'smp_keterangan' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Keterangan'),
                           'smp_type' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Tipe'));
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'smp_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = 'SELECT smp.*';
    public $fromClause = 'FROM bds_smp AS smp';

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