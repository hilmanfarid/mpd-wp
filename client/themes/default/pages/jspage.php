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
	<script type="text/javascript">
		var timerID = null;
        var autoShowForm = false;
		function showTime(){
				var months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
				var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUM&#39;AT', 'SABTU'];
				var date = new Date();
				var day = date.getDate();
				var month = date.getMonth();
				var thisDay = date.getDay(),
					thisDay = myDays[thisDay];
				var yy = date.getYear();
				var year = (yy < 1000) ? yy + 1900 : yy;
				
					//document.getElementById("tanggal_kemaren").innerHTML = '(' + thisDay + ', ' + (day) + ' ' + months[month] + ' ' + year + ')';
				
						var tHour = date.getHours();
					var tMin = date.getMinutes().toString();
					var tSec = date.getSeconds().toString();
					var ap = "AM";
			
					if(tHour > 11)
						ap = "PM";
			
					if(tHour > 12)
						tHour = tHour - 12;
			
					if(tHour == 0)
						tHour = 12;
				
					if(tMin.length == 1)
						tMin = "0" + tMin;

					if(tSec.length == 1)
						tSec = "0" + tSec;

				
			
					document.getElementById("timer").innerHTML = myDays[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + year + "  " + tHour + ":" + tMin + ":" + tSec + " " + ap;
			
					timerID = setTimeout("showTime()", 100);
		}

		window.onload = showTime;
		function getModuleExt(mod){
		    autoShowForm = true;
            var nodeIni = Ext.getCmp('app-tree-menu-panel').getNodeById(mod);
            Ext.getCmp('doc-body').loadModule(nodeIni);
        } 
	</script>
</head>
<body scroll="no">
    <input id="comp-print-bphtb" type="hidden" value="0" />
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
    <script type="text/javascript" src="<?php echo $wbPageThemeDir;?>/script/ext3/GroupHeaderPlugin.js"></script>
    <?php echo $wbPageScriptHead;?>
    
    <div id="header">
        <!--<img src="<?php echo $wbPageThemeDir;?>/images/logo.png" style="margin-left:5px; padding-top: 0px;"/> -->
        <div style="COLOR: #FFFFFF; FONT-SIZE: 12px; FONT-WEIGHT: bold; padding-top:10px" id="timer" align="right" ></div>
        <!-- <div style="font-size:18px;font-weight:bold;color:#fff;padding-left:10px;">Sistem Informasi Persuratan</div> -->
    </div>

    <?php echo $wbPageContent;?>
    <?php echo $wbPageScriptBody;?> 
</body>
</html>