/**
 * @class Bds.store.t_rpddk
 * Store for table bds_t_rpddk
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.store.t_rpddk = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_rpddk&method=read',
                create : Webi.ROUTE_URL + '&class=t_rpddk&method=create',
                update: Webi.ROUTE_URL + '&class=t_rpddk&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_rpddk&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_rpddk_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 't_rpddk_id', type: 'int'},
			{name: 'jenisdata',type: 'int'},
			{name: 'kelompok_id'},
			{name: 'tahun'},
			{name: 'laki'},
			{name: 'perempuan'},
			{name: 'kelompok'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'creation_by'},
			{name: 'updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_rpddk.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_rpddk, Ext.data.Store);
Ext.reg('store_t_rpddk', Bds.store.t_rpddk);