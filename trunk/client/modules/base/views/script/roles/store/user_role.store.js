/**
 * @class Base.store.user_role
 * Store for table core_user_role
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.store.user_role = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : 'ws.php?type=json&module=base&class=roles.user_role&method=read',
                create : 'ws.php?type=json&module=base&class=roles.user_role&method=create',
                update: 'ws.php?type=json&module=base&class=roles.user_role&method=update',
                destroy: 'ws.php?type=json&module=base&class=roles.user_role&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
                totalProperty: 'total',
                successProperty: 'success',
                idProperty: 'user_role_id',
                root: 'items',
                messageProperty: 'message'
            }, 
            [
                {name: 'user_role_id'}, 
				{name: 'user_id', type: 'int'}, 
				{name: 'user_name'},
				{name: 'role_id', type: 'int'}, 
				{name: 'role_name'},
				{name: 'main_role'}
			]
        ),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Base.store.user_role.superclass.constructor.call(this, config);
};

Ext.extend(Base.store.user_role, Ext.data.Store);
Ext.reg('store_user_role', Base.store.user_role);