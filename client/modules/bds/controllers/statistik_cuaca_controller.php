<?php
class statistik_cuaca_controller extends wbController{
    
    public static function udara() {
        
		$tahun = wbRequest::getVarClean('tahun', 'int', 0);
		$jenis = wbRequest::getVarClean('jenis', 'int', 0);
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_cuaca', 'method' => 'udara', 'type' => '' )),
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
        
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('cuaca_udara.xls');
        echo '<div class="body-wrap">';
        echo '<div align="center"><h3>CUACA MENURUT BULAN DAN UDARA DI KOTA BANDUNG PADA TAHUN '.$tahun.'</h3></div><br>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        $output = "<tr>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Bulan</br><div style='font-style: italic;'>Month</div></th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Penguapan</br><div style='font-style: italic;'>Evaporation</div>(mm)</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Tekanan Udara</br><div style='font-style: italic;'>Air Pressure</div>(mb)</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Kelembapan Nisbi</br><div style='font-style: italic;'>Relative Humidity</div>(%)</th>";
        $output.= "</tr>";
        $title = "";
        $no=1;
        foreach($items as $item){
        	$output.= "<tr>";
        	$output.= "<td align='center'>".$no."</td>";
        	$output.= "<td>".wbUtil::getMonthNames($item['bulan'])." / ".wbUtil::getMonthFull($item['bulan'])."</td>";
        	$output.= "<td align='center'>".number_format($item['penguapan'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['tekanan_udara'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['kelembaban'], 2, ',', '.')."</td>";
        	$output.= "</tr>";
        	$no++;
        }
        $output.="</table>";
        echo $output;
        exit;
    } 
    public static function curahHujan() {
                
		$tahun = wbRequest::getVarClean('tahun', 'int', 0);
		$jenis = wbRequest::getVarClean('jenis', 'int', 0);
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_cuaca', 'method' => 'curahHujan', 'type' => '' )),
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
        
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('cuaca_udara.xls');
        echo '<div class="body-wrap">';
        echo '<div align="center"><h3>CUACA DAN CURAH HUJAN DI KOTA BANDUNG MENURUT BULAN TAHUN '.$tahun.'</h3></div><br>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        
        $output = "<tr>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Bulan<div style='font-style: italic;'>Month</div></th>";
        $output.= "<th colspan=3 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Temperatur( &#176;C )<div style='font-style: italic;'>Temperature( &#176;C )</div></th>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Curah Hujan<div style='font-style: italic;'>Rainfall</div>(mm)</th>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Hari Hujan<div style='font-style: italic;'>Rain day</div>(hari)</th>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>LPM(%)<div style='font-style: italic;'>Sunshine Duration</div></th>";
        $output.= "</tr>";
        
        $output.= "<tr>";
        
        
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Rata-Rata<div style='font-style: italic;'>Average</div></th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Maks.<div style='font-style: italic;'>Max.</div></th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Min.<div style='font-style: italic;'>Min.</div></th>";
        $output.= "</tr>";
        $title = "";
        $no=1;
        foreach($items as $item){
        	$output.= "<tr>";
        	$output.= "<td align='center'>".$no."</td>";
        	$output.= "<td>".wbUtil::getMonthNames($item['bulan'])." / <div style='display:inline;font-style: italic;'>".wbUtil::getMonthFull($item['bulan'])."</div></td>";
        	$output.= "<td align='center'>".number_format($item['suhu_rata2'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['suhu_max'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['suhu_min'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['curah_hujan'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['hari_hujan'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['prosen_sinar'], 2, ',', '.')."</td>";
        	$output.= "</tr>";
        	$no++;
        }
        $output.="</table>";
        echo $output;
        exit;
    }   
    
    public static function angin() {
        
		$tahun = wbRequest::getVarClean('tahun', 'int', 0);
		$jenis = wbRequest::getVarClean('jenis', 'int', 0);
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_cuaca', 'method' => 'angin', 'type' => '' )),
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
        
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('cuaca_udara.xls');
        echo '<div class="body-wrap">';
        echo '<div align="center"><h3>CUACA MENURUT BULAN DAN KECEPATAN ANGIN (KNOT) DI KOTA BANDUNG PADA TAHUN '.$tahun.'</h3></div><br>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        $output = "<tr>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Bulan</br><div style='font-style: italic;'>Month</div></th>";
        $output.= "<th colspan=4 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Angin(Knot)</th>";
        $output.= "</tr>";
        
        $output.= "<tr>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Kecepatan Rata-Rata</br><div style='font-style: italic;'>Speed Average</div>(mb)</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Arah Terbanyak</br><div style='font-style: italic;'>Mostly Directional</div>(mb)</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Kecepatan Terbesar</br><div style='font-style: italic;'>Mostly Velocity</div>(%)</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Arah</br><div style='font-style: italic;'>Direction</div>(mb)</th>";
        $output.= "</tr>";
        
        $title = "";
        $no=1;
        foreach($items as $item){
        	$output.= "<tr>";
        	$output.= "<td align='center'>".$no."</td>";
        	$output.= "<td>".wbUtil::getMonthNames($item['bulan'])." / <div style='display:inline;font-style: italic;'>".wbUtil::getMonthFull($item['bulan'])."</div></td>";
        	$output.= "<td align='center'>".number_format($item['angin_rata2'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['arah_rata2'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['angin_max'], 2, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['arah_max'], 2, ',', '.')."</td>";
        	$output.= "</tr>";
        	$no++;
        }
        $output.="</table>";
        echo $output;
        exit;
    }
}
