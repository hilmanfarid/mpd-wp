/**
 * @class Bds.grid.d_hotel
 * Grid for table bds_d_hotel
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.d_hotel = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_hotel();
        
        this.columns = [
            {header: 'ID', hidden: true, sortable: true, dataIndex: 'd_hotel_id'},
			{header: 'No Urut', hidden: false, sortable: true, dataIndex: 'listing_no', width:50},
			{header: 'Kode', hidden: false, sortable: true, dataIndex: 'code', width:80},
			{header: 'Nama', hidden: false, sortable: true, dataIndex: 'hotel_name', width:180},
			{header: 'Kelas', hidden: false, sortable: true, dataIndex: 'kelas_code', width:80},
			{header: 'Alamat', hidden: false, sortable: true, dataIndex: 'address_1', width:220},
			{header: 'Kota', hidden: false, sortable: true, dataIndex: 'kota', width:90},
			{header: 'Telepon', hidden: false, sortable: true, dataIndex: 'phone_no', width:90},
			{header: 'URL', hidden: false, sortable: true, dataIndex: 'website', width:180},
			{header: 'Deskripsi', hidden: false, sortable: true, dataIndex: 'description', width:250},
			{header: 'Tgl Pembuatan', hidden: false, sortable: true, dataIndex: 'creation_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Dibuat Oleh', hidden: false, sortable: true, dataIndex: 'created_by', width: 112},
			{header: 'Tgl Update', hidden: false, sortable: true, dataIndex: 'updated_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Diupdate Oleh', hidden: false, sortable: true, dataIndex: 'updated_by', width: 112}
        ];

        // super
        Bds.grid.d_hotel.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'd_hotel_id': '',
			'code': '',
			'hotel_name': '',
            'alias_name': '',
            'kelas_code': '',
            'jml_kamar': '',
            'address_1': '',
            'address_2': '',
            'kota': '',
            'kode_pos': '',
            'phone_no': '',
            'website': '',
            'listing_no': '',
            'description': '',
            'status': '',                           
            'creation_date': '',
            'createdn_by': '',
            'updated_date': '',
            'updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchHotel = new Ext.form.TextField({emptyText:'Kode / Nama Hotel', width:200});
        this.searchHotel.on('specialkey',this.onSearchText,this);
        
        this.kelas_id = new Bds.combo.p_parameter({emptyText:'Kelas Hotel', width: 150});
   		this.kelas_id.store.baseParams.kode_type = 'KELAS HOTEL';
        
        this.kelas_id.on('select', function(combo,rec,idx){
            this.onSearch();    
        }, this);
        
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
        buttons.push(this.searchHotel);
        buttons.push(' ');
        buttons.push(this.kelas_id);
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
        
        var searchHotel = this.searchHotel.getValue();
        var kelas_id = this.kelas_id.getValue();
                        
        if(!Ext.isEmpty(searchHotel)) {
            p['searchHotel'] = searchHotel;      
        }
        
        if(!Ext.isEmpty(kelas_id)) {
            p['kelas_id'] = kelas_id;      
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
    	this.store.load();
    },
    
    resetFields: function() {
        this.searchHotel.reset();
        this.kelas_id.reset();
    }
});
Ext.reg('grid_d_hotel', Bds.grid.d_hotel);