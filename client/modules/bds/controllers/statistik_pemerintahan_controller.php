<?php
class statistik_pemerintahan_controller extends wbController{
    
    public static function tampil() {
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'statistik_pemerintahan', 'method' => 'tampil', 'type' => '' )),
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
        if(!empty($print))wbUtil::startExcel('pemerintahan.xls');
        //timestamp
        echo '<html>';
        echo '<div class="body-wrap">';
        echo '<div align="center"><h3>BANYAKNYA RT DAN RW PER KELURAHAN DAN KECAMATAN DI KOTA BANDUNG</h3></div><br>';
		if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" width ="100%">';
	    }
		echo "<tr>";
		echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>No</th>";
		echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Kecamatan</th>";
		echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Kelurahan</th>";
		echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah RT</th>";
		echo "<th style='text-align:center;background-color: rgb(224, 224, 224);border-bottom: 1px solid black;border-top: 1px solid black;'>Jumlah RW</th>";
		echo "</tr>";
        $title = "";
        $no_urut_kec=1;
        foreach($items as $item){
        	if($title!=$item['kecamatan']){
        		echo "<tr>";
        		echo "<td align='center'>".$no_urut_kec."</td>";
	        	echo "<td>".strtoupper($item['kecamatan'])."</td>";
	        	echo "<td>&nbsp</td>";
	        	echo "<td>&nbsp</td>";
	        	echo "<td>&nbsp</td>";
	        	echo "</tr>";
	        	$title =$item['kecamatan'];
	        	$no_urut_kec++;
        	}
        	echo "<tr>";
        	echo "<td>&nbsp</td>";
        	echo "<td>&nbsp</td>";
        	echo "<td>".$item['kelurahan']."</td>";
        	echo "<td align='right'>".$item['jum_rt']."</td>";
        	echo "<td align='right'>".$item['jum_rw']."</td>";
        	echo "</tr>";
        }
        echo "</table></div>";
        echo '</html>';
        session_write_close();
        exit;
    } 
    public static function cek() {
    	$wilayah =& wbModule::getModel('bds', 'p_wilayah');
    	$param[0]=array('value'     => '94',
			  	'field'    => 'wilayah_id');
		$param[1]=array('value'     => '88',
				'field'    => 'wilayah_pid');
		$param[1]=array('value'     => '42',
				'field'    => 'wilayah_status');
        $items = $wilayah->uniqueAll('bds_p_wilayah',$param);
        echo $items;
        exit;
    }
}
