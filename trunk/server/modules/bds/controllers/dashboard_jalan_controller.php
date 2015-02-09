<?php
class dashboard_jalan_controller extends wbController{
    
    public static function show() {
        
        $tJalan =& wbModule::getModel('bds', 'd_jalan');
        $jenis_jalan = wbRequest::getVarClean('jenis_jalan', 'int', 0);
		
		//timestamp
        $t = wbRequest::getVarClean('t', 'str', '');
		
        if(empty($jenis_jalan)) exit;
        $items = $tJalan->getAllByJenisJalan($jenis_jalan);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }

}
