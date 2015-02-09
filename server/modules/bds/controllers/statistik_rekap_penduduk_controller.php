<?php
class statistik_rekap_penduduk_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $penduduk =& wbModule::getModel('bds', 't_rpddk');
        $jenis = wbRequest::getVarClean('jenis', 'int', 0);
        if(!empty($jenis)){
	        $penduduk->setCriteria('jenisdata='.$jenis);
		}
		if(!empty($tahun)){
	        $penduduk->setCriteria('tahun='.$tahun);
		}
		$kelompok= array('1' => 'Usia' ,'2' => 'Pendidikan');
		$items = $penduduk->getAll(0, -1, 'kelompok_id', 'ASC');
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    }
}
