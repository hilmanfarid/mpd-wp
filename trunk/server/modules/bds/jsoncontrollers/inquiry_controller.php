<?php
/**
 * inquiry
 * class controller for table bds_inquiry 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class inquiry_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;
        if (!wbSecurity::check('Inquiry')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'listing_no');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $no_registration = wbRequest::getVarClean('no_registration', 'int', 0);

        $searchHotel = wbRequest::getVarClean('searchHotel', 'str', '');
        
        $getAll = wbRequest::getVarClean('getAll', 'str', '');
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $dbConnParams_rwnet = array(
            'name' => wbConfig::get('DB.name_rwnet'),
            'user' => wbConfig::get('DB.user_rwnet'),
            'password' => wbConfig::get('DB.password_rwnet'),
            'host' => wbConfig::get('DB.host_rwnet'),
            'type' => wbConfig::get('DB.type_rwnet'),
            'schema' => 'sikp'
        );
        
        try{
        	$dbConn_rwnet = ADONewConnection($dbConnParams_rwnet['type']);
        	$dbConn_rwnet->Connect($dbConnParams_rwnet['host'],$dbConnParams_rwnet['user'],$dbConnParams_rwnet['password'],$dbConnParams_rwnet['name']);
        	if($getAll=='Y'){
        	    $long_code=$dbConn_rwnet->GetItem("select o_ret_code from f_inquery_bphtb_all('$no_registration', null)");
        	}else{
            	$long_code=$dbConn_rwnet->GetItem("select o_ret_code from f_inquery_bphtb('$no_registration', null)");
            }
        }catch(UserLoginFailedException $e){
            $data['message'] = $e->getMessage();
        }
        $data['items'] = $long_code;
        $data['total'] = 2;
        $data['success'] = true;
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
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        
        $table =& wbModule::getModel('bds', 'inquiry');
        $table->actionType = 'CREATE';
        
        if (isset($items[0])){
        	$errors = array();
        	$numSaved = 0;
        	$numItems = count($items);
        	$savedItems = array();
        	for($i=0; $i < $numItems; $i++){
        		try{
        		    $table->dbconn->BeginTrans();
            		    $items[$i][$table->pkey] = $table->GenID();
            			$table->setRecord($items[$i]);
            			$table->create();
            			$numSaved++;
        			$table->dbconn->CommitTrans();
        		}catch(Exception $e){
        		    $table->dbconn->RollbackTrans();
        			$errors[] = $e->getMessage();
        		}
        		$items[$i] = array_merge($items[$i], $table->record);
        	}
        	$numErrors = count($errors);
        	if (count($errors)){
        		$data['message'] = $numErrors." dari ".$numItems." record gagal disimpan.<br/><br/><b>System Response:</b><br/>- ".implode("<br/>- ", $errors)."";
        	}else{
        		$data['success'] = true;
        		$data['message'] = 'Data berhasil disimpan';
        	}
        	$data['items'] =$items;
        }else{
	        try{
	            // begin transaction block
	            $table->dbconn->BeginTrans();
	                // insert master
    	            $items[$table->pkey] = $table->GenID();
    	            $table->setRecord($items);
    	            $table->create();
    	            // insert detail
                    
    	            
    	            $data['success'] = true;
    	            $data['message'] = 'Data berhasil disimpan';
    	            $data['items'] = $table->get($items[$table->pkey]);
	            // all ok, commit transaction
	            $table->dbconn->CommitTrans();
	        }catch (Exception $e) {
	            // something happen, rollback transaction
	            $table->dbconn->RollbackTrans();
	            $data['message'] = $e->getMessage();
	            $data['items'] = $items;
	        }
	        
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
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 'inquiry');
        
        $table->actionType = 'UPDATE';
        
        if (isset($items[0])){
        	$errors = array();
        	$numSaved = 0;
        	$numItems = count($items);
        	$savedItems = array();
        	for($i=0; $i < $numItems; $i++){
        		try{
        			$table->setRecord($items[$i]);
        			$table->update();
        			$numSaved++;
        		}catch(Exception $e){
        			$errors[] = $e->getMessage();
        		}
        		$items[$i] = array_merge($items[$i], $table->record);
        	}
        	$numErrors = count($errors);
        	if (count($errors)){
        		$data['message'] = $numErrors." dari ".$numItems." record gagal di-update.<br/><br/><b>System Response:</b><br/>- ".implode("<br/>- ", $errors)."";
        	}else{
        		$data['success'] = true;
        		$data['message'] = 'Data berhasil di-update';
        	}
        	$data['items'] =$items;
        }else{
	        try{
	            $table->setRecord($items);
	            $table->update();

	            $data['success'] = true;
	            $data['message'] = 'Data berhasil di-update';
	            
	        }catch (Exception $e) {
	            $data['message'] = $e->getMessage();
	        }
	        $data['items'] = array_merge($items, $table->record);
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
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('bds', 'inquiry');
        
        try{
            $table->dbconn->BeginTrans();
                if (is_array($items)){
                    foreach ($items as $key => $value){
                        if (empty($value)) throw new Exception('Empty parameter');
                        
                        $table->remove($value);
                        $data['items'][] = array($table->pkey => $value);
                        $data['total']++;
                    }
                }else{
                    $items = (int) $items;
                    if (empty($items)){
                        throw new Exception('Empty parameter');
                    }
        
                    $table->remove($items);
                    $data['items'][] = array($table->pkey => $items);
                    $data['total'] = 1;            
                }
    
                $data['success'] = true;
                $data['message'] = $data['total'].' Data berhasil dihapus';
            $table->dbconn->CommitTrans();
        }catch (Exception $e) {
            $table->dbconn->RollbackTrans();
            $data['message'] = $e->getMessage();
            $data['items'] = array();
            $data['total'] = 0;            
        }
    
        return $data;    
    }
    
    /*
    * IMPORT WALKIN
    */
    public static function upload_excel($args = array()){
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $table =& wbModule::getModel('bds', 'inquiry');
        $table->actionType = 'CREATE';
        
        $items = $item['items'];
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        try {
            foreach($items as $rec) {
                $rec[$table->pkey] = $table->GenID();
                $table->setRecord($rec);
                $table->create();
            }
            return $data;
        }catch(Exception $e) {
            $data['success'] = false;
            $data['message'] = $e->getMessage();
            return $data;   
        }
       
    } 
    public static function execPembayaran($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;
        if (!wbSecurity::check('Inquiry')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'listing_no');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $no_registration = wbRequest::getVarClean('no_registration', 'str', 0);
        $bphtb_amount= wbRequest::getVarClean('bphtb_amount', 'float', 0);
        $bit48= wbRequest::getVarClean('bit48', 'str', 0);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $dbConnParams_rwnet = array(
            'name' => wbConfig::get('DB.name_rwnet'),
            'user' => wbConfig::get('DB.user_rwnet'),
            'password' => wbConfig::get('DB.password_rwnet'),
            'host' => wbConfig::get('DB.host_rwnet'),
            'type' => wbConfig::get('DB.type_rwnet'),
            'schema' => 'sikp'
        );
        
        try{
            $table =& wbModule::getModel('bds', 'd_hotel');
        	$result = $table->dbconn->GetItem("select * from core_user where user_id=".wbSession::getVar('user_id'));
        	$dbConn_rwnet = ADONewConnection($dbConnParams_rwnet['type']);
        	$dbConn_rwnet->Connect($dbConnParams_rwnet['host'],$dbConnParams_rwnet['user'],$dbConnParams_rwnet['password'],$dbConnParams_rwnet['name']);
        	
        	$query="select o_ret_code from 
        	sikp.f_payment_bphtb (
        		'$no_registration'::VARCHAR,
        		$bphtb_amount::NUMERIC,
        		'".$result['user_name']."'::varchar,
        		to_char(now(),'YYYYMMDDhh24:MI:ss')||'".$_COOKIE['WEBISID']."'::varchar,
        		'$bit48'::varchar,
        		'1'::VARCHAR
        	)";
        	$long_code=$dbConn_rwnet->GetItem($query);
            
        }catch(UserLoginFailedException $e){
            $data['message'] = $e->getMessage();
        }
        $data['items'] = $long_code;
        $data['total'] = 2;
        $data['success'] = true;
        return $data;    
    }
    public static function cancelPembayaran($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;
        if (!wbSecurity::check('Inquiry')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'listing_no');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $no_registration = wbRequest::getVarClean('no_registration', 'str', 0);
        $bphtb_amount= wbRequest::getVarClean('bphtb_amount', 'float', 0);
        $bit48= wbRequest::getVarClean('bit48', 'str', 0);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $dbConnParams_rwnet = array(
            'name' => wbConfig::get('DB.name_rwnet'),
            'user' => wbConfig::get('DB.user_rwnet'),
            'password' => wbConfig::get('DB.password_rwnet'),
            'host' => wbConfig::get('DB.host_rwnet'),
            'type' => wbConfig::get('DB.type_rwnet'),
            'schema' => 'sikp'
        );
        
        try{
            $table =& wbModule::getModel('bds', 'd_hotel');
        	$result = $table->dbconn->GetItem("select * from core_user where user_id=".wbSession::getVar('user_id'));
        	$dbConn_rwnet = ADONewConnection($dbConnParams_rwnet['type']);
        	$dbConn_rwnet->Connect($dbConnParams_rwnet['host'],$dbConnParams_rwnet['user'],$dbConnParams_rwnet['password'],$dbConnParams_rwnet['name']);
        	
        	$query="select * from sikp.f_manual_reversal('$no_registration','".$result['user_name']."', 'Cancel Pembayaran')";
        	$long_code=$dbConn_rwnet->GetItem($query);
            
        }catch(UserLoginFailedException $e){
            $data['message'] = $e->getMessage();
        }
        $data['items'] = $long_code;
        $data['total'] = 2;
        $data['success'] = true;
        return $data;    
    }
}
?>