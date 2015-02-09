/**
 * @class Base.store.role_permission
 * Store for table core_role_permission
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.store.role_permission = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : 'ws.php?type=json&module=base&class=roles.role_permission&method=read',
                create : 'ws.php?type=json&module=base&class=roles.role_permission&method=create',
                update: 'ws.php?type=json&module=base&class=roles.role_permission&method=update',
                destroy: 'ws.php?type=json&module=base&class=roles.role_permission&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
                totalProperty: 'total',
                successProperty: 'success',
                idProperty: 'permission_id',
                root: 'items',
                messageProperty: 'message'
            }, 
            [
                {name: 'role_permission_id'}, 
				{name: 'role_id', type: 'int'}, 
				{name: 'role_name'}, 
				{name: 'permission_id', allowBlank: false, type: 'int'},
				{name: 'permission_name'},
				{name: 'permission_desc'},
				{name: 'permission_module'},
				{name: 'permission_level'}
			]
        ),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Base.store.role_permission.superclass.constructor.call(this, config);
};

Ext.extend(Base.store.role_permission, Ext.data.Store);
Ext.reg('store_role_permission', Base.store.role_permission);