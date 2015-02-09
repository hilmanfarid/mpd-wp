/**
 * @class Bds.store.t_modern_mart
 * Store for table bds_t_modern_mart
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.store.t_modern_mart = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_modern_mart&method=read',
                create : Webi.ROUTE_URL + '&class=t_modern_mart&method=create',
                update: Webi.ROUTE_URL + '&class=t_modern_mart&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_modern_mart&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'mmart_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'mmart_id', type: 'int'},
			{name: 'type_id', type: 'int'},
			{name: 'param_code'},
			{name: 'mmart_tahun', allowBlank: false, type: 'int'},
			{name: 'mmart_jml_unit', type: 'int'},
			{name: 'mmart_jml_peg_pria', type: 'int'},
			{name: 'mmart_jml_peg_wanita', type: 'int'},
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
	Bds.store.t_modern_mart.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_modern_mart, Ext.data.Store);
Ext.reg('store_t_modern_mart', Bds.store.t_modern_mart);