/**
 * @class Bds.store.d_trayek
 * Store for table bds_d_trayek
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.store.d_trayek = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_trayek&method=read',
                create : Webi.ROUTE_URL + '&class=d_trayek&method=create',
                update: Webi.ROUTE_URL + '&class=d_trayek&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_trayek&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'trayek_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'trayek_id', type: 'int'},
			{name: 'trayek_code'},
			{name: 'trayek_name', allowBlank: false},
			{name: 'trayek_panjang', type: 'float'},
			{name: 'trayek_listing_no', type: 'int'},
			{name: 'trayek_description'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'created_by'},
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
	Bds.store.d_trayek.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_trayek, Ext.data.Store);
Ext.reg('store_d_trayek', Bds.store.d_trayek);