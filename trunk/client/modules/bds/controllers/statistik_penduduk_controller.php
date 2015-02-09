<?php
class statistik_penduduk_controller extends wbController{
    
    public static function usia() {
        
        
        $t = wbRequest::getVarClean('t', 'str', '');
        
        if(empty($t)) exit;
        $arrayKategori = array(
            array('text' => '0 - 14 Tahun',  'condition' => 'extract(year from now()) - warga_thn_lahir <= 14'),
            array('text' => '15 - 64 Tahun', 'condition' => 'extract(year from now()) - warga_thn_lahir > 14
                                            AND extract(year from now()) - warga_thn_lahir <= 64'),            
            array('text' => '> 64 Tahun', 'condition' => 'extract(year from now()) - warga_thn_lahir > 64')
        );
        
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('usia_penduduk.xls');               
        echo '<div class="body-wrap">';
        echo '<div><h3>JUMLAH PENDUDUK MENURUT KELOMPOK USIA</h3></div>';
        if(!empty($print)){
        	echo '<table border=1 class="table-data">';
        }else{
	        echo '<table class="table-data">';
	    }
        echo '<tr>
                <th width="30">No</th>
                <th width="150">Usia</th>
                <th width="150">Jumlah Laki-laki</th>
                <th width="150">Jumlah Perempuan</th>
                <th width="150">Jumlah Total</th>
              </tr>';    
        
        $ws_client = self::getNusoap();
        
        $i = 1;
        foreach($arrayKategori as $item) {
            
            $jumlah = 0;
            $params = array('controller' => json_encode(array('module' => 'bds','class' => 'statistik_penduduk', 'method' => 'getCountByAge', 'type' => '' )),
					        'jsonItems' => json_encode(array('condition' => $item['condition']))
					       );

            $ws_data = self::getResultData($ws_client, $params);
            $itemJumlah = $ws_data['data'];
                        
            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td align="center"><b>'.$item['text'].'</b></td>';
            echo '<td align="right">'.$itemJumlah['jumlah_l'].'</td>';
            echo '<td align="right">'.$itemJumlah['jumlah_p'].'</td>';
            echo '<td align="right">'.$itemJumlah['jumlah'].'</td>';
            echo '</tr>';
        }
        
        echo '</table>';
        
        
        exit;
    }
    
    
    public static function pendidikan() {
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_penduduk', 'method' => 'pendidikan', 'type' => '' )),
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
            print_r("Error:".$data['message']);
            exit;
        }
        
        $items = $data['items'];		
        
		$print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('pendidikan_penduduk.xls');
        echo '<div class="body-wrap">';
        echo '<div><h3>JUMLAH PENDUDUK MENURUT KELOMPOK PENDIDIKAN</h3></div>';
        if(!empty($print)){
        	echo '<table border=1 class="table-data">';
        }else{
	        echo '<table class="table-data">';
	    }
        echo '<tr>
                <th width="30">No</th>
                <th width="150">Pendidikan</th>
                <th width="150">Jumlah Laki-laki</th>
                <th width="150">Jumlah Perempuan</th>
                <th width="150">Jumlah Total</th>
              </tr>';    
        
        $i = 1;
        foreach($items as $item) {
            
            $params = array('controller' => json_encode(array('module' => 'bds','class' => 'statistik_penduduk', 'method' => 'getCountByPendidikanID', 'type' => '' )),
					        'jsonItems' => json_encode(array('param_id' => $item['param_id']))
					       );

            $ws_data = self::getResultData($ws_client, $params);
            $itemJumlah = $ws_data['data'];
                        
            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td>'.$item['param_name'].'</td>';
            echo '<td align="right">&nbsp;'.$itemJumlah['jumlah_l'].'</td>';
            echo '<td align="right">&nbsp;'.$itemJumlah['jumlah_p'].'</td>';
            echo '<td align="right">&nbsp;'.$itemJumlah['jumlah'].'</td>';
            echo '</tr>';
        }
        echo '</table>';
        
        exit;
    }

}
