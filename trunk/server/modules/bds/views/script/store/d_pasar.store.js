/**
 * @class Bds.store.d_pasar
 * Store for table bds_d_pasar
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:19
 */
Bds.store.d_pasar = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_pasar&method=read',
                create : Webi.ROUTE_URL + '&class=d_pasar&method=create',
                update: Webi.ROUTE_URL + '&class=d_pasar&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_pasar&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'pasar_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'pasar_id', type: 'int'},
			{name: 'pasar_code'},
			{name: 'pasar_name', allowBlank: false},
			{name: 'pasar_address1'},
			{name: 'pasar_address2'},
			{name: 'pasar_kota'},
			{name: 'pasar_kodepos'},
			{name: 'pasar_phone_no'},
			{name: 'pasar_listing_no', type: 'int'},
			{name: 'pasar_description'},
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
	Bds.store.d_pasar.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_pasar, Ext.data.Store);
Ext.reg('store_d_pasar', Bds.store.d_pasar);