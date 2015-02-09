<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <?php echo $wbPageMeta;?>
    <title>
        <?php echo $wbPageTitle;?>
    </title>
    <link rel="stylesheet" href="<?php echo $wbPageThemeDir;?>/style/style.css" type="text/css" />
    <?php echo $wbPageStyle;?>
    <?php echo $wbPageScriptHead;?>
</head>
<body <?php echo wbUser::isLoggedIn() ? '' : 'class="login"';?> >
    <div class="page-wrapper">
        <div class="page-header">
            <div class="logo"></div>
        </div>
        <div class="page-body">
            <?php echo $wbPageContent;?>
            <div class="clear"></div>
        </div>
        <div class="page-footer">
            
        </div> 
    </div>
    <?php echo $wbPageScriptBody;?>
</body>
</html>