/**
 * @class Bds.store.t_cuaca
 * Store for table bds_t_cuaca
 *
 * @author agung.hp
 * @since 13-12-2012 14:15:12
 */
Bds.store.t_cuaca = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_cuaca&method=read',
                create : Webi.ROUTE_URL + '&class=t_cuaca&method=create',
                update: Webi.ROUTE_URL + '&class=t_cuaca&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_cuaca&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_cuaca_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 't_cuaca_id', type: 'int'},
			{name: 'tahun', allowBlank: false, type: 'int'},
			{name: 'bulan', allowBlank: false, type: 'int'},
			{name: 'penguapan', type: 'float'},
			{name: 'tekanan_udara', type: 'float'},
			{name: 'kelembaban', type: 'float'},
			{name: 'suhu_max', type: 'float'},
			{name: 'suhu_min', type: 'float'},
			{name: 'suhu_rata2', type: 'float'},
			{name: 'curah_hujan', type: 'float'},
			{name: 'hari_hujan', type: 'float'},
			{name: 'prosen_sinar', type: 'float'},
			{name: 'angin_rata2', type: 'float'},
			{name: 'arah_rata2', type: 'float'},
			{name: 'angin_max', type: 'float'},
			{name: 'arah_max', type: 'int'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'creation_by'},
			{name: 'updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'updated_by'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_cuaca.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_cuaca, Ext.data.Store);
Ext.reg('store_t_cuaca', Bds.store.t_cuaca);