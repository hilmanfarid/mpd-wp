<?php
class statistik_cuaca_controller extends wbController{
    
    public static function udara() {
        $sort = wbRequest::getVarClean('sort', 'str', 't_cuaca_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
		$tahun = wbRequest::getVarClean('tahun', 'int', 0);
		$jenis = wbRequest::getVarClean('jenis', 'int', 0);
        try{
            $table =& wbModule::getModel('bds', 't_cuaca');
            
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

            $items = $table->getAll(0, -1, $sort, $dir);
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    } 
    public static function curahHujan() {
        $sort = wbRequest::getVarClean('sort', 'str', 't_cuaca_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
		$tahun = wbRequest::getVarClean('tahun', 'int', 0);
		$jenis = wbRequest::getVarClean('jenis', 'int', 0);
        try{
            $table =& wbModule::getModel('bds', 't_cuaca');
            
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

            $items = $table->getAll(0, -1, $sort, $dir);
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }   
    
    public static function angin() {
        $sort = wbRequest::getVarClean('sort', 'str', 't_cuaca_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'DESC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
		$tahun = wbRequest::getVarClean('tahun', 'int', 0);
		$jenis = wbRequest::getVarClean('jenis', 'int', 0);
        
        try{
            $table =& wbModule::getModel('bds', 't_cuaca');
            
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

            $items = $table->getAll(0, -1, $sort, $dir);
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
