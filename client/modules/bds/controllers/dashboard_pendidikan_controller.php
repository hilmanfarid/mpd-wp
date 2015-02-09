<?php
class dashboard_pendidikan_controller extends wbController{
    
    public static function show() {
        
        $level_id = wbRequest::getVarClean('level_id', 'int', 0);
		$tahun = wbRequest::getVarClean('tahun', 'str', '');
		
		//timestamp
        $t = wbRequest::getVarClean('t', 'str', '');

        if(empty($level_id) or empty($tahun)) exit;

        try{
            $ws_client = self::getNusoap();

		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'dashboard_pendidikan', 'method' => 'show', 'type' => '' )),
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
        $itemLevel = $data['items']['itemLevel'];
                
        //$items = $tSchoolType->getAllByLevelID($level_id, $tahun);
        //$itemLevel = $tSchoolLevel->get($level_id);
        
        $print = wbRequest::getVarClean('print', 'int', 0);
        if(!empty($print))wbUtil::startExcel('pendidikan_dashboard.xls');
        
        
        echo '<div class="body-wrap">';
        echo '<div style="float:left;margin:5 5 0 5;">';
        echo '<div><h3>JUMLAH SISWA '.strtoupper($itemLevel['description']).' <br/>BERDASARKAN JENISNYA - TAHUN '.$tahun.'</h3></div>';
        if(!empty($print)){
	        echo '<table border="1" width ="100%">';
	    }else{
	    	echo '<table border="0" class="table-data" width ="100%">';
	    }
        echo '<tr>
                <th width="15">No</th>
                <th width="150">Jenis '.$itemLevel['description'].'</th>
                <th width="100">Jumlah Masuk </th>
                <th width="100">Jumlah Lulus </th>
                <th width="100">Jumlah Aktif </th>
              </tr>';    
        
        $i = 1;
        $datay = array();
        $dataCode = array();
        
        foreach($items as $item) {
            
            $datay[] = $item['jml_masuk'];
            $dataCode[] = $item['code'];
            
            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td>'.$item['code'].'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($item['jml_masuk'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($item['jml_lulus'],0).'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($item['jml_aktif'],0).'</td>';
            echo '</tr>';
        }
        
        echo '</table>';
        
        wbCore::loadJPGraph();
        
        // Create the graph and setup the basic parameters 
        $graph = new Graph(550,300,'auto');	
        $graph->img->SetMargin(40,30,40,40);
        $graph->SetScale("textint");
        $graph->SetFrame(true,'white',1); 
        $graph->SetColor('#C9C9C9');
        $graph->SetMarginColor('#D0DEF0');
        
        // Add some grace to the top so that the scale doesn't
        // end exactly at the max value. 
        //$graph->yaxis->scale->SetGrace(20);
        
        // Setup X-axis labels
        
        $graph->xaxis->SetTickLabels($dataCode);
        $graph->xaxis->SetFont(FF_FONT1);
        $graph->xaxis->SetColor('#400000','black');
        
        // Stup "hidden" y-axis by given it the same color
        // as the background
        $graph->yaxis->SetColor('lightblue','#004080');
        $graph->ygrid->SetColor('white');
        
        // Setup graph title ands fonts
        $graph->title->Set('GRAFIK SISWA '.strtoupper($itemLevel['description']).' - TAHUN '.$tahun);
        
        // Create a bar pot
        $bplot = new BarPlot($datay);
        $bplot->SetFillColor('#6C6CFF');
        $bplot->SetColor('darkblue');
        $bplot->SetWidth(0.5);
        $bplot->SetShadow('darkgray');
        
        // Setup the values that are displayed on top of each bar
        $bplot->value->Show();
        // Must use TTF fonts if we want text at an arbitrary angle
        $bplot->value->SetFont(FF_ARIAL,FS_NORMAL,8);
        $bplot->value->SetFormat('%d');
        // Black color for positive values and darkred for negative values
        $bplot->value->SetColor("black","darkred");
        $graph->Add($bplot);
        
        // Finally stroke the graph
        $graph->Stroke('var/dashboard/dashboard_pendidikan.png');
        
        echo '</div>';
        echo '</div>';
        echo '<div style="float:right;margin:15 5 0 5;"> <img src="'.wbServer::getBaseURL().'var/dashboard/dashboard_pendidikan.png?'.$t.'" alt="'.$t.'" /> </div>';
        
        exit;
    }

}
