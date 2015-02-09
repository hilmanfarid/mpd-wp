/**
 * @class Bds.module.dashboard_jalan
 * Module panel for table bds_dashboard_jalan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.dashboard_jalan = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Dashboard Jalan',
    editTitle: 'Update Dashboard Jalan',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.dashboard_jalan.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.dashboardUrl = 'index.php?module=bds&class=dashboard_jalan&method=show';
        this.jenis_jalan = new Bds.combo.p_parameter_type({emptyText:'Pilih Kelas Jalan', width:245});
        this.jenis_jalan.store.baseParams.qParamType = '(ptype_id IN (8,9,10))';
        this.jenis_jalan.store.load();
        
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.jenis_jalan.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Jenis Jalan Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                });              
                return;  
            }
            
            this.dashboardUrl = 'index.php?module=bds&class=dashboard_jalan&method=show';
            this.dashboardUrl += '&jenis_jalan=' + this.jenis_jalan.getValue();
            this.dashboardUrl += '&t=' + new Date().getTime();
            
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'dashboard-jalan',
            autoLoad: {url: this.dashboardUrl},
            border:false,
            autoScroll: true,
            tbar:[
                {xtype: 'tbtext', text: 'Kelas Jalan :'},
                ' ',
                this.jenis_jalan,
                ' ', 
                this.bttnView
            ]
        };
    },
    buildForm : function(){
        return null;
    },
    
    reloadPanel: function() {
        this.getComponent('dashboard-jalan').body.getUpdater().update({url: this.dashboardUrl});    
    }
});

Ext.reg('module_dashboard_jalan', Bds.module.dashboard_jalan);