<?php
/**
 * sd
 * class controller for table bds_sd 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class sd_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('Sd')) return;
        
        // Get arguments from argument array
        //extract($args);
    
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'sd', 'method' => 'read', 'type' => 'json' )),
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
        //if (!wbSecurity::check('Sd')) return;

        // Get arguments from argument array
        //extract($args);
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 'sd', 'method' => 'create', 'type' => 'json' )),
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
        //if (!wbSecurity::check('Sd')) return;
        
        // Get arguments from argument array
        //extract($args);
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 'sd', 'method' => 'update', 'type' => 'json' )),
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
        //if (!wbSecurity::check('Sd')) return;
        
        // Get arguments from argument array
        //extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 'sd', 'method' => 'destroy', 'type' => 'json')),
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
        $sd_tahun_ajaran = wbRequest::getVarClean('sd_tahun_ajaran', 'str', '');
        
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
             
             if(strtoupper($firstColumn) != 'DATA SEKOLAH DASAR') {
                 throw new Exception('Format Table Salah');
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
           
           //-----------------------
           // SD
           //-----------------------
           $items[0]['sd_id'] = 1;
           $items[0]['sd_det_thn_ajaran'] = $sd_tahun_ajaran;
           $items[0]['sd_det_jmlsekolah'] = $xl_reader->sheets[0]['cells'][6][3];
           $items[0]['sd_det_siswabaru_6_7_thn'] = $xl_reader->sheets[0]['cells'][8][3];
           $items[0]['sd_det_siswabaru_usialain'] = $xl_reader->sheets[0]['cells'][9][3];
           $items[0]['sd_det_siswabaru_asal_tk'] = $xl_reader->sheets[0]['cells'][11][3];
           $items[0]['sd_det_siswabaru_asal_rt'] = $xl_reader->sheets[0]['cells'][12][3];
           $items[0]['sd_det_siswa_lt_7_thn'] = $xl_reader->sheets[0]['cells'][14][3];
           $items[0]['sd_det_siswa_7_12_thn'] = $xl_reader->sheets[0]['cells'][15][3];
           $items[0]['sd_det_siswa_gt_12_thn'] = $xl_reader->sheets[0]['cells'][16][3];
           $items[0]['sd_det_siswa_laki'] = $xl_reader->sheets[0]['cells'][18][3];
           $items[0]['sd_det_siswa_perempuan'] = $xl_reader->sheets[0]['cells'][22][3];
           $items[0]['sd_det_jml_siswa_negeri'] = $xl_reader->sheets[0]['cells'][27][3];
           $items[0]['sd_det_jml_siswa_swasta'] = $xl_reader->sheets[0]['cells'][28][3];
           
           $items[0]['sd_det_jml_kelas1'] = $xl_reader->sheets[0]['cells'][30][3];
           $items[0]['sd_det_jml_kelas2'] = $xl_reader->sheets[0]['cells'][31][3];
           $items[0]['sd_det_jml_kelas3'] = $xl_reader->sheets[0]['cells'][32][3];
           $items[0]['sd_det_jml_kelas4'] = $xl_reader->sheets[0]['cells'][33][3];
           $items[0]['sd_det_jml_kelas5'] = $xl_reader->sheets[0]['cells'][34][3];
           $items[0]['sd_det_jml_kelas6'] = $xl_reader->sheets[0]['cells'][35][3];
           
           $items[0]['sd_det_ulang_kelas1'] = $xl_reader->sheets[0]['cells'][44][3];
           $items[0]['sd_det_ulang_kelas2'] = $xl_reader->sheets[0]['cells'][45][3];
           $items[0]['sd_det_ulang_kelas3'] = $xl_reader->sheets[0]['cells'][46][3];
           $items[0]['sd_det_ulang_kelas4'] = $xl_reader->sheets[0]['cells'][47][3];
           $items[0]['sd_det_ulang_kelas5'] = $xl_reader->sheets[0]['cells'][48][3];
           $items[0]['sd_det_ulang_kelas6'] = $xl_reader->sheets[0]['cells'][49][3];
           
           $items[0]['sd_det_putus_kelas1'] = $xl_reader->sheets[0]['cells'][51][3];
           $items[0]['sd_det_putus_kelas2'] = $xl_reader->sheets[0]['cells'][52][3];
           $items[0]['sd_det_putus_kelas3'] = $xl_reader->sheets[0]['cells'][53][3];
           $items[0]['sd_det_putus_kelas4'] = $xl_reader->sheets[0]['cells'][54][3];
           $items[0]['sd_det_putus_kelas5'] = $xl_reader->sheets[0]['cells'][55][3];
           $items[0]['sd_det_putus_kelas6'] = $xl_reader->sheets[0]['cells'][56][3];
           
           //------------------------
           // MI
           //------------------------
           $items[1]['sd_id'] = 2;
           $items[1]['sd_det_thn_ajaran'] = $sd_tahun_ajaran;
           $items[1]['sd_det_jmlsekolah'] = $xl_reader->sheets[0]['cells'][6][4];
           $items[1]['sd_det_siswabaru_6_7_thn'] = $xl_reader->sheets[0]['cells'][8][4];
           $items[1]['sd_det_siswabaru_usialain'] = $xl_reader->sheets[0]['cells'][9][4];
           $items[1]['sd_det_siswabaru_asal_tk'] = $xl_reader->sheets[0]['cells'][11][4];
           $items[1]['sd_det_siswabaru_asal_rt'] = $xl_reader->sheets[0]['cells'][12][4];
           $items[1]['sd_det_siswa_lt_7_thn'] = $xl_reader->sheets[0]['cells'][14][4];
           $items[1]['sd_det_siswa_7_12_thn'] = $xl_reader->sheets[0]['cells'][15][4];
           $items[1]['sd_det_siswa_gt_12_thn'] = $xl_reader->sheets[0]['cells'][16][4];
           $items[1]['sd_det_siswa_laki'] = $xl_reader->sheets[0]['cells'][18][4];
           $items[1]['sd_det_siswa_perempuan'] = $xl_reader->sheets[0]['cells'][22][4];
           $items[1]['sd_det_jml_siswa_negeri'] = $xl_reader->sheets[0]['cells'][27][4];
           $items[1]['sd_det_jml_siswa_swasta'] = $xl_reader->sheets[0]['cells'][28][4];
           
           $items[1]['sd_det_jml_kelas1'] = $xl_reader->sheets[0]['cells'][30][4];
           $items[1]['sd_det_jml_kelas2'] = $xl_reader->sheets[0]['cells'][31][4];
           $items[1]['sd_det_jml_kelas3'] = $xl_reader->sheets[0]['cells'][32][4];
           $items[1]['sd_det_jml_kelas4'] = $xl_reader->sheets[0]['cells'][33][4];
           $items[1]['sd_det_jml_kelas5'] = $xl_reader->sheets[0]['cells'][34][4];
           $items[1]['sd_det_jml_kelas6'] = $xl_reader->sheets[0]['cells'][35][4];
           
           $items[1]['sd_det_ulang_kelas1'] = $xl_reader->sheets[0]['cells'][44][4];
           $items[1]['sd_det_ulang_kelas2'] = $xl_reader->sheets[0]['cells'][45][4];
           $items[1]['sd_det_ulang_kelas3'] = $xl_reader->sheets[0]['cells'][46][4];
           $items[1]['sd_det_ulang_kelas4'] = $xl_reader->sheets[0]['cells'][47][4];
           $items[1]['sd_det_ulang_kelas5'] = $xl_reader->sheets[0]['cells'][48][4];
           $items[1]['sd_det_ulang_kelas6'] = $xl_reader->sheets[0]['cells'][49][4];
           
           $items[1]['sd_det_putus_kelas1'] = $xl_reader->sheets[0]['cells'][51][4];
           $items[1]['sd_det_putus_kelas2'] = $xl_reader->sheets[0]['cells'][52][4];
           $items[1]['sd_det_putus_kelas3'] = $xl_reader->sheets[0]['cells'][53][4];
           $items[1]['sd_det_putus_kelas4'] = $xl_reader->sheets[0]['cells'][54][4];
           $items[1]['sd_det_putus_kelas5'] = $xl_reader->sheets[0]['cells'][55][4];
           $items[1]['sd_det_putus_kelas6'] = $xl_reader->sheets[0]['cells'][56][4];
                           
           $ws_client = self::getNusoap();
		   $params = array('search' => '',
					'controller' => json_encode(array('module' => 'bds','class' => 'sd', 'method' => 'upload_excel', 'type' => 'json' )),
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