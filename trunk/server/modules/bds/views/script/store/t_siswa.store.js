/**
 * @class Bds.store.t_siswa
 * Store for table bds_t_siswa
 *
 * @author agung.hp
 * @since 02-11-2012 13:33:33
 */
Bds.store.t_siswa = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_siswa&method=read',
                create : Webi.ROUTE_URL + '&class=t_siswa&method=create',
                update: Webi.ROUTE_URL + '&class=t_siswa&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_siswa&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_siswa_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 't_siswa_id', type: 'int'},
			{name: 'd_sekolah_id', allowBlank: false, type: 'int'},
			{name: 'tahun', allowBlank: false, type: 'int'},
			{name: 'jml_masuk', allowBlank: false, type: 'int'},
			{name: 'jml_lulus', type: 'int'},
			{name: 'jml_aktif', type: 'int'},
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
	Bds.store.t_siswa.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_siswa, Ext.data.Store);
Ext.reg('store_t_siswa', Bds.store.t_siswa);