<?php
class statistik_pariwisata_controller extends wbController{
    
    public static function tampil() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_pariwisata', 'method' => 'tampil', 'type' => '' )),
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
        if(!empty($print))wbUtil::startExcel('pariwisata.xls');
        echo '<div class="body-wrap">';

	    echo '<div align="center"><h3>JUMLAH PENGUNJUNG DAN TENAGA KERJA OBYEK WISATA. TAMAN REKREASI / MUSEUM DI KOTA BANDUNG TAHUN '.$tahun.'</h3></div><br>';

        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
        echo "<tr>";
        echo "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
        echo "<th rowspan=2 style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jenis Objek Wisata</th>";
        echo "<th colspan=3 style='text-align:center;background-color: rgb(224, 224, 224);border-top: 1px solid black;'>Wisatawan</th>";
        echo "<th colspan=3 style='text-align:center;background-color: rgb(224, 224, 224);border-top: 1px solid black;'>Tenaga Kerja</th>";
        echo "</tr>";

        echo "<tr>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Domestik</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Mancanegara</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Laki-laki</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Perempuan</th>";
        echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah</th>";
        echo "</tr>";
        
        $no=1;
        $tot_domestik=0;
        $tot_lokal=0;
        $tot_domlok=0;
        $tot_laki=0;
        $tot_wanita=0;
        $tot_laki_wanita=0;
        foreach($items as $item){
        	echo "<tr>";
        	echo "<td align='center'>".$no."</td>";
        	echo "<td>".$item['wisata_name']."</td>";
        	echo "<td align='right'>".number_format((!empty($item['wisdom']) ? $item['wisdom']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['wisman']) ? $item['wisman']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['jum_wis']) ? $item['jum_wis']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['peg_pria']) ? $item['peg_pria']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['peg_wanita']) ? $item['peg_wanita']:0), 0, ',', '.')."</td>";
        	echo "<td align='right'>".number_format((!empty($item['jum_peg']) ? $item['jum_peg']:0), 0, ',', '.')."</td>";
        	echo "</tr>";
        	$no++;
        	$tot_domestik += $item['wisdom'];
	        $tot_lokal += $item['wisman'];
	        $tot_domlok += $item['jum_wis'];
	        $tot_laki += $item['peg_pria'];
	        $tot_wanita += $item['peg_wanita'];
	        $tot_laki_wanita += $item['jum_peg'];
        }
      	echo "<tr>";
      	echo "<th colspan=2 style='text-align:center;border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah / <div style='font-style: italic;display: inline;'>Total</div></th>";
      	echo "<th style='text-align:right;border-bottom: 1px solid black;border-top: 1px solid black;'>".$tot_domestik."</th>";
      	echo "<th style='text-align:right;border-bottom: 1px solid black;border-top: 1px solid black;'>".$tot_lokal."</th>";
      	echo "<th style='text-align:right;border-bottom: 1px solid black;border-top: 1px solid black;'>".$tot_domlok."</th>";
      	echo "<th style='text-align:right;border-bottom: 1px solid black;border-top: 1px solid black;'>".$tot_laki."</th>";
      	echo "<th style='text-align:right;border-bottom: 1px solid black;border-top: 1px solid black;'>".$tot_wanita."</th>";
      	echo "<th style='text-align:right;border-bottom: 1px solid black;border-top: 1px solid black;'>".$tot_laki_wanita."</th>";
      	echo "</tr>";
      	
        echo "</table>";
        exit;
    }
}
