<?php
/**
 * cust_acc_trans
 * class controller for table bds_cust_acc_trans
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class cust_acc_trans_controller extends wbController{
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('cust_acc_trans')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'read', 'type' => 'json' )),
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
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'create', 'type' => 'json' )),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
		    
            $ws_data = self::getResultData($ws_client, $params);  
            $data['items'] = $ws_data ['data'];
            $data['total'] = 1;
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
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'update', 'type' => 'json' )),
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
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'destroy', 'type' => 'json')),
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
    * IMPORT WALKIN
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
             
             if($firstColumn != 'Kode Hotel') {
                 throw new Exception('Format Table Salah');
             }
                          
             /* pengecekkan semua data */
             for($i = 2; $i <= $xl_reader->sheets[0]['numRows']; $i++) {
                   
                   $kode_hotel = $xl_reader->sheets[0]['cells'][$i][1];
                   $nama_hotel =  $xl_reader->sheets[0]['cells'][$i][2];
         
                   if(empty($kode_hotel) or $kode_hotel == 'Keterangan') break;  
                   
                   if(empty($nama_hotel)) {
                        throw new Exception('Nama Hotel (Kolom 2) pada baris '.($i-1).' Tidak boleh kosong'); 
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
           
           for($i = 2; $i <= $xl_reader->sheets[0]['numRows']; $i++) {
              
              $kode_hotel = $xl_reader->sheets[0]['cells'][$i][1];
              $nama_hotel =  $xl_reader->sheets[0]['cells'][$i][2];
              $kelas =  $xl_reader->sheets[0]['cells'][$i][3];
              $jumlah_kamar =  $xl_reader->sheets[0]['cells'][$i][4];
              $alamat =  $xl_reader->sheets[0]['cells'][$i][5];
              $kota =  $xl_reader->sheets[0]['cells'][$i][6];
              $kode_pos =  $xl_reader->sheets[0]['cells'][$i][7];
              $telepon =  $xl_reader->sheets[0]['cells'][$i][8];
              $website =  $xl_reader->sheets[0]['cells'][$i][9];
              
              if(empty($kode_hotel) or $kode_hotel == 'Keterangan') break;  
               
              
              $recInsert['code'] = $kode_hotel;
              $recInsert['hotel_name'] = $nama_hotel;
              $recInsert['kelas_id'] = $kelas;
              $recInsert['jml_kamar'] = $jumlah_kamar;
              $recInsert['address_1'] = $alamat;
              $recInsert['kota'] = $kota;
              $recInsert['kode_pos'] = $kode_pos;
              $recInsert['phone_no'] = $telepon;
              $recInsert['website'] = $website;
              
              //$table->setRecord($recInsert);
              //$table->create();
              $items[] = $recInsert;
           }
           
           $ws_client = self::getNusoap();
		   $params = array('search' => '',
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'upload_excel', 'type' => 'json' )),
					'jsonItems' => json_encode(array('items' => $items))
					);
					
           $ws_data = self::getResultData($ws_client, $params);
           
           
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
    public static function execPembayaran($args = array()){
        // Security check
        //if (!wbSecurity::check('cust_acc_trans')) return;

        // Get arguments from argument array
        //extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'execPembayaran', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
            if(substr($ws_data ['data']['o_ret_code'], 0, 2) == "00"){
                $data['items'] = $ws_data ['data'];
                $data['total'] = $ws_data ['total'];
                $data['message'] = $ws_data ['message'];
                $data['success'] = $ws_data ['success'];
            }else{
                $data['items'] = $ws_data ['data'];
                $data['total'] = $ws_data ['total'];
                $data['message'] = $ws_data ['data'];
                $data['success'] = false;
            }
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $data['success'] = false;
        }
        return $data;

    }
    public static function cancelPembayaran($args = array()){
        // Security check
        //if (!wbSecurity::check('cust_acc_trans')) return;

        // Get arguments from argument array
        //extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'cancelPembayaran', 'type' => 'json' )),
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
            $data['success'] = false;
        }
        return $data;

    }
    public static function getNpwd($args = array()){
        // Security check
        //if (!wbSecurity::check('cust_acc_trans')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'getNpwd', 'type' => 'json' )),
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
    public static function uploadExcel($args = array()){
        $temp_cust_account = self::getNpwd();
        global $_FILES;
    	try {
            //'excel_file' adalah nama field di form
            if(empty($_FILES['excel_trans_cust']['name'])){
                throw new Exception('File tidak boleh kosong');
            }
        }catch (Exception $e) {
            echo $e->getMessage();
            exit;
        }
        
    	$file_name = $_FILES['excel_trans_cust']['name']; // <-- File Name
        $file_location = 'var/uploadexcel/'.$file_name; // <-- LOKASI Upload File
    
    	//upload file ke lokasi tertentu
        try {
            if (!move_uploaded_file($_FILES['excel_trans_cust']['tmp_name'], $file_location)){
                throw new Exception("Upload file gagal");
            }
        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }
    	
    	include('lib/excel/reader.php');
        $xl_reader = new Spreadsheet_Excel_Reader();
    	$res = $xl_reader->_ole->read($file_location);
    
        if($res === false) {
        	if($xl_reader->_ole->error == 1) {
        		echo "File Harus Format Excel";
                exit;
        	}
        }
    	
    	
    	try{
    	     $xl_reader->read($file_location);
             $firstColumn = $xl_reader->sheets[0]['cells'][1][1];
    
             		 
    		// $DBConnect = new clsDBConnSIKP();  		
    		 $session = wbUser::getSession();
    		 //$sqll = "select * from f_get_npwd_by_username('".$session['user_id']."') AS tbl (ty_lov_npwd) where rownum < 2 ";
    		 //$DBConnect->query($sqll);
    		 //while ($DBConnect->next_record()){
    		//	$value = $DBConnect->f("ty_lov_npwd");		 
    		// }
    		 $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', $temp_cust_account['items'][0]['t_cust_account_id']);	
    		 //$i_t_cust_id = CCGetFromGet("t_cust_account_id","");
    		 //$i_t_cust_account_id = empty($i_t_cust_id) ? $value : $i_t_cust_id;
    
    		 //$i_trans = CCGetFromGet("trans_date","");
    		 //$i_tgl_trans = empty($i_trans) ? date('Y-m-d') : $i_trans;
    		 //$uname = CCGetUserLogin(); //harap diubah
    
    		 //$uploadForm->t_cust_account_id->SetValue($i_t_cust_account_id);
    		 //$uploadForm->trans_date->SetValue($i_tgl_trans);
    		 $items= array();	
             for($i = 2; $i <= $xl_reader->sheets[0]['numRows']; $i++) {
    			   $item['t_cust_account_id'] = $t_cust_account_id; 
    			   $item['i_tgl_trans'] =  $xl_reader->sheets[0]['cells'][$i][1]; 	
                   $item['i_bill_no'] =  $xl_reader->sheets[0]['cells'][$i][2];
                   $item['i_serve_desc'] =  $xl_reader->sheets[0]['cells'][$i][3];
                   $item['i_serve_charge'] =  $xl_reader->sheets[0]['cells'][$i][4];
                   //$i_vat_charge = $xl_reader->sheets[0]['cells'][$i][4];
    			   $item['i_vat_charge'] = "null";
                   $item['i_desc'] = $xl_reader->sheets[0]['cells'][$i][5];   
                   $item['p_vat_type_dtl_id'] = $temp_cust_account['items'][0]['p_vat_type_dtl_id'];                
    		       $items[]=$item;
             } 
             $_POST['p_vat_type_dtl_id']=$temp_cust_account['items'][0]['p_vat_type_dtl_id'];
             $_POST['items']=json_encode($items);
             $data = self::create();
             echo json_encode($data);
             exit;
        } catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }
    }
    
    public static function getCustAccMonth($args = array()){
        // Security check
        //if (!wbSecurity::check('cust_acc_trans')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'getCustAccMonth', 'type' => 'json' )),
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
}
?>