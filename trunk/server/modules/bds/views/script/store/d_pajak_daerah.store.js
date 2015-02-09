/**
 * @class Bds.store.d_pajak_daerah
 * Store for table bds_d_pajak_daerah
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:19
 */
Bds.store.d_pajak_daerah = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_pajak_daerah&method=read',
                create : Webi.ROUTE_URL + '&class=d_pajak_daerah&method=create',
                update: Webi.ROUTE_URL + '&class=d_pajak_daerah&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_pajak_daerah&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'pjk_daerah_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'pjk_daerah_id', type: 'int'},
			{name: 'jenis_id', type: 'int'},
			{name: 'param_code'},
			{name: 'pjk_daerah_tahun', type: 'int'},
			{name: 'pjk_daerah_target', allowBlank: false, type: 'float'},
			{name: 'pjk_daerah_realisasi', allowBlank: false, type: 'float'},
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
	Bds.store.d_pajak_daerah.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_pajak_daerah, Ext.data.Store);
Ext.reg('store_d_pajak_daerah', Bds.store.d_pajak_daerah);