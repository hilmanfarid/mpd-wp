<?php
/**
 * p_app_menu
 * class controller for table bds_p_app_menu 
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_app_menu_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        if (!wbSecurity::check('PAppMenu')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'menu_path');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $menu_id = wbRequest::getVarClean('menu_id', 'int', 0);
		$bds_menu_id = wbRequest::getVarClean('bds_menu_id', 'int', 0);
		$menu_code = wbRequest::getVarClean('menu_code', 'str', '');
		$menu_file_name = wbRequest::getVarClean('menu_file_name', 'str', '');
		$menu_listing_no = wbRequest::getVarClean('menu_listing_no', 'float', 0);
		$menu_is_active = wbRequest::getVarClean('menu_is_active', 'str', '');
		$menu_description = wbRequest::getVarClean('menu_description', 'str', '');
		$menu_creation_date = wbRequest::getVarClean('menu_creation_date', 'date', '');
		$menu_creation_by = wbRequest::getVarClean('menu_creation_by', 'str', '');
		$menu_updated_date = wbRequest::getVarClean('menu_updated_date', 'date', '');
		$menu_updated_by = wbRequest::getVarClean('menu_updated_by', 'str', '');
		
        $searchMenu = wbRequest::getVarClean('searchMenu', 'str', '');
        $comboRequest = wbRequest::getVarClean('comboRequest', 'str', 'T');
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 'p_app_menu');
            
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
            
            if(!empty($searchMenu)) {
                $table->setCriteria('(menu_code ILIKE ? OR menu_file_name ILIKE ?)', array('%'.$searchMenu.'%', '%'.$searchMenu.'%'));
            }

            $query = $table->getDisplayFieldCriteria($query);
            if (!empty($query)) $table->setCriteria($query);

            $items = $table->getAll($start, $limit, $sort, $dir);
            $total = $table->countAll();
            
            if($comboRequest == 'Y') {
                for($i = 0; $i < count($items); $i++) {
                    $items[$i]['padding_level'] = ($items[$i]['menu_level']-1) * 20 + 2;
                    
                    if($table->isRefferenced($items[$i]['menu_id'])) {
                        $items[$i]['font_style'] = 'bold';    
                    }else {
                        $items[$i]['font_style'] = '';
                    }
                    
                    if($items[$i]['menu_level'] == 1) {
                        $items[$i]['font_color'] = '#800000';
                    }else {
                        $items[$i]['font_color'] = '#000000';
                    }
                }
            }else {
                for($i = 0; $i < count($items); $i++) {
                    if($table->isRefferenced($items[$i]['menu_id'])) {
                        $items[$i]['font_style'] = 'bold';    
                    }else {
                        $items[$i]['font_style'] = '';
                    }
                    
                    if($items[$i]['menu_level'] == 1) {
                        $items[$i]['font_color'] = '#800000';
                    }else {
                        $items[$i]['font_color'] = '#000000';
                    }
                }
            }
            
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
        if (!wbSecurity::check('PAppMenu')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        
        $table =& wbModule::getModel('bds', 'p_app_menu');
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
        if (!wbSecurity::check('PAppMenu')) return;
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 'p_app_menu');
        
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
        if (!wbSecurity::check('PAppMenu')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('bds', 'p_app_menu');
        
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
    
    public static function menunodes($args = array()){
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $userInfo = wbUser::getSession();
        if ($userInfo['user_id']== "")
        {
          return $data;
        }
        
        $text = '';
        
        $dbconn = wbDB::getConn();
        $isdmin=false;
        if ($userInfo['user_id']=="1") $isdmin=true;
        
        $query = "select count(*) ada from core_user_role where role_id=1 and user_id=" . $userInfo['user_id'];
        $result =& $dbconn->Execute($query);
        if (!$result->EOF) {
           list($ada) = $result->fields;
        } 
        if ($ada>0) $isdmin=true;
        
        
        if ($isdmin==true) {
              $query = "select menu_id, nvl (menu_pid, 0) menu_pid, menu_code, menu_file_name "
                       . "from (select menu_id, menu_pid, menu_code, nvl (menu_file_name, '-') as menu_file_name, "
                       . "menu_description, menu_listing_no  "
                       . "from bds_p_app_menu  "
                       . "where menu_is_active = 'Y'  "
                       . "start with menu_pid is null connect by prior menu_id = menu_pid order siblings by nvl(menu_listing_no, 9999)) ";
        } else {
              $query = "select menu_id, nvl (menu_pid, 0) menu_pid, menu_code, menu_file_name "
                       . "from (select menu_id, menu_pid, menu_code, nvl (menu_file_name, '-') as menu_file_name, " 
                       . "menu_description, menu_listing_no "
	      		     . "from bds_p_app_menu " 
	      		     . "where menu_is_active = 'Y' " 
	      		     . "and menu_id in ( " 
	      		     . "select rm.menu_id " 
	      		     . "from bds_p_role_menu rm, core_user_role ur "
	      		     . "where nvl(rm.rolemenu_status,'N')='Y' and rm.role_id = ur.role_id "
	      		     . "and ur.user_id = " . $userInfo['user_id'] ." ) "
	      		     . "start with menu_pid is null connect by prior menu_id = menu_pid order siblings by nvl(menu_listing_no, 9999)) "; 
        }                 
        
//       echo("\/\/[disini" . $query . "]");
        
        $text .=  "[" . chr(13);
        
              
              $result =& $dbconn->Execute($query);
              if (!$result) exit;
        
              $PLevel= array (-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1);
              $level = 0;
              $bdmnid = 0;
              $nplevel = -1;
              $parid = 0;
          
              while (!$result->EOF) {
                  list($menu_id, $menu_pid, $menu_code, $menu_file_name) = $result->fields;
                  if ($menu_id!=$bdmnid) {
                    
	      		  if ($menu_pid==$PLevel[$level]) {
                       $text .=  '"leaf":true},' . chr(13);
	      		  } else {
	      		     if ($menu_pid==$nplevel) {
                          $text .=  '"leaf":false,' . chr(13);
                          $text .=  '"expanded":false,' . chr(13);
	      		        $text .=  '"children":[' . chr(13);
	      				$level=$level+1;
	      				$PLevel[$level]=$menu_pid;
	      		     } else {
	      		        if ($level>0) {
                            $text .=  '"leaf":true},' . chr(13);
	      			    }
	      				while ($PLevel[$level]!=$menu_pid && $level>0) {
	      					$text .=  "]" . chr(13);
	      				    $text .=  "}," . chr(13);
	      					$level=$level-1;
	      				}
        
	      		     }
	      		  }
                    
                    $nplevel=$menu_id;
                    
                    $text .=  "{" . chr(13);
                    if ($menu_file_name=="-") {
                       $text .=  '"id":"' . $menu_id . '",' . chr(13);
                    } else {
                       $text .=  '"id":"' . $menu_file_name . '",' . chr(13);
                    }
                    $text .=  '"text":"' . $menu_code . '",' . chr(13);
                  }
                  $result->MoveNext();
              }
              $result->Close();
        
             if ($level>0) {
                $text .=  '"leaf":true},' . chr(13);
 	         }
 	         
 	         while ($level>0) {
 	      	 $text .=  "]" . chr(13);
 	      	 $text .=  "}," . chr(13);
 	      	 $level=$level-1;
 	         }
        
        $text .=  "]" . chr(13);
        
        $data['items'] = $text;
        $data['success'] = true;
        $data['message'] = 'Menu Success';
        
        return $data;     
    }
}
?>