/**
 * @class Bds.store.d_pdpt_daerah
 * Store for table bds_d_pdpt_daerah
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:19
 */
Bds.store.d_pdpt_daerah = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_pdpt_daerah&method=read',
                create : Webi.ROUTE_URL + '&class=d_pdpt_daerah&method=create',
                update: Webi.ROUTE_URL + '&class=d_pdpt_daerah&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_pdpt_daerah&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'pdpt_daerah_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'pdpt_daerah_id', type: 'int'},
			{name: 'jenis_id', type: 'int'},
			{name: 'param_code'},
			{name: 'pdpt_daerah_tahun', allowBlank: false, type: 'int'},
			{name: 'pdpt_daerah_target', type: 'float'},
			{name: 'pdpt_daerah_realisasi', type: 'float'},
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
	Bds.store.d_pdpt_daerah.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_pdpt_daerah, Ext.data.Store);
Ext.reg('store_d_pdpt_daerah', Bds.store.d_pdpt_daerah);