/**
 * @class Bds.grid.p_parameter_type
 * Grid for table bds_p_parameter_type
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_parameter_type = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_parameter_type();
        
        this.columns = [
            {header: Bds.properties.ptype_id, hidden: true, sortable: true, dataIndex: 'ptype_id'},
			{header: Bds.properties.ptype_listing_no, hidden: false, sortable: true, dataIndex: 'ptype_listing_no', width: 70, renderer: Webi.format.intRenderer},
			{header: Bds.properties.ptype_code, hidden: false, sortable: true, dataIndex: 'ptype_code', width:138},
			{header: Bds.properties.ptype_description, hidden: false, sortable: true, dataIndex: 'ptype_description', width:250},
			{header: Bds.properties.ptype_creation_date, hidden: false, sortable: true, dataIndex: 'ptype_creation_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.ptype_creation_by, hidden: false, sortable: true, dataIndex: 'ptype_creation_by', width: 110},
			{header: Bds.properties.ptype_updated_date, hidden: false, sortable: true, dataIndex: 'ptype_updated_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.ptype_updated_by, hidden: false, sortable: true, dataIndex: 'ptype_updated_by', width: 110}
        ];

        // super
        Bds.grid.p_parameter_type.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'ptype_id': '',
			'ptype_code': '',
			'ptype_listing_no': '',
			'ptype_prefix_tabel': '',
			'ptype_postfix_tabel': '',
			'ptype_description': '',
			'ptype_creation_date': '',
			'ptype_creation_by': '',
			'ptype_updated_date': '',
			'ptype_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchKodeJenis = new Ext.form.TextField({emptyText:'Kode Jenis Parameter', width:150});
                
        this.searchKodeJenis.on('specialkey',this.onSearchText,this);
        
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
        buttons.push(this.searchKodeJenis);
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
        
        var searchKodeJenis = this.searchKodeJenis.getValue();
                
        if(!Ext.isEmpty(searchKodeJenis)) {
            p['searchKodeJenis'] = searchKodeJenis;      
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
        this.searchKodeJenis.reset();
    }
});
Ext.reg('grid_p_parameter_type', Bds.grid.p_parameter_type);