<?php
class statistik_pendapatan_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $wilayah =& wbModule::getModel('bds', 'p_parameter');
        $items = $wilayah->pendapatanDaerah($tahun);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
