/**
 * @class Bds.store.d_agr_komoditas
 * Store for table bds_d_agr_komoditas
 *
 * @author agung.hp
 * @since 13-12-2012 16:29:27
 */
Bds.store.d_agr_komoditas = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_agr_komoditas&method=read',
                create : Webi.ROUTE_URL + '&class=d_agr_komoditas&method=create',
                update: Webi.ROUTE_URL + '&class=d_agr_komoditas&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_agr_komoditas&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'd_agr_komiditas_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'd_agr_komiditas_id', type: 'int'},
			{name: 'type_id', type: 'int'},
			{name: 'code'},
			{name: 'komoditas_name', allowBlank: false},
			{name: 'param_name'},
			{name: 'phone_no'},
			{name: 'website'},
			{name: 'listing_no', type: 'int'},
			{name: 'description'},
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
	Bds.store.d_agr_komoditas.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_agr_komoditas, Ext.data.Store);
Ext.reg('store_d_agr_komoditas', Bds.store.d_agr_komoditas);