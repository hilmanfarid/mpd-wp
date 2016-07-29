<?php
class base_controller extends wbController{
    public static function main()
    {
        if (wbUser::isLoggedIn()){
            $userInfo = wbUser::getSession();
            $output = "Hello ".$userInfo['user_name'].", Welcome to Webi";
        }else{
            $output = "Hello Guest, Welcome to Webi";
        }
        return array('output' => $output);
    }

    public static function loginform($args)
    {
        $username = wbRequest::getVarClean('username');
        $redirecturl = wbRequest::getVarClean('redirecturl');
        $msg = wbRequest::getVarClean('msg');

        return array('loginurl' => wbModule::url('base', 'base', 'login'),
                     'username' => $username,
                     'redirecturl' => $redirecturl,
                     'msg' => $msg);
    }

    public static function login()
    {
        $redirecturl = wbRequest::getVarClean('redirecturl');

        $ws_client = self::getNusoap();
		$params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'base','class' => 'roles.dologin', 'method' => 'login', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);

        try{
            $ws_data = self::getResultData($ws_client,$params);

            if($ws_data['success']) {

                $userInfo = $ws_data['data'];
                wbUser::setSession($userInfo['user_id'],
                                   $userInfo['user_name'],
                                   $userInfo['user_email'],
                                   $userInfo['user_realname'],
                                   $userInfo['roles']);

                if (!empty($redirecturl))
                    wbResponse::Redirect($redirecturl);
                else
                    wbResponse::Redirect('index.php');
            }else {
                throw new Exception("Username atau Password Salah");
            }

        }catch(UserLoginFailedException $e){
            wbResponse::Redirect(wbModule::url('base', 'base', 'loginform',
                                               array('username' => $username,
                                                     'redirecturl' => urlencode($redirecturl),
                                                     'msg' => $e->getMessage())));

        }

    }


    public static function login_api()
    {

        $ws_client = self::getNusoap();
        $params = array('search' => '',
                    'getParams' => json_encode($_GET),
                    'controller' => json_encode(array('module' => 'base','class' => 'roles.dologin', 'method' => 'login', 'type' => 'json' )),
                    'postParams' => json_encode($_POST),
                    'jsonItems' => '',
                    'start' => $start,
                    'limit' => $limit);

        try{
            $ws_data = self::getResultData($ws_client,$params);

            if($ws_data['success']) {

                $result =  array('success' => true,
                            'message' => "Login sukses");

            }else {

                $result = array('success' => false,
                            'message' => "Username atau password salah");
            }

        }catch(UserLoginFailedException $e){
            $result = array('success' => false,
                            'message' => "Username atau password salah");
        }

        echo json_encode($result);
        exit;
    }


    public static function loginCard()
    {
        $redirecturl = wbRequest::getVarClean('redirecturl');

        $ws_client = self::getNusoap();
		$params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'base','class' => 'roles.dologin', 'method' => 'loginCard', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);

        try{
            $ws_data = self::getResultData($ws_client,$params);

            if($ws_data['success']) {

                $userInfo = $ws_data['data'];
                wbUser::setSession($userInfo['user_id'],
                                   $userInfo['user_name'],
                                   $userInfo['user_email'],
                                   $userInfo['user_realname'],
                                   $userInfo['roles']);

                if (!empty($redirecturl))
                    wbResponse::Redirect($redirecturl);
                else
                    wbResponse::Redirect('index.php');
            }else {
                throw new Exception("Username atau Password Salah");
            }

        }catch(UserLoginFailedException $e){
            wbResponse::Redirect(wbModule::url('base', 'base', 'loginform',
                                               array('username' => $username,
                                                     'redirecturl' => urlencode($redirecturl),
                                                     'msg' => $e->getMessage())));

        }

    }

    public static function logout(){
        $ws_client = self::getNusoap();
		$params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'base','class' => 'roles.dologin', 'method' => 'logout', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);

        wbUser::delSession();
        wbResponse::Redirect('index.php');
    }

    public static function mains()
    {
        $output = "Hello Guest, Welcome to Webi";
        return array('output' => $output);
    }
}