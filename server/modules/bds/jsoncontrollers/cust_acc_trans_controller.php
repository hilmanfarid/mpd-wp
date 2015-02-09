<?php
/**
 * cust_acc_trans
 * class controller for table bds_cust_acc_trans 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class cust_acc_trans_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
	public static function readExist($args = array()){
        // Security check
        if (!wbSecurity::check('t_cust_account')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 't_cust_acc_dtl_trans_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');

        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
		$trans_date = wbRequest::getVarClean('trans_date', 'str', '');
		$p_vat_type_dtl_id = wbRequest::getVarClean('p_vat_type_dtl_id', 'int', 0);
		
		$date_start = wbRequest::getVarClean('date_start', 'str', '');
		$date_end = wbRequest::getVarClean('date_end', 'str', '');
        
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
        	/*foreach ($table->fields as $key => $field){
                if (!empty($$key)){ // <-- Perhatikan simbol $$
                    if ($field['type'] == 'str'){
                        $table->setCriteria($table->getAlias().$key.$table->likeOperator.'?', array("%".$$key."%"));
                    }else{
                        $table->setCriteria($table->getAlias().$key.' = ?', array($$key));
                    }
                }
            }
        	//$table->setCriteria('b.wp_name ILIKE ?', array("%".$wp_name."%"));
        	if(!empty($receipt_no)){
        		$table->setCriteria('a.receipt_no ILIKE ?', array("%".$receipt_no."%"));
        	}*/
        	if(!empty($date_start)&&!empty($date_end)){
        		$table->setCriteria( " (trunc(trans_date) BETWEEN '".$date_start."' AND '".$date_end."') ");
        	}else if(!empty($date_start)&&empty($date_end)){
        		$table->setCriteria(" trunc(trans_date) >= '".$date_start."' ");
        	}else if(empty($date_start)&&!empty($date_end)){
        		$table->setCriteria(" trunc(trans_date) <= '".$date_end."' ");
        	}
        	$table->setCriteria("p_vat_type_dtl_id = ?",array($p_vat_type_dtl_id));
        	$user_name = wbSession::getVar('user_name');
            //$table->setCriteria("t_cust_account_id IN(select t_cust_account_id from sikp.f_get_npwd_by_username('$user_name'))");
        	if(empty($trans_date)){
        	    $trans_date = 'null';
        	}else{
        	    $trans_date = "'".$trans_date."'";
        	}
        	$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no, service_desc, service_charge, vat_charge, description,p_vat_type_dtl_id
                      from sikp.f_get_cust_acc_dtl_trans_exist($t_cust_account_id,$trans_date)AS tbl (t_cust_acc_dtl_trans_id) ".$table->getCriteriaSQL()." ORDER BY $sort $dir";
        	$items = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = '';
        	$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans_exist($t_cust_account_id,$trans_date) ".$table->getCriteriaSQL();
        	
            $countitems = $table->dbconn->GetOne($query);
            if ($countitems === false){
                throw new Exception($dbConn_rwnet->ErrorMsg());
            }
            //$total = $table->countAll();
        }catch(UserLoginFailedException $e){
            $data['message'] = $e->getMessage();
        }
        $data['items'] = $items;
        $data['total'] = $countitems;
        $data['success'] = true;
        return $data;    
    }
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 't_cust_acc_dtl_trans_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');

        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
		$trans_date = wbRequest::getVarClean('trans_date', 'str', '');
		$p_vat_type_dtl_id = wbRequest::getVarClean('p_vat_type_dtl_id', 'int', 0);
        
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
        	/*foreach ($table->fields as $key => $field){
                if (!empty($$key)){ // <-- Perhatikan simbol $$
                    if ($field['type'] == 'str'){
                        $table->setCriteria($table->getAlias().$key.$table->likeOperator.'?', array("%".$$key."%"));
                    }else{
                        $table->setCriteria($table->getAlias().$key.' = ?', array($$key));
                    }
                }
            }
        	//$table->setCriteria('b.wp_name ILIKE ?', array("%".$wp_name."%"));
        	if(!empty($receipt_no)){
        		$table->setCriteria('a.receipt_no ILIKE ?', array("%".$receipt_no."%"));
        	}
        	if(!empty($date_start)&&!empty($date_end)){
        		$table->setCriteria( " (trunc(a.payment_date) BETWEEN '".$date_start."' AND '".$date_end."') ");
        	}else if(!empty($date_start)&&empty($date_end)){
        		$table->setCriteria(" trunc(a.payment_date) >= '".$date_start."' ");
        	}else if(empty($date_start)&&!empty($date_end)){
        		$table->setCriteria(" trunc(a.payment_date) <= '".$date_end."' ");
        	}*/
        	$table->setCriteria("p_vat_type_dtl_id = ?",array($p_vat_type_dtl_id));
        	$user_name = wbSession::getVar('user_name');
            //$table->setCriteria("t_cust_account_id IN(select t_cust_account_id from sikp.f_get_npwd_by_username('$user_name'))");
        	if(empty($trans_date)){
        	    $trans_date = 'null';
        	}else{
        	    $trans_date = "'".$trans_date."'";
        	}
        	$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no, service_desc, service_charge, vat_charge, description,p_vat_type_dtl_id
                      from sikp.f_get_cust_acc_dtl_trans($t_cust_account_id,$trans_date)AS tbl (t_cust_acc_dtl_trans_id) ".$table->getCriteriaSQL()." ORDER BY $sort $dir";
        	$items = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = '';
        	$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans($t_cust_account_id,$trans_date) ".$table->getCriteriaSQL();
        	
            $countitems = $table->dbconn->GetOne($query);
            if ($countitems === false){
                throw new Exception($dbConn_rwnet->ErrorMsg());
            }
            //$total = $table->countAll();
        }catch(UserLoginFailedException $e){
            $data['message'] = $e->getMessage();
        }
        $data['items'] = $items;
        $data['total'] = $countitems;
        $data['success'] = true;
        return $data;    
    }

    /**
     * create
     * controler for create new item
     */    
    public static function create_backup($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
        $p_vat_type_dtl_id = wbRequest::getVarClean('p_vat_type_dtl_id', 'int', 0);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        $table =& wbModule::getModel('bds', 'cust_acc_trans');
        $table->actionType = 'CREATE';
        if (isset($items[0])){
        	$errors = array();
        	$numSaved = 0;
        	$numItems = count($items);
        	$savedItems = array();
        	for($i=0; $i < $numItems; $i++){
        		try{
        		    
        		    $table->dbconn->BeginTrans();
            		    //$items[$i][$table->pkey] = $table->GenID();
            			$date_only = explode('T', $items[$i]["trans_date"]); 
            			$session = wbUser::getSession();
        	            //$cust_id = $table->dbconn->GetOne("select t_cust_account_id".$session['user_id']);
                        $table->dbconn->Execute("select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans(" . $items[$i]["t_cust_account_id"]. ",\n" .
                        "                         '" . $items[$i]["i_tgl_trans"]. "',\n" .
                        "                         '" . $items[$i]["i_bill_no"]. "',\n" .
                        "                         '" . $items[$i]["i_serve_desc"]. "',\n" .
                        "                         " . $items[$i]["i_serve_charge"]. ",\n" .
                        "                         null,\n" .
                        "                         '" . $items[$i]["i_description"]. "',\n" .
                        "                         '" . $session['user_name']. "',\n" .
                        "                         '" . $p_vat_type_dtl_id. "',\n" .
                        "                         null)");
                        /*echo "select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans(" . $items["t_cust_account_id"]. ",\n" .
                        "                         '" . $items[$i]["i_tgl_trans"]. "',\n" .
                        "                         '" . $items[$i]["i_bill_no"]. "',\n" .
                        "                         '" . $items[$i]["i_serve_desc"]. "',\n" .
                        "                         " . $items[$i]["i_serve_charge"]. ",\n" .
                        "                         null,\n" .
                        "                         '" . $items[$i]["i_description"]. "',\n" .
                        "                         '" . $session['user_name']. "')";
                        exit;*/
                	    $numSaved++;
                	    
        			$table->dbconn->CommitTrans();
        		}catch(Exception $e){
        		    $table->dbconn->RollbackTrans();
        			$errors[] = $e->getMessage();
        		//$items[$i] = array_merge($items[$i], $table->record);
        	    }
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
    	            //$items[$table->pkey] = $table->GenID();
    	            /*$table->setRecord($items);
    	            $table->create();
    	            // insert */
    	            $session = wbUser::getSession();
    	            $date_only = explode('T', $items["trans_date"]); 
    	            //$cust_id = $table->dbconn->GetOne("select t_cust_account_id".$session['user_id']);
                    $table->dbconn->Execute("select o_result_code, o_result_msg from \n" .
                    "f_ins_cust_acc_dtl_trans(" . $items["t_cust_account_id"]. ",\n" .
                    "                         '" . $date_only[0]. "',\n" .
                    "                         '" . $items["bill_no"]. "',\n" .
                    "                         null,\n" .
                    "                         " . $items["service_charge"]. ",\n" .
                    "                         null,\n" .
                    "                         '" . $items["description"]. "',\n" .
                    "                         '" . $session['user_name']. "',\n" .
                    "                         " . $p_vat_type_dtl_id. ",\n" .
                    "                         null)");
    	            $tr_id = $table->dbconn->GetOne("select last_value from t_cust_acc_dtl_trans_seq");
    	            $query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no, service_desc, service_charge, vat_charge, description
                      from sikp.f_get_cust_acc_dtl_trans(".$items['t_cust_account_id'].",'".$date_only[0]."')AS tbl (t_cust_acc_dtl_trans_id) where t_cust_acc_dtl_trans_id = ?";
    	            $item = $table->dbconn->GetItem($query,array($tr_id));
    	            
    	            $data['success'] = true;
    	            $data['message'] = 'Data berhasil disimpan';
    	            $data['items'] = $item;
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
	
	public static function create($args = array()){
        // Security check
        if (!wbSecurity::check('t_cust_account')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
        $p_vat_type_dtl_id = wbRequest::getVarClean('p_vat_type_dtl_id', 'int', 0);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        $table =& wbModule::getModel('bds', 'cust_acc_trans');
        $table->actionType = 'CREATE';
        if (isset($items[0])){
        	$errors = array();
        	$numSaved = 0;
        	$numItems = count($items);
        	$savedItems = array();
        	for($i=0; $i < $numItems; $i++){
        		try{
        		    
        		    $table->dbconn->BeginTrans();
            		    //$items[$i][$table->pkey] = $table->GenID();
            			$date_only = explode('T', $items[$i]["trans_date"]); 
            			$session = wbUser::getSession();
            			$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans(".$items[$i]["t_cust_account_id"].",'".$items[$i]["i_tgl_trans"]."') ".$table->getCriteriaSQL();
                        $countitems = $table->dbconn->GetOne($query);
                        if($countitems > 0){
                            $data['message'] = 'Data Transaksi Tanggal '.wbUtil::dateToString($items[$i]["i_tgl_trans"]). ' sudah ada';
        			        $data['success'] = false;
                            return $data;
                        }
        	            //$cust_id = $table->dbconn->GetOne("select t_cust_account_id".$session['user_id']);
                        $table->dbconn->Execute("select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans(" . $items[$i]["t_cust_account_id"]. ",\n" .
                        "                         '" . $items[$i]["i_tgl_trans"]. "',\n" .
                        "                         '" . $items[$i]["i_bill_no"]. "',\n" .
                        "                         '" . $items[$i]["i_serve_desc"]. "',\n" .
                        "                         " . $items[$i]["i_serve_charge"]. ",\n" .
                        "                         null,\n" .
                        "                         '" . $items[$i]["i_description"]. "',\n" .
                        "                         '" . $session['user_name']. "',\n" .
                        "                         '" . $p_vat_type_dtl_id. "',\n" .
                        "                         null)");
                        /*echo "select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans(" . $items["t_cust_account_id"]. ",\n" .
                        "                         '" . $items[$i]["i_tgl_trans"]. "',\n" .
                        "                         '" . $items[$i]["i_bill_no"]. "',\n" .
                        "                         '" . $items[$i]["i_serve_desc"]. "',\n" .
                        "                         " . $items[$i]["i_serve_charge"]. ",\n" .
                        "                         null,\n" .
                        "                         '" . $items[$i]["i_description"]. "',\n" .
                        "                         '" . $session['user_name']. "')";
                        exit;*/
                	    $numSaved++;
                	    
        			$table->dbconn->CommitTrans();
        		}catch(Exception $e){
        		    $table->dbconn->RollbackTrans();
        			$errors[] = $e->getMessage();
        			$data['message'] = $e->getMessage();
        			$data['success'] = false;
        		//$items[$i] = array_merge($items[$i], $table->record);
        	    }
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
    	            //$items[$table->pkey] = $table->GenID();
    	            /*$table->setRecord($items);
    	            $table->create();
    	            // insert */
    	            $session = wbUser::getSession();
    	            $date_only = explode('T', $items["trans_date"]); 
    	            //$cust_id = $table->dbconn->GetOne("select t_cust_account_id".$session['user_id']);
                    $table->dbconn->Execute("select o_result_code, o_result_msg from \n" .
                    "f_ins_cust_acc_dtl_trans(" . $items["t_cust_account_id"]. ",\n" .
                    "                         '" . $date_only[0]. "',\n" .
                    "                         '" . $items["bill_no"]. "',\n" .
                    "                         null,\n" .
                    "                         " . $items["service_charge"]. ",\n" .
                    "                         null,\n" .
                    "                         '" . $items["description"]. "',\n" .
                    "                         '" . $session['user_name']. "',\n" .
                    "                         " . $p_vat_type_dtl_id. ",\n" .
                    "                         null)");
    	            $tr_id = $table->dbconn->GetOne("select last_value from t_cust_acc_dtl_trans_seq");
    	            $query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no, service_desc, service_charge, vat_charge, description
                      from sikp.f_get_cust_acc_dtl_trans(".$items['t_cust_account_id'].",'".$date_only[0]."')AS tbl (t_cust_acc_dtl_trans_id) where t_cust_acc_dtl_trans_id = ?";
    	            $item = $table->dbconn->GetItem($query,array($tr_id));
    	            
    	            $data['success'] = true;
    	            $data['message'] = 'Data berhasil disimpan';
    	            $data['items'] = $item;
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
        
        $table =& wbModule::getModel('bds', 'cust_acc_trans');
        
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
    
        $table =& wbModule::getModel('bds', 'cust_acc_trans');
        
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
        
        $table =& wbModule::getModel('bds', 'cust_acc_trans');
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
    public static function getNpwd($args = array()){
        
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 't_cust_account_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');

        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
		$trans_date = wbRequest::getVarClean('trans_date', 'str', '');
        
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
        	$user_name = wbSession::getVar('user_name');
        	$query = "select ty_lov_npwd as t_cust_account_id, npwd, company_name,
                        p_vat_type_id, vat_code, p_vat_type_dtl_id, vat_code_dtl
                        from f_get_npwd_by_username('$user_name') AS tbl (ty_lov_npwd)
                        where upper(npwd) like '%$s_keyword%' OR
                        upper(company_name) like '%$s_keyword%'";
            
        	$items = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans($t_cust_account_id,'$trans_date') ".$table->getCriteriaSQL();
            $countitems = $table->dbconn->GetOne($query);
            if ($countitems === false){
                throw new Exception($dbConn_rwnet->ErrorMsg());
            }
            //$total = $table->countAll();
        }catch(UserLoginFailedException $e){
            $data['message'] = $e->getMessage();
        }
        $data['items'] = $items;
        $data['total'] = $countitems;
        $data['success'] = true;
        return $data;
       
    } 
}
?>