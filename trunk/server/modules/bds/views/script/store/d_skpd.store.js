/**
 * @class Bds.store.d_skpd
 * Store for table bds_d_skpd
 *
 * @author agung.hp
 * @since 13-12-2012 14:15:12
 */
Bds.store.d_skpd = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_skpd&method=read',
                create : Webi.ROUTE_URL + '&class=d_skpd&method=create',
                update: Webi.ROUTE_URL + '&class=d_skpd&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_skpd&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'd_skpd_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'd_skpd_id', type: 'int'},
			{name: 'code'},
			{name: 'skpd_name', allowBlank: false},
			{name: 'address_1'},
			{name: 'address_2'},
			{name: 'kota'},
			{name: 'kode_pos'},
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
	Bds.store.d_skpd.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_skpd, Ext.data.Store);
Ext.reg('store_d_skpd', Bds.store.d_skpd);