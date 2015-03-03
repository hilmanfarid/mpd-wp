<?php
class helper_controller extends wbController{

    public static function lupa_password(){
        wbPage::setPage('default');
        
        try{
            $ws_client = self::getNusoap();
        
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'helper', 'method' => 'read_pertanyaan', 'type' => 'json' )),
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
        
		$listPertanyaan = $data['items'];
		
		$email = wbRequest::getVarClean('email', 'str', '');
		$npwpd = wbRequest::getVarClean('npwpd', 'str', '');
		$user_name = wbRequest::getVarClean('user_name', 'str', '');
		$question = wbRequest::getVarClean('question', 'str', '');
		$answer = wbRequest::getVarClean('answer', 'str', '');
		$errorMsg = wbRequest::getVarClean('errorMsg', 'str', '');
			
        return array('pertanyaan' => $listPertanyaan,
					'email' => $email,
					'npwpd' => $npwpd,
					'user_name' => $user_name,
					'question' => $question,
					'answer' => $answer,
					'errorMsg' => $errorMsg); 
    }
	
	public static function send_email(){
		
		$email = wbRequest::getVarClean('email', 'str', '');
		$npwpd = wbRequest::getVarClean('npwpd', 'str', '');
		$user_name = wbRequest::getVarClean('user_name', 'str', '');
		$question = wbRequest::getVarClean('question', 'str', '');
		$answer = wbRequest::getVarClean('answer', 'str', '');
				
		$msg = '';
		if(empty($npwpd) or empty($email) or empty($user_name) or empty($answer)) {
			$msg .= 'Semua isian harus diisi. ';	
		}
		
		if(!empty($msg)) {
				wbResponse::Redirect(wbModule::url('bds', 'helper', 'lupa_password', 
                                               array('email' => $email,
													 'npwpd' => $npwpd,
                                                     'user_name' => $user_name, 
													 'question' => $question, 
													 'answer' => $answer,
													 'errorMsg' => $msg)));
		}
		
		
		/*cek jabawan*/
		try{
            $ws_client = self::getNusoap();
			$data2 = array();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 'helper', 'method' => 'cek_jawaban', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);

            $data2['items'] = $ws_data['data'];
            $data2['total'] = $ws_data['total'];
            $data2['message'] = $ws_data['message'];
            $data2['success'] = $ws_data['success'];
        }catch (Exception $e) {
            $data2['message'] = $e->getMessage();
        }
		$items = $data2['items'] ;
		
		if( $data2['total'] > 0 and $data2['success']){
			/* Ganti Password*/
			try{
				$ws_client = self::getNusoap();
				$data3 = array();
				$params = array('search' => '',
						'getParams' => json_encode($_GET),
						'controller' => json_encode(array('module' => 'bds','class' => 'helper', 'method' => 'ganti_password', 'type' => 'json' )),
						'postParams' => json_encode($_POST),
						'jsonItems' => '',
						'start' => $start,
						'limit' => $limit);
						
				$ws_data = self::getResultData($ws_client, $params);

				$data3['items'] = $ws_data['data'];
				$data3['total'] = $ws_data['total'];
				$data3['message'] = $ws_data['message'];
				$data3['success'] = $ws_data['success'];
			}catch (Exception $e) {
				$data3['message'] = $e->getMessage();
			}
			
			/* Kirim Email */
			$new_password = $data3['message'];
			$respons = file_get_contents('http://202.154.24.3:81/mpd/send_email_forgot_password.php?receiver='.$email.'&username='.$user_name.'&password='.$new_password);
			

			wbResponse::Redirect(wbModule::url('bds', 'helper', 'lupa_password', 
											   array('errorMsg' => 'Password Berhasil Diubah. Silahkan cek email Anda untuk mengetahui password terbaru Anda.')));
		}else{
			wbResponse::Redirect(wbModule::url('bds', 'helper', 'lupa_password', 
                                               array('email' => $email,
													 'npwpd' => $npwpd,
                                                     'user_name' => $user_name, 
													 'question' => $question, 
													 'answer' => $answer,
													 'hasil_query' => $items,
													 'errorMsg' => 'Data yang cocok tidak ditemukan.'.$data2['message'])));
		}
		
		
		
		
	}
}
