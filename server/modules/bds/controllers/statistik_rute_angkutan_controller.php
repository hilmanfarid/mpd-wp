<?php
class statistik_rute_angkutan_controller extends wbController{
    
    public static function show() {
        
        $tTrayek =& wbModule::getModel('bds', 'd_trayek');
        $tArmada =& wbModule::getModel('bds', 't_armada');
		
		//timestamp
        $tahun = wbRequest::getVarClean('tahun', 'int', '');
		
		$itemsTrayek = $tTrayek->getAll(0,-1,'trayek_listing_no','ASC');
		
		$data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $itemsTrayek;
        $data['success'] = true;
        
        return $data;

    }
    
    public static function getItem() {
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $tArmada =& wbModule::getModel('bds', 't_armada');
        $itemArmada = $tArmada->getItem($item['tahun'], $item['trayek_id']);
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $itemArmada;
        return $data;
    }
}
?>