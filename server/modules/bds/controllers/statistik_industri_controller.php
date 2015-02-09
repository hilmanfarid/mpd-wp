<?php
class statistik_industri_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $tahun_akhir = wbRequest::getVarClean('tahun_akhir', 'int', 0);
        $industri =& wbModule::getModel('bds', 't_industri');
        $items = $industri->rekapIndustriTahun($tahun, $tahun_akhir);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
