<?php
class dashboard_puskesmas_controller extends wbController{
        
    public static function show() {
        
        $tWilayah =& wbModule::getModel('bds', 'p_wilayah');
        $tPuskesmas =& wbModule::getModel('bds', 'd_puskesmas');
		
		//timestamp
        $t = wbRequest::getVarClean('t', 'str', '');
		
		$tWilayah->setCriteria('p_wilayah.wilayah_status = ?', array('31'));
		$itemsWilayah = $tWilayah->getAll(0,-1,'p_wilayah.wilayah_kode','ASC');
		
		$data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $itemsWilayah;
        $data['success'] = true;
        
        return $data;
    }
    
    public static function getJumlahPerKecamatan() {
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $tPuskesmas =& wbModule::getModel('bds', 'd_puskesmas');
        $jumlah = $tPuskesmas->getJumlahPerKecamatan($item['wilayah_id']);
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $jumlah;
        return $data;
    }
    

}
