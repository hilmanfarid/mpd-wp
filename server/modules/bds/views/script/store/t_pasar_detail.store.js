/**
 * @class Bds.store.t_pasar_detail
 * Store for table bds_t_pasar_detail
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.store.t_pasar_detail = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_pasar_detail&method=read',
                create : Webi.ROUTE_URL + '&class=t_pasar_detail&method=create',
                update: Webi.ROUTE_URL + '&class=t_pasar_detail&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_pasar_detail&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'pasar_det_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'pasar_det_id', type: 'int'},
			{name: 'pasar_id', type: 'int'},
			{name: 'pasar_code'},
			{name: 'pasar_det_tahun', allowBlank: false, type: 'int'},
			{name: 'pasar_det_jml_ruang', type: 'int'},
			{name: 'pasar_det_jml_pedagang_aktif', type: 'int'},
			{name: 'pasar_det_jml_pedagang_pasif', type: 'int'},
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
	Bds.store.t_pasar_detail.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_pasar_detail, Ext.data.Store);
Ext.reg('store_t_pasar_detail', Bds.store.t_pasar_detail);