<?php
/**
 * p_role_menu
 * class model for table bds_p_role_menu 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class p_role_menu extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_role_menu';
    /* Alias for table */
    public $alias = 'p_role_menu';
    /* List of table fields */
    public $fields = array('rolemenu_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Menu Grup'),
                           'role_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'ID Grup'),
                           'menu_id' => array('type' => 'int', 'nullable' => false, 'unique' => false, 'display' => 'ID Menu'),
                           'rolemenu_status' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Status'),
                           
                           'rolemenu_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'rolemenu_creation_date'),
                           'rolemenu_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'rolemenu_creation_by'),
                           'rolemenu_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'rolemenu_updated_date'),
                           'rolemenu_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'rolemenu_updated_by')
                           
                           );
    /* Display fields */
    public $displayFields = array();
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'rolemenu_id';
    /* References */    
    public $refs = array();
    
    public $role_id = '';
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT  p_role_menu.rolemenu_id, to_char(p_role_menu.rolemenu_creation_date, 'yyyy-mm-dd') AS rolemenu_creation_date, 
                                    to_char(p_role_menu.rolemenu_updated_date, 'yyyy-mm-dd') AS rolemenu_updated_date,
                                    p_role_menu.role_id, menu.menu_id, p_role_menu.rolemenu_status,
									role.role_name, role.role_status,
									menu.menu_code, menu.menu_level, menu.menu_description, menu.menu_is_active, menu.menu_listing_no, menu.menu_path";
    public $fromClause = 'FROM bds_p_app_menu AS menu
                            LEFT JOIN bds_p_role_menu AS p_role_menu 
							    ON p_role_menu.menu_id = menu.menu_id %s
							LEFT JOIN core_role AS role 
							    ON p_role_menu.role_id = role.role_id';

    function __construct($role_id = ''){
        if (!empty($role_id)){
            $this->role_id = (int) $role_id;
            $this->fromClause = sprintf($this->fromClause, 'AND p_role_menu.role_id = '.$this->role_id);
        }else{
            $this->fromClause = sprintf($this->fromClause, '');
        }

        parent::__construct();        
   	}
    
    public function validate(){
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
            $this->record['rolemenu_creation_date'] = date('Y-m-d');
            $this->record['rolemenu_creation_by'] = $userInfo['user_name'];
            
            $this->record['rolemenu_updated_date'] = date('Y-m-d');
            $this->record['rolemenu_updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['rolemenu_updated_date'] = date('Y-m-d');
            $this->record['rolemenu_updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
    
    public function countAll(){
        $whereClause = $this->getCriteriaSQL();

        $query = "SELECT COUNT(1) ". $this->fromClause ." ".$whereClause;
        $countitems = $this->dbconn->GetOne($query);

        if ($countitems === false){
            throw new Exception($this->dbconn->ErrorMsg());
        }
        
        return $countitems;
    }
    
    /* Set record */
    public function setRecord($record){
        
        $this->item = $record;
        $this->record = array();
        foreach ($this->fields as $key => $attrib){
            $value = '';
            if ($attrib['nullable']){
                if (isset($record[$key])){
                    if ($record[$key] == '')
                        $value = null;
                    else
                        $value = $record[$key];
                }else{
                    continue;
                }
            }            
            
            if ($this->actionType == 'CREATE'){
                if (!$attrib['nullable']){
                    if (!isset($record[$key]) || $record[$key] == ''){
                        
                        throw new Exception("Nilai ".$attrib['display']." tidak boleh kosong");
                        
                    }else{
                        $value = $record[$key];
                    }
                }
            }else if ($this->actionType == 'UPDATE'){
                if (!$attrib['nullable']){
                    if (!isset($record[$key])) continue;
                    
                    if ($record[$key] == ''){
                        throw new Exception("Nilai ".$attrib['display']." tidak boleh kosong");
                    }else{
                        $value = $record[$key];
                    }
                }
            }

            if (!empty($value)){
                if ($attrib['type'] == 'date'){
        			if (strlen($value) > 10) $value = substr($value, 0, 10);
        			
        			$pieces = explode('-', $value);
        			
        			if (count($pieces) != 3) throw new Exception("Format tanggal harus dd-mm-yyyy");
        			
        			if (!checkdate($pieces[1], $pieces[2],$pieces[0])) throw new Exception("Nilai tanggal '".$value."' tidak benar");        			
                }else if ($attrib['type'] == 'int' || $attrib['type'] == 'float'){
                    if (!is_numeric($value)) throw new Exception("Nilai ".$attrib['display']." harus berupa bilangan");
                }                
            }
            $this->record[$key] = $value;
        }

        return $this->record;
    }    
    

    
}
?>