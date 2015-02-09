/**
 * @class Base.grid.role_permission
 * Grid for table core_role_permission
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.grid.role_permission = Ext.extend(Webi.grid.GridPanel, {
    store: new Base.store.role_permission(),
    initComponent : function() {
        var cbPermissionLevel = new Base.combo.PermissionLevel();
        this.columns = [
            {
				header: 'ID', 
				dataIndex: 'role_permission_id', sortable: true, hidden: true
			},        
            {
				header: Base.properties.role_id, 
				dataIndex: 'role_id', sortable: true, hidden: true
			},
			{
				header: Base.properties.permission_module, 
				dataIndex: 'permission_module', sortable: true, hidden: false, width: 10
			},
			{
				header: Base.properties.permission_id, 
				dataIndex: 'permission_id', sortable: true, hidden: false, 
				renderer: function(value, meta, record){
				    if (value == '_all_') return 'Seluruh Data';
				    
				    return record.get('permission_name');
				}, width: 20
			},
			{
				header: Base.properties.permission_desc, 
				dataIndex: 'permission_desc', sortable: true, hidden: false, width: 50
			},
			{
				header: Base.properties.permission_level, 
				dataIndex: 'permission_level', sortable: true, hidden: false, 
				renderer: Webi.format.comboRenderer(cbPermissionLevel), width: 20
			}
        ];

        // super
        Base.grid.role_permission.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
            'role_permission_id': '',
			'role_id': this.store.baseParams.role_id || '',
			'permission_id': '',
			'permission_level': ''
        };
        return defaultData;
    },
    /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        var buttons = [];

        if (this.enableEdit === true){
            buttons.push({
                itemId: 'btnEdit',
                text: 'Set Hak Akses',
                iconCls: 'icon-edit',
                handler: this.onModify,
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
        
        return buttons;
    }    
});
Ext.reg('grid_role_permission', Base.grid.role_permission);