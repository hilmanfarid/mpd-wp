/**
 * @class Bds.store.d_sekolah
 * Store for table bds_d_sekolah
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.d_sekolah = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_sekolah&method=read',
                create : Webi.ROUTE_URL + '&class=d_sekolah&method=create',
                update: Webi.ROUTE_URL + '&class=d_sekolah&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_sekolah&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'd_sekolah_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'd_sekolah_id', type: 'int'},
		    {name: 'code'},
		    {name: 'sekolah_name'},
		    {name: 'alias_name'},
			{name: 'type_id', type: 'int'},
		    {name: 'type_code'},
			{name: 'level_id', type: 'int'},
			{name: 'status_id', type: 'int'},
		    {name: 'status_code'},
			{name: 'tgl_berdiri', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'address_1'},
			{name: 'address_2'},
			{name: 'kecamatan_id'},
			{name: 'kecamatan_nama'},
			{name: 'kota'},
			{name: 'phone_no'},
			{name: 'website'},
			{name: 'kode_pos'},
			{name: 'jenis_sekolah'},
			{name: 'status_sekolah'},
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
	Bds.store.d_sekolah.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_sekolah, Ext.data.Store);
Ext.reg('store_d_sekolah', Bds.store.d_sekolah);

