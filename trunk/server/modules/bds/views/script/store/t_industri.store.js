/**
 * @class Bds.store.t_industri
 * Store for table bds_t_industri
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.store.t_industri = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_industri&method=read',
                create : Webi.ROUTE_URL + '&class=t_industri&method=create',
                update: Webi.ROUTE_URL + '&class=t_industri&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_industri&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'industri_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'industri_id', type: 'int'},
			{name: 'type_id', type: 'int'},
			{name: 'param_code'},
			{name: 'industri_tahun', allowBlank: false, type: 'int'},
			{name: 'industri_jml_unit', type: 'int'},
			{name: 'industri_peg_pria', type: 'int'},
			{name: 'industri_peg_wanita', type: 'int'},
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
	Bds.store.t_industri.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_industri, Ext.data.Store);
Ext.reg('store_t_industri', Bds.store.t_industri);