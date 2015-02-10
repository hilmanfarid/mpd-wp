<?php
/**
 * cust_acc_trans
 * class controller for table bds_cust_acc_trans 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class t_cust_order_legal_doc_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
	public static function imurl(){
		return 'c://inetpub/wwwroot/mpd-wp/server/var/files/';
	}
	public static function unlinkurl(){
		return '../../mpd-wp/server/var/files/';
	}
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 't_cust_order_legal_doc_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');

        $t_cust_order_legal_doc_id = wbRequest::getVarClean('t_cust_order_legal_doc_id', 'int', 0);
		$t_customer_order_id = wbRequest::getVarClean('t_customer_order_id', 'int', 0);
        
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
        	$table =& wbModule::getModel('bds', 't_cust_order_legal_doc');
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
        if (!wbSecurity::check('t_cust_account')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        $t_cust_order_legal_doc_id = wbRequest::getVarClean('t_cust_order_legal_doc_id', 'int', 0);
		$t_customer_order_id = wbRequest::getVarClean('t_customer_order_id', 'int', 0);
		$p_legal_doc_type_id = wbRequest::getVarClean('p_legal_doc_type_id', 'str', '');
		$legal_doc_desc = wbRequest::getVarClean('legal_doc_desc', 'str', '');
		$origin_file_name = wbRequest::getVarClean('origin_file_name', 'str', '');
		$file_folder = wbRequest::getVarClean('file_folder', 'int',0);
		$file_name = wbRequest::getVarClean('file_name', 'int', 0);
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
		
		
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        $table =& wbModule::getModel('bds', 't_cust_order_legal_doc');
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
    	            $items[$table->pkey] = $table->dbconn->GetOne("select generate_id('sikp','t_cust_order_legal_doc','t_cust_order_legal_doc_id') from dual");
    	            $items['description']= $legal_doc_desc;
					$table->setRecord($items);
    	            $table->create();
    	            // insert detail
    	            ///////////////////////////////////this is the magic for upload////////////////////////////////////
					$encoded = $_POST['uploaded']->file_name;
					$location = self::imurl().$items[$table->pkey].'_'.$items['file_name'];// Mention where to upload the file
					$current = @file_get_contents($location);                     // Get the file content. This will create an empty file if the file does not exist     
					$current = base64_decode($encoded);                          // Now decode the content which was sent by the client     
					file_put_contents($location, $current);                      // Write the decoded content in the file mentioned at particular location
					///////////////////////////////////////////////////////////////////////////////////////////////////
    	            
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
        $t_cust_order_legal_doc_id = wbRequest::getVarClean('t_cust_order_legal_doc_id', 'int', 0);
		$t_customer_order_id = wbRequest::getVarClean('t_customer_order_id', 'int', 0);
		$p_legal_doc_type_id = wbRequest::getVarClean('p_legal_doc_type_id', 'str', '');
		$legal_doc_desc = wbRequest::getVarClean('legal_doc_desc', 'str', '');
		$origin_file_name = wbRequest::getVarClean('origin_file_name', 'str', '');
		$file_folder = wbRequest::getVarClean('file_folder', 'int',0);
		$file_name = wbRequest::getVarClean('file_name', 'int', 0);
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
		
		
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 't_cust_order_legal_doc');
        
        $table->actionType = 'UPDATE';
        $old_row = $table->Get($items['t_cust_order_legal_doc_id']);
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
				
				$r = $old_row;
				if (!empty($r['file_name']) && is_file(self::unlinkurl().$items['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
					@unlink(self::unlinkurl().$items['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
			
					if (is_file(self::unlinkurl().'th_'.$items['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
						@unlink(self::unlinkurl().'th_'.$items['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
					}
					if (is_file(self::unlinkurl().'view_'.$items['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
						@unlink(self::unlinkurl().'view_'.$items['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
					}
					
				}
				
				///////////////////////////////////this is the magic for upload////////////////////////////////////
				$encoded = $_POST['uploaded']->file_name;
				$location = self::imurl().$items[$table->pkey].'_'.$items['file_name'];// Mention where to upload the file
				$current = @file_get_contents($location);                     // Get the file content. This will create an empty file if the file does not exist     
				$current = base64_decode($encoded);                          // Now decode the content which was sent by the client     
				file_put_contents($location, $current);                      // Write the decoded content in the file mentioned at particular location
				///////////////////////////////////////////////////////////////////////////////////////////////////
				
	            $data['success'] = true;
	            $data['message'] = 'Data berhasil di-update';
	            
	        }catch (Exception $e) {
	            $data['message'] = $e->getMessage();
	        }
	        $data['items'] = array_merge($items, $table->record,array('old_row' => $old_row));
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
    
        $table =& wbModule::getModel('bds', 't_cust_order_legal_doc');
        
        try{
            $table->dbconn->BeginTrans();
                if (is_array($items)){
                    foreach ($items as $key => $value){
                        if (empty($value)) throw new Exception('Empty parameter');
                        $old_row = $table->Get($value);
						$r = $old_row;
                        $table->remove($value);
						$return['deleted'] = array($table->pkey => $value);
						$return['old_row'] = $old_row;
						$data['items'][] = $return;
                        $data['total']++;
						if (!empty($r['file_name']) && is_file(self::unlinkurl().$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
							@unlink(self::unlinkurl().$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
					
							if (is_file(self::unlinkurl().'th_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
								@unlink(self::unlinkurl().'th_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
							}
							if (is_file(self::unlinkurl().'view_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
								@unlink(self::unlinkurl().'view_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
							}
							
						}
                    }
                }else{
                    $items = (int) $items;
                    if (empty($items)){
                        throw new Exception('Empty parameter');
                    }
					$old_row = $table->Get($items);
					$r = $old_row;
                    //$table->remove($items);
					
					if (!empty($r['file_name']) && is_file(self::unlinkurl().$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
						@unlink(self::unlinkurl().$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
				
						if (is_file(self::unlinkurl().'th_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
							@unlink(self::unlinkurl().'th_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
						}
						if (is_file(self::unlinkurl().'view_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name'])){ 
							@unlink(self::unlinkurl().'view_'.$old_row['t_cust_order_legal_doc_id'].'_'.$r['file_name']);
						}
						
					}
					
					
					$data['items']['single'] = true;
                    $data['items']['deleted'] = array($table->pkey => $items);
					$data['items']['old_row'] = $old_row;
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
        
        $sort = wbRequest::getVarClean('sort', 'str', 't_cust_order_legal_doc_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');

        $t_cust_order_legal_doc_id = wbRequest::getVarClean('t_cust_order_legal_doc_id', 'int', 0);
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
        	$query = "select ty_lov_npwd as t_cust_order_legal_doc_id, npwd, company_name,
                        p_vat_type_id, vat_code, p_vat_type_dtl_id, vat_code_dtl
                        from f_get_npwd_by_username('$user_name') AS tbl (ty_lov_npwd)
                        where upper(npwd) like '%$s_keyword%' OR
                        upper(company_name) like '%$s_keyword%'";
            
        	$items = $table->dbconn->GetAllAssocLimit($query,$limit,$start);
        	$query = "SELECT COUNT(1) from sikp.f_get_cust_acc_dtl_trans($t_cust_order_legal_doc_id,'$trans_date') ".$table->getCriteriaSQL();
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