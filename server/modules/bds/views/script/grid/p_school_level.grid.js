/**
 * @class Bds.grid.p_school_level
 * Grid for table bds_p_school_level
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_school_level = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_school_level();
        
        this.columns = [
            {header: Bds.properties.p_school_level_id, hidden: true, sortable: true, dataIndex: 'p_school_level_id'},
			{header: Bds.properties.p_school_level_listing_no, hidden: false, sortable: true, dataIndex: 'listing_no', width: 70, renderer: Webi.format.intRenderer},
			{header: Bds.properties.p_school_level_code, hidden: false, sortable: true, dataIndex: 'code', width:138},
			{header: Bds.properties.p_school_level_description, hidden: false, sortable: true, dataIndex: 'description', width:250},
			{header: Bds.properties.p_school_level_creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.p_school_level_creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 110},
			{header: Bds.properties.p_school_level_updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.p_school_level_updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 110}
        ];

        // super
        Bds.grid.p_school_level.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'p_school_level_id': '',
			'code': '',
			'listing_no': '',
			'description': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchKode = new Ext.form.TextField({emptyText:'Kode Level Sekolah', width:150});
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
Ext.reg('grid_p_school_level', Bds.grid.p_school_level);