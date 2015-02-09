/**
 * @class Bds.store.p_school_type
 * Store for table bds_p_school_type
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_school_type = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_school_type&method=read',
                create : Webi.ROUTE_URL + '&class=p_school_type&method=create',
                update: Webi.ROUTE_URL + '&class=p_school_type&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_school_type&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'param_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'p_school_type_id', type: 'int'},
			{name: 'level_id', type: 'int'},
			{name: 'code', allowBlank: false},
			{name: 'listing_no', type: 'int'},
			{name: 'description'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'creation_by'},
			{name: 'updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_school_type.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_school_type, Ext.data.Store);
Ext.reg('store_p_school_type', Bds.store.p_school_type);