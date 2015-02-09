/**
 * @class Base.grid.user_role
 * Grid for table core_user_role
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.grid.user_role = Ext.extend(Webi.grid.GridPanel, {
    store: new Base.store.user_role(),
    initComponent : function() {
        var cbMainRoleStatus = new Base.combo.MainRoleStatus();
        this.columns = [
            {
				header: Base.properties.user_id, 
				dataIndex: 'user_id', sortable: true, hidden: true,
				renderer: function(value, meta, record){
					return record.get('user_name');
				}
			},
			{
				header: Base.properties.role_id, 
				dataIndex: 'role_id', sortable: true, hidden: false, 
				renderer: function(value, meta, record){
					return record.get('role_name');
				}
			},
			{
				header: 'Status', 
				dataIndex: 'main_role', sortable: true, hidden: false, 
				renderer: Webi.format.comboRenderer(cbMainRoleStatus), width: 20
			}
        ];

        // super
        Base.grid.user_role.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
            'user_role_id': '',
			'user_id': this.store.baseParams.user_id || '',
			'role_id': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_user_role', Base.grid.user_role);