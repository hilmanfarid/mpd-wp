<?php
/**
 * smp_detail
 * class controller for table bds_smp_detail 
 *
 * @since 29-11-2013 07:44:19
 * @author agung.hp
 */
class smp_detail_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        if (!wbSecurity::check('SmpDetail')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'smp_det_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $smp_det_id = wbRequest::getVarClean('smp_det_id', 'int', 0);
		$smp_id = wbRequest::getVarClean('smp_id', 'int', 0);
		$smp_det_jmlsekolah = wbRequest::getVarClean('smp_det_jmlsekolah', 'int', 0);
		$smp_det_siswabaru = wbRequest::getVarClean('smp_det_siswabaru', 'int', 0);
		$smp_det_siwa_lt_13_thn = wbRequest::getVarClean('smp_det_siwa_lt_13_thn', 'int', 0);
		$smp_det_siswa_13_15_thn = wbRequest::getVarClean('smp_det_siswa_13_15_thn', 'int', 0);
		$smp_det_siswa_gt_15_thn = wbRequest::getVarClean('smp_det_siswa_gt_15_thn', 'int', 0);
		$smp_det_siswa_laki = wbRequest::getVarClean('smp_det_siswa_laki', 'int', 0);
		$smp_det_siswa_perempuan = wbRequest::getVarClean('smp_det_siswa_perempuan', 'int', 0);
		$smp_det_jml_siswa_negeri = wbRequest::getVarClean('smp_det_jml_siswa_negeri', 'int', 0);
		$smp_det_jml_siswa_swasta = wbRequest::getVarClean('smp_det_jml_siswa_swasta', 'int', 0);
		$smp_det_jml_kelas7 = wbRequest::getVarClean('smp_det_jml_kelas7', 'int', 0);
		$smp_det_jml_kelas8 = wbRequest::getVarClean('smp_det_jml_kelas8', 'int', 0);
		$smp_det_jml_kelas9 = wbRequest::getVarClean('smp_det_jml_kelas9', 'int', 0);
		$smp_det_ulang_kelas7 = wbRequest::getVarClean('smp_det_ulang_kelas7', 'int', 0);
		$smp_det_ulang_kelas8 = wbRequest::getVarClean('smp_det_ulang_kelas8', 'int', 0);
		$smp_det_ulang_kelas9 = wbRequest::getVarClean('smp_det_ulang_kelas9', 'int', 0);
		$smp_det_putus_kelas7 = wbRequest::getVarClean('smp_det_putus_kelas7', 'int', 0);
		$smp_det_putus_kelas8 = wbRequest::getVarClean('smp_det_putus_kelas8', 'int', 0);
		$smp_det_putus_kelas9 = wbRequest::getVarClean('smp_det_putus_kelas9', 'int', 0);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 'smp_detail');
            
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
        if (!wbSecurity::check('SmpDetail')) return;

        // Get arguments from argument array
        extract($args);
        
        $data = array('items' => array(), 'success' => false, 'message' => '');
        
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        
        $table =& wbModule::getModel('bds', 'smp_detail');
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
        if (!wbSecurity::check('SmpDetail')) return;
        
        // Get arguments from argument array
        extract($args);
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
            
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        if (!is_array($items)){
            $data['message'] = 'Invalid items parameter';
            return $data;
        }
        
        $table =& wbModule::getModel('bds', 'smp_detail');
        
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
        		$items[$i] = $table->get($items[$i][$table->pkey]);
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
	        $data['items'] = $table->get($items[$table->pkey]);
        }
    
        return $data;    
    }

    /**
     * update
     * controler for remove item
     */            
    public static function destroy($args = array()){
        // Security check
        if (!wbSecurity::check('SmpDetail')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        $table =& wbModule::getModel('bds', 'smp_detail');
        
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