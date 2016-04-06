<?php
class transaksi_harian_controller extends wbController{
    public function printTransaksiHarian(){
        $user_name = wbSession::getVar('user_name');
        if(empty($user_name))return;
        // Get arguments from argument array
        $date_start = wbRequest::getVarClean('date_start', 'str', '');
        $date_end = wbRequest::getVarClean('date_end', 'str', '');
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'cust_acc_trans', 'method' => 'readExist', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
        }catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        self::print_laporan($ws_data['data'],array('username' => $user_name,'date_start' => $date_start,'date_end' => $date_end));
    }
    function print_laporan($param_arr,$param2){
    	include "lib/fpdf17/mc_table.php";
    	$_BORDER = 0;
    	$_FONT = 'Times';
    	$_FONTSIZE = 10;
        $pdf = new PDF_MC_Table();
    	$size = $pdf->_getpagesize('A4');
    	$pdf->DefPageSize = $size;
    	$pdf->CurPageSize = $size;
        $pdf->AddPage('Portrait', 'A4');
        $pdf->SetFont('helvetica', '', $_FONTSIZE);
    	$pdf->SetRightMargin(5);
    	$pdf->SetLeftMargin(9);
    	$pdf->SetAutoPageBreak(false,0);
    
    	$pdf->SetFont('helvetica', '',15);
    	$pdf->SetWidths(array(200));
    	$pdf->ln(1);
        $pdf->RowMultiBorderWithHeight(array("Laporan Transaksi Harian"),array('',''),6);
        $pdf->SetFont('helvetica', '',12);
    	$pdf->SetWidths(array(40,10,200));
    	$pdf->ln(1);
        $pdf->RowMultiBorderWithHeight(array("NPWP",":",$param2['username']),array('','',''),6);
        $pdf->RowMultiBorderWithHeight(array("Tanggal",":",$param2['date_start'].' s/d '.$param2['date_end']),array('','',''),6);
    	$pdf->ln(8);
    	$pdf->SetWidths(array(10,40,40,60));
    	$pdf->SetAligns(array('C','C','C','C'));
    	$pdf->RowMultiBorderWithHeight(array("No","Tanggal Transaksi","No Faktur","Nilai Transaksi"),array('LTBR','LTBR','LTBR'),6);
    	$i=1;
    	$pdf->SetAligns(array('L','L','L','R'));
    	foreach($param_arr as $item){
			if ($item['bill_no_end']!=''){
				$bill_no = $item['bill_no'].'-'.$item['bill_no_end'];
			}else{
				$bill_no = $item['bill_no'];
			}
    	    $pdf->RowMultiBorderWithHeight(array($i,$item['trans_date'],$bill_no,'Rp. '.number_format($item['service_charge'],2,'.',',')),array('LTBR','LTBR','LTBR'),6);
    	    $i++;
    	}
    	$pdf->Output("","I");
    	exit;	
    }
}
