<?php
class dashboard_jalan_controller extends wbController{

    public static function show() {

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $jenis_jalan = wbRequest::getVarClean('jenis_jalan', 'int', 0);

        if(empty($jenis_jalan)) {
            exit;
        }

        try{
            $ws_client = self::getNusoap();

		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'dashboard_jalan', 'method' => 'show', 'type' => '' )),
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

        echo '<div class="body-wrap">';
        echo '<div style="float:left;margin:5 5 0 5;">';
        echo '<div><h3>DATA JALAN</h3></div>';
        echo '<table class="table-data">';
        echo '<tr>
                <th width="30">No</th>
                <th width="200">Jenis Jalan</th>
                <th width="100">Panjang(Km)</th>
              </tr>';

        $i = 1;
        $datay = array();
        $dataCode = array();

        foreach($items as $item) {

            $datay[] = $item['panjang'];
            $dataCode[] = $item['param_name'];

            echo '<tr>';
            echo '<td>'.$i++.'</td>';
            echo '<td>'.$item['param_name'].'</td>';
            echo '<td align="right">'.wbUtil::numberFormat($item['panjang'],0).'</td>';
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
        $graph->title->Set('DATA JALAN');

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
        $graph->Stroke('var/dashboard/dashboard_jalan.png');

        echo '</div>';
        echo '</div>';
        echo '<div style="float:right;margin:15 5 0 5;"> <img src="var/dashboard/dashboard_jalan.png?'.$t.'" alt="'.$t.'" /> </div>';


        exit;
    }

}
