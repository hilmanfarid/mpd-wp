/**
 * @class Bds.store.p_message_type
 * Store for table bds_p_message_type
 *
 * @since 13-12-2012 16:29:27
 */
Bds.store.p_message_type = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_message_type&method=read',
                create : Webi.ROUTE_URL + '&class=p_message_type&method=create',
                update: Webi.ROUTE_URL + '&class=p_message_type&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_message_type&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'p_message_type_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name : 'p_message_type_id', type: 'int'},
            {name : 'message_type'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_message_type.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_message_type, Ext.data.Store);
Ext.reg('store_p_message_type', Bds.store.p_message_type);