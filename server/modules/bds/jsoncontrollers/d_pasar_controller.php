<?php
/**
 * d_pasar
 * class controller for table bds_d_pasar 
 *
 * @since 14-12-2012 01:58:19
 * @author agung.hp
 */
class d_pasar_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        if (!wbSecurity::check('DPasar')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'pasar_listing_no');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $pasar_id = wbRequest::getVarClean('pasar_id', 'int', 0);
		$pasar_code = wbRequest::getVarClean('pasar_code', 'str', '');
		$pasar_name = wbRequest::getVarClean('pasar_name', 'str', '');
		$pasar_address1 = wbRequest::getVarClean('pasar_address1', 'str', '');
		$pasar_address2 = wbRequest::getVarClean('pasar_address2', 'str', '');
		$pasar_kota = wbRequest::getVarClean('pasar_kota', 'str', '');
		$pasar_kodepos = wbRequest::getVarClean('pasar_kodepos', 'str', '');
		$pasar_phone_no = wbRequest::getVarClean('pasar_phone_no', 'str', '');
		$pasar_listing_no = wbRequest::getVarClean('pasar_listing_no', 'int', 0);
		$pasar_description = wbRequest::getVarClean('pasar_description', 'str', '');
		$creation_date = wbRequest::getVarClean('creation_date', 'date', '');
		$created_by = wbRequest::getVarClean('created_by', 'str', '');
		$updated_date = wbRequest::getVarClean('updated_date', 'date', '');
		$updated_by = wbRequest::getVarClean('updated_by', 'str', '');

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 'd_pasar');
            
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
        if (!wbSecurity::check('DPasar')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        $details_t_pasar_detail = wbRequest::getVarClean('details_t_pasar_detail', 'str', '');
		$details_t_pasar_detail =& wbUtil::jsonDecode($details_t_pasar_detail);
		if (!is_array($details_t_pasar_detail)) $details_t_pasar_detail = array();
        
        $table =& wbModule::getModel('bds', 'd_pasar');
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
                    
                $t_pasar_detail =& wbModule::getModel('bds', 't_pasar_detail');
                $t_pasar_detail->actionType = 'CREATE';
				foreach ($details_t_pasar_detail as $detail){
				    // generate nextID using master table connection
					$detail[$t_pasar_detail->pkey] = $table->dbconn->GenID($t_pasar_detail->table);
					$detail[$table->pkey] = $items[$table->pkey];
					$t_pasar_detail->setRecord($detail);
					// create detail using master table connection
					$t_pasar_detail->create($table->dbconn);
				}
    	            
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
        if (!wbSecurity::check('DPasar')) return;
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 'd_pasar');
        
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
        if (!wbSecurity::check('DPasar')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('bds', 'd_pasar');
        
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
}
?>