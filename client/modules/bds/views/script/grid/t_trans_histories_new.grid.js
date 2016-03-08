/**
 * @class Bds.grid.t_trans_histories
 * Grid for table bds_t_trans_histories
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.t_trans_histories_new = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    enableEdit:false,
	firstTime:true,
    
    plugins: [new Ext.ux.plugins.GroupHeaderGrid()],
    initComponent : function() {
        this.store = new Bds.store.t_trans_histories_new({autoLoad:false});
        
        this.colModel= new Ext.grid.ColumnModel({
				columns: [
					{header: 't_vat_setllement_id', hidden: true, sortable: true, dataIndex: 't_vat_setllement_id', width: 112},
                    {header: 'Jenis', hidden: false, sortable: true, dataIndex: 'type_code', width: 185},
                    {header: 'Periode',hidden: false, sortable: true, dataIndex: 'periode_pelaporan', width: 123},
                    {header: 'Tgl.Lapor',hidden: false, sortable: true, dataIndex: 'tgl_pelaporan', width: 112},
                    {header: 'Total Transaksi',hidden: false, sortable: true, dataIndex: 'total_transaksi', width: 112,renderer: Webi.format.floatRenderer},
                    {header: 'Pajak Terutang',hidden: false, sortable: true, dataIndex: 'total_pajak', width: 112,renderer: Webi.format.floatRenderer},
                    {header: 'No.Bayar',hidden: false, sortable: true, dataIndex: 'payment_key', width: 112, renderer:function(value, meta, record){
                        meta.attr = 'style="text-align:center;"';
                        return value;    
                    }},
                    
                    {header: '25%',hidden: false, sortable: true, dataIndex: 'kenaikan', width: 112,renderer: Webi.format.floatRenderer},
                    {header: '2%',hidden: false, sortable: true, dataIndex: 'kenaikan1', width: 112,renderer: Webi.format.floatRenderer},
                    
                    {header: 'Denda',hidden: false, sortable: true, dataIndex: 'total_denda', width: 112,renderer: Webi.format.floatRenderer},
                    {header: 'Tgl.Bayar',hidden: false, sortable: true, dataIndex: 'tgl_pembayaran', width: 142},
                    {header: 'No.Kuitansi',hidden: false, sortable: true, dataIndex: 'kuitansi_pembayaran', width: 169},
                    {header: 'Jumlah Bayar',hidden: false, sortable: true, dataIndex: 'payment_amount', width: 112,renderer: Webi.format.floatRenderer},
                    {header: 'Keterangan',hidden: false, sortable: true, dataIndex: 'keterangan', width: 112, renderer:function(value, meta, record){
                        if(!Ext.isEmpty(record.get('kuitansi_pembayaran'))) {
                            return "Lunas";        
                        }else {
                            return "Belum Lunas";    
                        }
                    }}
				],
				defaultSortable: true,
				rows: [
					[
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{header: 'Sanksi Adm.', colspan: 2, align: 'center'},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2},
						{rowspan: 2}
					]
				]
			}),

        // super
        Bds.grid.t_trans_histories_new.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_cust_account_id' : this.store.baseParams.t_cust_account_id || '',
            'p_vat_type_dtl_id' : this.store.baseParams.p_vat_type_dtl_id || '',
        };
        return defaultData;
    },
    buildTopToolbar : function() {
        var buttons = [];
        
        if (this.usePaging === false){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnReload',
                text: 'Reload',
                iconCls: 'x-tbar-loading',
                handler: function(){
                    this.store.reload();
                },
                scope: this
            });
        }
        //////////////////////////default/////////////////////////////////////
        this.p_finance_period = new Bds.combo.npwd({fieldLabel: 'p_finance_period', name: 'p_finance_period', allowBlank: true,emptyText:"Pilih Periode"});
        this.npwd = new Bds.combo.npwd({fieldLabel: 'Npwd', name: 't_cust_account_id', allowBlank: true,emptyText:"Cari NPWPD"});
        this.npwd.on('select',function(cb,rec,index){
            this.store.baseParams.t_cust_account_id = this.npwd.getValue();
            this.store.baseParams.p_vat_type_dtl_id = rec.get('p_vat_type_dtl_id');
            this.store.load();
        },this);
		this.npwd.store.on('load',function(thisstore,records,option){
            if(this.firstTime){
                this.npwd.setValue(records[0].get('t_cust_account_id'));
                this.firstTime=false;
                this.store.baseParams.t_cust_account_id = records[0].get('t_cust_account_id');
                this.store.baseParams.p_vat_type_dtl_id = records[0].get('p_vat_type_dtl_id');
                
                this.store.load();
            }
        },this);
		this.npwd.store.load();
		
        this.btnCetakSPTPD = new Ext.Button({text:'Cetak SPTPD', handler:this.cetakSPTPD, scope:this});
        this.btnCetakSSPD = new Ext.Button({text:'Cetak SSPD', handler:this.cetakSSPD, scope:this});
		this.btnCetakDsr = new Ext.Button({text:'Cetak Rekap Penjualan', handler:this.cetakDsr, scope:this});
		this.btnCetakNoBayar = new Ext.Button({text:'Cetak No.Bayar', handler:this.cetakNoBayar, scope:this});
		
		buttons.push('-');
        buttons.push(this.npwd);
        buttons.push(this.btnCetakSPTPD);
        buttons.push('-');
        buttons.push(this.btnCetakSSPD);
        buttons.push('-');
        buttons.push(this.btnCetakDsr);
        buttons.push('-');
        buttons.push(this.btnCetakNoBayar);
        return buttons;
    },
    
    cetakSPTPD : function(){
            var rec = this.getSelectionModel().getSelected();
        
            if (!rec) {
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Pilih salah satu record'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO,
                    minWidth: 200
                });
                return false;
            }
            
            var reqId = rec.get('p_vat_type_id');
            var pid = rec.get('t_vat_setllement_id');
            var urlref;
            if(!Ext.isEmpty(rec.get('kuitansi_pembayaran'))){
                if (reqId == '1'){
                        urlref="http://45.118.112.231/mpd/report/cetak_sptpd_hotel_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == '2'){
                        urlref="http://45.118.112.231/mpd/report/cetak_sptpd_restoran_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == 3){
                        lurlref="http://45.118.112.231/mpd/report/cetak_sptpd_hiburan_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == 4){
                        urlref="http://45.118.112.231/mpd/report/cetak_sptpd_parkir_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == 5){
                        urlref="http://45.118.112.231/mpd/report/cetak_sptpd_ppj_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else{
                        alert("Jenis Permohonan Tidak Diketahui");      
                }
            }else {
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Maaf, Cetak SPTPD tidak dapat dilakukan karena record yang dipilih belum dibayar'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO,
                    minWidth: 200
                });
            }
    },
    
    cetakSSPD : function(){
        var rec = this.getSelectionModel().getSelected();
        if (!rec) {
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Pilih salah satu record'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO,
                minWidth: 200
            });
            return false;
        }
        
        if(!Ext.isEmpty(rec.get('kuitansi_pembayaran'))){
            var t_customer_order_id = rec.get('t_customer_order_id');
            var urlref = "http://45.118.112.231/mpd/report/cetak_formulir_sspd_pdf.php?t_customer_order_id="+t_customer_order_id; 
            window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
        }else {
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Maaf, Cetak SSPD tidak dapat dilakukan karena record yang dipilih belum dibayar'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO,
                minWidth: 200
            });        
        }
        
    },
    
    cetakDsr : function(){
        var rec = this.getSelectionModel().getSelected();
        if (!rec) {
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Pilih salah satu record'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO,
                minWidth: 200
            });
            return false;
        }
        var reqId = rec.get('p_vat_type_dtl_id');
        
        var start_date = rec.get('start_period');
        start_date = Ext.util.Format.date(start_date, 'Y-m-d');
        
        var end_date = rec.get('end_period');
        end_date = Ext.util.Format.date(end_date, 'Y-m-d')
        
        var t_cust_account_id = rec.get('t_cust_account_id');
        
        urlref="index.php?module=bds&class=transaksi_harian&method=printTransaksiHarian&date_end="+end_date+"&date_start="+start_date+"&p_vat_type_dtl_id="+reqId+"&t_cust_account_id="+t_cust_account_id;
        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
    },
    
    cetakNoBayar : function(){
        var rec = this.getSelectionModel().getSelected();
        if (!rec) {
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Pilih salah satu record'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO,
                minWidth: 200
            });
            return false;
        }
        
        var no_bayar = rec.get('payment_key');
        if(!Ext.isEmpty(no_bayar)) {
            var urlref = "http://45.118.112.231/mpd/report/cetak_no_bayar.php?no_bayar="+no_bayar; 
            window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
        }else {
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Record yang dipilih belum ada nomor bayar'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO,
                minWidth: 200
            });
        }
    }
    
    
});
Ext.reg('grid_t_trans_histories_new', Bds.grid.t_trans_histories_new);