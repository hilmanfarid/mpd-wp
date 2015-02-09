<?php
$dirs = array('store',
              'combo', 
              'form', 
              'grid', 
              'module'
);

echo "Ext.namespace('Bds.store', 'Bds.combo', 'Bds.form', 'Bds.grid', 'Bds.module');\n";
// Open a known directory, and proceed to read its contents
for ($i=0; $i < count($dirs); $i++){
    if (is_dir($dirs[$i])){
        if ($dh = opendir($dirs[$i])) {
            while (($file = readdir($dh)) !== false) {
                if ($file[0] == '.') continue;

                if (substr($file, -3) != '.js') continue;
                include $dirs[$i]."/".$file;
            }
            closedir($dh);
        }
    }
}
?>