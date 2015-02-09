<?php
/**
 * branch
 * class model for table bds_branch 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class branch extends AbstractTable{
    /* Table name */
    public $table = 'branch';
    /* Alias for table */
    public $alias = 'branch';
    /* List of table fields */
    public $fields = array('branch_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Job Position'),
                           'branch_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode'),
                           'creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'created_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));

                           
    /* Display fields */
    public $displayFields = array('branch_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'branch_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT *, to_char(branch.creation_date, 'yyyy-mm-dd') AS creation_date, 
                                to_char(branch.updated_date, 'yyyy-mm-dd') AS updated_date";

    public $fromClause = "from branch";

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