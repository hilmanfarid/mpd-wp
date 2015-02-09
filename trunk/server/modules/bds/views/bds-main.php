<script type="text/javascript">
AppTreeMenuPanel = function() {
    AppTreeMenuPanel.superclass.constructor.call(this, {
        id:'app-tree-menu-panel',
        border:false,
        region:'center',
        rootVisible:false,
        lines:true,
        autoScroll:true,
        animCollapse:false,
        animate: false,
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'index.php?module=bds&class=bds&method=menunodes',
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
    var homeUrl = 'modules/bds/views/welcome.html';
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
            itemId:'welcome-panel',
            title: 'Home',
            path: 'root',
            autoLoad: {url: homeUrl},
            autoScroll: true
            /*tbar:['->', {
                itemId: 'btnReload',
                text: 'Refresh',
                iconCls: 'x-tbar-loading',
                handler: function(){
                    this.getComponent('welcome-panel').body.getUpdater().update({url: homeUrl});
                },
                scope: this
            }]*/
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
            title: 'Remote Exception',
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
            title: 'Response Exception',
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
        height:70,
        items: [{
            xtype:'box',
            el:'header',
            border:false,
            anchor: 'none -25'
        },
        new Ext.Toolbar({
            cls:'top-toolbar',
            items:['->', {xtype: 'tbtext', text: 'Anda login sebagai : '}, {
                itemId: 'btnAccount',
                text: _RNAME,
                handler: function(btn, e){
                    if (!this.userAccountWin){
                        this.btnAccount = btn;
                        this.userAccountForm = new Base.form.user({hideStatus : true, enableRoleModification: false, actionType: 'update', enableUserNameModification: false});
                        this.userAccountForm.on('cancel', function(btn, ev){
                            this.userAccountWin.hide();
                        }, this);
                        
                        this.userAccountForm.fbar.getComponent('btnUpdate').on('click', function(btn, ev){
                            var form = this.userAccountForm.getForm();

                            if (this.userAccountForm.validateUser() !== true){
                                Ext.MessageBox.alert("Perhatian", "Data yang anda masukan belum benar. Mohon periksa kembali");
                                return false;
                            }
                            var formValues = form.getFieldValues();
                            form.submit({
                                 url: 'ws.php?type=json&module=base&class=roles.user&method=updateInfo',
                                 params: formValues,
                                 success: function(form, action) {
                                     this.userAccountForm.enable();
                                     this.userAccountWin.statusbar.setStatus({
                                         iconCls: 'x-status-saved',
                                         text: 'Data berhasil diupdate'
                                     });
                                     this.btnAccount.setText(formValues.user_realname.trim());
                                 },
                                 failure: function(form, action) {
                                     this.userAccountForm.enable();
                                     this.userAccountWin.statusbar.setStatus({
                                         iconCls: 'x-status-error',
                                         text: 'Terjadi kesalahan, mohon periksa kembali data anda'
                                     });
                                     
                                     switch (action.failureType) {
                                          case Ext.form.Action.CLIENT_INVALID:
                                              Ext.Msg.alert('Failure', 'Isian form masih belum benar');
                                              break;
                                          case Ext.form.Action.CONNECT_FAILURE:
                                              Ext.Msg.alert('Failure', 'Komunikasi Ajax gagal. Mohon periksa koneksi jaringan anda');
                                              break;
                                          case Ext.form.Action.SERVER_INVALID:
                                                Ext.Msg.show({
                                                    title: 'Response Exception',
                                                    msg: action.result.message,
                                                    icon: Ext.MessageBox.ERROR,
                                                    buttons: Ext.Msg.OK
                                                });
                                     }
                                 },
                                 scope: this
                              });
                              this.userAccountForm.disable();
                              this.userAccountWin.statusbar.showBusy();    
                        }, this);
                        
                        this.userAccountWin = new Webi.WinForm({title: 'Update Account Info', width:400, height:255, items: this.userAccountForm});
                		this.userAccountWin.on('hide', function(w){
                			this.userAccountForm.reset();
                		}, this);		
                    }
                    this.userAccountForm.actionType = 'update';
                    this.userAccountForm.getForm().load({
                        url: 'ws.php?type=json&module=base&class=roles.user&method=getInfo',
                        success: function(form, action){
                    	    this.userAccountForm.enable();
                            this.userAccountWin.statusbar.setStatus({text: 'Ready'});
                        },
                        failure: function(form, action) {
                            this.userAccountForm.enable();
                            Ext.Msg.show({
                                title: 'Response Exception',
                                msg: action.result.message,
                                icon: Ext.MessageBox.ERROR,
                                buttons: Ext.Msg.OK
                            });

                            this.userAccountWin.statusbar.setStatus({text: ''});
                            this.userAccountWin.hide();
                        }
                    });
                    this.userAccountWin.show(btn);
            	    this.userAccountForm.disable();
            		this.userAccountWin.statusbar.setStatus({
                        text: 'Loading...'
                    });
                },
                scope: this
            },'-',
            /* tobe continued
            {
                itemId: 'btnSetting',
                text: 'Settings',
                menu: [{
                    text: 'User dan Group'
                },{
                    text: 'Setting Aplikasi'
                }]
            }, '-',
            */
            {
                itemId: 'btnLogout',
                text: 'Logout',
                handler: function(){
                    Ext.Msg.confirm('Konfirmasi', 'Ini akan mengakhiri session anda. Logout sekarang ?', 
                        function(btn){
                            if (btn == 'yes') location.href = 'index.php?module=base&class=base&method=logout';
                        }, this);
                },
                scope: this                
            }]
        })]
    });

    var appWestPanel = new Ext.Panel({
        id: 'app-west-panel',
        region:'west',
        title: 'Menu',
        split:true,
        width: 220,
        minSize: 150,
        maxSize: 500,
        collapsible: true,
        margins:'0 0 3 3',
        cmargins:'0 1 3 3',
        layout: 'border',
        items: [appTreeMenu]
    });
    
    var appSouthPanel = new Ext.Panel({
        region:'south',
        height: 30,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        bodyStyle: "background:#D0DEF0;",
        html: '<div style="text-align:center;padding-top:5px;color:#004080;font-weight:bold;font-size:12px;">&copy; 2012 Badan Perencanaan Pembangunan Daerah Kota Bandung </div>'
    });
    
    var viewport = new Ext.Viewport({
        layout:'border',
        items:[ appHeader, appWestPanel, appMain, appSouthPanel ]
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
        <?php if (!empty($loadjsmod)) : ?>
        var node = appTreeMenu.getNodeById('<?=$loadjsmod;?>');
        if (node) appMain.loadModule(node);
        <?php endif; ?>
    }, 250);
});
</script>