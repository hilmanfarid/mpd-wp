<?php
class statistik_rekap_penduduk_controller extends wbController{
    
    public static function tampil() {
        $tahun = wbRequest::getVarClean('tahun', 'int', 0);
        $jenis = wbRequest::getVarClean('jenis', 'int', 0);
        
		$kelompok= array('1' => 'Usia' ,'2' => 'Pendidikan');
		
		try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_rekap_penduduk', 'method' => 'tampil', 'type' => '' )),
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
		
        //timestamp
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('rekap_penduduk.xls');               
        echo '<div class="body-wrap">';
        echo '<div><h3>JUMLAH PENDUDUK MENURUT KELOMPOK '.strtoupper($kelompok[$jenis]).'</h3></div>';
        if(!empty($print)){
        	echo '<table border=1 class="table-data">';
        }else{
	        echo '<table class="table-data">';
	    }
        echo '<tr>
                <th width="30" style="text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;">No</th>
                <th width="150" style="text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;">'.$kelompok[$jenis].'</th>
                <th width="150" style="text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;">Jumlah Laki-laki</th>
                <th width="150" style="text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;">Jumlah Perempuan</th>
                <th width="150" style="text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;">Jumlah Total</th>
              </tr>';    
        
        $i = 1;
        foreach($items as $item) {  
            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td align="center"><b>'.$item['kelompok'].'</b></td>';
            echo '<td align="right">'.$item['laki'].'</td>';
            echo '<td align="right">'.$item['perempuan'].'</td>';
            echo '<td align="right">'.($item['laki']+$item['perempuan']).'</td>';
            echo '</tr>';
        }
        
        echo '</table>';
        exit;
    }
}
