<?php
$dirs = array('roles', 'roles/store', 'roles/combo', 'roles/form', 'roles/grid', 'roles/module');

echo "Ext.namespace('Base.store', 'Base.combo', 'Base.form', 'Base.grid', 'Base.module');\n";
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