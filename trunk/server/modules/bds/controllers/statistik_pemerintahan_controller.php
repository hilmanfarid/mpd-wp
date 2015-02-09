<?php
class statistik_pemerintahan_controller extends wbController{
    
    public static function tampil() {
        
        $wilayah =& wbModule::getModel('bds', 'p_wilayah');
        $items = $wilayah->total_rt_rw();
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $items;
        $data['success'] = true;
        
        return $data;
    } 
    
    public static function cek() {
    	$wilayah =& wbModule::getModel('bds', 'p_wilayah');
    	$param[0]=array('value'     => '94',
			  	'field'    => 'wilayah_id');
		$param[1]=array('value'     => '88',
				'field'    => 'wilayah_pid');
		$param[1]=array('value'     => '42',
				'field'    => 'wilayah_status');
        $items = $wilayah->uniqueAll('bds_p_wilayah',$param);
        echo $items;
        exit;
    }
}
