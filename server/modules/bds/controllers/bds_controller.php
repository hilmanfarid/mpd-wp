<?php
class bds_controller extends wbController{
    public static function main()
    {
        if (!wbUser::isLoggedIn()){
            $redirecturl = wbModule::url('bds', 'bds', 'main');
            wbResponse::Redirect(wbModule::url('base', 'base', 'loginform', array('redirecturl' => urlencode($redirecturl))));
        }

        $loadjsmod = wbRequest::getVarClean('loadjsmod', 'str', '');

        wbPage::setPage('jspage');

        $userInfo = wbUser::getSession();
        $role = '';
        if (isset($userInfo['roles'][0]['role_name'])){
            $role = strtolower($userInfo['roles'][0]['role_name']);
        }
        
        $script = <<<HEREDOC
    Webi.ROUTE_URL = "ws.php?type=json&module=bds";
    var _UNAME = "{$userInfo['user_name']}";
    var _RNAME = "{$userInfo['user_realname']}";
    var _GNAME = "{$role}";
HEREDOC;

        wbPage::addScriptCode($script);
        wbPage::addScript('modules/bds/views/script/properties.js');
        wbPage::addScript('modules/bds/views/script/GridPanel.js');
        wbPage::addScript('modules/bds/views/script/FormPanel.js');
        wbPage::addScript('modules/bds/views/script/ModulePanel.js');
        wbPage::addScript('modules/base/views/script/roles-jsloader.php');
        wbPage::addScript('modules/bds/views/script/jsloader.php');

        return array('loadjsmod' => $loadjsmod);
    }

    //edit Ajuy
    public static function menuNodes(){
        return array();
        
    }
}
