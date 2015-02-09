<?php

error_reporting((E_ALL ^ E_DEPRECATED) & ~E_NOTICE);
/*
    Theme Setting
*/
$sysConfig['Theme.siteTitle'] = 'APLIKASI PELAPORAN WAJIB PAJAK DISYANJAK BANDUNG';
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
$sysConfig['DB.name'] = 'bds-tes';
$sysConfig['DB.prefix'] = 'core';
$sysConfig['DB.user'] = 'bds';
$sysConfig['DB.password'] = 'bds';
$sysConfig['DB.host'] = 'localhost';
$sysConfig['DB.type'] = 'postgres';

/* Web Service Connection */
$sysConfig['WS_SERVER'] = 'http://localhost:81/mpd-wp/server/wsdl.php?wsdl';

/*
    Module Setting
*/
$sysConfig['Module.defaultModule'] = 'bds';
$sysConfig['Module.defaultClass'] = 'bds';
$sysConfig['Module.defaultMethod'] = 'main';

/* Session Setting */
$sysConfig['Session.Duration'] = 7;
$sysConfig['Session.InactivityTimeout'] = 90;
