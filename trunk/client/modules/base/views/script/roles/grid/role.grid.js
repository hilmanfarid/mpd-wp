/**
 * @class Base.grid.role
 * Grid for table core_role
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.grid.role = Ext.extend(Webi.grid.GridPanel, {
    store: new Base.store.role(),
    initComponent : function() {
        var cbActiveStatus = new Base.combo.ActiveStatus();
        this.columns = [
            {
				header: Base.properties.role_id, 
				dataIndex: 'role_id', sortable: true, hidden: true
			},
			{
				header: Base.properties.role_name, 
				dataIndex: 'role_name', sortable: true, hidden: false
			},
			{
				header: Base.properties.role_status, 
				dataIndex: 'role_status', sortable: true, hidden: false, 
				renderer: Webi.format.comboRenderer(cbActiveStatus), width: 50
			}
        ];

        // super
        Base.grid.role.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'role_id': '',
			'role_name': '',
			'role_status': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchRole = new Ext.form.TextField({emptyText:'Nama Group', width:150});
        this.searchRole.on('specialkey',this.onSearchText,this);
        
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
        buttons.push(this.searchRole);
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
        
        var searchRole = this.searchRole.getValue();
                
        if(!Ext.isEmpty(searchRole)) {
            p['searchRole'] = searchRole;      
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
        this.searchRole.reset();
    }
});
Ext.reg('grid_role', Base.grid.role);