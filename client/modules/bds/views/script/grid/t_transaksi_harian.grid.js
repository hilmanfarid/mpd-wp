/**
 * @class Bds.grid.t_transaksi_harian
 * Grid for table bds_t_transaksi_harian
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.t_transaksi_harian = Ext.extend(Webi.grid.EditorGridPanel, {
    firstIndex: 'npwd',
    pageSize: null,
    usePaging: false,  
	enableAdd: false,
    viewConfig: {
        forceFit: false
    }, 
    stripeRows: true,
    initComponent : function() {
        if (!this.store) this.store = new Bds.store.cust_acc_trans({autoLoad:false});

        this.fields = {};
        this.fields.npwd = new Ext.form.TextField({name: 'npwd', allowBlank: false, width:0});
        this.fields.trans_date = new Ext.form.DateField({name: 'trans_date', allowBlank: true, format: 'Y-m-d'});
        this.fields.trans_date_txt = new Ext.form.Hidden({name: 'trans_date_txt', allowBlank: false, width:0});
        this.fields.bill_no = new Ext.form.TextField({name: 'bill_no', allowBlank: false, width:200});
		this.fields.bill_no_end = new Ext.form.TextField({name: 'bill_no_end', allowBlank: false, width:200});
		this.fields.bill_count = new Ext.form.NumberField({name: 'bill_count', allowBlank: false,allowDecimals:true, width:50});
        this.fields.service_desc = new Ext.form.Hidden({name: 'service_desc', allowBlank: false, width:0});
        this.fields.service_charge = new Ext.form.NumberField({name: 'service_charge', allowBlank: false,allowDecimals:true, width:50});
        this.fields.vat_charge = new Ext.form.TextField({name: 'vat_charge', allowBlank: false, width:70});
        this.fields.description = new Ext.form.TextField({name: 'description', allowBlank: true, width:70});
        this.fields.p_vat_type_dtl_id = new Ext.form.Hidden({name: 'p_vat_type_dtl_id', allowBlank: false, width:0});
        
        this.columns = [
            new Ext.grid.RowNumberer({hidden: true}),
            {
				header: 'id', 
				dataIndex: 't_cust_acc_dtl_trans_id', sortable: true, hidden: true
			},
			{
				header: 't_cust_account_id', 
				dataIndex: 't_cust_account_id', sortable: true, hidden: true
			},
			{
				header: 'p_vat_type_dtl_id', 
				dataIndex: 'p_vat_type_dtl_id', sortable: true, hidden: true
			},
			{
				header: 'Tanggal',
				dataIndex: 'trans_date', sortable: true, hidden: false,renderer: Webi.format.dateRenderer, width:70
			},
			{
				header: 'No. Urut Faktur Awal', editor: this.fields.bill_no,
				dataIndex: 'bill_no', sortable: true, hidden: false, width:120
			},
			{
				header: 'No. Urut Faktur Akhir', editor: this.fields.bill_no_end,
				dataIndex: 'bill_no_end', sortable: true, hidden: false, width:120
			},
			{
				header: 'Jumlah Faktur', editor: this.fields.bill_count,align:'right',
				dataIndex: 'bill_count', sortable: true, hidden: false, width:90
			},
			{
				header: 'Jumlah Penjualan', editor: this.fields.service_charge, align:'right',
				dataIndex: 'service_charge', sortable: true, hidden: false, width:130
			},
			{
				header: 'Deskripsi', editor: this.fields.description,
				dataIndex: 'description', sortable: true, hidden: false, width:70
			}
        ];
        // super
        Bds.grid.t_transaksi_harian.superclass.initComponent.call(this);
		this.on('afteredit', function(e){
            //alert ('test');
			if(this.enableAdd == true || this.enableEdit == true) {
                if (this.batchWrite == false){
                    if (this.getSaveButton().disabled) this.getSaveButton().enable();
                }else{
                    if (!this.getSaveButton().disabled) this.getSaveButton().disable();
                }
            }
        }, this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_cust_acc_dtl_trans_id' : '',
            't_cust_account_id' : this.store.baseParams.t_cust_account_id || '',
            'npwd' : '',
            'trans_date' : '',
            'bill_no' : '',
			'bill_no_end' : '',
			'bill_count' : '',
            'service_desc' : '',
            'service_charge' : '',
            'vat_charge' : '',
            'description' : '',
            'p_vat_type_dtl_id' : this.store.baseParams.p_vat_type_dtl_id || '',
        };
        return defaultData;
    },
});
Ext.reg('t_transaksi_harian', Bds.grid.t_transaksi_harian);