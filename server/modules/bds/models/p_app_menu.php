<?php
/**
 * p_app_menu
 * class model for table bds_p_app_menu 
 *
 * @since 23-10-2012 12:07:19
 * @author wiliamdecosta@gmail.com
 */
class p_app_menu extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_app_menu';
    /* Alias for table */
    public $alias = 'p_app_menu';
    /* List of table fields */
    public $fields = array('menu_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Menu'),
                           'menu_pid' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'ID Menu'),
                           'menu_code' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Menu'),
                           'menu_file_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Nama Module'),
                           'menu_listing_no' => array('type' => 'float', 'nullable' => true, 'unique' => false, 'display' => 'No List'),
                           'menu_is_active' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Is Active'),
                           'menu_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Description'),
                           'menu_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'menu_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'menu_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'menu_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'),
                           'menu_level' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'Menu Level'),
                           'menu_path' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Path Menu')                           
                           );
    /* Display fields */
    public $displayFields = array('menu_code');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'menu_id';
    /* References */    
    public $refs = array('bds_p_app_menu' =>'menu_pid');
    
    public $selectClauseGet = "SELECT p_app_menu.*";
    public $fromClauseGet = "FROM bds_p_app_menu AS p_app_menu";
    
    
    public $selectClause = "SELECT menu_id, NVL (menu_pid, 0) menu_pid, menu_code, menu_file_name, menu_listing_no, menu_is_active,  menu_description, menu_creation_date,
                                    menu_creation_by, menu_updated_date, menu_updated_by, menu_level, menu_path";
    
    public $fromClause = "FROM (SELECT b.menu_id, b.menu_pid, b.menu_code, NVL (b.menu_file_name, '-') as menu_file_name, b.menu_listing_no, b.menu_is_active, b.menu_description, b.menu_creation_date,
                                b.menu_creation_by, b.menu_updated_date, b.menu_updated_by, b.menu_level, b.menu_path
                                FROM bds_p_app_menu AS b
                                START WITH menu_pid IS NULL CONNECT BY PRIOR menu_id = menu_pid ORDER SIBLINGS BY NVL(menu_listing_no, 9999))";
    
    function __construct(){
        parent::__construct();
   	}
   	
   	
    
    public function &get($id, $raiseExceptionOnEmpty = false){
        $whereClause = "WHERE ".$this->getAlias().$this->pkey." = ?";

        $query = $this->selectClauseGet." ".$this->fromClauseGet." ".$whereClause;
        $item =& $this->dbconn->GetItem($query, array($id));
        
        if (!is_array($item)){
            throw new Exception($this->dbconn->ErrorMsg());
        }

        if ($raiseExceptionOnEmpty === true){
            if (empty($item[$this->pkey])){
                throw new Exception("ID (".$this->pkey.") ".$id." tidak ada dalam database. Anda atau user lain mungkin sudah menghapus data tersebut");
            }
        }
        
        return $item;
    }


    /**
     * validate
     * input record validator
     */
    public function validate(){
        $userInfo = wbUser::getSession();
        
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
            $this->record['menu_creation_date'] = date('Y-m-d');
            $this->record['menu_creation_by'] = $userInfo['user_name'];
            
            $this->record['menu_updated_date'] = date('Y-m-d');
            $this->record['menu_updated_by'] = $userInfo['user_name'];
            
            /*Menentukan Level Menu*/
            if(!isset($this->record['menu_pid'])) { //pid kosong
                $this->record['menu_level'] = 1;    
            }else {
                $itemParent = $this->get($this->record['menu_pid'],true);
                $this->record['menu_level'] = $itemParent['menu_level'] + 1;
            }
            
            /*Menentukan Path Menu*/
            if(!isset($this->record['menu_pid'])) { //pid kosong
                $this->record['menu_path'] = $this->record['menu_id'];
            }else {
                $query = "SELECT COUNT(1) FROM bds_p_app_menu WHERE menu_pid = ?";
                $count_child = $this->dbconn->GetOne($query, array($this->record['menu_pid']));
                
                if(empty($count_child)) {
                    $count_child = 0;    
                }
                
                $itemParent = $this->get($this->record['menu_pid'],true);
                $thepath = $itemParent['menu_path'].".".($count_child+1);
                
                $this->record['menu_path'] = $thepath;
            }
                        
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['menu_updated_date'] = date('Y-m-d');
            $this->record['menu_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
    
    public function &getAll($start = 0, $limit = 30){
        $whereClause = $this->getCriteriaSQL();
        
        $query = $this->selectClause." ".$this->fromClause." ".$whereClause;

        $items =& $this->dbconn->GetAllAssocLimit($query,$limit,$start);


        if (!is_array($items)){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        return $items;
    }
}
?>