/**
 * @class Bds.store.p_school_status
 * Store for table bds_p_school_status
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_school_status = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_school_status&method=read',
                create : Webi.ROUTE_URL + '&class=p_school_status&method=create',
                update: Webi.ROUTE_URL + '&class=p_school_status&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_school_status&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'param_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'param_id', type: 'int'},
			{name: 'ptype_id', type: 'int'},
			{name: 'ptype_code'},
			{name: 'param_code', allowBlank: false},
			{name: 'param_name', allowBlank: false},
			{name: 'param_listing_no', type: 'int'},
			{name: 'param_description'},
			{name: 'param_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'param_creation_by'},
			{name: 'param_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'param_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_school_status.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_school_status, Ext.data.Store);
Ext.reg('store_p_school_status', Bds.store.p_school_status);