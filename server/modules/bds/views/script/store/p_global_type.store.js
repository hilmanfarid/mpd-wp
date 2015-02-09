/**
 * @class Bds.store.p_global_type
 * Store for table bds_p_global_type
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_global_type = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_global_type&method=read',
                create : Webi.ROUTE_URL + '&class=p_global_type&method=create',
                update: Webi.ROUTE_URL + '&class=p_global_type&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_global_type&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'gtype_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'gtype_id', type: 'int'},
			{name: 'gtype_code', allowBlank: false},
			{name: 'gtype_description'},
			{name: 'gtype_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'gtype_creation_by'},
			{name: 'gtype_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'gtype_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_global_type.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_global_type, Ext.data.Store);
Ext.reg('store_p_global_type', Bds.store.p_global_type);