<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    
    <?php echo $wbPageMeta;?>
    <title>
        <?php echo $wbPageTitle;?>
    </title>
    <link rel="stylesheet" href="<?php echo $wbPageThemeDir;?>/style/ext3/css/ext-all.css" type="text/css" media="screen" />
    
    <link rel="stylesheet" href="<?php echo $wbPageThemeDir;?>/style/ext3/css/statusbar.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo $wbPageThemeDir;?>/style/ext3/css/fileuploadfield.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo $wbPageThemeDir;?>/style/jspagestyle.css" type="text/css" media="screen" />
    
    <?php echo $wbPageStyle;?>
</head>
<body scroll="no">
    <div id="loading-mask" style=""></div>
    <div id="loading">
        <div class="loading-indicator">
            <img src="<?php echo $wbPageThemeDir;?>/images/extanim32.gif" width="32" height="32" style="margin-right:8px;" align="absmiddle"/>Loading...
        </div>
    </div>

    <!-- include everything after the loading indicator -->
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext3/ext-base.js"></script>
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext3/ext-all.js"></script>
    <script type="text/javascript">
        Ext.BLANK_IMAGE_URL = '<?php echo $wbPageThemeDir;?>/style/ext3/images/default/s.gif';
    </script>
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext-init.js"></script>
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext3/TabCloseMenu.js"></script>
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext3/StatusBar.js"></script>
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext3/FileUploadField.js"></script>
    <?php echo $wbPageScriptHead;?>
    
    <div id="header">
        <img src="<?php echo $wbPageThemeDir;?>/images/logo.png" style="margin-left:5px; padding-top: 0px;"/>
        
        <!-- <div style="font-size:18px;font-weight:bold;color:#fff;padding-left:10px;">Sistem Informasi Persuratan</div> -->
    </div>

    <?php echo $wbPageContent;?>
    <?php echo $wbPageScriptBody;?> 
</body>
</html>