/**
 * @class Bds.grid.kepala_keluarga
 * Grid for table bds_kepala_keluarga
 *
 * @author agung.hp
 * @since 31-10-2012 11:02:06
 */
Bds.grid.kepala_keluarga = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.kepala_keluarga();
        
        this.columns = [
            {header: Bds.properties.warga_id, hidden: true, sortable: true, dataIndex: 'warga_id'},
			{header: Bds.properties.warga_name, hidden: false, sortable: true, dataIndex: 'warga_name', width:212},
			{header: Bds.properties.warga_kk_no, hidden: false, sortable: true, dataIndex: 'warga_kk_no', width:200},
			{header: Bds.properties.warga_ktp_no, hidden: false, sortable: true, dataIndex: 'warga_ktp_no', width:200},
			{header: Bds.properties.warga_tgl_lahir, hidden: false, sortable: true, dataIndex: 'warga_tgl_lahir', width: 75, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_tempat_lahir, hidden: false, sortable: true, dataIndex: 'warga_tempat_lahir', width:150},
			{header: Bds.properties.warga_address_1, hidden: true, sortable: true, dataIndex: 'warga_address_1'},
			{header: Bds.properties.warga_address_2, hidden: true, sortable: true, dataIndex: 'warga_address_2'},
			{header: Bds.properties.warga_kota, hidden: false, sortable: true, dataIndex: 'warga_kota'},
			{header: Bds.properties.warga_kode_pos, hidden: false, sortable: true, dataIndex: 'warga_kode_pos'},
			{header: Bds.properties.warga_description, hidden: true, sortable: true, dataIndex: 'warga_description'},
			{header: Bds.properties.warga_creation_date, hidden: false, sortable: true, dataIndex: 'warga_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_created_by, hidden: false, sortable: true, dataIndex: 'warga_created_by', width: 120},
			{header: Bds.properties.warga_updated_date, hidden: false, sortable: true, dataIndex: 'warga_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_updated_by, hidden: false, sortable: true, dataIndex: 'warga_updated_by', width: 120}
        ];

        // super
        Bds.grid.kepala_keluarga.superclass.initComponent.call(this);
    },
    
    getDefaultData: function(){
        var defaultData = {
			'warga_id': '',
			'warga_pid': '',
			'warga_kk_no': '',
			'warga_ktp_no': '',
			'warga_name': '',
			'jk_id': '',
			'warga_ktp_date': '',
			'warga_ktpvalid_to': '',
			'warga_kkvalid_to': '',
			'warga_tgl_lahir': '',
			'warga_tempat_lahir': '',
			'goldarah_id': '',
			'agama_id': '',
			'statnikah_id': '',
			'hubkel_id': '',
			'warga_address_1': '',
			'warga_address_2': '',
			'warga_kota': '',
			'warga_kode_pos': '',
			'pendidikan_id': '',
			'jobtype_id': '',
			'wilayah_id': '',
			'warga_job_company': '',
			'warga_job_address': '',
			'warga_job_kota': '',
			'warga_description': '',
			'warga_creation_date': '',
			'warga_created_by': '',
			'warga_updated_date': '',
			'warga_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchKepalaKeluarga = new Ext.form.TextField({emptyText:'Nama Kepala Keluarga', width:180});
        this.warga_ktp_no = new Ext.form.TextField({emptyText:'No.KTP', width:150});
        
        this.searchKepalaKeluarga.on('specialkey',this.onSearchText,this);
        this.warga_ktp_no.on('specialkey',this.onSearchText,this);
        
        if (this.enableAdd === true){
            buttons.push({
                itemId: 'btnNew',
                text: 'Tambah Kep.Keluarga',
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
        buttons.push(this.searchKepalaKeluarga);
        buttons.push(' ');
        buttons.push(this.warga_ktp_no);
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
        
        var searchKepalaKeluarga = this.searchKepalaKeluarga.getValue();
        var warga_ktp_no = this.warga_ktp_no.getValue();
                
        if(!Ext.isEmpty(searchKepalaKeluarga)) {
            p['searchKepalaKeluarga'] = searchKepalaKeluarga;      
        }
        
        if(!Ext.isEmpty(warga_ktp_no)) {
            p['ktp_no'] = warga_ktp_no;      
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
        this.searchKepalaKeluarga.reset();
        this.warga_ktp_no.reset();
    }
});
Ext.reg('grid_kepala_keluarga', Bds.grid.kepala_keluarga);