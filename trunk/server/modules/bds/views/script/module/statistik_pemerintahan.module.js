/**
 * @class Bds.module.statistik_pemerintahan
 * Module panel for table bds_statistik_pemerintahan
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.statistik_pemerintahan = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Statistik Pemerintahan',
    editTitle: 'Update Statistik Pemerintahan',
    winWidth:550,
    winHeight:480,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.statistik_pemerintahan.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        
        this.statistikUrl = 'index.php?module=bds&class=statistik_pemerintahan&method=tampil';
        
        this.kelompok_penduduk = new Bds.combo.StatistikKependudukan({emptyText:'Pilih Berdasarkan Kelompok', width:245});
        this.bttnPrint = new Ext.Button({text:'Print Xls'});
        this.bttnPrint.on('click',function(){             
	        this.statistikUrl = 'index.php?module=bds&class=statistik_pemerintahan&method=tampil&print=1';        
	        this.reloadPanel(); 
        },this);
        
        return {
            itemId:'statistik-pemerintahan',
            autoLoad: {url: this.statistikUrl},
            border:false,
            autoScroll: true,
            tbar:[
                this.bttnPrint
            ]
        };
    },
    buildForm : function(){
        return null;
    },
    
    reloadPanel: function() {
        location.href=this.statistikUrl;     
    }
});

Ext.reg('module_statistik_pemerintahan', Bds.module.statistik_pemerintahan);