/**
 * @class Bds.store.t_agr_komod_prod
 * Store for table bds_t_agr_komod_prod
 *
 * @author agung.hp
 * @since 13-12-2012 16:29:27
 */
Bds.store.t_agr_komod_prod = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_agr_komod_prod&method=read',
                create : Webi.ROUTE_URL + '&class=t_agr_komod_prod&method=create',
                update: Webi.ROUTE_URL + '&class=t_agr_komod_prod&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_agr_komod_prod&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_agr_komod_prod_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 't_agr_komod_prod_id', type: 'int'},
			{name: 'd_agr_komiditas_id', type: 'int'},
			{name: 'code'},
			{name: 'tahun', allowBlank: false, type: 'int'},
			{name: 'luas_tanam', type: 'float'},
			{name: 'luas_panen', type: 'float'},
			{name: 'productivity', type: 'float'},
			{name: 'produksi', type: 'float'},
			{name: 'description'},
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
	Bds.store.t_agr_komod_prod.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_agr_komod_prod, Ext.data.Store);
Ext.reg('store_t_agr_komod_prod', Bds.store.t_agr_komod_prod);