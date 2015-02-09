<?php
class statistik_pasar_daerah_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $daerah =& wbModule::getModel('bds', 'd_pasar');
        $items = $daerah->rekapPasar($tahun);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
