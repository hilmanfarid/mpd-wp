/**
 * @class Bds.grid.t_trans_histories
 * Grid for table bds_t_trans_histories
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.t_trans_histories = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    enableEdit:false,
	firstTime:true,
    /*plugins:new Ext.ux.grid.ColumnHeaderGroup({
        rows:[
              [
                  {header: '', colspan: 1, align: 'center'},
                  {header: '', colspan: 1, align: 'center'},
                  {header: 'Pelaporan', colspan: 5, align: 'center'},
                  {header: 'Pembayaran', colspan: 3, align: 'center'}
              ]
           ]
    }),*/
    plugins: [new Ext.ux.plugins.GroupHeaderGrid()],
    initComponent : function() {
        this.store = new Bds.store.t_trans_histories();
        this.simpleform = new Ext.FormPanel({
		    fileUpload: true,
            labelWidth: 75, // label settings here cascade unless overridden
            url:'save-form.php',
            frame:true,
            title: 'Simple Form',
            bodyStyle:'padding:5px 5px 0',
            width: 350,
            defaults: {width: 230},
            defaultType: 'textfield',
    
            items: [
                new Ext.ux.form.FileUploadField({
                    emptyText: 'Upload Image',
                    fieldLabel: 'File Excel',
                    name: 'excel_trans_cust',
                    allowBlank: false,
                    buttonText: '',
                    buttonCfg: {
                        iconCls: 'icon-upload'
                    },
                    anchor: '95%'
                }),
                new Ext.form.Hidden({id:'form_t_cust_acc_id',fieldLabel: 'Informasi BPHTB', name: 't_cust_account_id', allowBlank: true,anchor:'95%',height:200,readOnly:true}),
                new Ext.form.Hidden({id:'form_p_vat_type_dtl_id',fieldLabel: 'Informasi BPHTB', name: 'p_vat_type_dtl_id', allowBlank: true,anchor:'95%',height:200,readOnly:true}),
                {
                    fieldLabel: 'First Name',
                    name: 'first',
                    allowBlank:false
                },{
                    fieldLabel: 'Last Name',
                    name: 'last'
                }
            ],
    
            buttons: [{
                text: 'Save',
                handler: this.onSubmit,
                scope:this
            },{
                text: 'Cancel'
            }]
        });
        /*this.columns = [
            {header: 'npwd', hidden: false, sortable: true, dataIndex: 'npwd', width: 112},
            {header: 'nama WP',hidden: false, sortable: true, dataIndex: 'wp_name', width: 112},
            {header: 'Periode',hidden: false, sortable: true, dataIndex: 'finance_period_code', width: 112},
            {header: 'Periode Transaksi',hidden: false, sortable: true, dataIndex: 'start_period', width: 112,renderer:function(value, meta, record){
                return  Webi.format.dateRenderer(record.get('start_period'), meta, record)+' s/d '+ Webi.format.dateRenderer(record.get('end_period'), meta, record);
            }},
            {header: 'Tanggal Pelaporan',hidden: false, sortable: true, dataIndex: 'settlement_date', width: 112,renderer: Webi.format.dateRenderer},
            //{header: 'No Order',hidden: false, sortable: true, dataIndex: 'order_no',width: 112},
            {header: 'Total Transaksi',hidden: false, sortable: true, dataIndex: 'total_trans_amount', width: 112,renderer: Webi.format.floatRenderer},
            {header: 'Total Pajak',hidden: false, sortable: true, dataIndex: 'total_vat_amount', width: 112,renderer: Webi.format.floatRenderer},
            
            {header: 'No Kwitansi',hidden: false, sortable: true, dataIndex: 'receipt_no', width: 112},
            {header: 'Tanggal Pembayaran',hidden: false, sortable: true, dataIndex: 'payment_date', width: 112,renderer: Webi.format.dateRenderer},
            {header: 'Nilai Pembayaran',hidden: false, sortable: true, dataIndex: 'payment_amount', width: 112,renderer: Webi.format.floatRenderer}
        ];*/
        this.colModel= new Ext.grid.ColumnModel({
				columns: [
					{header: 'npwd', hidden: false, sortable: true, dataIndex: 'npwd', width: 112},
                    {header: 'nama WP',hidden: false, sortable: true, dataIndex: 'wp_name', width: 112},
                    {header: 'Periode',hidden: false, sortable: true, dataIndex: 'finance_period_code', width: 112},
                    {header: 'Periode Transaksi',hidden: false, sortable: true, dataIndex: 'start_period', width: 112,renderer:function(value, meta, record){
                        return  Webi.format.dateRenderer(record.get('start_period'), meta, record)+' s/d '+ Webi.format.dateRenderer(record.get('end_period'), meta, record);
                    }},
                    {header: 'Tanggal Pelaporan',hidden: false, sortable: true, dataIndex: 'settlement_date', width: 112,renderer: Webi.format.dateRenderer},
                    //{header: 'No Order',hidden: false, sortable: true, dataIndex: 'order_no',width: 112},
                    {header: 'Total Transaksi',hidden: false, sortable: true, dataIndex: 'total_trans_amount', width: 112,renderer: Webi.format.floatRenderer},
                    {header: 'Total Pajak',hidden: false, sortable: true, dataIndex: 'total_vat_amount', width: 112,renderer: Webi.format.floatRenderer},
                    
                    {header: 'No Kwitansi',hidden: false, sortable: true, dataIndex: 'receipt_no', width: 112},
                    {header: 'Tanggal Pembayaran',hidden: false, sortable: true, dataIndex: 'payment_date', width: 112,renderer: Webi.format.dateRenderer},
                    {header: 'Nilai Pembayaran',hidden: false, sortable: true, dataIndex: 'payment_amount', width: 112,renderer: Webi.format.floatRenderer}
				],
				defaultSortable: true,
				rows: [
					[
						{rowspan: 2},
						{rowspan: 2},
						{header: 'Pelaporan', colspan: 5, align: 'center'},
                        {header: 'Pembayaran', colspan: 3, align: 'center'}
					]
				]
			}),

        // super
        Bds.grid.t_trans_histories.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_cust_acc_dtl_trans_id' : '',
            't_cust_account_id' : this.store.baseParams.t_cust_account_id || '',
            'npwd' : '',
            'trans_date' : '',
            'trans_date_txt' : '',
            'bill_no' : '',
            'service_desc' : '',
            'service_charge' : '',
            'vat_charge' : '',
            'description' : '',
            'p_vat_type_dtl_id' : this.store.baseParams.p_vat_type_dtl_id || '',
        };
        return defaultData;
    },
    buildTopToolbar : function() {
        var buttons = [];
        //////////////////////////default/////////////////////////////////////
        /*if (this.enableAdd === true){
            buttons.push({
                itemId: 'btnNew',
                text: 'Tambah',
                iconCls: 'icon-add',
                handler: this.onNew,
                scope: this
            });
        }
        /*
        if (this.enableEdit === true){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'icon-edit',
                handler: this.onModify,
                disabled: true,
                scope: this
            });
        }
        */
        /*if (this.enableDelete === true){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                disabled: true,
                scope: this
            });
        }        
        */
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
            //this.p_vat_type_dtl_id.setValue(rec.get('p_vat_type_dtl_id'));
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
        this.p_vat_type_dtl_id = new Bds.combo.p_vat_type_dtl({fieldLabel: 'Jenis Ayat', name: 'p_vat_type_dtl_id', allowBlank: true,emptyText:"Jenis Ayat",width:220});
        this.po_tgl_awal = new Ext.form.DateField({fieldLabel: 'Tanggal Awal', name: 'po_tgl_awal', allowBlank: true, format: 'd-m-Y'});
        this.po_tgl_akhir = new Ext.form.DateField({fieldLabel: 'TAnggal Akhir', name: 'po_tgl_akhir', allowBlank: true, format: 'd-m-Y'});
        this.bttnPrint = new Ext.Button({text:'Tampilkan',handler:this.viewBphtb,scope:this});
        this.btnClear = new Ext.Button({text:'Clear',handler:this.clearFilter,scope:this});
        this.receipt_no = new Ext.form.TextField({fieldLabel: 'No Kwitansi', name: 'po_tgl_akhir', allowBlank: true,getListParent: function() {
            return this.el.up('.x-menu');
        },});
		this.receipt_no.on('specialkey', function(field, e){
		    if(e.getKey() == e.ENTER) {
        		this.store.baseParams.receipt_no = this.receipt_no.getValue();
		        this.store.load();
        	}
		}, this);
		this.registration_no = new Ext.form.TextField({fieldLabel: 'No Registrasi', name: 'registration_no', allowBlank: true,getListParent: function() {
            return this.el.up('.x-menu');
        },});
		this.registration_no.on('specialkey', function(field, e){
		    if(e.getKey() == e.ENTER) {
        		this.store.baseParams.registration_no = this.registration_no.getValue();
		        this.store.load();
        	}
		}, this);
		this.njop_pbb = new Ext.form.TextField({fieldLabel: 'NOP', name: 'njop_pbb', allowBlank: true,getListParent: function() {
            return this.el.up('.x-menu');
        },});
		this.njop_pbb.on('specialkey', function(field, e){
		    if(e.getKey() == e.ENTER) {
        		this.store.baseParams.njop_pbb = this.njop_pbb.getValue();
		        this.store.load();
        	}
		}, this);
		this.wp_name = new Ext.form.TextField({fieldLabel: 'Nama WP', name: 'wp_name', allowBlank: true,getListParent: function() {
            return this.el.up('.x-menu');
        },});
		this.wp_name.on('specialkey', function(field, e){
		    if(e.getKey() == e.ENTER) {
        		this.store.baseParams.wp_name = this.wp_name.getValue();
		        this.store.load();
        	}
		}, this);
		this.menu = new Ext.menu.Menu({
            id: 'mainMenu',
            layout:'form',
            plain: true,
            style: {
               // overflow: 'visible'     // For the Combo popup
               'z-index': 9000,
               'padding': 0
            },
            items: [
                /*this.receipt_no,
                this.registration_no,
                this.njop_pbb,
                this.wp_name,*/
                this.simpleform
            ]
        });
		this.filter=new Ext.Button({
                    text:'Filter',
                    value:'Filter',
                    iconCls: '',  // <-- icon
                    hidden:false,
                    menu: this.menu  // assign menu by instance
                });
		
		this.bttnSubmitSettlement = new Ext.Button({text:'Submit SPTPD',handler:this.submitSPTPD,scope:this});
		this.cetakSPTPD = new Ext.Button({text:'Cetak SPTPD',handler:this.cetakSPTPD,scope:this});
		this.DsrBtn = new Ext.Button({text:'Cetak DSR',handler:this.cetakDsr,scope:this});
		/*buttons.push(this.bttnSubmitSettlement);
		buttons.push('-');*/
		buttons.push('-')
        buttons.push(this.npwd);
        buttons.push(this.cetakSPTPD);
        buttons.push(this.DsrBtn);
        return buttons;
    },
    viewBphtb : function(){
        this.store.baseParams.date_start = this.po_tgl_awal.getValue();
        this.store.baseParams.date_end = this.po_tgl_akhir.getValue();
        this.store.baseParams.receipt_no = this.receipt_no.getValue();
        this.store.baseParams.registration_no = this.registration_no.getValue();
        this.store.baseParams.njop_pbb = this.njop_pbb.getValue();
        this.store.baseParams.wp_name = this.wp_name.getValue();
        this.store.load();
    },
    clearFilter : function(){
        this.po_tgl_awal.setValue();
        this.po_tgl_akhir.setValue();
        this.receipt_no.setValue();
        this.registration_no.setValue();
        this.njop_pbb.setValue();
        this.wp_name.setValue();
        this.store.baseParams={};
        this.store.load();
    },
    onSubmit : function(){
        this.simpleform.getForm().findField('form_t_cust_acc_id').setValue(Ext.getCmp('the-npwd').getValue());
        this.simpleform.getForm().findField('form_p_vat_type_dtl_id').setValue(Ext.getCmp('the-type_dtl').getValue());
        this.simpleform.getForm().submit({
	        url: Webi.ROUTE_URL + '&class=t_trans_histories&method=uploadExcel',
	        waitMsg: 'Menyimpan data...',
	        params: {
    			items: Ext.encode(this.simpleform.getForm().getValues())
	        },
            success: function(form, action) {
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Data Berhasil Di upload'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO,
                    minWidth: 200
                });
                this.store.load();
                //this.hideActionProgress(action.result.type, true);
                
                /*if (action.result.type == 'create'){
                    var r = new this.grid.store.recordType(action.result.items);
                    this.grid.store.insert(0, r);
                    this.grid.store.commitChanges();
                    this.grid.pagingTb.updateInfo();
                    this.form.loadRecord(new this.grid.store.recordType(this.grid.getDefaultData()), 'create');
                }else{
                    this.win.hide();
                    this.grid.store.reload();
                }*/
            },
            failure: function(form, action) {
                //this.hideActionProgress(action.result.type, false);
                switch (action.failureType) {
                     case Ext.form.Action.CLIENT_INVALID:
                         Ext.Msg.alert('Failure', 'Isian form masih belum benar');
                         break;
                     case Ext.form.Action.CONNECT_FAILURE:
                         Ext.Msg.alert('Failure', 'Komunikasi Ajax gagal. Mohon periksa koneksi jaringan anda');
                         break;
                     case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.message);
                       
                }
            },
            scope: this
	     });
    },
    createSPTPD : function(){
        Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Anda Yakin Untuk Membuat Data SPTPD Tersebut?'),
                    buttons: Ext.Msg.YESNO,
                    fn : function(){
                        alert("Siap Bos!!")
                    },
                    icon: Ext.MessageBox.INFO,
                    minWidth: 200
                });
    },
    submitSPTPD :function(){
        var records = this.getSelectionModel().getSelections();
        var data_items = [];
        if (records.length < 1) {
            return false;
        }
        for (var i in records){
            data_items.push(records[i].data)
        }
        Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk submit data tersebut?', function(btn){
            if (btn != 'yes') return;
            var url_print = 'ws.php?type=json&module=bds&class=t_trans_histories&method=submitSptpd';	
            var sendRequest = new Webi.Server;
            sendRequest.setURL(url_print);
            sendRequest.setParam('items',Ext.encode(data_items));
            sendRequest.onFailure =function(response, options){
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Submit Gagal'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR,
                    minWidth: 200
                });
            }
            sendRequest.request();
        }, this);
    },
    cetakSPTPD : function(){
            var rec = this.getSelectionModel().getSelected();
        
            if (!rec) {
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Pilih Satu SPTPTD!'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR,
                    minWidth: 200
                });
                return false;
            }
            var reqId = rec.get('p_vat_type_id');
            var pid = rec.get('t_vat_setllement_id');
            var urlref;
            if(!Ext.isEmpty(rec.get('receipt_no'))){
                if (reqId == '1'){
                        urlref="http://202.154.24.3:81/mpd/report/cetak_sptpd_hotel_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == '2'){
                        urlref="http://202.154.24.3:81/mpd/report/cetak_sptpd_restoran_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == 3){
                        lurlref="http://202.154.24.3:81/mpd/report/cetak_sptpd_hiburan_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == 4){
                        urlref="http://202.154.24.3:81/mpd/report/cetak_sptpd_parkir_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else if(reqId == 5){
                        urlref="http://202.154.24.3:81/mpd/report/cetak_sptpd_ppj_pdf.php?t_vat_setllement_id="+pid;
                        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
                }else{
                        alert("Jenis Permohonan Tidak Diketahui");      
                }
            }
    },
    cetakDsr : function(){
        var rec = this.getSelectionModel().getSelected();
            if (!rec) {
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Pilih Satu SPTPTD!'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR,
                    minWidth: 200
                });
                return false;
            }
        var reqId = rec.get('p_vat_type_dtl_id');
        var start_date =rec.get('start_period');
        start_date = Ext.util.Format.date(start_date, 'Y-m-d');
        var end_date =rec.get('end_period');
        end_date = Ext.util.Format.date(end_date, 'Y-m-d')
        var t_cust_account_id = rec.get('t_cust_account_id');
        urlref="index.php?module=bds&class=transaksi_harian&method=printTransaksiHarian&date_end="+end_date+"&date_start="+start_date+"&p_vat_type_dtl_id="+reqId+"&t_cust_account_id="+t_cust_account_id;
        window.open(urlref, "_blank", "toolbar=0,location=0,menubar=0");
    }
});
Ext.reg('grid_t_trans_histories', Bds.grid.t_trans_histories);