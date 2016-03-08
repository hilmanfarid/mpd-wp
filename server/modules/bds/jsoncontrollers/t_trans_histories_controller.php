<?php
/**
 * t_vat_settlement
 * class controller for table bds_t_vat_settlement
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class t_trans_histories_controller extends wbController{
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

        $sort = wbRequest::getVarClean('sort', 'str', 'settlement.start_period');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');

		$t_vat_setllement_id = wbRequest::getVarClean('t_vat_setllement_id', 'int', 0);
		$t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 't_vat_settlement');
            $table->selectClause.=",to_char(payment.payment_date, 'yyyy-mm-dd') as payment_date,payment.receipt_no,payment.payment_amount,vat_type_dtl.p_vat_type_id as p_vat_type_id,cust_account.wp_name";
            $table->fromClause.=" left join t_payment_receipt payment on payment.t_vat_setllement_id = settlement.t_vat_setllement_id
                                  left join p_vat_type_dtl vat_type_dtl on vat_type_dtl.p_vat_type_dtl_id = payment.p_vat_type_dtl_id
                                  left join t_cust_account cust_account on cust_account.t_cust_account_id = settlement.t_cust_account_id";
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
            //$table->setCriteria("cust_order.p_order_status_id <> 2");
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

    /*added by wiliam 08/03/2016 11:09:03*/
    public static function read_histories($args = array()){

        // Get arguments from argument array
        extract($args);

        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 15);

        $sort = wbRequest::getVarClean('sort', 'str', 'data_transaksi.start_date desc, t_vat_setllement_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'asc');
        $query = wbRequest::getVarClean('query', 'str', '');

		$t_vat_setllement_id = wbRequest::getVarClean('t_vat_setllement_id', 'int', 0);
		$t_cust_account_id = wbRequest::getVarClean('t_cust_account_id', 'int', 0);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $table =& wbModule::getModel('bds', 't_trans_histories',$t_cust_account_id);

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

                    $table->dbconn->GetOne("select * from f_del_vat_setllement(".$items.",34,'23')");
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
            $message = $table->dbconn->GetOne("select o_mess from f_vat_settlement_new(".$item['t_cust_account_id'].",".$item['finance_period'].",'".$item['npwd']."',".$item['p_vat_type_dtl_id'].",".$item['p_vat_type_dtl_cls_id'].", '".$user_name."')");
            $data['success'] = true;
            $data['message'] = $message;
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
            $user_name = wbSession::getVar('user_name');
            foreach($items as $item){
                $sql="select sikp.f_first_submit_engine(501,".$item['t_customer_order_id'].",'".$user_name."')";
                $message=$table->dbconn->GetOne("$sql");
            }
            $data['success'] = true;
            $data['message'] = $message;
            return $data;
        }catch(Exception $e) {
            $data['success'] = false;
            $data['message'] = $e->getMessage();
            return $data;
        }
    }
}
?>