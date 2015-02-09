<?php
/**
 * t_modern_mart
 * class controller for table bds_t_modern_mart 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class t_modern_mart_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('TModernMart')) return;
        
        // Get arguments from argument array
        //extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 't_modern_mart', 'method' => 'read', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
            
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;    
    }

    /**
     * create
     * controler for create new item
     */    
    public static function create($args = array()){
        // Security check
        //if (!wbSecurity::check('TModernMart')) return;

        // Get arguments from argument array
        //extract($args);
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_modern_mart', 'method' => 'create', 'type' => 'json' )),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
            $ws_data = self::getResultData($ws_client, $params);
        
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }

        return $data;    
    }

    /**
     * update
     * controler for update item
     */        
    public static function update($args = array()){
        // Security check
        //if (!wbSecurity::check('TModernMart')) return;
        
        // Get arguments from argument array
        //extract($args);
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_modern_mart', 'method' => 'update', 'type' => 'json' )),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
            $ws_data = self::getResultData($ws_client, $params);
                    
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }

        return $data;    
    }

    /**
     * update
     * controler for remove item
     */            
    public static function destroy($args = array()){
        // Security check
        //if (!wbSecurity::check('TModernMart')) return;
        
        // Get arguments from argument array
        //extract($args);
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_modern_mart', 'method' => 'destroy', 'type' => 'json')),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
            $ws_data = self::getResultData($ws_client, $params);
        
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;    
    }
    
    /*
    * Import Excel
    */
    public static function upload_excel($args = array()){
        
        include('lib/excel/reader.php');
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        global $_FILES;
        try {
            if(empty($_FILES['excel_file']['name'])){
                throw new Exception('File tidak boleh kosong');        
            }
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
            echo json_encode($data);
            session_write_close();
            exit;
        }
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $mmart_tahun = wbRequest::getVarClean('mmart_tahun', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        
        
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $file_name = $_FILES['excel_file']['name'];
        $file_location = 'var/uploadexcel/'.$file_name;
       
        if (!move_uploaded_file($_FILES['excel_file']['tmp_name'], $file_location)){
            throw new Exception("Upload file gagal");
        }
        
        $xl_reader =& new Spreadsheet_Excel_Reader();
		$res = $xl_reader->_ole->read($file_location);
        
        if($res === false) {
        	if($xl_reader->_ole->error == 1) {
        		$data['message'] = 'Harus File Excel';
                echo json_encode($data);
                session_write_close();
                exit;
        	}
        }
        
        try{
	         $xl_reader->read($file_location);
             $firstColumn = $xl_reader->sheets[0]['cells'][1][1];
             
             if($firstColumn != 'DISKOP UKM INDAG') {
                 throw new Exception('Format Table Salah');
             }
                          
             /* pengecekkan semua data */
             for($i = 7; $i <= $xl_reader->sheets[0]['numRows']; $i++) {
                   
                   $no = $xl_reader->sheets[0]['cells'][$i][1];
                   $param_name = $xl_reader->sheets[0]['cells'][$i][2];
                   $mmart_luas_gt_2000 = $xl_reader->sheets[0]['cells'][$i][3];
                   $mmart_luas_lt_2000 = $xl_reader->sheets[0]['cells'][$i][4];
                   $mmart_jml_peg_pria = $xl_reader->sheets[0]['cells'][$i][5];
                   $mmart_jml_peg_wanita = $xl_reader->sheets[0]['cells'][$i][6];
                   
                   if(empty($no)) break;  
                   
                   if(empty($param_name)) {
                        throw new Exception('Jenis Pasar (Kolom 2) pada baris '.($i-1).' Tidak boleh kosong'); 
                   }
             }
                
        } catch(Exception $e) {
                $data['message'] = $e->getMessage();
                echo json_encode($data);
                session_write_close();
                exit;
        }     
             
             /* insert data */
        $recInsert = array();
        
        $items = array();
        try {
           
           for($i = 7; $i <= $xl_reader->sheets[0]['numRows']; $i++) {
              
              $no = $xl_reader->sheets[0]['cells'][$i][1];
              $param_name = $xl_reader->sheets[0]['cells'][$i][2];
              $mmart_luas_gt_2000 = $xl_reader->sheets[0]['cells'][$i][3];
              $mmart_luas_lt_2000 = $xl_reader->sheets[0]['cells'][$i][4];
              $mmart_jml_peg_pria = $xl_reader->sheets[0]['cells'][$i][5];
              $mmart_jml_peg_wanita = $xl_reader->sheets[0]['cells'][$i][6];
              
              if(empty($no)) break;  
              
              $recInsert['mmart_tahun'] = $mmart_tahun;
              $recInsert['param_name'] = $param_name;
              $recInsert['mmart_luas_gt_2000'] = $mmart_luas_gt_2000;
              $recInsert['mmart_luas_lt_2000'] = $mmart_luas_lt_2000;
              $recInsert['mmart_jml_peg_pria'] = $mmart_jml_peg_pria;
              $recInsert['mmart_jml_peg_wanita'] = $mmart_jml_peg_wanita;
              
              $items[] = $recInsert;
           }
           
                           
           $ws_client = self::getNusoap();
		   $params = array('search' => '',
					'controller' => json_encode(array('module' => 'bds','class' => 't_modern_mart', 'method' => 'upload_excel', 'type' => 'json' )),
					'jsonItems' => json_encode(array('items' => $items))
					);
								
           $ws_data = self::getResultData($ws_client, $params);
           
           if(!empty($ws_data['message'])) {
              throw new Exception($ws_data['message']);
           }
           
                                 
           $data['success'] = true;
    	   $data['message'] = 'Data berhasil disimpan';
           $data['items'] = $items;
           
        }catch(Exception $e) {
           $data['message'] = $e->getMessage();
           echo json_encode($data);
           session_write_close();
           exit;
        }
	   
	   echo json_encode($data);
       session_write_close();
       exit;
        
    } 
}
?>