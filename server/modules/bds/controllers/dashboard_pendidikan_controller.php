<?php
class dashboard_pendidikan_controller extends wbController{
    
    public static function show() {
        
        
        $tSchoolLevel =& wbModule::getModel('bds', 'p_school_level');
        $tSchoolType =& wbModule::getModel('bds', 'p_school_type');
        
        $level_id = wbRequest::getVarClean('level_id', 'int', 0);
		$tahun = wbRequest::getVarClean('tahun', 'str', '');
		
		//timestamp
        $t = wbRequest::getVarClean('t', 'str', '');
		
        
        $items = $tSchoolType->getAllByLevelID($level_id, $tahun);
        $itemLevel = $tSchoolLevel->get($level_id);
        
        $retItems = array();
        $retItems['items'] = $items;
        $retItems['itemLevel'] = $itemLevel;
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $data['items'] = $retItems;
        $data['success'] = true;
        
        return $data;
    }

}
