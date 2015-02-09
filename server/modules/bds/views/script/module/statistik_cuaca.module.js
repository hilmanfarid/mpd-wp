/**
 * @class Bds.module.statistik_cuaca
 * Module panel for table bds_statistik_cuaca
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_cuaca = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Statistik Kependudukan',
    editTitle: 'Update Statistik Kependudukan',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.statistik_cuaca.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        
        this.statistikUrl = 'index.php?module=bds&class=statistik_cuaca&method=udara';
        
        this.JenisCuaca = new Bds.combo.JenisCuaca({emptyText:'', width:100});
        this.Tahun = new Ext.form.TextField({value: new Date().getFullYear(),width:50});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){             
	        if(Ext.isEmpty(this.JenisCuaca.getValue())||Ext.isEmpty(this.Tahun.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun dan Jenis Cuaca Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            } 
            var jenis = Array('','udara','curahHujan','angin')
            this.statistikUrl = 'index.php?module=bds&class=statistik_cuaca&method='+jenis[this.JenisCuaca.getValue()]+'&tahun='+this.Tahun.getValue();    
	        this.statistikUrl += '&print=1';
	        location.href=this.statistikUrl;
        },this);
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.JenisCuaca.getValue())||Ext.isEmpty(this.Tahun.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun dan Jenis Cuaca Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            }
			var jenis = Array('','udara','curahHujan','angin')
            this.statistikUrl = 'index.php?module=bds&class=statistik_cuaca&method='+jenis[this.JenisCuaca.getValue()]+'&tahun='+this.Tahun.getValue();        
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'statistik-cuaca',
            autoLoad:'',
            border:false,
            autoScroll: true,
            tbar:[
            	{xtype: 'tbtext', text: 'Tahun :'},
           		this.Tahun,
                {xtype: 'tbtext', text: 'Cuaca Berdasarkan :'},
                ' ',
                this.JenisCuaca,
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
        this.getComponent('statistik-cuaca').body.getUpdater().update({url: this.statistikUrl});    
    }
});

Ext.reg('module_statistik_cuaca', Bds.module.statistik_cuaca);