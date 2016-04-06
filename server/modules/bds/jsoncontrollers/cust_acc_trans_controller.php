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
		$trans_date = wbRequest::getVarClean('trans_date', 'date', '');
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
        	$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no,bill_no_end,bill_count, service_desc, service_charge, vat_charge, description,p_vat_type_dtl_id
                      from sikp.f_get_cust_acc_dtl_trans_exist_v2($t_cust_account_id,$trans_date)AS tbl (t_cust_acc_dtl_trans_id) ".$table->getCriteriaSQL()." ORDER BY $sort $dir";
			
        	$items = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = '';
        	$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans_exist_v2($t_cust_account_id,$trans_date) ".$table->getCriteriaSQL();
        	
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
        $start_period = wbRequest::getVarClean('start_period', 'str', '');
        $end_period = wbRequest::getVarClean('end_period', 'str', '');
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
        	$table->setCriteria("trans_date between ? and ? ",array($start_period,$end_period));
        	$user_name = wbSession::getVar('user_name');
            //$table->setCriteria("t_cust_account_id IN(select t_cust_account_id from sikp.f_get_npwd_by_username('$user_name'))");
        	if(empty($trans_date)){
        	    $trans_date = 'null';
        	}else{
        	    $trans_date = "'".$trans_date."'";
        	}
        	$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no,bill_no_end,bill_count, service_desc, service_charge, vat_charge, tbl.description,p_vat_type_dtl_id,p_finance_period_id
                      from sikp.f_get_cust_acc_dtl_trans_v2($t_cust_account_id,$trans_date)AS tbl (t_cust_acc_dtl_trans_id) 
                      left join p_finance_period on p_finance_period.start_date <= trans_date and p_finance_period.end_date >= trans_date
                      ".$table->getCriteriaSQL()." ORDER BY $sort $dir";
        	$items_from_db = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = '';
        	$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans_v2($t_cust_account_id,$trans_date) ".$table->getCriteriaSQL();
            $countitems = $table->dbconn->GetOne($query);
			
			for ($i = 0 ; $i < substr($end_period,8,2);$i++){
				$item_transdate = date('Y-m-d',strtotime("+".$i." day",strtotime(substr($start_period,0,10))));
				$items[$i] = array('trans_date' => $item_transdate, 
						't_cust_acc_dtl_trans_id' => '', 't_cust_account_id' => $t_cust_account_id, 'bill_no' => '',
						'bill_no_end' => '','bill_count' => '',
						'service_desc' => '','service_charge' => '','vat_charge' => '','description' => '',
						'p_vat_type_dtl_id' => $p_vat_type_dtl_id,'p_finance_period_id' => '');
				
				
				foreach($items_from_db as $item){
					if($item_transdate == $item['trans_date']){
						$items[$i] = $item;
					}
				}
			}
			
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
		if($_POST['_LOCAL_ONLY']){
			return self::createLocal();
		}
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
		$items_return  = array();
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
            			/*$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans(".$items[$i]["t_cust_account_id"].",'".$items[$i]["i_tgl_trans"]."') ".$table->getCriteriaSQL();
                        $countitems = $table->dbconn->GetOne($query);
                        if($countitems > 0){
                            $data['message'] = 'Data Transaksi Tanggal '.wbUtil::dateToString($items[$i]["i_tgl_trans"]). ' sudah ada';
        			        $data['success'] = false;
                            return $data;
                        }*/
        	            //$cust_id = $table->dbconn->GetOne("select t_cust_account_id".$session['user_id']);
						$tgl_trans = empty($items[$i]["i_tgl_trans"]) ? $date_only[0] : $items[$i]["i_tgl_trans"];
						$bill_no = empty($items[$i]["i_bill_no"]) ? $items[$i]["bill_no"] : $items[$i]["i_bill_no"];
						$bill_no_end = empty($items[$i]["i_bill_no_end"]) ? $items[$i]["bill_no_end"] : $items[$i]["i_bill_no_end"];
						$bill_count = empty($items[$i]["i_bill_count"]) ? $items[$i]["bill_count"] : $items[$i]["i_bill_count"];
						$serve_desc = empty($items[$i]["i_serve_desc"]) ? $items[$i]["service_desc"] : $items[$i]["i_serve_desc"];
						$serve_charge = empty($items[$i]["i_serve_charge"]) ? $items[$i]["service_charge"] : $items[$i]["i_serve_charge"];
						$description = empty($items[$i]["i_description"]) ? $items[$i]["description"] : $items[$i]["i_description"];
                        $table->dbconn->Execute("select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans_v2(" . $items[$i]["t_cust_account_id"]. ",\n" .
                        "                         '" . $tgl_trans . "',\n" .
                        "                         '" . $bill_no. "',\n" .
                        "                         '" . $serve_desc. "',\n" .
                        "                         " . $serve_charge. ",\n" .
                        "                         null,\n" .
                        "                         '" . $description. "',\n" .
                        "                         '" . $session['user_name']. "',\n" .
                        "                         '" . $p_vat_type_dtl_id. "',\n" .
                        "                         null,".
						"                         " . $bill_count. ",".
						"                         '" . $bill_no_end. "')");
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
						$tr_id = $table->dbconn->GetOne("select last_value from t_cust_acc_dtl_trans_seq");
						$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no,bill_no_end,bill_count, service_desc, service_charge, vat_charge, description
						  from sikp.f_get_cust_acc_dtl_trans_v2(".$items[$i]["t_cust_account_id"].",'".$tgl_trans."')AS tbl (t_cust_acc_dtl_trans_id) where t_cust_acc_dtl_trans_id = ?";
						$items_return[] = $table->dbconn->GetItem($query,array($tr_id));
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
        	$data['items'] =$items_return;
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
                    "f_ins_cust_acc_dtl_trans_v2(" . $items["t_cust_account_id"]. ",\n" .
                    "                         '" . $date_only[0]. "',\n" .
                    "                         '" . $items["bill_no"]. "',\n" .
                    "                         null,\n" .
                    "                         " . $items["service_charge"]. ",\n" .
                    "                         null,\n" .
                    "                         '" . $items["description"]. "',\n" .
                    "                         '" . $session['user_name']. "',\n" .
                    "                         " . $p_vat_type_dtl_id. ",\n" .
                    "                         null,".
					"                         " . $items["bill_count"]. ",".
					"                         '" . $items["bill_no_end"]. "')");
    	            $tr_id = $table->dbconn->GetOne("select last_value from t_cust_acc_dtl_trans_seq");
    	            $query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no,bill_no_end,bill_count, service_desc, service_charge, vat_charge, description
                      from sikp.f_get_cust_acc_dtl_trans_v2(".$items['t_cust_account_id'].",'".$date_only[0]."')AS tbl (t_cust_acc_dtl_trans_id) where t_cust_acc_dtl_trans_id = ?";
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
	
	public static function createLocal($args = array()){
        // Security check
        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
        $p_vat_type_dtl_id = wbRequest::getVarClean('p_vat_type_dtl_id', 'int', 0);
		$user_name = wbRequest::getVarClean('user_name', 'str', '');
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

                        $table->dbconn->Execute("select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans(" . $items[$i]["t_cust_account_id"]. ",\n" .
                        "                         '" . $items[$i]["i_tgl_trans"]. "',\n" .
                        "                         '" . $items[$i]["i_bill_no"]. "',\n" .
                        "                         '" . $items[$i]["i_serve_desc"]. "',\n" .
                        "                         " . $items[$i]["i_serve_charge"]. ",\n" .
                        "                         null,\n" .
                        "                         '" . $items[$i]["i_description"]. "',\n" .
                        "                         '" . $user_name. "',\n" .
                        "                         '" . $p_vat_type_dtl_id. "',\n" .
                        "                         null)");
                	    $numSaved++;
                	    /*$querystring = "select o_result_code, o_result_msg from \n" .
                        "f_ins_cust_acc_dtl_trans(" . $items[$i]["t_cust_account_id"]. ",\n" .
                        "                         '" . $items[$i]["i_tgl_trans"]. "',\n" .
                        "                         '" . $items[$i]["i_bill_no"]. "',\n" .
                        "                         '" . $items[$i]["i_serve_desc"]. "',\n" .
                        "                         " . $items[$i]["i_serve_charge"]. ",\n" .
                        "                         null,\n" .
                        "                         '" . $items[$i]["i_description"]. "',\n" .
                        "                         '" . $user_name. "',\n" .
                        "                         '" . $p_vat_type_dtl_id. "',\n" .
                        "                         null)";
						$data['items']=$querystring;
						return $data;*/
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
        $t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
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
				$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no,bill_no_end,bill_count, service_desc, service_charge, vat_charge, description
                      from sikp.f_get_cust_acc_dtl_trans_v2(".$t_cust_account_id.",'".$date_only[0]."')AS tbl (t_cust_acc_dtl_trans_id) where t_cust_acc_dtl_trans_id = ?";
    	       $items[$i] = $table->dbconn->GetItem($query,array($items[$i]['t_cust_acc_dtl_trans_id']));
        		//$items[$i] = array_merge($items[$i], $table->record);
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
	           $data['message'] = 'Data berhasil di-update nu ieu';
	           
	       }catch (Exception $e) {
	           $data['message'] = $e->getMessage();
	       }
			$query = "select to_char(trans_date,'yyyy-mm-dd') as trans_date,t_cust_acc_dtl_trans_id, t_cust_account_id, bill_no,bill_no_end,bill_count, service_desc, service_charge, vat_charge, description
                      from sikp.f_get_cust_acc_dtl_trans_v2(".$t_cust_account_id.",'".$date_only[0]."')AS tbl (t_cust_acc_dtl_trans_id) where t_cust_acc_dtl_trans_id = ?";
    	   $data['items'] = $table->dbconn->GetItem($query,array($items['t_cust_acc_dtl_trans_id']));
	      // $data['items'] = array_merge($items, $table->record);
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
        //$query = wbRequest::getVarClean('query', 'str', '');
		$s_keyword = wbRequest::getVarClean('query', 'str', '');
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
                        where upper(npwd) ILIKE '%$s_keyword%' OR
                        upper(company_name) ILIKE '%$s_keyword%'";
            
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
    public static function getCustAccMonth($args = array()){
        
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 't_cust_account_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        //$query = wbRequest::getVarClean('query', 'str', '');
		$s_keyword = wbRequest::getVarClean('query', 'str', '');
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
        	$arr_npwd = array();
        	if(empty($t_cust_account_id))$arr_npwd = $table->dbconn->GetItem("select t_cust_account_id,npwd from sikp.f_get_npwd_by_username('$user_name')");
        	$query = " SELECT
                        		 '".$arr_npwd['npwd']."' as npwd,
                        		 t_cust_acc_dtl_trans.t_cust_account_id,
                        		 sum(t_cust_acc_dtl_trans.service_charge) as jum_trans,
                        		 sum(t_cust_acc_dtl_trans.vat_charge) as jum_pajak,
                                 t_cust_acc_dtl_trans.p_vat_type_dtl_id,
                        		 p_finance_period.p_finance_period_id,
                        		 p_finance_period.code,
                        		 t_customer_order.p_order_status_id,
                        		 case when t_vat_setllement.start_period is null then p_finance_period.start_date else t_vat_setllement.start_period END as start_period,
                             case when t_vat_setllement.end_period is null then p_finance_period.end_date else t_vat_setllement.end_period END as end_period
                        FROM
                             t_cust_acc_dtl_trans
                        LEFT JOIN p_finance_period on to_char(trans_date, 'YYYY-MM') = to_char(p_finance_period.start_date, 'YYYY-MM')
                        LEFT JOIN t_vat_setllement on t_cust_acc_dtl_trans.t_cust_account_id = t_vat_setllement.t_cust_account_id and  p_finance_period.p_finance_period_id = t_vat_setllement.p_finance_period_id 
                        LEFT JOIN t_customer_order on t_customer_order.t_customer_order_id = t_vat_setllement.t_customer_order_id
                        WHERE
                             t_cust_acc_dtl_trans.t_cust_account_id = ".$arr_npwd['t_cust_account_id']." AND 
                        		 trans_date >= CASE
                        				WHEN  t_vat_setllement.start_period is null THEN p_finance_period.start_date
                        				ELSE t_vat_setllement.start_period
                        			END
                        		AND 
                        		trans_date <= CASE
                        				WHEN  t_vat_setllement.end_period is null THEN p_finance_period.end_date
                        				ELSE t_vat_setllement.end_period
                        			END
                        GROUP BY
                        		 t_cust_acc_dtl_trans.t_cust_account_id,
                                 t_cust_acc_dtl_trans.p_vat_type_dtl_id,
                        		 p_finance_period.p_finance_period_id,
                        		 p_finance_period.code,
                        		 t_customer_order.p_order_status_id,
                        		 case when t_vat_setllement.start_period is null then p_finance_period.start_date else t_vat_setllement.start_period END,
                             case when t_vat_setllement.end_period is null then p_finance_period.end_date else t_vat_setllement.end_period END
                        ORDER BY 
                        		 case when t_vat_setllement.start_period is null then p_finance_period.start_date else t_vat_setllement.start_period END DESC";
        	$items = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = "SELECT COUNT(1) from (".$query.") tbl";
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