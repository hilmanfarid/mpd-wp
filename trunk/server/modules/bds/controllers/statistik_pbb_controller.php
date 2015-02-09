<?php
class statistik_pbb_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        
        $wilayah =& wbModule::getModel('bds', 'p_parameter');
        $items = $wilayah->pbb_sppt($tahun);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
