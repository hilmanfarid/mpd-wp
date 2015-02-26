/**
 * @class Bds.grid.cust_acc_month
 * Grid for table bds_cust_acc_month
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.cust_acc_month = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    enableEdit:false,
    enableAdd:false,
    enableDelete:false,
    initComponent : function() {
        this.store = new Bds.store.cust_acc_month();
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
    
            items: [
                new Ext.ux.form.FileUploadField({
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
                new Ext.form.Hidden({id:'form_t_cust_acc_id',fieldLabel: 'Informasi BPHTB', name: 't_cust_account_id', allowBlank: true,anchor:'95%',height:200,readOnly:true}),
                new Ext.form.Hidden({id:'form_p_vat_type_dtl_id',fieldLabel: 'Informasi BPHTB', name: 'p_vat_type_dtl_id', allowBlank: true,anchor:'95%',height:200,readOnly:true})
            ],
    
            buttons: [{
                text: 'Save',
                handler: this.onSubmit,
                scope:this
            },{
                text: 'Cancel'
            }]
        });
        this.columns = [
            {header: 'Bulan', hidden: true, sortable: true, dataIndex: 'p_finance_period_id', width: 112},
            {header: 'Bulan', hidden: false, sortable: true, dataIndex: 'code', width: 112},
            {header: 'Masa Pajak', hidden: false, sortable: true, dataIndex: 'masa', width: 160,renderer: function(value,meta,record){
                var start_date = record.get('start_period').split(' ')[0];
                var start_date_part = new Date(start_date);
                var end_date = record.get('end_period').split(' ')[0];
                var end_date_part = new Date(end_date);
                return start_date_part.format("d-m-Y")+' s/d '+end_date_part.format("d-m-Y");
            }},
            {header: 'Jenis Pajak',hidden: true, sortable: true, dataIndex: 'p_vat_type_dtl_id', width: 112},
            {header: 'Status',hidden: false, sortable: true, dataIndex: 'p_order_status_id', width: 112,renderer: function(value,meta,record){
                if(Ext.isEmpty(record.get('p_order_status_id'))){
                    return 'Laporan Belum Dikirim';
                }else if(record.get('p_order_status_id') == 1 || record.get('p_order_status_id') == 2){
                    return 'Belum Verifikasi';
                }else if(record.get('p_order_status_id') == 3){
                    return 'Sudah Verifikasi';
                }
            }},
            {header: 'Jumlah Transaksi',hidden: false, sortable: true, dataIndex: 'jum_trans', width: 112, renderer: Webi.format.floatRenderer},
            {header: 'Jumlah Pajak',hidden: false, sortable: true, dataIndex: 'jum_pajak', width: 112, renderer: Webi.format.floatRenderer},
        ];

        // super
        Bds.grid.cust_acc_month.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
        };
        return defaultData;
    },
    buildTopToolbar : function() {
        var buttons = [];
        //////////////////////////default/////////////////////////////////////
        
        //////////////////////////default/////////////////////////////////////
        this.bttnPrint = new Ext.Button({text:'Tampilkan',handler:this.viewBphtb,scope:this});
        this.btnClear = new Ext.Button({text:'Clear',handler:this.clearFilter,scope:this});
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
                    text:'Upload File',
                    value:'Filter',
                    iconCls: '',  // <-- icon
                    hidden:false,
                    menu: this.menu  // assign menu by instance
                });
		
        /*buttons.push(this.receipt_no);
        buttons.push('No Registrasi :');
        buttons.push(this.registration_no);
        buttons.push('NOP :');
        buttons.push(this.njop_pbb);
        buttons.push('Nama :');
        buttons.push(this.wp_name);*/
        buttons.push(this.filter);
        buttons.push(this.bttnPrint);
        buttons.push(this.btnClear);
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
    onNew : function(btn, ev) {
        if(Ext.isEmpty(this.npwd.getValue())){
            return false;
        }
        var doreq = this.fireEvent('beforenew', this, btn, ev);
        
        if (doreq !== false){
            var rec = new this.store.recordType(this.getDefaultData());
            rec.data.t_cust_account_id = this.npwd.getValue();
            rec.data.p_vat_type_dtl_id = this.p_vat_type_dtl_id.getValue();
            this.fireEvent('new', this, rec, btn, ev);
        }
    },
    onSubmit : function(){
        //this.simpleform.getForm().findField('form_t_cust_acc_id').setValue(Ext.getCmp('the-npwd').getValue());
        //this.simpleform.getForm().findField('form_p_vat_type_dtl_id').setValue(Ext.getCmp('the-type_dtl').getValue());
        var thisgrid = this;
        this.simpleform.getForm().submit({
	        url: Webi.ROUTE_URL + '&class=cust_acc_trans&method=uploadExcel',
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
                this.store.load();
            },
            scope: this
	     });
    }
});
Ext.reg('grid_cust_acc_month', Bds.grid.cust_acc_month);