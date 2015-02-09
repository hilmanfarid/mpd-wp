<?php
class statistik_pertanian_controller extends wbController{
    
    public static function show() {
        
        
        $type_id = wbRequest::getVarClean('type_id', 'int', 0);
		$tahun = wbRequest::getVarClean('tahun', 'str', '');
		
		//timestamp
        $t = wbRequest::getVarClean('t', 'str', '');
		
        if(empty($type_id) or empty($tahun)) exit;
        
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_pertanian', 'method' => 'show', 'type' => '' )),
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
        
        $items = $data['items']['items'];		
        $itemParameter = $data['items']['itemParameter'];
        
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('rumah_sakit.xls');
        echo '<div class="body-wrap">';
        echo '<div style="float:left;margin:5 5 0 5;">';
        echo '<div><h3>PRODUKSI PERTANIAN '.$itemParameter['param_name'].' - TAHUN '.$tahun.'</h3></div>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" class="table-data" width ="100%">';
	    }
        echo '<tr>
                <th width="15">No</th>
                <th width="200">Jenis Komoditas</th>
                <th width="160">Luas Tanaman(Ha)</th>
                <th width="160">Luas Panen(Ha) </th>
                <th width="160">Produktivitas(Ku/Ha)</th>
                <th width="160">Produksi(Ton)</th>
              </tr>';    
        
        $i = 1;
                
        foreach($items as $item) {
            
            $params = array('controller' => json_encode(array('module' => 'bds','class' => 'statistik_pertanian', 'method' => 'getProduksiKomoditas', 'type' => '' )),
					        'jsonItems' => json_encode(array('tahun' => $tahun, 'd_agr_komiditas_id' => $item['d_agr_komiditas_id']))
					       );

            $ws_data = self::getResultData($ws_client, $params);
            $itemProduksi = $ws_data['data'];
            
            //if (empty($itemProduksi))continue;
            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td>'.$item['komoditas_name'].'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemProduksi['luas_tanam'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemProduksi['luas_panen'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemProduksi['productivity'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($itemProduksi['produksi'],0).'</td>';
            echo '</tr>';
        }
        
        echo '</table>';
        
        exit;
    }

}
