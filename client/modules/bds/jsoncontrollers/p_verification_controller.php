<?php
/**
 * p_sub_region
 * class controller for table bds_p_sub_region
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class p_verification_controller extends wbController{
    /**
     * read
     * controler for get all items
     */
    public static function sendVerification($args = array()){
		
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
		if(empty($_POST['wp_email']) || empty($_POST['wp_mobile_no'])){
			return $data;
		}
        try{
			$wp_email = wbRequest::getVarClean('wp_email', 'str', '');
			$wp_mobile_no = wbRequest::getVarClean('wp_mobile_no', 'str', '');
			$postdata = http_build_query(
				array(
					'user_email' => $wp_email,
					'user_hp' =>	$wp_mobile_no
				)
			);

			$opts = array('http' =>
				array(
					'method'  => 'POST',
					'header'  => 'Content-type: application/x-www-form-urlencoded',
					'content' => $postdata
				)
			);

			$context  = stream_context_create($opts);

			$result = file_get_contents('http://localhost:81/mpd/services/p_send_verification.php', false, $context);
			$result = json_decode($result);
            $data['items'] = $result;
            $data['success'] = true;
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
		$output=file_get_contents('http://localhost:81/mpd/include/excel/curl_tes.php?npwd=registration&no_telp='.$wp_mobile_no.'&message=No+Register+anda+'.str_pad($result->hasil,6,'0',STR_PAD_LEFT));
		if(empty($output)){
			$output_email=file_get_contents('http://localhost:81/mpd/send_email2.php?msg=no+registrasi+anda+'.str_pad($result->hasil,6,'0',STR_PAD_LEFT).'&receiver='.$wp_email);
			if($output_email=='failed'){
				$data['message'] = "Email Gagal Terkirim";
				$data['success'] = false;
			}
			return $data;
		}else{
			$data['success'] = false;
			return $data;
		}
    }

    /**
     * update
     * controler for remove item
     */
    public static function checkVerification($args = array()){
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
		    			'controller' => json_encode(array('module' => 'bds','class' => 'p_sub_region', 'method' => 'destroy', 'type' => 'json')),
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
	
	public static function submitRegistration($args = array()){
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
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_vat_registration', 'method' => 'destroy', 'type' => 'json')),
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
    
}
?>