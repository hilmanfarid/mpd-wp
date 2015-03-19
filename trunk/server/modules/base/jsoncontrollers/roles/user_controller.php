<?php
/**
 * user
 * class controller for table core_user 
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
class user_controller extends wbController{    
    public static $loggedInFirst = true;
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        wbSecurity::check('User', ACCESS_READ);
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'user_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $user_id = wbRequest::getVarClean('user_id', 'int', 0);
		$user_name = wbRequest::getVarClean('user_name', 'str', '');
		$user_password = wbRequest::getVarClean('user_password', 'str', '');
		$user_email = wbRequest::getVarClean('user_email', 'str', '');
		$user_realname = wbRequest::getVarClean('user_realname', 'str', '');
		$user_status = wbRequest::getVarClean('user_status', 'str', '');
		$user_branch_id = wbRequest::getVarClean('user_branch_id', 'int', '');
        
        $searchUser = wbRequest::getVarClean('searchUser', 'str', '');
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('base', 'roles.user');
            
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
            
            if(!empty($searchUser)) {
                $table->setCriteria('(user_name ILIKE ? OR user_realname ILIKE ?)', array('%'.$searchUser.'%', '%'.$searchUser.'%'));
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
        wbSecurity::check('User', ACCESS_ADD);

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('base', 'roles.user');
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
        			$items[$i] = $table->get($items[$i][$table->pkey]);
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
	                // insert master
    	            $items[$table->pkey] = $table->GenID();
    	            $table->setRecord($items);
    	            $table->create();

    	            $data['success'] = true;
    	            $data['message'] = 'Data berhasil disimpan';
	            // all ok, commit transaction
	            $table->dbconn->CommitTrans();
                $data['items'] = $table->get($items[$table->pkey]);
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
        wbSecurity::check('User', ACCESS_EDIT);
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('base', 'roles.user');
        
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
        			$items[$i] = $table->get($items[$i][$table->pkey]);
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
	            $data['items'] = $table->get($items[$table->pkey]);
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
        wbSecurity::check('User', ACCESS_DELETE);
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('base', 'roles.user');
        
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

    /**
     * get
     * controler for get
     */
    public static function getInfo($args = array()){
        // Security check
        wbSecurity::check('User', ACCESS_READ);
        
        // Get arguments from argument array
        extract($args);
    
        $sessionInfo = wbUser::getSession();
		//print_r($sessionInfo);exit;
        $uid = $sessionInfo['user_id'];

        $data = array('items' => array(), 'success' => false, 'message' => '');
                
        try{
            if (empty($uid)){
                throw new Exception('Bad Params : Empty UserID');
            }
            
            $table =& wbModule::getModel('base', 'roles.user');
			$sql = "select b.p_app_user_id as user_id, b.user_name, 
				a.wp_email as user_email, a.wp_name as user_realname, c.code as user_status,".$sessionInfo['roles'][0]['role_id']." as role_id,'".$sessionInfo['roles'][0]['role_name']."' as role_name
				from t_cust_account a
				left join t_customer_user b on a.t_customer_id = b.t_customer_id
				left join p_account_status c on c.p_account_status_id = a.p_account_status_id
				where b.p_app_user_id = ".$uid;
			
			$data ['items']=$table->dbconn->GetItem($sql);
			//print_r($sql);exit;
            //$data['items'] = $table->get($uid);
            $data['success'] = true;
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;
    }    

    public static function updateInfo($args = array()){
        // Security check
        wbSecurity::check('User', ACCESS_EDIT);

        // Get arguments from argument array
        extract($args);

		$user_password1 = trim(wbRequest::getVarClean('user_password1', 'str', ''));
		$user_password2 = trim(wbRequest::getVarClean('user_password2', 'str', ''));

		$user_email = trim(wbRequest::getVarClean('user_email', 'str', ''));
		$user_realname = trim(wbRequest::getVarClean('user_realname', 'str', ''));

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        $sessionInfo = wbUser::getSession();
        $uid = $sessionInfo['user_id'];

	    try{
            if (empty($uid)){
                throw new Exception('Bad Params : Empty UserID');
            }
            	        
	        $table =& wbModule::getModel('base', 'roles.p_app_user');
	        $table->actionType = 'UPDATE';

	        $record = array('p_app_user_id' => $uid, 
	                        'email_address' => $user_email,
	                        'full_name' => $user_realname);
            
            if (!empty($user_password1)){
                if (strcmp($user_password1, $user_password2) != 0) throw new Exception("Password tidak sama. Mohon periksa kembali");
                
                if (strlen($user_password1) < 5) throw new Exception("Panjang password minimal 5 karakter");
                
                $record['user_pwd'] = $user_password1;
	        }
	        
	        $table->setRecord($record );
	        $table->update();
        
	        $data['success'] = true;
	        $data['message'] = 'Data berhasil di-update';
	    }catch (Exception $e) {
	        $data['message'] = $e->getMessage();
	    }
	    
        return $data;
    }

}
?>