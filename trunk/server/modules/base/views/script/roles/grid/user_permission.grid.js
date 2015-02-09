/**
 * @class Base.grid.user_permission
 * Grid for table core_user_permission
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.grid.user_permission = Ext.extend(Webi.grid.GridPanel, {
    store: new Base.store.user_permission(),
    initComponent : function() {
        
        this.columns = [
            {
				header: Base.properties.user_id, 
				dataIndex: 'user_id', sortable: true, hidden: true
			},
			{
				header: Base.properties.permission_id, 
				dataIndex: 'permission_id', sortable: true, hidden: false, 
				renderer: Webi.format.intRenderer, width: 65
			}
        ];

        // super
        Base.grid.user_permission.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'user_id': this.store.baseParams.user_id || '',
			'permission_id': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_user_permission', Base.grid.user_permission);