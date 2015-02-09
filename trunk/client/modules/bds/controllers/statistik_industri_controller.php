<?php
class statistik_industri_controller extends wbController{
    
    public static function tampil() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_industri', 'method' => 'tampil', 'type' => '' )),
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
        if(!empty($print))wbUtil::startExcel('industri.xls');
        echo '<div class="body-wrap">';
        if($tahun != $tahun_akhir){
	        echo '<div align="center"><h3>BANYAKNYA PERUSAHAAN INDUSTRI BESAR DAN SEDANG DAN TENAGA KERJA YANG DAPAT DISERAP DI KOTA BANDUNG TAHUN '.$tahun.' - '.$tahun_akhir.'</h3></div><br>';
	    }else{
	    	echo '<div align="center"><h3>BANYAKNYA PERUSAHAAN INDUSTRI BESAR DAN SEDANG DAN TENAGA KERJA YANG DAPAT DISERAP DI KOTA BANDUNG TAHUN '.$tahun.'</h3></div><br>';
	    }
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        $output = "<tr>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Tahun<div style='font-style: italic;'>Year</div></th></th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Banyaknya Usaha</br><div style='font-style: italic;'>Number Of Establishment</div></th>";
        $output.= "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Tenaga Kerja</br><div style='font-style: italic;'>Man Power</div></th>";
        $output.= "</tr>";
        $no=1;
        foreach($items as $item){
        	$output.= "<tr>";
        	$output.= "<td>".$no."</td>";
        	$output.= "<td>".$item['industri_tahun']."</td>";
        	$output.= "<td align='center'>".number_format($item['tot_industri'], 0, ',', '.')."</td>";
        	$output.= "<td align='center'>".number_format($item['tot_pekerja'], 0, ',', '.')."</td>";
        	$output.= "</tr>";
        	$no++;
        }
      
        $output.="</table>";
        echo $output;
        exit;
    }
}
