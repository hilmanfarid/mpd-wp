<?php
class statistik_pasar_daerah_controller extends wbController{
    
    public static function tampil() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_pasar_daerah', 'method' => 'tampil', 'type' => '' )),
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
        $items = $data['items'];
        
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('pasar_daerah.xls');
        echo '<div class="body-wrap">';

	    echo '<div align="center"><h3>PASAR TRADISIONAL DI KOTA BANDUNG TAHUN '.$tahun.'</h3></div><br>';

        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        echo "<tr>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Nama Pasar</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah Ruang</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Pedagang Aktif</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Pedagang Pasif</th>";
        echo "</tr>";
        $no=1;
        foreach($items as $item){
        	echo "<tr>";
        	echo "<td align='center'>".$no."</td>";
        	echo "<td>".$item['pasar_name']."</td>";
        	echo "<td align='right'>".number_format((!empty($item['jum_ruang']) ? $item['jum_ruang']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['aktif']) ? $item['aktif']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['pasif']) ? $item['pasif']:0), 0, ',', '.')."</td>";
        	echo "</tr>";
        	$no++;
        }
      
        echo "</table>";
        exit;
    }
}
