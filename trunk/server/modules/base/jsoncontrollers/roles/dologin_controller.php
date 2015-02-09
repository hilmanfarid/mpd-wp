<?php
class dologin_controller extends wbController{
    
    public static function login()
    {
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        $username = wbRequest::getVarClean('username');
        $password = wbRequest::getVarClean('password');
        
        wbUser::delSession();
        
        try{
            $uid = wbUser::logIn($username, $password);
            
            $data['items'] = wbUser::getSession();
            $data['total'] = 0;
            $data['message'] = 'Login Berhasil';
            $data['success'] = true;
            
            return $data;
            
        }catch(UserLoginFailedException $e){
            $data['items'] = array();
            $data['total'] = 0;
            $data['message'] = $e->getMessage();
            $data['success'] = false;
            
            return $data;
        }
    }

    public static function logout(){
        wbUser::delSession();
        $_COOKIE = '';
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        $data['items'] = array();
        $data['total'] = 0;
        $data['message'] = 'Logout Berhasil';
        $data['success'] = true;
        
        return $data;
        
    }
    
}