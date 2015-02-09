/**
 * @class Bds.store.d_hotel
 * Store for table bds_d_hotel
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.d_hotel = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_hotel&method=read',
                create : Webi.ROUTE_URL + '&class=d_hotel&method=create',
                update: Webi.ROUTE_URL + '&class=d_hotel&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_hotel&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'd_hotel_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'd_hotel_id', type: 'int'},
		    {name: 'code'},
		    {name: 'hotel_name'},
		    {name: 'alias_name'},
			{name: 'kelas_id', type: 'int'},
		    {name: 'kelas_code'},
		    {name: 'jml_kamar'},
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
	Bds.store.d_hotel.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_hotel, Ext.data.Store);
Ext.reg('store_d_hotel', Bds.store.d_hotel);

