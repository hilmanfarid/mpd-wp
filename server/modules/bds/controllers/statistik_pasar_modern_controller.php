<?php
class statistik_pasar_modern_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $modern =& wbModule::getModel('bds', 't_modern_mart');
        $items = $modern->rekapTahun($tahun);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
