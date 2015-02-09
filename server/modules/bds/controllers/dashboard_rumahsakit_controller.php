<?php
class dashboard_rumahsakit_controller extends wbController{
    
    public static function show() {
        
        $jenis_report = wbRequest::getVarClean('jenis_report', 'int', 0);
        if($jenis_report == 1) {
            self::show_per_kecamatan();    
        }elseif($jenis_report == 2) {
            self::show_per_jenis();       
        }
        exit;
    }
    
    
    public static function show_per_kecamatan() {
        
        
        $tWilayah =& wbModule::getModel('bds', 'p_wilayah');
        $tRumahSakit =& wbModule::getModel('bds', 'd_rumahsakit');
		
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
        
        $tRumahSakit =& wbModule::getModel('bds', 'd_rumahsakit');
        $jumlah = $tRumahSakit->getJumlahPerKecamatan($item['wilayah_id']);
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $jumlah;
        return $data;
    }
    
    
    public static function getJumlahPerJenis() {
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $tRumahSakit =& wbModule::getModel('bds', 'd_rumahsakit');
        $jumlah = $tRumahSakit->getJumlahPerJenis($item['param_id']);
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $jumlah;
        return $data;
    }
    
    
    public static function show_per_jenis() {
        
        
        $tParameter =& wbModule::getModel('bds', 'p_parameter');
                		
		$tParameter->setCriteria('p_parameter_type.ptype_code ILIKE ?', array('JENIS RUMAH SAKIT'));
		$itemsJenis = $tParameter->getAll(0,-1,'param_listing_no','ASC');
		
		$data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $itemsJenis;
        $data['success'] = true;
        
        return $data;
    }
    

}
