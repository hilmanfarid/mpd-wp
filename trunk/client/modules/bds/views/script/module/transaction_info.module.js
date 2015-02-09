
Bds.module.transaction_info = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Dashboard Pendidikan',
    editTitle: 'Update Dashboard Pendidikan',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.transaction_info.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.dashboardUrl = 'index.php?module=bds&class=cms&method=transaction_info';
        //this.reloadPanel();
        return {
            itemId:'dashboard-info',
            autoLoad: {url: this.dashboardUrl},
            autoScroll: true,
            border:false
        };
    },
    buildForm : function(){
        return null;
    },
    
    reloadPanel: function() {
        this.getComponent('dashboard-info').body.getUpdater().update({url: this.dashboardUrl});    
    }
});

Ext.reg('module_transaction_info', Bds.module.transaction_info);