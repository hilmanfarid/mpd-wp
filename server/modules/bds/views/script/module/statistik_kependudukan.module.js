/**
 * @class Bds.module.statistik_kependudukan
 * Module panel for table bds_statistik_kependudukan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_kependudukan = Ext.extend(Webi.module.Panel, {
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
        Bds.module.statistik_kependudukan.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        
        this.statistikUrl = 'index.php?module=bds&class=statistik_penduduk&method=usia';
        
        this.kelompok_penduduk = new Bds.combo.StatistikKependudukan({emptyText:'Pilih Berdasarkan Kelompok', width:245});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){             
	        this.statistikUrl += '&print=1';        
	        location.href=this.statistikUrl;
        },this);
        
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.kelompok_penduduk.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Kelompok Kependudukan Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            }
            
            if(this.kelompok_penduduk.getValue() == 1) {
                this.statistikUrl = 'index.php?module=bds&class=statistik_penduduk&method=usia';
                this.statistikUrl += '&t=' + new Date().getTime();    
            }else {
                this.statistikUrl = 'index.php?module=bds&class=statistik_penduduk&method=pendidikan';        
            }
            
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'statistik-penduduk',
            autoLoad: {url: this.statistikUrl},
            border:false,
            autoScroll: true,
            tbar:[
                {xtype: 'tbtext', text: 'Penduduk Menurut Kelompok :'},
                ' ',
                this.kelompok_penduduk,
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
        this.getComponent('statistik-penduduk').body.getUpdater().update({url: this.statistikUrl});    
    }
});

Ext.reg('module_statistik_kependudukan', Bds.module.statistik_kependudukan);