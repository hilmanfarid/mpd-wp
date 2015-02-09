/**
 * @class Bds.store.d_rumahsakit
 * Store for table bds_d_rumahsakit
 *
 * @author agung.hp
 * @since 05-12-2012 12:48:54
 */
Bds.store.d_rumahsakit = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_rumahsakit&method=read',
                create : Webi.ROUTE_URL + '&class=d_rumahsakit&method=create',
                update: Webi.ROUTE_URL + '&class=d_rumahsakit&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_rumahsakit&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'rs_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'rs_id', type: 'int'},
			{name: 'jenis_id', type: 'int'},
			{name: 'kecamatan_id', type: 'int'},
			{name: 'param_name'},
			{name: 'wilayah_nama'},
			{name: 'rs_kode'},
			{name: 'rs_name', allowBlank: false},
			{name: 'rs_alamat1'},
			{name: 'rs_alamat2'},
			{name: 'rs_kode_pos'},
			{name: 'rs_phone'},
			{name: 'rs_website'},
			{name: 'rs_listing_no', type: 'int'},
			{name: 'rs_description'},
			{name: 'rs_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rs_created_by'},
			{name: 'rs_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rs_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.d_rumahsakit.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_rumahsakit, Ext.data.Store);
Ext.reg('store_d_rumahsakit', Bds.store.d_rumahsakit);