/**
 * @class Bds.store.d_sppt_pbb
 * Store for table bds_d_sppt_pbb
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:19
 */
Bds.store.d_sppt_pbb = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_sppt_pbb&method=read',
                create : Webi.ROUTE_URL + '&class=d_sppt_pbb&method=create',
                update: Webi.ROUTE_URL + '&class=d_sppt_pbb&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_sppt_pbb&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'sppt_pbb_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'sppt_pbb_id', type: 'int'},
			{name: 'kecamatan_id', type: 'int'},
			{name: 'sppt_pbb_tahun', allowBlank: false, type: 'int'},
			{name: 'sppt_pbb_buah', type: 'float'},
			{name: 'sppt_pbb_terhutang', type: 'float'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'created_by'},
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
	Bds.store.d_sppt_pbb.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_sppt_pbb, Ext.data.Store);
Ext.reg('store_d_sppt_pbb', Bds.store.d_sppt_pbb);