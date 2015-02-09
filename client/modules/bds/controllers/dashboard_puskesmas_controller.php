<?php
class dashboard_puskesmas_controller extends wbController{
        
    public static function show() {
        
        try{
            $ws_client = self::getNusoap();

		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'dashboard_puskesmas', 'method' => 'show', 'type' => '' )),
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
		
		$itemsWilayah = $data['items'];		
		
		$print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('puskesmas.xls');
        
		echo '<div class="body-wrap">';
        echo '<div style="float:left;margin:5 5 0 5;">';
        echo '<div><h3>JUMLAH PUSKESMAS BERDASARKAN KECAMATAN</h3></div>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        echo '<tr>
                <th width="30">No</th>
                <th width="200">Kode Wilayah</th>
                <th width="200">Kecamatan</th>
                <th width="100">Jumlah</th>
              </tr>';
		
		$i = 1;
		$total = 0;
		$jumlahPuskesmas = 0;
		
			
		foreach($itemsWilayah as $item) {
		   
		    $params = array('controller' => json_encode(array('module' => 'bds','class' => 'dashboard_puskesmas', 'method' => 'getJumlahPerKecamatan', 'type' => '' )),
					        'jsonItems' => json_encode(array('wilayah_id' => $item['wilayah_id']))
					       );

            $ws_data = self::getResultData($ws_client, $params);
            $jumlahPuskesmas = $ws_data['data'];
            
            $total += $jumlahPuskesmas;
            
            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td>'.$item['wilayah_kode'].'</td>';
            echo '<td>'.$item['wilayah_nama'].'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($jumlahPuskesmas,0).'</td>';
            echo '</tr>';
        }
        
        echo '<tr>';
        echo '<td colspan="3" align="center"> <b>TOTAL PUSKESMAS</b> </td>';
        echo '<td align="right"> <b>'.wbUtil::numberFormat($total,0).'</b> </td>';
        echo '</tr>';
		echo '</table>';
		echo '</div>';
		echo '</div>';
		
        exit;    
    }
    
    

}
