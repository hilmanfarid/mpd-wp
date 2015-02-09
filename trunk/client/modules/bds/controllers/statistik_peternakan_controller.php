<?php
class statistik_peternakan_controller extends wbController{
    
    public static function show() {
        
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_peternakan', 'method' => 'show', 'type' => '' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);

            $ws_data = self::getResultData($ws_client, $params);

            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        
        $itemsJenis = $data['items'];
		//timestamp
        $tahun = wbRequest::getVarClean('tahun', 'int', '');
			
		$print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('rumah_sakit.xls');
		echo '<div class="body-wrap">';
        echo '<div align="center"><h3>POPULASI TERNAK KOTA BANDUNG TAHUN '.$tahun.'</h3></div><br/>';
        
        if(!empty($print)){
	        echo '<table border="1" width ="90%">';
	    }else{
	    	echo '<table border="0" class="table-data" width ="90%">';
	    }
        echo '<tr>';
        echo '<th>No</th>';
        echo '<th>Jenis Ternak</th>';
        echo '<th>Populasi</th>';
        echo '<th>Jumlah Potong</th>';
        echo '<th>Produksi Daging</th>';
        echo '</tr>';
        
        $no = 1;
        foreach($itemsJenis as $item) {
            
            $params = array('controller' => json_encode(array('module' => 'bds','class' => 'statistik_peternakan', 'method' => 'getItem', 'type' => '' )),
					        'jsonItems' => json_encode(array('tahun' => $tahun, 'wilayah_id' => $item['wilayah_id']))
					       );

            $ws_data = self::getResultData($ws_client, $params);
            $itemTernak = $ws_data['data'];
            
            //if (empty($itemTernak))continue;
            echo '<tr>';
            echo '<td>'.$no++.'</td>';
            echo '<td>'.$item['param_name'].'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemTernak['ternak_populasi'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemTernak['ternak_jml_potong'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemTernak['ternak_produksi_daging'],0).'</td>';
            echo '</tr>';
        }
        
        echo '</table>';
        echo '</div>';
        echo '</div>';
        exit;
    }
}
?>