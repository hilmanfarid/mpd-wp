<?php
/**
 * p_wilayah
 * class model for table bds_p_wilayah 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_wilayah extends AbstractTable{
    /* Table name */
    public $table = 'bds_p_wilayah';
    /* Alias for table */
    public $alias = 'p_wilayah';
    /* List of table fields */
    public $fields = array('wilayah_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Wilayah'),
                           'wilayah_pid' => array('type' => 'int', 'nullable' => true, 'unique' => false, 'display' => 'PID Wilayah'),
                           'wilayah_kode' => array('type' => 'str', 'nullable' => false, 'unique' => true, 'display' => 'Kode Wilayah'),
                           'wilayah_nama' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Nama Wilayah'),
                           'wilayah_description' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Deskripsi Wilayah'),
                           'wilayah_kota' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kota'),
                           'wilayah_kode_pos' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Kode Pos'),
                           'wilayah_telepon' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Telepon'),                          
                           'wilayah_status' => array('type' => 'str', 'nullable' => false, 'unique' => false, 'display' => 'Status Wilayah'),
                           'wilayah_creation_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Pembuatan'),
                           'wilayah_creation_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Dibuat Oleh'),
                           'wilayah_updated_date' => array('type' => 'date', 'nullable' => true, 'unique' => false, 'display' => 'Tgl Update'),
                           'wilayah_updated_by' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'Diupdate Oleh'));
    /* Display fields */
    public $displayFields = array('p_wilayah.wilayah_kode', 'p_wilayah.wilayah_nama');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 'wilayah_id';
    /* References */    
    public $refs = array('bds_p_wilayah' => 'wilayah_pid');
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT p_wilayah.*, parent_wilayah.wilayah_status AS status_parent, to_char(p_wilayah.wilayah_creation_date, 'yyyy-mm-dd') AS wilayah_creation_date, 
                                    to_char(p_wilayah.wilayah_updated_date, 'yyyy-mm-dd') AS wilayah_updated_date";
    public $fromClause = 'FROM bds_p_wilayah AS p_wilayah
                            LEFT JOIN bds_p_wilayah AS parent_wilayah ON p_wilayah.wilayah_pid = parent_wilayah.wilayah_id';

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
            $this->record['wilayah_creation_date'] = date('Y-m-d');
            $this->record['wilayah_creation_by'] = $userInfo['user_name'];
            
            $this->record['wilayah_updated_date'] = date('Y-m-d');
            $this->record['wilayah_updated_by'] = $userInfo['user_name'];
            
            if(!isset($this->record['wilayah_pid'])) {
                //do nothing    
            }else {
                $itemParent = $this->get( $this->record['wilayah_pid'] );
                if( strlen($this->record['wilayah_kode']) <= strlen($itemParent['wilayah_kode']) ) {
                    throw new Exception("Jumlah Karakter Kode Wilayah(".$this->record['wilayah_kode'].") Harus Melebihi Jumlah Karakter Kode Parent(".$itemParent['wilayah_kode'].") ");    
                }

                if( substr($this->record['wilayah_kode'], 0, strlen($itemParent['wilayah_kode'])) !==  $itemParent['wilayah_kode'] ) {
                    throw new Exception("Prefix Kode Wilayah Harus Sama Dengan Kode Parent '".$itemParent['wilayah_kode']."'");
                }
            }
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['wilayah_updated_date'] = date('Y-m-d');
            $this->record['wilayah_updated_by'] = $userInfo['user_name'];
            
            if(!isset($this->record['wilayah_kode'])) {
                //do nothing
            }else{
                $item = $this->get( $this->record['wilayah_id'] );
                $itemParent = $this->get( $item['wilayah_pid'] );
                
                if( strlen($this->record['wilayah_kode']) <= strlen($itemParent['wilayah_kode']) ) {
                    throw new Exception("Jumlah Karakter Kode Wilayah(".$this->record['wilayah_kode'].") Harus Melebihi Jumlah Karakter Kode Parent(".$itemParent['wilayah_kode'].") ");    
                }
                
                if( substr($this->record['wilayah_kode'], 0, strlen($itemParent['wilayah_kode'])) !==  $itemParent['wilayah_kode'] ) {
                    throw new Exception("Prefix Kode Wilayah Harus Sama Dengan Kode Parent '".$itemParent['wilayah_kode']."'");
                }
                                                                                 
            }
        }
        
        return true;
    }
    public function total_rt_rw(){
    	$query="select kec.wilayah_nama as kecamatan,kel.wilayah_nama as kelurahan,total_rw.*,total_rt.* from(
					select rw.wilayah_pid as id_kel,count(*) as jum_rt from bds_p_wilayah rt left join bds_p_wilayah rw on rw.wilayah_id = rt.wilayah_pid where rt.wilayah_status= 61 group by rw.wilayah_pid
				) total_rt left join (
					select wilayah_pid as id_kel,count(1) as jum_rw from bds_p_wilayah where wilayah_status = 51 group by wilayah_pid
				) total_rw on total_rt.id_kel = total_rw.id_kel left join bds_p_wilayah kel on total_rt.id_kel = kel.wilayah_id
				left join bds_p_wilayah kec on kec.wilayah_id = kel.wilayah_pid order by kec.wilayah_kode,kel.wilayah_kode ASC
				";	
    	$items = $this->dbconn->getAll($query);
    	return $items;
    }
    public function uniqueAll($table,$items){
		if(!is_array($items)){
			return false;
		}
		$query = "select count(1) from ".$table;
		$firsttime=true;
		foreach($items as $item){
			if($firsttime==true){
				$whereClause="where ".$item['field']."=".$item['value'];
			}else{
				$whereClause.=" and ".$item['field']."=".$item['value'];
			}
			$firsttime=false;
		}
		
		$items = $this->dbconn->getOne($query." ".$whereClause);
    	return $items;
	}
}
?>