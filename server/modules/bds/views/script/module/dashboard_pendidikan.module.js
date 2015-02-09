/**
 * @class Bds.module.dashboard_pendidikan
 * Module panel for table bds_dashboard_pendidikan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.dashboard_pendidikan = Ext.extend(Webi.module.Panel, {
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
        Bds.module.dashboard_pendidikan.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.dashboardUrl = 'index.php?module=bds&class=dashboard_pendidikan&method=show';
        this.level_sekolah = new Bds.combo.p_school_level({emptyText:'Pilih Level Sekolah', width:245});
        this.tahun = new Ext.form.NumberField({value: new Date().getFullYear(), width:50, allowNegative:false, allowDecimals:false, autoCreate : {tag: 'input', type: 'text', maxlength: '4', autocomplete: 'off'}});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){             
	        if(Ext.isEmpty(this.tahun.getValue()) || Ext.isEmpty(this.level_sekolah.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun dan Level Sekolah Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                });   
                return;             
            }
            this.dashboardUrl = 'index.php?module=bds&class=dashboard_pendidikan&method=show';
            this.dashboardUrl += '&level_id=' + this.level_sekolah.getValue();
            this.dashboardUrl += '&tahun=' + this.tahun.getValue();
            this.dashboardUrl += '&t=' + new Date().getTime();       
	        this.dashboardUrl += '&print=1';
	        location.href=this.dashboardUrl;
        },this);
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.tahun.getValue()) || Ext.isEmpty(this.level_sekolah.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun dan Level Sekolah Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                });   
                return;             
            }
            
            this.dashboardUrl = 'index.php?module=bds&class=dashboard_pendidikan&method=show';
            this.dashboardUrl += '&level_id=' + this.level_sekolah.getValue();
            this.dashboardUrl += '&tahun=' + this.tahun.getValue();
            this.dashboardUrl += '&t=' + new Date().getTime();
            
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'dashboard-pendidikan',
            autoLoad: {url: this.dashboardUrl},
            autoScroll: true,
            border:false,
            tbar:[
                {xtype: 'tbtext', text: 'Tahun :'},
                this.tahun,
                ' ',
                this.level_sekolah,
                ' ', 
                this.bttnView,
                this.bttnPrint
            ]
        };
    },
    buildForm : function(){
        return null;
    },
    
    reloadPanel: function() {
        this.getComponent('dashboard-pendidikan').body.getUpdater().update({url: this.dashboardUrl});    
    }
});

Ext.reg('module_dashboard_pendidikan', Bds.module.dashboard_pendidikan);