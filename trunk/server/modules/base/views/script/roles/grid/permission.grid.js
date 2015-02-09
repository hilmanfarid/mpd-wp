/**
 * @class Base.grid.permission
 * Grid for table core_permission
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.grid.permission = Ext.extend(Webi.grid.GridPanel, {
    
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Base.store.permission();
        this.columns = [
            {
				header: Base.properties.permission_id, 
				dataIndex: 'permission_id', sortable: true, hidden: true
			},
			{
				header: 'Nama Modul', 
				dataIndex: 'permission_name', sortable: true, hidden: false, width:250
			},
			{
				header: Base.properties.permission_desc, 
				dataIndex: 'permission_desc', sortable: true, hidden: false, width:550
			},
			{
				header: 'Nama Modul', 
				dataIndex: 'permission_module', sortable: true, hidden: true
			}
        ];

        // super
        Base.grid.permission.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'permission_id': '',
			'permission_name': '',
			'permission_desc': '',
			'permission_module': 'bds'
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchModul = new Ext.form.TextField({emptyText:'Nama Modul', width:150});
        this.searchModul.on('specialkey',this.onSearchText,this);
        
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
        buttons.push(this.searchModul);
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
        
        var searchModul = this.searchModul.getValue();
                
        if(!Ext.isEmpty(searchModul)) {
            p['searchModul'] = searchModul;      
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
        this.searchModul.reset();
    }
});
Ext.reg('grid_permission', Base.grid.permission);