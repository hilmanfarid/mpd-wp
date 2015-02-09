<?php
class statistik_peternakan_controller extends wbController{
    
    public static function show() {
        
        $tParameter =& wbModule::getModel('bds', 'p_parameter');
        $tTernak =& wbModule::getModel('bds', 't_ternak');
		
		$tParameter->setCriteria('p_parameter_type.ptype_code ILIKE ?', array('JENIS TERNAK'));
		$itemsJenis = $tParameter->getAll(0,-1,'param_listing_no','ASC');
		
		$data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $data['items'] = $itemsJenis;
        $data['success'] = true;
        
        return $data;
    }
    
    public static function getItem() {
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $tTernak =& wbModule::getModel('bds', 't_ternak');
        $itemTernak = $tTernak->getItem($item['tahun'], $item['param_id']);
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $itemTernak;
        return $data;  
    }
}
?>