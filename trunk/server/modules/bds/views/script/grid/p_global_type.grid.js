/**
 * @class Bds.grid.p_global_type
 * Grid for table bds_p_global_type
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_global_type = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_global_type();
        
        this.columns = [
            {header: Bds.properties.gtype_id, hidden: true, sortable: true, dataIndex: 'gtype_id'},
			{header: Bds.properties.gtype_code, hidden: false, sortable: true, dataIndex: 'gtype_code', width:152},
			{header: Bds.properties.gtype_description, hidden: false, sortable: true, dataIndex: 'gtype_description', width:253},
			{header: Bds.properties.gtype_creation_date, hidden: false, sortable: true, dataIndex: 'gtype_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.gtype_creation_by, hidden: false, sortable: true, dataIndex: 'gtype_creation_by', width: 120},
			{header: Bds.properties.gtype_updated_date, hidden: false, sortable: true, dataIndex: 'gtype_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.gtype_updated_by, hidden: false, sortable: true, dataIndex: 'gtype_updated_by', width: 120}
        ];

        // super
        Bds.grid.p_global_type.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'gtype_id': '',
			'gtype_code': '',
			'gtype_description': '',
			'gtype_creation_date': '',
			'gtype_creation_by': '',
			'gtype_updated_date': '',
			'gtype_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchKode = new Ext.form.TextField({emptyText:'Kode Jenis Parameter', width:150});
                
        this.searchKode.on('specialkey',this.onSearchText,this);
        
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
        buttons.push(this.searchKode);
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
        
        var searchKode = this.searchKode.getValue();
                
        if(!Ext.isEmpty(searchKode)) {
            p['searchKode'] = searchKode;      
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
        this.searchKode.reset();
    }
});
Ext.reg('grid_p_global_type', Bds.grid.p_global_type);