/**
 * @class Base.store.permission
 * Store for table core_permission
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Base.store.permission = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : 'ws.php?type=json&module=base&class=roles.permission&method=read',
                create : 'ws.php?type=json&module=base&class=roles.permission&method=create',
                update: 'ws.php?type=json&module=base&class=roles.permission&method=update',
                destroy: 'ws.php?type=json&module=base&class=roles.permission&method=destroy'
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
				{name: 'permission_id', type: 'int'}, 
				{name: 'permission_name', allowBlank: false}, 
				{name: 'permission_desc'}, 
				{name: 'permission_module', allowBlank: false}
			]
        ),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Base.store.permission.superclass.constructor.call(this, config);
};

Ext.extend(Base.store.permission, Ext.data.Store);
Ext.reg('store_permission', Base.store.permission);