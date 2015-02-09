/**
 * @class Bds.store.p_global_param
 * Store for table bds_p_global_param
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_global_param = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_global_param&method=read',
                create : Webi.ROUTE_URL + '&class=p_global_param&method=create',
                update: Webi.ROUTE_URL + '&class=p_global_param&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_global_param&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'gparam_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'gparam_id', type: 'int'},
			{name: 'gtype_id', type: 'int'},
			{name: 'gtype_code'},
			{name: 'gparam_code', allowBlank: false},
			{name: 'gparam_value_1'},
			{name: 'gparam_type_1'},
			{name: 'gparam_is_range'},
			{name: 'gparam_value_2'},
			{name: 'gparam_description'},
			{name: 'gparam_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'gparam_creation_by'},
			{name: 'gparam_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'gparam_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_global_param.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_global_param, Ext.data.Store);
Ext.reg('store_p_global_param', Bds.store.p_global_param);