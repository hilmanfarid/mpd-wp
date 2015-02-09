<?php
error_reporting((E_ALL ^ E_DEPRECATED) & ~E_NOTICE);
/*
    Theme Setting
*/
$sysConfig['Theme.siteTitle'] = 'PEMBAYARAN BPHTB';
$sysConfig['Theme.defaultTheme'] = 'default';
$sysConfig['Theme.defaultPage'] = 'default';

/*
    Database Setting
    DB.name     : Database name
    DB.user     : Database user
    DB.password : Database password
    DB.host     : Database host
    DB.type     : Database type
*/
$sysConfig['DB.name'] = 'sikp_backup';//'mpd-ws';
$sysConfig['DB.prefix'] = 'core';
$sysConfig['DB.user'] = 'sikp';
$sysConfig['DB.password'] = 'sikp';
$sysConfig['DB.host'] = '202.154.24.3:5444';
$sysConfig['DB.type'] = 'postgres';


$sysConfig['DB.name_rwnet'] = 'sikp_backup';
$sysConfig['DB.prefix_rwnet'] = 'core';
$sysConfig['DB.user_rwnet'] = 'sikp';
$sysConfig['DB.password_rwnet'] = 'sikp';
$sysConfig['DB.host_rwnet'] = '202.154.24.3:5444';
$sysConfig['DB.type_rwnet'] = 'postgres';
/*
    Module Setting
*/
$sysConfig['Module.defaultModule'] = 'bds';
$sysConfig['Module.defaultClass'] = 'bds';
$sysConfig['Module.defaultMethod'] = 'main';

/* Session Setting */
$sysConfig['Session.Duration'] = 7;
$sysConfig['Session.InactivityTimeout'] = 90;
