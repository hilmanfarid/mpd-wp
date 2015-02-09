/**
 * @class Bds.store.t_armada
 * Store for table bds_t_armada
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.store.t_armada = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_armada&method=read',
                create : Webi.ROUTE_URL + '&class=t_armada&method=create',
                update: Webi.ROUTE_URL + '&class=t_armada&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_armada&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'armada_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'armada_id', type: 'int'},
			{name: 'trayek_id', type: 'int'},
			{name: 'trayek_code'},
			{name: 'armada_tahun', allowBlank: false, type: 'int'},
			{name: 'armada_jml', type: 'int'},
			{name: 'armada_jml_angkot', type: 'int'},
			{name: 'armada_jml_biskota', type: 'int'},
			{name: 'armada_jml_lain', type: 'int'},
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
	Bds.store.t_armada.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_armada, Ext.data.Store);
Ext.reg('store_t_armada', Bds.store.t_armada);