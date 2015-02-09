<?php
class statistik_pertanian_controller extends wbController{
    
    public static function show() {
        
        
        $tParameter =& wbModule::getModel('bds', 'p_parameter');
        $tKomoditas =& wbModule::getModel('bds', 'd_agr_komoditas');
        $tProduksi =& wbModule::getModel('bds', 't_agr_komod_prod');
        
        $type_id = wbRequest::getVarClean('type_id', 'int', 0);
		$tahun = wbRequest::getVarClean('tahun', 'str', '');
		
		//timestamp
        $t = wbRequest::getVarClean('t', 'str', '');
		
        if(empty($type_id) or empty($tahun)) exit;
        
        $itemParameter = $tParameter->get($type_id);
        $tKomoditas->setCriteria('d_agr_komoditas.type_id = ?', array($type_id));
        $items = $tKomoditas->getAll(0,-1,'d_agr_komoditas.listing_no','ASC');
        
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $retItems = array();
        $retItems['itemParameter'] = $itemParameter;
        $retItems['items'] = $items;
        
        
        
        $data['items'] = $retItems;
        $data['success'] = true;
        
        return $data;
        
        
    }
    
    public static function getProduksiKomoditas() {
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $tProduksi =& wbModule::getModel('bds', 't_agr_komod_prod');
        $itemProduksi = $tProduksi->getProduksiKomoditas($item['tahun'], $item['d_agr_komiditas_id']);
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $itemProduksi;
        return $data;
    }

}
