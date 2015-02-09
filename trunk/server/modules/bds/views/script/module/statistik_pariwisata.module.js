/**
 * @class Bds.module.statistik_pariwisata
 * Module panel for table bds_statistik_pariwisata
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_pariwisata = Ext.extend(Webi.module.Panel, {
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
        Bds.module.statistik_pariwisata.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        
        this.statistikUrl = 'index.php?module=bds&class=statistik_pariwisata&method=tampil';
        
        this.Tahun = new Ext.form.TextField({value: new Date().getFullYear(),width:50});
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
            this.statistikUrl = 'index.php?module=bds&class=statistik_pariwisata&method=tampil'+'&tahun='+this.Tahun.getValue();
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
            this.statistikUrl = 'index.php?module=bds&class=statistik_pariwisata&method=tampil'+'&tahun='+this.Tahun.getValue();        
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'statistik-pariwisata',
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
        this.getComponent('statistik-pariwisata').body.getUpdater().update({url: this.statistikUrl});    
    }
});

Ext.reg('module_statistik_pariwisata', Bds.module.statistik_pariwisata);