<?php
/**
 * t_vat_settlement
 * class controller for table bds_t_vat_settlement 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class t_vat_settlement_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        if (!wbSecurity::check('t_vat_settlement')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'period.start_date DESC,t_vat_setllement_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
		$t_vat_setllement_id = wbRequest::getVarClean('t_vat_setllement_id', 'int', 0);
		$t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);
        $payment_key = wbRequest::getVarClean('payment_key', 'str', '');
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 't_vat_settlement');
            
            //Set default criteria. You can override this if you want
            foreach ($table->fields as $key => $field){
                if (!empty($$key)){ // <-- Perhatikan simbol $$
                    if ($field['type'] == 'str'){
                        $table->setCriteria($table->getAlias().$key.$table->likeOperator.'?', array($$key));
                    }else{
                        $table->setCriteria($table->getAlias().$key.' = ?', array($$key));
                    }
                }
            }
                        
            
            $query = $table->getDisplayFieldCriteria($query);
            if (!empty($query)) $table->setCriteria($query);
            
            //$user_name = wbSession::getVar('user_name');
            //$table->setCriteria("npwd = (select t_cust_account_id from sikp.f_get_npwd_by_username('$user_name'))");
            $table->setCriteria("settlement.t_cust_account_id = ?",array($t_cust_account_id));
            $table->setCriteria("settlement.p_settlement_type_id = 1");
            $table->setCriteria("cust_order.p_order_status_id = 1");
			$table->setCriteria("settlement.payment_key is not null");
			$table->setCriteria("settlement.payment_key <> ''");
            if(!empty($payment_key)){
                $table->setCriteria("settlement.payment_key = ?",array($payment_key));
            }
            $items = $table->getAll($start, $limit, $sort, $dir);
            $total = $table->countAll();
        
            $data['items'] = $items;
            $data['total'] = $total;
            $data['success'] = true;
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
        if (!wbSecurity::check('t_vat_settlement')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        
        $table =& wbModule::getModel('bds', 't_vat_settlement');
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
    	            //$table->create();
    	            // insert detail
                    $sql = "select * from f_vat_settlement_manual_new(".$items['t_cust_account_id'].",".$items['p_finance_period_id'].",'".$items['npwd']."','".$items['start_period']."','".$items['end_period']."',null,".$items['total_trans_amount'].",".$items['p_vat_type_dtl_id'].",".$items['p_vat_type_dtl_cls_id'].",'".wbSession::getVar('user_name')."')";  
                    $message=$table->dbconn->GetOne("$sql");
    	            
    	            $data['success'] = true;
    	            $data['message'] = 'Data berhasil disimpan';
    	            $data['items'] = $sql;//$table->get($items[$table->pkey]);
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
        if (!wbSecurity::check('t_vat_settlement')) return;
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 't_vat_settlement');
        
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
        if (!wbSecurity::check('t_vat_settlement')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('bds', 't_vat_settlement');
        
        try{
            $table->dbconn->BeginTrans();
                if (is_array($items)){
                    foreach ($items as $key => $value){
                        if (empty($value)) throw new Exception('Empty parameter');
                        
                        $table->dbconn->GetOne("select * from f_del_vat_setllement(".$value.",34,'23')");
                        $data['items'][] = array($table->pkey => $value);
                        $data['total']++;
                    }
                }else{
                    $items = (int) $items;
                    if (empty($items)){
                        throw new Exception('Empty parameter');
                    }
        
                    $return = $table->dbconn->GetAll("select o_result_code,o_result_msg from f_del_vat_setllement(".$items.",34,'23')");
                    $data['items'][] = $return[0];
                    $data['total'] = 1;
                    $data['message'] = $return[0]['o_result_msg'];
                    if($return[0]['o_result_code']!='0'){
                        $data['success'] = false;
                        return $data;
                    }            
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
        
        $table =& wbModule::getModel('bds', 't_vat_settlement');
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
    public static function createSptpd($args = array()){
        $jsonItems = wbRequest::getVarClean('items', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $table =& wbModule::getModel('bds', 't_vat_settlement');
        $table->actionType = 'CREATE';
        
        $items = $item['items'];
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        try {
            $user_name = wbSession::getVar('user_name');
            if(empty($item['p_vat_type_dtl_cls_id'])){
                $item['p_vat_type_dtl_cls_id'] = 'null';
            }
            $sql = "select o_mess,o_pay_key,o_cust_order_id,o_vat_set_id from f_vat_settlement_manual_wp(".$item['t_cust_account_id'].",".$item['finance_period'].",'".$item['npwd']."','".$item['start_period']."','".$item['end_period']."',null,".$item['total_trans_amount'].",".$item['total_vat_amount'].",".$item['p_vat_type_dtl_id'].",".$item['p_vat_type_dtl_cls_id'].", '".$user_name."')";
			//$sql = "select -99 as o_mess,-99 as o_pay_key,-99 as o_cust_order_id,-99 as o_vat_set_id";
			//$data['items'] = $sql;
			//return $data;
            $message = $table->dbconn->GetAll($sql);
            $sql = "select * from f_get_penalty_amt(".$item['total_vat_amount'].",".$item['finance_period'].",".$item['p_vat_type_dtl_id'].");";
            $penalty = $table->dbconn->GetOne($sql);
            $message[0]['penalty']=$penalty;
            if($message[0]['o_vat_set_id'] == null ||empty($message[0]['o_vat_set_id'])){
                $data['success'] = false;
            }else{
                $data['success'] = true;
				$params = json_encode(array(
											't_vat_setllement_id'=>$message[0]['o_vat_set_id'],
											't_customer_order_id'=>$message[0]['o_cust_order_id']
											));
				$_POST ['items']= $params;
				$data = self::submitSptpd();
            }
            $data['items'] = $message[0];
            $data['message'] = $message[0]['o_mess'];
            return $data;
        }catch(Exception $e) {
            $data['success'] = false;
            $data['message'] = $e->getMessage();
            return $data;   
        }
    }
    public static function submitSptpd($args = array()){
        $jsonItems = wbRequest::getVarClean('items', 'str', '');        
        $items = wbUtil::jsonDecode($jsonItems);
        $table =& wbModule::getModel('bds', 't_vat_settlement');
        $table->actionType = 'CREATE';
        
        //$items = $item['items'];
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        try {
            $data['success'] = false;
            $user_name = wbSession::getVar('user_name');
            //f_before_submit_sptpd_wp(in_vat_setlement_id in number, i_user_name in varchar2) return varchar2
            //foreach($items as $item){
                //$sql="select sikp.f_first_submit_engine(501,".$item['t_customer_order_id'].",'".$user_name."')";  
								
                $sql = "select sikp.f_before_submit_sptpd_wp(".$items['t_vat_setllement_id'].",'".$user_name."')";
                $message=$table->dbconn->GetOne($sql);
                //if(trim($message)=='OK'){
				if(true){
                    $sql="select o_result_msg from sikp.f_first_submit_engine(501,".$items['t_customer_order_id'].",'".$user_name."')";   
                    $message=$table->dbconn->GetOne($sql);
                    if($message=='OK'){
                        $sql="select f_gen_vat_dtl_trans(".$items['t_vat_setllement_id'].",'".$user_name."')";   
						$message=$table->dbconn->GetItem($sql);
                    }
                    $data['success'] = true;
                }
            //}
            $data['items'] = $items;
            $data['msg']=$message;
            $data['message'] = $message;
            return $data;
        }catch(Exception $e) {
            $data['success'] = false;
            $data['message'] = $e->getMessage();
            return $data;   
        }
    }
    public static function getPaymentInfo($args = array()){
        //$jsonItems = wbRequest::getVarClean('items', 'str', '');        
        //$item = wbUtil::jsonDecode($jsonItems);
        $no_bayar = wbRequest::getVarClean('no_bayar', 'str', '');
        $table =& wbModule::getModel('bds', 't_vat_settlement');
        $table->actionType = 'CREATE';
        
        //$items = $item['items'];
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
		//$data ['items']=$no_bayar;
		//return $data;
        try {
            $user_name = wbSession::getVar('user_name');
            $sql = "select x.company_brand,x.brand_address_name,x.brand_address_no,to_char(a.settlement_date,'dd-mm-yyyy') as settlement_date,to_char(a.settlement_date,'HH24:MI:ss') as pukul,a.npwd,wp_name,vat_code,z.code, nvl(total_vat_amount,0)as total_vat_amount,nvl(total_penalty_amount,0) as total_penalty_amount,nvl(total_vat_amount,0)+nvl(total_penalty_amount,0) as total_bayar,payment_key,
				replace(f_terbilang(to_char(nvl(total_vat_amount,0)+nvl(total_penalty_amount,0)),'IDR'),'    sen ','') as dengan_huruf 
				from sikp.t_vat_setllement a
				left join sikp.t_cust_account x on a.t_cust_account_id =x.t_cust_account_id 
				left join sikp.p_vat_type_dtl y on y.p_vat_type_dtl_id = a.p_vat_type_dtl_id
				left join sikp.p_finance_period z on z.p_finance_period_id = a.p_finance_period_id
				where payment_key ='".$no_bayar."'";
            $items = $table->dbconn->GetItem($sql);
            if($items['wp_name'] == null ||empty($items['wp_name'])){
                $data['success'] = false;
				$data['message'] = 'Gagal';
			}else{
                $data['success'] = true;
				$data['message'] = 'Berhasil';
            }
            $data['items'] = $items;
            
            return $data;
        }catch(Exception $e) {
            $data['success'] = false;
            $data['message'] = $e->getMessage();
            return $data;   
        }
    }
	
	public static function deleteDSR($args = array()){
        $jsonItems = wbRequest::getVarClean('items', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
		
        $table =& wbModule::getModel('bds', 'cust_acc_trans');
        //$table->actionType = 'DELETE';
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
		
		try {
            $user_name = wbSession::getVar('user_name');
            $sql = "DELETE FROM t_cust_acc_dtl_trans a
					WHERE a.t_cust_account_id = ".$item['t_cust_account_id']."
					and not exists (select 1 from t_vat_setllement_dtl x where x.t_cust_acc_dtl_trans_id = a.t_cust_acc_dtl_trans_id)";
            $items = $table->dbconn->GetItem($sql);
			$data['items'] = $item;
            $data['message'] = 'Berhasil';
            $data['success'] = true;
            $data['items'] = $items;
            
            return $data;
        }catch(Exception $e) {
			
            $data['success'] = false;
            $data['message'] = $e->getMessage();
            return $data;   
        }
    }
}
?>