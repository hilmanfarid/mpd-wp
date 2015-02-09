<?php
class statistik_rute_angkutan_controller extends wbController{
    
    public static function show() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_rute_angkutan', 'method' => 'show', 'type' => '' )),
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
        
        $itemsTrayek = $data['items'];
        
		//timestamp
        $tahun = wbRequest::getVarClean('tahun', 'int', '');
		
		$print = wbRequest::getVarClean('print', 'int', 0);
        
        if(!empty($print))wbUtil::startExcel('rute_angkutan.xls');
		echo '<div class="body-wrap">';
        echo '<div align="center"><h3>JUMLAH ARMADA ANGKUTAN KOTA DI KOTA BANDUNG TAHUN '.$tahun.'</h3></div><br/>';
        if(!empty($print)){
	        echo '<table border="1" width ="90%">';
	    }else{
	    	echo '<table border="0" class="table-data" width ="90%">';
	    }
        echo '<tr>';
        echo '<th>No</th>';
        echo '<th>Kode Trayek</th>';
        echo '<th>Lintasan Trayek(Route)</th>';
        echo '<th>Jarak(Km)</th>'; 
        echo '<th>Jumlah Armada</th>';
        echo '<th>Jumlah Angkot</th>';
        echo '</tr>';
        
        $no = 1;
        foreach($itemsTrayek as $item) {
            
            $params = array('controller' => json_encode(array('module' => 'bds','class' => 'statistik_rute_angkutan', 'method' => 'getItem', 'type' => '' )),
					        'jsonItems' => json_encode(array('tahun' => $tahun, 'trayek_id' => $item['trayek_id']))
					       );

            $ws_data = self::getResultData($ws_client, $params);
            $itemArmada = $ws_data['data'];
            
            if (empty($itemArmada))continue;
            echo '<tr>';
            echo '<td align=center>'.$no++.'</td>';
            echo '<td>'.$item['trayek_code'].'</td>';
            echo '<td>'.$item['trayek_name'].'</td>';
            echo '<td>'.$item['trayek_panjang'].'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemArmada['armada_jml'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemArmada['armada_jml_angkot'],0).'</td>';
            echo '</tr>';
        }
        
        echo '</table>';
        echo '</div>';
        echo '</div>';
        exit;
    }
}
?>