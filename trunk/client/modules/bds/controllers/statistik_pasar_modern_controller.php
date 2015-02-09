<?php
class statistik_pasar_modern_controller extends wbController{
    
    public static function tampil() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_pasar_modern', 'method' => 'tampil', 'type' => '' )),
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
        if(!empty($print))wbUtil::startExcel('pasar_modern.xls');
        echo '<div class="body-wrap">';

	    echo '<div align="center"><h3>PASAR MODERN DI KOTA BANDUNG MENURUT JENIS DAN LUAS GERAI TAHUN '.$tahun.'</h3></div><br>';

        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        $output = "<tr>";
        $output.= "<th rowspan='2' style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        $output.= "<th rowspan='2' style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>JENIS PASAR / <div style='font-style: italic;display: inline;'>MARKET TYPE</div></th></th>";
        $output.= "<th colspan='2' style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah / <div style='font-style: italic;display: inline;'>NUMBER</div></th>";
        $output.= "</tr>";
        $output.= "<tr>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'> &gt; 2000 M2 </th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'> &lt; 2000 M2 </th>";
        
        $output.= "</tr>";
        
        
        
        $no=1;
        foreach($items as $item){
        	$output.= "<tr>";
        	$output.= "<td align='center'>".$no."</td>";
        	$output.= "<td>".$item['param_name']."</td>";
        	$output.= "<td align='center'>".number_format($item['mmart_luas_gt_2000'], 0, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['mmart_luas_lt_2000'], 0, ',', '.')."</td>";
        	$output.= "</tr>";
        	$no++;
        }
      
        $output.="</table>";
        echo $output;
        exit;
    }
}
