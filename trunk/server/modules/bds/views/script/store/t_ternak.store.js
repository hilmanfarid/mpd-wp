/**
 * @class Bds.store.t_ternak
 * Store for table bds_t_ternak
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.store.t_ternak = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_ternak&method=read',
                create : Webi.ROUTE_URL + '&class=t_ternak&method=create',
                update: Webi.ROUTE_URL + '&class=t_ternak&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_ternak&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ternak_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'ternak_id', type: 'int'},
			{name: 'type_id', type: 'int'},
			{name: 'ternak_tahun', allowBlank: false, type: 'int'},
			{name: 'ternak_populasi', type: 'float'},
			{name: 'ternak_jml_potong', type: 'float'},
			{name: 'ternak_produksi_daging', type: 'float'},
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
	Bds.store.t_ternak.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_ternak, Ext.data.Store);
Ext.reg('store_t_ternak', Bds.store.t_ternak);