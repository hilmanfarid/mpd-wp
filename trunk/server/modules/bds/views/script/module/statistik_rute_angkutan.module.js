/**
 * @class Bds.module.statistik_rute_angkutan
 * Module panel for table bds_statistik_rute_angkutan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_rute_angkutan = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Statistik Rute Angkutan',
    editTitle: 'Update Statistik Rute Angkutan',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.statistik_rute_angkutan.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        
        this.statistikUrl = 'index.php?module=bds&class=statistik_rute_angkutan&method=show';
        
        this.Tahun = new Ext.form.NumberField({value: new Date().getFullYear(),width:50, allowDecimals:false, allowNegative:false});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){             
	        if(Ext.isEmpty(this.Tahun.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            } 
            this.statistikUrl = 'index.php?module=bds&class=statistik_rute_angkutan&method=show'+'&tahun='+this.Tahun.getValue();
	        this.statistikUrl += '&print=1';
	        location.href=this.statistikUrl;
        },this);
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.Tahun.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Tahun Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            }
            this.statistikUrl = 'index.php?module=bds&class=statistik_rute_angkutan&method=show'+'&tahun='+this.Tahun.getValue();        
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'statistik-ruteangkutan',
            autoLoad:'',
            border:false,
            autoScroll: true,
            tbar:[
            	{xtype: 'tbtext', text: 'Tahun :'},
           		this.Tahun,
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
        this.getComponent('statistik-ruteangkutan').body.getUpdater().update({url: this.statistikUrl});    
    }
});

Ext.reg('module_statistik_rute_angkutan', Bds.module.statistik_rute_angkutan);