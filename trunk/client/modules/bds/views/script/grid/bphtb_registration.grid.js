/**
 * @class Bds.grid.bphtb_registration
 * Grid for table bds_bphtb_registration
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.bphtb_registration = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.bphtb_registration();
        
        this.columns = [
            {header: 't_bphtb_registration_id',hidden: false, sortable: true, dataIndex: 't_bphtb_registration_id', width: 112},
			{header: 'receipt_no',hidden: false, sortable: true, dataIndex: 'receipt_no', width: 112},
			{header: 'registration_no',hidden: false, sortable: true, dataIndex: 'registration_no', width: 112},
            {header: 'njop_pbb',hidden: false, sortable: true, dataIndex: 'njop_pbb', width: 112},
            {header: 'payment_date',hidden: false, sortable: true, dataIndex: 'payment_date', width: 112, renderer: Webi.format.dateRenderer},
            {header: 'wp_name',hidden: false, sortable: true, dataIndex: 'wp_name', width: 112},
            {header: 'wp_address_name',hidden: false, sortable: true, dataIndex: 'wp_address_name', width: 112},
            {header: 'kelurahan_name',hidden: false, sortable: true, dataIndex: 'kelurahan_name', width: 112},
            {header: 'kecamatan_name',hidden: false, sortable: true, dataIndex: 'kecamatan_name', width: 112},
            {header: 'land_area',hidden: false, sortable: true, dataIndex: 'land_area', width: 112},
            {header: 'building_area',hidden: false, sortable: true, dataIndex: 'building_area', width: 112},
            {header: 'land_total_price',hidden: false, sortable: true, dataIndex: 'land_total_price', width: 112},
            {header: 'payment_amount',hidden: false, sortable: true, dataIndex: 'payment_amount', width: 112},
            {header: 'bphtb_amt_final',hidden: false, sortable: true, dataIndex: 'bphtb_amt_final', width: 112},
        ];

        // super
        Bds.grid.bphtb_registration.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_bphtb_registration_id': '',
			'receipt_no': '',
            'njop_pbb': '',
            'payment_date': '',
            'wp_name': '',
            'wp_address_name': '',
            'kelurahan_name': '',
            'kecamatan_name': '',
            'land_area': '',
            'building_area': '',
            'land_total_price': '',
            'payment_amount': '',
            'bphtb_amt_final':''
        };
        return defaultData;
    },
    buildTopToolbar : function() {
        var buttons = [];
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
               'padding': 10
            },
            items: [
                this.receipt_no,
                this.registration_no,
                this.njop_pbb,
                this.wp_name
            ]
        });
		this.filter=new Ext.Button({
                    text:'Filter',
                    value:'Filter',
                    iconCls: '',  // <-- icon
                    hidden:false,
                    menu: this.menu  // assign menu by instance
                });
		
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
    }
});
Ext.reg('grid_bphtb_registration', Bds.grid.bphtb_registration);