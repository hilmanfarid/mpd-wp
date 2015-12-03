<?php
/**
 * p_vat_type
 * class controller for table bds_p_vat_type 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class p_sub_region_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('p_vat_type')) return;
        
        // Get arguments from argument array
        extract($args);
    
        $start = wbRequest::getVarClean('start', 'int', 0);
        $limit = wbRequest::getVarClean('limit', 'int', 50);
        
        $sort = wbRequest::getVarClean('sort', 'str', 'p_region_id');
        $dir = wbRequest::getVarClean('dir', 'str', 'ASC');
        $query = wbRequest::getVarClean('query', 'str', '');
        
        $p_region_id = wbRequest::getVarClean('p_region_id', 'int', 0);
        $parent_id = wbRequest::getVarClean('parent_id', 'int', 0);
        $description = wbRequest::getVarClean('description', 'str', '');
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 'p_sub_region');
            
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
			if(!empty($parent_id)) {
                $table->setCriteria('parent_id = ', array($parent_id));    
            }else{
				$table->setCriteria("parent_id = 749");
			}
            if(!empty($code)) {
                $table->setCriteria('(code ILIKE ?)', array('%'.$code.'%'));    
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
}
?>