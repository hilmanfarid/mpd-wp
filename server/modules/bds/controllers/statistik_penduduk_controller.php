<?php
class statistik_penduduk_controller extends wbController{
    
    public static function usia() {
        
    }
    
    public static function getCountByAge() {
        $tWarga =& wbModule::getModel('bds', 'd_warga');
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $jumlah = $tWarga->getCountByAge($item['condition']);
        $jumlah_l = $tWarga->getCountByAge($item['condition']." AND jk_id = 6");
        $jumlah_p = $tWarga->getCountByAge($item['condition']." AND jk_id = 7");
        
        $itemJumlah = array();
        $itemJumlah['jumlah'] = $jumlah;
        $itemJumlah['jumlah_l'] = $jumlah_l;
        $itemJumlah['jumlah_p'] = $jumlah_p;
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $itemJumlah;
        return $data;
    }
    
    
    public static function getCountByPendidikanID() {
        
        $tWarga =& wbModule::getModel('bds', 'd_warga');
        
        $jsonItems = wbRequest::getVarClean('jsonItems', 'str', '');        
        $item = wbUtil::jsonDecode($jsonItems);
        
        $jumlah = $tWarga->getCountByAge($item['param_id']);
        $jumlah_l = $tWarga->getCountByAge($item['param_id'], 6);
        $jumlah_p = $tWarga->getCountByAge($item['param_id'], 7);
        
        $itemJumlah = array();
        $itemJumlah['jumlah'] = $jumlah;
        $itemJumlah['jumlah_l'] = $jumlah_l;
        $itemJumlah['jumlah_p'] = $jumlah_p;
        
        $data = array('items' => array(), 'total' => 0, 'success' => true, 'message' => '');
        $data['items'] = $itemJumlah;
        return $data;
        
    }
    
    public static function pendidikan() {
        
        $tParameter =& wbModule::getModel('bds', 'p_parameter');
        
        $tParameter->setCriteria('p_parameter_type.ptype_code ILIKE ?', 'PENDIDIKAN');       
        $items = $tParameter->getAll(0,-1,'param_listing_no','ASC');
                
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }

}
