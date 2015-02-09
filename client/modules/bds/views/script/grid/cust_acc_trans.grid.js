/**
 * @class Bds.grid.cust_acc_trans
 * Grid for table bds_cust_acc_trans
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.cust_acc_trans = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.cust_acc_trans();
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
            {header: 'NPWPD', hidden: false, sortable: true, dataIndex: 'npwd', width: 112},
            //{header: 'trans_date',hidden: false, sortable: true, dataIndex: 'trans_date', width: 112,renderer: Webi.format.dateRenderer},
            {header: 'Tanggal Transaksi',hidden: false, sortable: true, dataIndex: 'trans_date', width: 112,renderer: Webi.format.dateRenderer},
            {header: 'No Faktur',hidden: false, sortable: true, dataIndex: 'bill_no', width: 112},
            {header: 'Deskripsi',hidden: false, sortable: true, dataIndex: 'service_desc', width: 112},
            {header: 'Nilai Transaksi',hidden: false, sortable: true, dataIndex: 'service_charge', width: 112, renderer: Webi.format.floatRenderer},
            {header: 'Nilai Pajak',hidden: true, sortable: true, dataIndex: 'vat_charge', width: 112, renderer: Webi.format.floatRenderer},
        ];

        // super
        Bds.grid.cust_acc_trans.superclass.initComponent.call(this);
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
        if (this.enableAdd === true){
            buttons.push({
                itemId: 'btnNew',
                text: 'Tambah',
                iconCls: 'icon-add',
                handler: this.onNew,
                scope: this
            });
        }

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
        
        if (this.enableDelete === true){
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
        this.npwd = new Bds.combo.npwd({id:'the-npwd',fieldLabel: 'Npwd', name: 't_cust_account_id', allowBlank: true,emptyText:"Cari NPWPD"});
        this.npwd.on('select',function(cb,rec,index){
            this.store.baseParams.t_cust_account_id = this.npwd.getValue();
            this.store.baseParams.p_vat_type_dtl_id = rec.get('p_vat_type_dtl_id');
            this.p_vat_type_dtl_id.getStore().load({params: {p_vat_type_dtl_id:rec.get('p_vat_type_dtl_id')}});
            //this.p_vat_type_dtl_id.setValue(rec.get('p_vat_type_dtl_id'));
            this.store.load();
        },this);
        this.p_vat_type_dtl_id = new Bds.combo.p_vat_type_dtl({id:'the-type_dtl',fieldLabel: 'Jenis Ayat', name: 'p_vat_type_dtl_id', allowBlank: true,emptyText:"Jenis Ayat",width:220});
        this.p_vat_type_dtl_id.on('select',function(){
            this.store.baseParams.p_vat_type_dtl_id = this.p_vat_type_dtl_id.getValue();
            this.store.load();
        },this);
        this.p_vat_type_dtl_id.getStore().on('load',function(store,rec,opt){
            //alert(rec[0].get('p_vat_type_dtl_id'));
            //alert(rec[0].p_vat_type_dtl_id);
                Ext.getCmp('the-type_dtl').setValue(rec[0].get('p_vat_type_dtl_id'));
        },this);
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
                    text:'Upload File',
                    value:'Filter',
                    iconCls: '',  // <-- icon
                    hidden:false,
                    menu: this.menu  // assign menu by instance
                });
		
        buttons.push(this.npwd);
        buttons.push(this.p_vat_type_dtl_id);
        buttons.push('-');
        buttons.push(this.po_tgl_awal);
        buttons.push(' s/d ');
        buttons.push(this.po_tgl_akhir);
        buttons.push('-');
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
        this.simpleform.getForm().findField('form_t_cust_acc_id').setValue(Ext.getCmp('the-npwd').getValue());
        this.simpleform.getForm().findField('form_p_vat_type_dtl_id').setValue(Ext.getCmp('the-type_dtl').getValue());
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
Ext.reg('grid_cust_acc_trans', Bds.grid.cust_acc_trans);