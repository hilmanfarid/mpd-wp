AppTreeMenuPanel = function() {
    AppTreeMenuPanel.superclass.constructor.call(this, {
        id:'app-tree-menu-panel',
        border:false,
        region:'center',
        rootVisible:false,
        lines:false,
        autoScroll:true,
        animCollapse:false,
        animate: false,
        bodyStyle: 'border-bottom:1px solid #99BBE8',
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'modules/persuratan/menu-nodes.json',
            preloadChildren: true,
            clearOnLoad: false
        }),       
        root: new Ext.tree.AsyncTreeNode({
            text:'Menu',
            id:'root',
            expanded:true
         })
    });
};

Ext.extend(AppTreeMenuPanel, Ext.tree.TreePanel, {
    selectMenu : function(path){
        if(path){
            this.selectPath(path);
        }
    }
});

AppMainPanel = function(){
    AppMainPanel.superclass.constructor.call(this, {
        id:'doc-body',
        region:'center',
        margins:'0 3 3 0',
        resizeTabs: true,
        minTabWidth: 160,
        tabWidth: 160,
        plugins: new Ext.ux.TabCloseMenu(),
        enableTabScroll: true,
        activeTab: 0,

        items: {
            id:'welcome-panel',
            title: 'Home',
            preventBodyReset: true,
            path: 'root',
            autoLoad: {url: 'modules/persuratan/views/welcome.html'},
            autoScroll: true
        }
    });
};

Ext.extend(AppMainPanel, Ext.TabPanel, {
    loadModule : function(node){
        var id = 'module-' + node.id;
        var tab = this.getComponent(id);
        if(tab){
            this.setActiveTab(tab);
        }else{
            tab = this.add({id: id, xtype: 'module_' + node.id, title: node.text, path: node.getPath(), closable: true, autoScroll:true});
            this.setActiveTab(tab);
        }        
    }
});

/**
 * Listen to all exception events
 */
Ext.data.DataProxy.addListener('exception', function(proxy, type, action, options, res) {
    if (type === 'remote'){
        Ext.Msg.show({
            title: 'REMOTE EXCEPTION',
            msg: res.message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });    
    }else{
        var data = Ext.decode(res.responseText, true);
        
        var message = '';
        if (data.message){
            message = data.message;
        }else{
            message = "Terjadi kesalahan pada operasi yang dilakukan. Silahkan hubungi Administrator mengenai kesalahan ini";
        }

        Ext.Msg.show({
            title: 'RESPONSE EXCEPTION',
            msg: message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });
    }
});

Ext.onReady(function(){
    var appTreeMenu = new AppTreeMenuPanel();
    var appMain = new AppMainPanel();

    var appHeader = new Ext.Panel({
        border: false,
        layout:'anchor',
        region:'north',
        cls: 'docs-header',
        height:60,
        items: [{
            xtype:'box',
            el:'header',
            border:false,
            anchor: 'none -25'
        },
        new Ext.Toolbar({
            cls:'top-toolbar',
            items:[]
        })]
    });

	var appInfoPanel = {
		id: 'app-info-panel',
		border:false,
		region: 'south',
        title: 'User Info',
        height: 100,   
		autoScroll: true,
		html: '<p style="padding:5px;">You\'re logged in as : <b> ' + _UNAME + ' </b><br/>&raquo; <a href="#" title="Edit Account">Edit Account</a> | <a href="index.php?module=base&class=base&method=logout" title="Logout">Logout</a></p>'
    };

    var appWestPanel = new Ext.Panel({
        id: 'app-west-panel',
        region:'west',
        title: 'Menu',
        split:true,
        width: 200,
        minSize: 150,
        maxSize: 500,
        collapsible: true,
        margins:'0 0 3 3',
        cmargins:'0 1 3 3',
        layout: 'border',
        items: [appTreeMenu, appInfoPanel]
    });

    var viewport = new Ext.Viewport({
        layout:'border',
        items:[ appHeader, appWestPanel, appMain ]
    });

    appTreeMenu.on('click', function(node, e){
         if(node.isLeaf()){
            e.stopEvent();
            appMain.loadModule(node);
         }
    });

    appMain.on('tabchange', function(tp, tab){
        appTreeMenu.selectMenu(tab.path);
        
        if(Ext.isFunction(tab.startModule)){
            tab.startModule();
        }
    });

    viewport.doLayout();

    setTimeout(function(){
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({remove:true});
    }, 250);
});
