/**
 * @class Bds.module.statistik_rekap_penduduk
 * Module panel for table bds_statistik_rekap_penduduk
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_rekap_penduduk = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Statistik rekap_penduduk',
    editTitle: 'Update Statistik rekap_penduduk',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.statistik_rekap_penduduk.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        
        this.statistikUrl = 'index.php?module=bds&class=statistik_rekap_penduduk&method=tampil';
        
        this.kelompok_penduduk = new Bds.combo.StatistikKependudukan({emptyText:'Pilih Berdasarkan Kelompok', width:245});
        this.Tahun = new Ext.form.TextField({value: new Date().getFullYear(),width:50});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){  
        	if(Ext.isEmpty(this.kelompok_penduduk.getValue())||Ext.isEmpty(this.Tahun.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Kelompok Penduduk Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            }    
            if(this.kelompok_penduduk.getValue() == 1) {
                this.statistikUrl = 'index.php?module=bds&class=statistik_rekap_penduduk&method=tampil&jenis='+this.kelompok_penduduk.getValue()+'&tahun='+this.Tahun.getValue();
                this.statistikUrl += '&t=' + new Date().getTime();    
            }else {
                this.statistikUrl = 'index.php?module=bds&class=statistik_rekap_penduduk&method=tampil&jenis='+this.kelompok_penduduk.getValue()+'&tahun='+this.Tahun.getValue(); 
            }           
	        this.statistikUrl += '&print=1';        
	        location.href=this.statistikUrl;
        },this);
        
        this.bttnView = new Ext.Button({text:'Tampilkan'});
        this.bttnView.on('click',function(){
            
            if(Ext.isEmpty(this.kelompok_penduduk.getValue())) {
                Ext.Msg.show({
                   title:'Info',
                   msg: 'Kelompok rekap_penduduk Harus Diisi',
                   buttons: Ext.Msg.OK,
                   animEl: 'elId',
                   icon: Ext.MessageBox.INFO
                }); 
                return;               
            }
            
            if(this.kelompok_penduduk.getValue() == 1) {
                this.statistikUrl = 'index.php?module=bds&class=statistik_rekap_penduduk&method=tampil&jenis='+this.kelompok_penduduk.getValue()+'&tahun='+this.Tahun.getValue();
                this.statistikUrl += '&t=' + new Date().getTime();    
            }else {
                this.statistikUrl = 'index.php?module=bds&class=statistik_rekap_penduduk&method=tampil&jenis='+this.kelompok_penduduk.getValue()+'&tahun='+this.Tahun.getValue();        
            }
            
            this.reloadPanel();
            
        },this);
        
        return {
            itemId:'statistik-penduduk',
            autoLoad:'',
            border:false,
            autoScroll: true,
            tbar:[
            	{xtype: 'tbtext', text: 'Tahun :'},
           		this.Tahun,
           		' ',
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

Ext.reg('module_statistik_rekap_penduduk', Bds.module.statistik_rekap_penduduk);