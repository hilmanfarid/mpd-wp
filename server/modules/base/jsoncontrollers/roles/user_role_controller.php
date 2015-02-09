<?php
/**
 * user_role
 * class controller for table core_user_role 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class user_role_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        wbSecurity::check('UserRole', ACCESS_READ);
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'user_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $user_id = wbRequest::getVarClean('user_id', 'int', 0);
		$role_id = wbRequest::getVarClean('role_id', 'int', 0);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('base', 'roles.user_role');
            
            //Set default criteria. You can override this if you want
            foreach ($table->fields as $key => $field){
                if (!empty($$key)){ // <-- Perhatikan simbol $$
                    if ($field['type'] == 'str'){
                        $table->setCriteria($table->getAlias().$key.' ILIKE ?', array($$key));
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
        wbSecurity::check('UserRole', ACCESS_ADD);

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        
        $table =& wbModule::getModel('base', 'roles.user_role');
        $table->actionType = 'CREATE';
        
        if (isset($items[0])){
        	$errors = array();
        	$numSaved = 0;
        	$numItems = count($items);
        	$savedItems = array();
        	for($i=0; $i < $numItems; $i++){
        		try{
        		    $table->dbconn->BeginTrans();
            			$table->setRecord($items[$i]);
            			$table->create();
            			$numSaved++;
        			$table->dbconn->CommitTrans();
        			$items[$i] = $table->get($table->record['user_id'], $table->record['role_id']);
        		}catch(Exception $e){
        		    $table->dbconn->RollbackTrans();
        			$errors[] = $e->getMessage();
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

    	            $table->setRecord($items);
    	            $table->create();

    	            $data['success'] = true;
    	            $data['message'] = 'Data berhasil disimpan';
	            // all ok, commit transaction
	            $table->dbconn->CommitTrans();
                $data['items'] = $table->get($table->record['user_id'], $table->record['role_id']);
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
        wbSecurity::check('UserRole', ACCESS_EDIT);
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('base', 'roles.user_role');
        
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
        			$items[$i] = $table->get($table->record['user_id'], $table->record['role_id']);
        		}catch(Exception $e){
        			$errors[] = $e->getMessage();
        		}
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
	            $data['items'] = $table->get($table->record['user_id'], $table->record['role_id']);
	        }catch (Exception $e) {
	            $data['message'] = $e->getMessage();
                $data['items'] = $items;	            
	        }
        }
    
        return $data;    
    }

    /**
     * update
     * controler for remove item
     */            
    public static function destroy($args = array()){
        // Security check
        wbSecurity::check('UserRole', ACCESS_DELETE);
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('base', 'roles.user_role');
        
        try{
            $table->dbconn->BeginTrans();
                if (is_array($items)){
                    foreach ($items as $key => $value){
                        if (empty($value)) throw new Exception('Empty parameter');
                        
                        $keys = explode('.', $value);
                        if (empty($keys[0]) || empty($keys[1])) throw new Exception('Invalid User Role ID');
                        
                        $table->remove($keys[0], $keys[1]);
                        $data['items'][] = array('user_role_id' => $value);
                        $data['total']++;
                    }
                }else{
                    if (empty($items)){
                        throw new Exception('Empty parameter');
                    }

                    $keys = explode('.', $items);
                    if (empty($keys[0]) || empty($keys[1])) throw new Exception('Invalid User Role ID');
        
                    $table->remove($keys[0], $keys[1]);
                    $data['items'][] = array('user_role_id' => $items);
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