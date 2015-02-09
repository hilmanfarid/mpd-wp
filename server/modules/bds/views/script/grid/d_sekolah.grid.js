/**
 * @class Bds.grid.d_sekolah_pt
 * Grid for table bds_d_sekolah_pt
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.d_sekolah = Ext.extend(Webi.grid.GridPanel, {
    levelSekolah : '',
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_sekolah();
        this.store.baseParams.levelSekolah = this.levelSekolah;
        
        this.columns = [
            {header: Bds.properties.d_sekolah_pt_d_sekolah_id, hidden: true, sortable: true, dataIndex: 'd_sekolah_id'},
			{header: 'No Urut', hidden: false, sortable: true, dataIndex: 'listing_no', width:60},
			{header: Bds.properties.d_sekolah_pt_code, hidden: false, sortable: true, dataIndex: 'code', width:120},
			{header: Bds.properties.d_sekolah_pt_sekolah_name, hidden: false, sortable: true, dataIndex: 'sekolah_name', width:200},
			{header: 'Jenis ' + this.levelSekolah, hidden: false, sortable: true, dataIndex: 'jenis_sekolah', width:181},
			{header: 'Status ' + this.levelSekolah, hidden: false, sortable: true, dataIndex: 'status_sekolah', width:181},
			{header: Bds.properties.d_sekolah_pt_address_1, hidden: false, sortable: true, dataIndex: 'address_1', width:250},
			{header: 'Kecamatan', hidden: false, sortable: true, dataIndex: 'kecamatan_nama', width:100},
			{header: Bds.properties.d_sekolah_pt_kota, hidden: false, sortable: true, dataIndex: 'kota', width:100},
			{header: Bds.properties.jobpos_description, hidden: false, sortable: true, dataIndex: 'description', width:350},
            {header: 'Tgl Pembuatan', hidden: false, sortable: true, dataIndex: 'creation_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Dibuat Oleh', hidden: false, sortable: true, dataIndex: 'creation_by', width: 112},
			{header: 'Tgl Update', hidden: false, sortable: true, dataIndex: 'updated_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Diupdate Oleh', hidden: false, sortable: true, dataIndex: 'updated_by', width: 112}
        ];

        // super
        Bds.grid.d_sekolah.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'd_sekolah_id': '',
			'code': '',
			'sekolah_name': '',
            'alias_name': '',
            'type_id': '',
            'type_code': '',
            'level_id': '',
            'status_id': '',
            'status_code': '',
            'tgl_berdiri': '',
            'address_1': '',
            'address_2': '',
            'kecamatan_id': '',
            'kota': '',
            'phone_no': '',
            'website': '',
            'kode_pos': '',
            'listing_no': '',
            'description': '',
            'status': '',                           
            'creation_date': '',
            'creation_by': '',
            'updated_date': '',
            'updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchSekolah = new Ext.form.TextField({emptyText:'Kode/Nama ' + this.levelSekolah, width:200});
        this.searchSekolah.on('specialkey',this.onSearchText,this);
        
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
        
        buttons.push('->');
        buttons.push({xtype: 'tbtext', text: 'Cari :'});
        buttons.push(this.searchSekolah);
        buttons.push(' ');
        
        buttons.push({
            itemId: 'btnReset',
            text: 'Reset',
            handler: this.onReset,
            scope: this
        });
        
        return buttons;
    },
    
    getSearchParams:function() {
    	var p = {};
        
        var searchSekolah = this.searchSekolah.getValue();
        if(!Ext.isEmpty(searchSekolah)) {
            p['searchSekolah'] = searchSekolah;      
        }
        
		return p;
    },
    
    onSearchText: function(field, e) {
    	if(e.getKey() == e.ENTER) {
    		this.onSearch();	
    	}
    },
    
    onSearch: function() {
    	this.store.baseParams = this.getSearchParams();
   		this.store.load();
    },
    
    onReset: function() {
        this.resetFields();
    	this.store.baseParams = {};
    	this.store.baseParams.levelSekolah = this.levelSekolah;
    	this.store.load();
    },
    
    resetFields: function() {
        this.searchSekolah.reset();
    }
});
Ext.reg('grid_d_sekolah', Bds.grid.d_sekolah);