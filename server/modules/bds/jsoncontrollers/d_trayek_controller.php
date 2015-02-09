<?php
/**
 * d_trayek
 * class controller for table bds_d_trayek 
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
class d_trayek_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        if (!wbSecurity::check('DTrayek')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'trayek_listing_no');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $trayek_id = wbRequest::getVarClean('trayek_id', 'int', 0);
		$trayek_code = wbRequest::getVarClean('trayek_code', 'str', '');
		$trayek_name = wbRequest::getVarClean('trayek_name', 'str', '');
		$trayek_panjang = wbRequest::getVarClean('trayek_panjang', 'float', 0);
		$trayek_listing_no = wbRequest::getVarClean('trayek_listing_no', 'int', 0);
		$trayek_description = wbRequest::getVarClean('trayek_description', 'str', '');
		$creation_date = wbRequest::getVarClean('creation_date', 'date', '');
		$created_by = wbRequest::getVarClean('created_by', 'str', '');
		$updated_date = wbRequest::getVarClean('updated_date', 'date', '');
		$updated_by = wbRequest::getVarClean('updated_by', 'str', '');

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 'd_trayek');
            
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
        if (!wbSecurity::check('DTrayek')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        $details_t_armada = wbRequest::getVarClean('details_t_armada', 'str', '');
		$details_t_armada =& wbUtil::jsonDecode($details_t_armada);
		if (!is_array($details_t_armada)) $details_t_armada = array();
        
        $table =& wbModule::getModel('bds', 'd_trayek');
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
                    
                $t_armada =& wbModule::getModel('bds', 't_armada');
                $t_armada->actionType = 'CREATE';
				foreach ($details_t_armada as $detail){
				    // generate nextID using master table connection
					$detail[$t_armada->pkey] = $table->dbconn->GenID($t_armada->table);
					$detail[$table->pkey] = $items[$table->pkey];
					$t_armada->setRecord($detail);
					// create detail using master table connection
					$t_armada->create($table->dbconn);
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
        if (!wbSecurity::check('DTrayek')) return;
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 'd_trayek');
        
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
        if (!wbSecurity::check('DTrayek')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('bds', 'd_trayek');
        
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