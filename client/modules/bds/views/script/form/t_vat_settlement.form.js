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
        this.btnSave.setText('Kirim');
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.jumlah_bulan=0;
        this.pengali_denda=0;
        this.fields.service_charge = new Ext.form.TextField({fieldLabel: 'Nama WP', name: 'service_charge', allowBlank: false, width:120});        
        this.fields.t_cust_account_id = new Ext.form.Hidden({fieldLabel: 'Nilai Omzet',allowNegative:false, name: 't_cust_account_id', allowBlank: true,width:220});
        this.fields.npwd = new Ext.form.TextField({fieldLabel: 'NPWD', name: 'npwd', allowBlank: false,readOnly:true,width:220});
		this.fields.year_period = new Bds.combo.p_year_period({fieldLabel: 'Periode',editable:false, name: 'p_year_period', allowBlank: false,emptyText:"Pilih Periode Tahun",width:220});
        this.fields.year_period.on('select',function(cb,rec,index){
            this.fields.finance_period.enable();
			this.fields.finance_period.store.baseParams.p_year_period_id = cb.getValue();
            this.fields.finance_period.store.load();
            this.fields.finance_period.setValue();
        },this);
		this.on('loadrecord',function(){
            this.fields.year_period.store.load();    
        },this)
        this.fields.finance_period = new Bds.combo.p_finance_period({fieldLabel: 'Periode',editable:false, name: 'p_finance_period', allowBlank: false,emptyText:"Pilih Periode",width:220});
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
        this.fields.p_vat_type_dtl_id = new Bds.combo.p_vat_type_dtl({fieldLabel: 'Ayat Pajak', name: 'p_vat_type_dtl_id', allowBlank: true,width:220});
        this.fields.p_vat_type_dtl_id.on('select',function(cb,rec,index){
            this.fields.percentage.setValue(rec.get('vat_pct'));
            this.fields.p_vat_type_dtl_cls_id.store.baseParams.p_vat_type_dtl_id = cb.getValue();
            this.fields.p_vat_type_dtl_cls_id.store.load();
            this.fields.p_vat_type_dtl_cls_id.setValue();
            
        },this);
        this.on('loadrecord', function(form, record, actionType){
			this.btnSave.enable();
            if (actionType == 'update'){
                this.fields.p_vat_type_dtl_id.store.baseParams.p_vat_type_dtl_id = this.fields.p_vat_type_dtl_id.getValue();
                this.fields.p_vat_type_dtl_id.getStore().load({params: {p_vat_type_dtl_id:record.get('p_vat_type_dtl_id')}});
            }else{
                this.fields.p_vat_type_dtl_id.store.baseParams.p_vat_type_dtl_id = this.fields.p_vat_type_dtl_id.getValue();  
                delete this.fields.p_vat_type_dtl_id.lastQuery;
                this.fields.p_vat_type_dtl_id.doQuery('', true);
            }
        }, this);
        this.fields.p_vat_type_dtl_cls_id = new Bds.combo.p_vat_type_dtl_cls({fieldLabel: 'Kelas Pajak', name: 'p_vat_type_dtl_cls_id', allowBlank: true,width:220});
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
        this.fields.total_trans_amount = new Ext.ux.NumericField({useThousandSeparator: true,enableKeyEvents:true,decimalPrecision:2,fieldLabel: 'Nilai Omzet',allowNegative:false, name: 'total_trans_amount', allowBlank: true,width:220});
		this.fields.total_trans_amount.on('keyup',function(form,e){
            this.hitungPajak();
        },this);
		this.fields.start_period = new Ext.form.DateField({fieldLabel: 'Masa Pajak', name: 'start_period',width:100, allowBlank: true, format: 'd-m-Y'});
		this.fields.end_period = new Ext.form.DateField({fieldLabel: 's/d', name: 'end_period', allowBlank: true,width:100,format: 'd-m-Y'});
		this.fields.percentage = new Ext.form.Hidden({fieldLabel: 'Nilai Omzet',allowNegative:false, name: 'percentage', allowBlank: true,width:220});
		this.fields.total_vat_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',fieldLabel: 'Pajak yg Harus Dibayar',allowNegative:false, name: 'total_vat_amount', allowBlank: true,width:220,readOnly:true});
		this.fields.payment_key = new Ext.form.TextField({style : 'background: #00FF00;',fieldLabel: 'No Pembayaran',allowNegative:false, name: 'payment_key', allowBlank: true,width:220,readOnly:true});
		this.fields.p_vat_type_dtl_id.store.on('load',function(store,rec){
            if(Ext.isEmpty(this.fields.percentage.getValue())){
                this.fields.percentage.setValue(rec[0].get('vat_pct'));
            }
        },this);
        this.fields.penalty_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',fieldLabel: 'Denda',allowNegative:false, name: 'penalty_amount', allowBlank: true,width:220,readOnly:true});
		this.fields.total_amount = new Ext.ux.NumericField({style : 'background: #00FF00;text-align:right;',fieldLabel: 'Total yg Harus Dibayar',allowNegative:false, name: 'total_amount', allowBlank: true,width:220,readOnly:true});
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
                                                                                        value: 'Masa Pajak:'
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
            this.fields.total_trans_amount,
            this.fields.total_vat_amount,
            this.fields.penalty_amount,
            this.fields.total_amount, 
            this.fields.payment_key,
            new Ext.Button({text:'Print No pembayaran',handler:this.printNoBayar,scope:this})
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
                              'npwd' : thisform.npwd,
                              't_cust_account_id':thisform.fields.npwd.getValue(),
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
                    thisform.btnSave.disable();
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
    }
});
