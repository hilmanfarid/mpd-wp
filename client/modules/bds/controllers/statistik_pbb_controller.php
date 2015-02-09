<?php
class statistik_pbb_controller extends wbController{
    
    public static function tampil() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_pbb', 'method' => 'tampil', 'type' => '' )),
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
        if(!empty($print))wbUtil::startExcel('pbb.xls');
        echo '<div class="body-wrap">';
        echo '<div align="center"><h3>DAFTAR JUMLAH SPPT DAN POKOK KETETAPAN PBB MENURUT KECAMATAN DI KOTA BANDUNG TAHUN '.$tahun.'</h3></div><br>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        $output = "<tr>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>NO</th>";
        $output.= "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Kecamatan</br><div style='font-style: italic;'>District</div></th>";
        $output.= "<th colspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-top: 1px solid black;'>".$tahun."</br></th>";
        $output.= "</tr>";
        
        $output.= "<tr>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>PBB</br>(buah)</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>PBB Terhutang</th>";
        $output.= "</tr>";
        $title = "";
        $no=1;
        $t_buah=0;
        $t_terhutang=0;
        foreach($items as $item){
        	$output.= "<tr>";
        	$output.= "<td width=50 align=center>".$no."</td>";
        	$output.= "<td>".$item['wilayah_nama']."</td>";
        	$output.= "<td align='center'>".number_format($item['sppt_pbb_buah'], 0, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['sppt_pbb_terhutang'], 0, ',', '.')."</td>";
        	$output.= "</tr>";
	        $t_buah+=$item['sppt_pbb_buah'];
	        $t_terhutang+=$item['sppt_pbb_terhutang'];
        	$no++;
        }
        $output.= "<tr>";
        $output.= "<th colspan=2 style='text-align:center;border-bottom: 1px solid black;border-top: 1px solid black;'>Kota Bandung</br><div style='font-style: italic;'>Bandung City</div></th>";
        $output.= "<th style='text-align:center;border-bottom: 1px solid black;border-top: 1px solid black;'>".number_format($t_buah, 0, ',', '.')."</th>";
        $output.= "<th style='text-align:center;border-bottom: 1px solid black;border-top: 1px solid black;'>".number_format($t_terhutang, 0, ',', '.')."</th>";
        $output.= "</tr>";
        $output.="</table>";
        echo $output;
        exit;
    }
}
