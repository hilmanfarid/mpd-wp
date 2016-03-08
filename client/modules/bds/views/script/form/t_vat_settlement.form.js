/**
 * @class Bds.form.d_wisata
 * Form panel for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 */
Bds.form.t_vat_settlement = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    baseCls: 'x-plain',
    initComponent : function() {
        // super
        Bds.form.t_vat_settlement.superclass.initComponent.call(this);
        //this.btnSave.setText('Kirim');
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.jumlah_bulan=0;
        this.pengali_denda=0;
		this.t_transaksi_harian= new Bds.module.t_transaksi_harian();
		
		this.editableWin = new Ext.Window({
			title: 'Add',
			layout: 'fit',
			autoScroll: true,
			y: 120,
			width: 570,
			height: 'auto',
			modal: true,
			closeAction: 'hide',
			items: [this.t_transaksi_harian]
		});
        this.fields.service_charge = new Ext.form.TextField({fieldLabel: 'Nama WP', name: 'service_charge', allowBlank: false, width:120});        
        this.fields.t_cust_account_id = new Ext.form.Hidden({fieldLabel: 'Nilai Omzet',allowNegative:false, name: 't_cust_account_id', allowBlank: true,width:220});
        this.fields.npwd = new Ext.form.TextField({fieldLabel: 'NPWPD', name: 'npwd', allowBlank: false,readOnly:true,width:220});
		this.fields.year_period = new Bds.combo.p_year_period({fieldLabel: 'PERIODE',editable:false, name: 'p_year_period', allowBlank: false,emptyText:"Pilih Periode Tahun",width:220});
        this.fields.year_period.on('select',function(cb,rec,index){
            this.fields.finance_period.enable();
			this.fields.finance_period.store.baseParams.p_year_period_id = cb.getValue();
            this.fields.finance_period.store.load();
            this.fields.finance_period.setValue();
        },this);
		this.on('loadrecord',function(){
            this.fields.year_period.store.load();    
        },this)
        this.fields.finance_period = new Bds.combo.p_finance_period({fieldLabel: 'PERIODE',editable:false, name: 'p_finance_period', allowBlank: false,emptyText:"Pilih Periode",width:220});
        this.on('loadrecord',function(){
            this.fields.finance_period.store.load();    
        },this);
        this.fields.finance_period.on('select',function(cb,rec,index){
            this.fields.start_period.setValue(rec.get('start_date_string'));
            this.fields.end_period.setValue(rec.get('end_date_string'));
            this.jumlah_bulan=rec.get('jumlah_bulan');
            this.pengali_denda=rec.get('pengali_denda');
            this.hitungPajak();
        },this);
        this.fields.p_vat_type_dtl_id = new Bds.combo.p_vat_type_dtl({fieldLabel: 'KLASIFIKASI', name: 'p_vat_type_dtl_id', allowBlank: true,width:220});
        this.fields.p_vat_type_dtl_id.on('select',function(cb,rec,index){
            this.fields.percentage.setValue(rec.get('vat_pct'));
            this.fields.p_vat_type_dtl_cls_id.store.baseParams.p_vat_type_dtl_id = cb.getValue();
            this.fields.p_vat_type_dtl_cls_id.store.load();
            this.fields.p_vat_type_dtl_cls_id.setValue();
            
        },this);
        this.on('loadrecord', function(form, record, actionType){
			this.kirimBtn.enable();
            if (actionType == 'update'){
                this.fields.p_vat_type_dtl_id.store.baseParams.p_vat_type_dtl_id = this.fields.p_vat_type_dtl_id.getValue();
                this.fields.p_vat_type_dtl_id.getStore().load({params: {p_vat_type_dtl_id:record.get('p_vat_type_dtl_id')}});
            }else{
                this.fields.p_vat_type_dtl_id.store.baseParams.p_vat_type_dtl_id = this.fields.p_vat_type_dtl_id.getValue();  
                delete this.fields.p_vat_type_dtl_id.lastQuery;
                this.fields.p_vat_type_dtl_id.doQuery('', true);
            }
        }, this);
        this.fields.p_vat_type_dtl_cls_id = new Bds.combo.p_vat_type_dtl_cls({fieldLabel: 'RINCIAN', name: 'p_vat_type_dtl_cls_id', allowBlank: true,width:220});
        this.fields.p_vat_type_dtl_cls_id.store.baseParams.p_vat_type_dtl_id = 1;
        this.fields.p_vat_type_dtl_cls_id.store.on('load',function(rec){
           if(rec.data.length > 0){
                this.fields.p_vat_type_dtl_cls_id.show();
            }else{
                this.fields.p_vat_type_dtl_cls_id.hide();
            }
        },this);
		this.fields.p_vat_type_dtl_cls_id.on('select',function(cb,rec,index){
            this.fields.percentage.setValue(rec.get('vat_pct'));  
			this.hitungPajak();
        },this);
        this.fields.total_trans_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',useThousandSeparator: true,enableKeyEvents:true,decimalPrecision:2,fieldLabel: 'Nilai Omzet',allowNegative:false, name: 'total_trans_amount', allowBlank: true,readOnly:true,width:220});
		this.fields.total_trans_amount.on('keyup',function(form,e){
            this.hitungPajak();
        },this);
		this.fields.start_period = new Ext.form.DateField({fieldLabel: 'Masa Pajak', name: 'start_period',width:100, allowBlank: true, format: 'd-m-Y'});
		this.fields.end_period = new Ext.form.DateField({fieldLabel: 's/d', name: 'end_period', allowBlank: true,width:100,format: 'd-m-Y'});
		this.fields.percentage = new Ext.form.Hidden({fieldLabel: 'Nilai Omzet',allowNegative:false, name: 'percentage', allowBlank: true,readOnly:true,width:220});
		this.fields.total_vat_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',fieldLabel: 'Pajak yg Harus Dibayar',allowNegative:false, name: 'total_vat_amount', allowBlank: true,width:220,readOnly:true});
		this.fields.payment_key = new Ext.form.TextField({style : 'background: #00FF00;',fieldLabel: 'NOMOR BAYAR',allowNegative:false, name: 'payment_key', allowBlank: true,width:220,readOnly:true});
		this.fields.p_vat_type_dtl_id.store.on('load',function(store,rec){
            if(Ext.isEmpty(this.fields.percentage.getValue())){
                this.fields.percentage.setValue(rec[0].get('vat_pct'));
            }
        },this);
        this.fields.penalty_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',fieldLabel: 'Denda',allowNegative:false, name: 'penalty_amount', allowBlank: true,width:220,readOnly:true});
		this.fields.total_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',fieldLabel: 'Total yg Harus Dibayar',allowNegative:false, name: 'total_amount', allowBlank: true,width:220,readOnly:true});
		
		this.simpleform = new Ext.FormPanel({
		    fileUpload: true,
            labelWidth: 75, // label settings here cascade unless overridden
            url:'save-form.php',
            frame:true,
            title: 'Upload File Transaksi',
            bodyStyle:'padding:5px 5px 0',
            width: 350,
            defaults: {width: 230},
            defaultType: 'textfield',
			style:{
				'z-index' : 9000
			},
    
            items: [new Ext.ux.form.FileUploadField({
                    emptyText: 'Upload File',
                    fieldLabel: 'File Excel',
                    name: 'excel_trans_cust',
                    allowBlank: false,
                    buttonText: '',
                    buttonCfg: {
                        iconCls: 'icon-upload'
                    },
                    anchor: '95%'
                }),
                new Ext.form.Hidden({id:'form_t_cust_acc_id',fieldLabel: 't_cust_account_id', name: 't_cust_account_id', allowBlank: true,anchor:'95%',height:200,readOnly:true}),
                new Ext.form.Hidden({id:'form_p_vat_type_dtl_id',fieldLabel: 'p_vat_type_dtl_id', name: 'p_vat_type_dtl_id', allowBlank: true,anchor:'95%',height:200,readOnly:true}),
				new Ext.form.Label({xtype: 'textfield',fieldLabel: '<a href="var/uploadexcel/contoh_format_file_transaksi_harian_WP.xls">Contoh Excel</a>',labelSeparator : ""})
            ],
    
            buttons: [{
                text: 'Save',
                handler: this.onSubmit,
                scope:this
            },{
                text: 'Cancel',
				handler: this.onHideSimpleForm,
                scope:this
            }]
        });
		
		this.menu = new Ext.menu.Menu({
            id: 'mainMenu',
            layout:'form',
            plain: true,
            style: {
               // overflow: 'visible'     // For the Combo popup
               'z-index': 10000,
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
                    text:'UPLOAD TRANSAKSI HARIAN',
                    value:'Filter',
                    iconCls: '',  // <-- icon
                    hidden:false,
                    menu: this.menu  // assign menu by instance
                });
				
		this.kirimBtn = new Ext.Button({
					 text:'KIRIM',
					 handler:this.onCreate,
					 scope:this});
					 
		this.showTransBtn = new Ext.Button({
					 text:'BUKA',
					 handler:this.onShowTrans,
					 scope:this});	
		return [
            this.fields.t_cust_account_id,
            this.fields.percentage,
            this.fields.npwd,
            this.fields.finance_period,
            this.fields.p_vat_type_dtl_id,
            this.fields.p_vat_type_dtl_cls_id,
			{
                xtype: 'panel',
			    baseCls: 'x-plain',
			    border: false,
                layout: 'form',
                bodyStyle: 'padding-bottom:5px;',
                items: [
                    {columnWidth: 1, layout: 'column', baseCls: 'x-plain', items: [
                                                                                     {
                                                                                        xtype: 'displayfield',
                                                                                        fieldLabel: 's/d',
                                                                                        width: '105',
                                                                                        name: '',
                                                                                        value: 'MASA PAJAK:'
                                                                                     },
                                                                                     this.fields.start_period,
                                                                                     {
                                                                                        xtype: 'displayfield',
                                                                                        fieldLabel: 's/d',
                                                                                        anchor: '100%',
                                                                                        name: '',
                                                                                        value: ' s/d '
                                                                                     },
                                                                                     this.fields.end_period
                                                                                     ]
                                                                                     
                    }
                ]
            },
			{
                xtype: 'panel',
			    baseCls: 'x-plain',
			    border: false,
                layout: 'form',
                bodyStyle: 'padding-bottom:5px;',
                items: [
                    {columnWidth: 1, layout: 'column', baseCls: 'x-plain', items: [
                                                                                     {
                                                                                        xtype: 'displayfield',
                                                                                        fieldLabel: '',
                                                                                        width: '105',
                                                                                        name: '',
                                                                                        value: ''
                                                                                     },
                                                                                     this.filter
                                                                                     ]
                                                                                     
                    }
                ]
            },
			this.showTransBtn,
			this.fields.total_trans_amount,
            this.fields.total_vat_amount,
            this.fields.penalty_amount,
            this.fields.total_amount, 
			{
                xtype: 'panel',
			    baseCls: 'x-plain',
			    border: false,
                layout: 'form',
                bodyStyle: 'padding-bottom:5px;',
                items: [
                    {columnWidth: 1, layout: 'column', baseCls: 'x-plain', items: [
                                                                                     {
                                                                                        xtype: 'displayfield',
                                                                                        fieldLabel: '',
                                                                                        width: '105',
                                                                                        name: '',
                                                                                        value: ''
                                                                                     },
                                                                                     this.kirimBtn
                                                                                     ]
                                                                                     
                    }
                ]
            },
            this.fields.payment_key
        ];
    },
    focusField: function(){
    	this.fields.npwd.focus();
    },
    hitungPajak: function(){
        var persen;
        var nilai;
        var denda;
        if(Ext.isEmpty(this.fields.total_trans_amount.getValue())){
            nilai=0;
        }else{
            nilai=this.fields.total_trans_amount.getValue()
        }
        if(Ext.isEmpty(this.fields.percentage.getValue())){
            persen=0
        }else{
            persen=this.fields.percentage.getValue();
        }
        if(Ext.isEmpty(this.pengali_denda)||parseFloat(this.pengali_denda) < 0){
            denda = 0;
        }else{
            denda = parseFloat(this.pengali_denda)
        }
        this.fields.penalty_amount.setValue(denda * (nilai*(persen/100)));
        this.fields.total_vat_amount.setValue(nilai*(persen/100));
        this.fields.total_amount.setValue(this.fields.total_vat_amount.getValue()+this.fields.penalty_amount.getValue());
    },
    onCreate : function(btn, ev) {
        Ext.Msg.show({
            title:'Konfirmasi',
            msg: ('Apakah anda yakin untuk menambah data pembayaran?'),
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.INFO,
            fn: function(btn,txt,option){
                if(btn=='yes'){
                    this.submitPembayaran(this);
                } 
            },
            scope:this,
            minWidth: 200
        });     
    },
    printNoBayar : function(){
        if(Ext.isEmpty(this.fields.payment_key.getValue())){
            Ext.Msg.show({
                        title:'Perhatian',
                        msg: 'Anda Belum Mendaftarkan No Bayar',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR,
                        minWidth: 200
                    });
            return;
        }
        var params=this.fields.payment_key.getValue();
        window.open("ws.php?type=json&module=bds&class=t_vat_settlement&method=printNoBayar&no_bayar="+params, "_blank", "toolbar=0,location=0,menubar=0");
    },
    submitPembayaran : function(thisform){
        var params = {'user_name' : _UNAME,
                              'npwd' : thisform.fields.npwd.getValue(),
                              't_cust_account_id':thisform.fields.t_cust_account_id.getValue(),
                              'finance_period':thisform.fields.finance_period.getValue(),
                              'p_vat_type_dtl_id':thisform.fields.p_vat_type_dtl_id.getValue(),
                            'p_vat_type_dtl_cls_id':thisform.fields.p_vat_type_dtl_cls_id.getValue(),
                            'start_period':thisform.fields.start_period.getValue().format('d-m-Y'),
                            'end_period':thisform.fields.end_period.getValue().format('d-m-Y'),
                            'total_trans_amount':thisform.fields.total_trans_amount.getValue(),
                            'total_vat_amount':thisform.fields.total_vat_amount.getValue()};
        thisform.getForm().submit({
	        url: Webi.ROUTE_URL + '&class=t_vat_settlement&method=createSptpd',
	        waitMsg: 'Menyimpan data...',
	        params: {
    			items: Ext.encode(params)
	        },
            success: function(form, action) {
                /*var message = action.result.items.o_ret_code;
                message=message.split('|');
                */Ext.Msg.show({
                        title:'Informasi',
                        msg: (action.result.message),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO,
                        minWidth: 200
                    });
                thisform.fields.payment_key.setValue(action.result.items.o_pay_key);
                //thisform.fields.penalty_amount.setValue(action.result.items.penalty);
                //thisform.fields.total_amount.setValue(thisform.fields.total_vat_amount.getValue()+thisform.fields.penalty_amount.getValue());
                if(!Ext.isEmpty(action.result.items.o_pay_key)&&action.result.items.o_pay_key!=null){
                    thisform.kirimBtn.disable();
                }
                //window.open("http://172.16.20.2:81/mpd/report/cetak_duplikat_kwitansi_bphtb.php"+params, "_blank", "toolbar=0,location=0,menubar=0");
                //location.href="172.16.20.2/mpd/report/cetak_duplikat_kwitansi_bphtb.php"+params;
            },
            failure: function(form, action) {
                //thisform.hideActionProgress('create', false);
                var message = action.result.message;
                    Ext.Msg.show({
                        title:'Perhatian',
                        msg: (message),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR,
                        minWidth: 200
                    });
            },
            scope: thisform
	     });
    },
	
	submitSPTPD :function(){
        var data_items = this.getSelectionModel().getSelected();
        //Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk submit data tersebut?', function(btn){
        //    if (btn != 'yes') return;
            var url_print = 'ws.php?type=json&module=bds&class=t_vat_settlement&method=submitSptpd';	
            var sendRequest = new Webi.Server;
            sendRequest.setURL(url_print);
            sendRequest.setParam('items',Ext.encode(data_items.data));
            sendRequest.onFailure =function(response, options){
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Submit Gagal'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR,
                    minWidth: 200
                });
            }
            sendRequest.on('success',function(){
                //alert('sukses');
                this.grid.store.load();
            },this);
            sendRequest.request();
        //}, this);
    },
	
    onSubmit : function(){
        var thisgrid = this;
		this.menu.hide();
        this.simpleform.getForm().submit({
	        url: Webi.ROUTE_URL + '&class=t_vat_settlement&method=uploadExcel',
	        waitMsg: 'Menyimpan data...',
	        params: {
				't_cust_account_id' : this.fields.t_cust_account_id.getValue(),
    			items: Ext.encode({
					't_cust_account_id' : this.fields.t_cust_account_id.getValue()
				})
	        },
            success: function(form, action) {
                //alert(action.result.items.toSource());
				var jumlah=0;
				for (i = 0; i<action.result.items.length;i++){
					var item = action.result.items[i];
					jumlah += parseFloat(item.i_serve_charge);
				}
				this.fields.total_trans_amount.setValue(jumlah);
				this.hitungPajak();
				Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Data Berhasil Di upload'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO,
                    minWidth: 200
                });
                //this.store.load();
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
                //this.store.load();
            },
            scope: this
	     });
    },
	
	onHideSimpleForm : function(){
		this.menu.hide();
	},
	buildUI: function(){
        this.btnSave = new Ext.Button({
        	itemId: 'btnSave',
            text: 'CETAK NO. BAYAR',
            iconCls: 'icon-save',
            handler: this.printNoBayar,
            scope: this
        });
        
        this.btnUpdate = new Ext.Button({
        	itemId: 'btnUpdate',
            text: 'Update',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this,
            hidden: true
        });
        
        this.btnCancel = new Ext.Button({
        	itemId: 'btnCancel',
            text: 'Tutup',
            iconCls: 'icon-closewin',
            handler: this.onCancel,
            scope: this
        });
        
        return [this.btnSave, this.btnUpdate, this.btnCancel];
    },
	onShowTrans : function (){
		//alert(this.t_transaksi_harian.toSource());
		if(Ext.isEmpty(this.fields.start_period.getValue())||Ext.isEmpty(this.fields.end_period.getValue())|| Ext.isEmpty(this.fields.finance_period.getValue())){
			Ext.Msg.alert('Warning', 'Periode, Periode Awal, dan Periode Akhir masih belum benar');
			return;
		}
		this.editableWin.items.get(0).grid.fields.trans_date.setMinValue(this.fields.start_period.getValue());
		this.editableWin.items.get(0).grid.fields.trans_date.setMaxValue(this.fields.end_period.getValue());
		this.editableWin.items.get(0).grid.fields.trans_date.setValue(this.fields.start_period.getValue());
		this.editableWin.items.get(0).grid.store.removeAll();
		this.editableWin.items.get(0).grid.store.baseParams.t_cust_account_id=this.fields.t_cust_account_id.getValue();
		this.editableWin.items.get(0).grid.store.baseParams.p_vat_type_dtl_id=this.fields.p_vat_type_dtl_id.getValue();  
		this.editableWin.items.get(0).grid.store.baseParams.start_period=this.fields.start_period.getValue();
		this.editableWin.items.get(0).grid.store.baseParams.end_period=this.fields.end_period.getValue();
		this.editableWin.show();
		this.editableWin.items.get(0).grid.store.load();
	}
});
