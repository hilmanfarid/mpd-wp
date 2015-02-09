/**
 * @class Bds.store.d_warga
 * Store for table bds_d_warga
 *
 * @author agung.hp
 * @since 31-10-2012 11:02:06
 */
Bds.store.d_warga = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_warga&method=read_anggota',
                create : Webi.ROUTE_URL + '&class=d_warga&method=create',
                update: Webi.ROUTE_URL + '&class=d_warga&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_warga&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'warga_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'warga_id', type: 'int'},
			{name: 'warga_pid', type: 'int'},
			{name: 'warga_ktp_no'},
			{name: 'warga_kk_no'},
			{name: 'warga_name', allowBlank: false},
			{name: 'jk_id', type: 'int'},
			{name: 'warga_ktp_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'warga_ktpvalid_to', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'warga_kkvalid_to', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'warga_tgl_lahir', allowBlank: false, type: 'date', dateFormat: 'Y-m-d'},
			{name: 'warga_tempat_lahir', allowBlank: false},
			{name: 'goldarah_id', type: 'int'},
			{name: 'agama_id', type: 'int'},
			{name: 'statnikah_id', type: 'int'},
			{name: 'hubkel_id', type: 'int'},
			{name: 'warga_address_1'},
			{name: 'warga_address_2'},
			{name: 'warga_kota'},
			{name: 'warga_kode_pos'},
			{name: 'pendidikan_id', type: 'int'},
			{name: 'jobtype_id', type: 'int'},
			{name: 'wilayah_id', type: 'int'},
			{name: 'warga_job_company'},
			{name: 'warga_job_address'},
			{name: 'warga_job_kota'},
			{name: 'warga_description'},
			{name: 'warga_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'warga_created_by'},
			{name: 'warga_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'warga_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.d_warga.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_warga, Ext.data.Store);
Ext.reg('store_d_warga', Bds.store.d_warga);