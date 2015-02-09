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
        $username = wbRequest::getVarClean('username');
        $password = wbRequest::getVarClean('password');

        try{
            $uid = wbUser::logIn($username, $password);

            if (!empty($redirecturl)) 
                wbResponse::Redirect($redirecturl);
            else
                wbResponse::Redirect('index.php');
            
        }catch(UserLoginFailedException $e){
            wbResponse::Redirect(wbModule::url('base', 'base', 'loginform', 
                                               array('username' => $username,
                                                     'redirecturl' => urlencode($redirecturl), 
                                                     'msg' => $e->getMessage())));
        }
    }

    public static function logout(){
        wbUser::delSession();
        wbResponse::Redirect('index.php');
    }
    
    public static function mains()
    {
        
        $output = "Hello Guest, Welcome to Webi";            
        return array('output' => $output);
    }
}