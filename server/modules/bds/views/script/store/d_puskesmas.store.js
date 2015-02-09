/**
 * @class Bds.store.d_puskesmas
 * Store for table bds_d_puskesmas
 *
 * @author agung.hp
 * @since 06-12-2012 12:02:05
 */
Bds.store.d_puskesmas = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_puskesmas&method=read',
                create : Webi.ROUTE_URL + '&class=d_puskesmas&method=create',
                update: Webi.ROUTE_URL + '&class=d_puskesmas&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_puskesmas&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'puskesmas_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'puskesmas_id', type: 'int'},
			{name: 'kecamatan_id', type: 'int'},
			{name: 'puskesmas_kode'},
			{name: 'puskesmas_name', allowBlank: false},
			{name: 'puskesmas_alamat'},
			{name: 'wilayah_nama'},
			{name: 'puskesmas_kode_pos'},
			{name: 'puskesmas_description'},
			{name: 'puskesmas_listing_no', type: 'int'},
			{name: 'puskesmas_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'puskesmas_created_by'},
			{name: 'puskesmas_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'puskesmas_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.d_puskesmas.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_puskesmas, Ext.data.Store);
Ext.reg('store_d_puskesmas', Bds.store.d_puskesmas);