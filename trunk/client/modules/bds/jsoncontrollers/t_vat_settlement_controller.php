<?php
/**
 * t_vat_settlement
 * class controller for table bds_t_vat_settlement
 *
 * @since 23-10-2012 12:07:20
 * @author hliman farid
 */
class t_vat_settlement_controller extends wbController{
    /**
     * read
     * controler for get all items
     */
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'read', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
            
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['msg']=$data['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;

    }

    /**
     * create
     * controler for create new item
     */
    public static function create($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'create', 'type' => 'json' )),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
            $ws_data = self::getResultData($ws_client, $params);
        
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['msg']=$data['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }

        return $data;
    }

    /**
     * update
     * controler for update item
     */
    public static function update($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'update', 'type' => 'json' )),
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

        return $data;
    }

    /**
     * update
     * controler for remove item
     */
    public static function destroy($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'destroy', 'type' => 'json')),
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
        return $data;
    }
    public static function createSptpd($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'createSptpd', 'type' => 'json' )),
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
        return $data;

    }
    public static function submitSptpd($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'submitSptpd', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
            
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
            $data['msg']=$data['message'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;

    }
    public function printNoBayar(){
        include "lib/fpdf17/mc_table.php";
		include "lib/qrcode/generate-qr-file.php";
        $_GET['payment_key'] = $_GET['no_bayar'];
        $items = self::read();
        $no_bayar = wbRequest::getVarClean('no_bayar', 'str', '');
		
		$data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 't_vat_settlement', 'method' => 'getPaymentInfo', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
            //throw new Exception ($ws_data['da']);
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
            $data['msg']=$data['message'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
		$items = $data['items'] ;
		
		
    	$_BORDER = 0;
    	$_FONT = 'Times';
    	$_FONTSIZE = 10;
        $pdf = new PDF_MC_Table();
    	$size = $pdf->_getpagesize('Legal');
    	$pdf->DefPageSize = $size;
    	$pdf->CurPageSize = $size;
        $pdf->AddPage('Landscape', array(160,241.3));
        $pdf->SetFont('helvetica', '', $_FONTSIZE);
    	$pdf->SetRightMargin(5);
    	$pdf->SetLeftMargin(9);
		$pdf->SetTopMargin(-20);
    	$pdf->SetAutoPageBreak(false,0);
		
		$pdf->Image('images/logo_pemda.png',12,15,20,20);
    
    	$pdf->SetFont('helvetica', 'B',14);
    	$pdf->SetWidths(array(15,195));
		$pdf->SetAligns(array("C","C"));
    	$pdf->RowMultiBorderWithHeight(array("","PEMERINTAH KOTA BANDUNG\nDINAS PELAYANAN PAJAK"),array('',''),6);
		$pdf->SetFont('helvetica', '',12);
		$pdf->RowMultiBorderWithHeight(array("","Jalan Wastukancana No.2\nTelp. 022-4235052 - Bandung"),array('',''),6);
		$pdf->RowMultiBorderWithHeight(array("",$data['message']),array('B','B'),6);
		$pdf->ln(2);
		
		$pdf->SetFont('helvetica', '',12);
		$pdf->SetAligns(array("L","L","L"));
    	$pdf->SetWidths(array(40,4,80));
    	$pdf->ln(2);
    	$pdf->RowMultiBorderWithHeight(array("WAJIB PAJAK",":",$items['wp_name']),array('','',''),6);
		
		$pdf->SetAligns(array("L","L","L","C"));
    	$pdf->SetWidths(array(40,4,80,100));
		$pdf->RowMultiBorderWithHeight(array("NPWPD",":",$items['npwd'],"NO PEMBAYARAN"),array('','','','BLTR'),6);
		
		$pdf->SetAligns(array("L","L","L"));
    	$pdf->SetWidths(array(40,4,80));
		//$pdf->RowMultiBorderWithHeight(array("JENIS PAJAK",":",$items['items'][0]['vat_code']),array('','',''),6);
		$pdf->Cell(40, 6, 'JENIS PAJAK', "", 0, 'l');
		$pdf->Cell(4, 6, ':', "", 0, 'L');
		$pdf->Cell(80, 6, $items['vat_code'], "", 0, 'L');
		$pdf->SetFont('helvetica', 'B',20);
		$pdf->Cell(100, 15, $no_bayar, "BLTR", 0, 'C');
		$pdf->SetFont('helvetica', '',12);
		$pdf->ln(6);
		$pdf->RowMultiBorderWithHeight(array("MASA PAJAK",":",$items['code']),array('','',''),6);
		
		$pdf->SetAligns(array("L","L","R"));
		$pdf->SetWidths(array(40,4,30));
		$pdf->RowMultiBorderWithHeight(array("JUMLAH (Rp)",":",number_format($items['total_vat_amount'],2,",",".")),array('','',''),6);
		$pdf->RowMultiBorderWithHeight(array("DENDA (Rp)",":",number_format($items['total_penalty_amount'],2,",",".")),array('','',''),6);
		$pdf->RowMultiBorderWithHeight(array("TOTAL (Rp)",":",number_format($items['total_bayar'],2,",",".")),array('','',''),6);
		$pdf->SetAligns(array("L","L","L"));
		$pdf->SetWidths(array(40,4,80));
		
		$pdf->RowMultiBorderWithHeight(array("TERBILANG",":",ucwords($items['dengan_huruf'].' rupiah')),array('','',''),6);
        //$pdf->RowMultiBorderWithHeight(array("BATAS WAKTU PEMBAYARAN",":",$items['items'][0]['pay_due_date']),array('','',''),6);
		
        $pdf->SetWidths(array(224));
		$pdf->SetAligns(array("L"));
        $pdf->SetFont('helvetica', '',11);
        $pdf->ln(6);
        $pdf->RowMultiBorderWithHeight(array("*Denda pajak yang terterapada slip ini hanya berlaku pada tanggal ".$items['settlement_date']."."),
		array(''),6);
		$pdf->RowMultiBorderWithHeight(array("**Keterlambatan pembayaran melewati tanggal jatuh tempo akan dikenakan denda sesuai administrasi berupa bunga sebesar 2% (dua persen) setiap bulannya."),
		array(''),6);
    	$pdf->ln(8);
		$pdf->SetAligns(array("C"));
		$pdf->RowMultiBorderWithHeight(array("Bandung, ".$items['settlement_date']."\nPukul ".$items['pukul']),array(''),6);
		$pdf->RowMultiBorderWithHeight(array("\n\nBANDUNG JUARA"),array(''),6);
		$pdf->Image('http://'.$_SERVER['HTTP_HOST'].'/mpd-wp/client/lib/qrcode/generate-qr.php?param='.$no_bayar.'',175,115,20,20,'PNG');
    	$pdf->Output(time()."_kwitansi_".$no_bayar,"I");
		exit;
		
    }
}
?>