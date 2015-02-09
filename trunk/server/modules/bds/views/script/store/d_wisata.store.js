/**
 * @class Bds.store.d_wisata
 * Store for table bds_d_wisata
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.store.d_wisata = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_wisata&method=read',
                create : Webi.ROUTE_URL + '&class=d_wisata&method=create',
                update: Webi.ROUTE_URL + '&class=d_wisata&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_wisata&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'wisata_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'wisata_id', type: 'int'},
			{name: 'wisata_code'},
			{name: 'wisata_name', allowBlank: false},
			{name: 'wisata_address_1'},
			{name: 'wisata_address_2'},
			{name: 'wisata_kota'},
			{name: 'wisata_kode_pos'},
			{name: 'wisata_phone_no'},
			{name: 'wisata_website'},
			{name: 'wisata_listing_no', type: 'int'},
			{name: 'wisata_description'},
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
	Bds.store.d_wisata.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_wisata, Ext.data.Store);
Ext.reg('store_d_wisata', Bds.store.d_wisata);