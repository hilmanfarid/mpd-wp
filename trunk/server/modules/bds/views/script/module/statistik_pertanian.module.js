/**
 * @class Bds.module.statistik_pertanian
 * Module panel for table bds_statistik_pertanian
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_pertanian = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Statistik Pertanian',
    editTitle: 'Update Statistik Pertanian',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.statistik_pertanian.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.dashboardUrl = 'index.php?module=bds&class=statistik_pertanian&method=show';
        
        this.type_id = new Bds.combo.p_parameter({fieldLabel: 'Jenis Tanaman', emptyText:'Jenis Tanaman', name: 'type_id', allowBlank: true, width:245});
        this.type_id.store.baseParams.kode_type = 'JENIS TANAMAN';
        
        this.tahun = new Ext.form.NumberField({value: new Date().getFullYear(), width:50, allowNegative:false, allowDecimals:false, autoCreate : {tag: 'input', type: 'text', maxlength: '4', autocomplete: 'off'}});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){             
	        if(Ext.isEmpty(this.tahun.getValue()) || Ext.isEmpty(this.type_id.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun dan Jenis Tanaman',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                });   
                return;             
            }
            this.dashboardUrl = 'index.php?module=bds&class=statistik_pertanian&method=show';
            this.dashboardUrl += '&type_id=' + this.type_id.getValue();
            this.dashboardUrl += '&tahun=' + this.tahun.getValue();
            this.dashboardUrl += '&t=' + new Date().getTime();      
	        this.dashboardUrl += '&print=1';
	        location.href=this.dashboardUrl;
        },this);
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.tahun.getValue()) || Ext.isEmpty(this.type_id.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun dan Jenis Tanaman',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                });   
                return;             
            }
            
            this.dashboardUrl = 'index.php?module=bds&class=statistik_pertanian&method=show';
            this.dashboardUrl += '&type_id=' + this.type_id.getValue();
            this.dashboardUrl += '&tahun=' + this.tahun.getValue();
            this.dashboardUrl += '&t=' + new Date().getTime();
            
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'statistik-pertanian',
            autoLoad: {url: this.dashboardUrl},
            autoScroll: true,
            border:false,
            tbar:[
                {xtype: 'tbtext', text: 'Tahun :'},
                this.tahun,
                ' ',
                this.type_id,
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
        this.getComponent('statistik-pertanian').body.getUpdater().update({url: this.dashboardUrl});    
    }
});

Ext.reg('module_statistik_pertanian', Bds.module.statistik_pertanian);