/**
 * @class Bds.store.p_tahun
 * Store for table bds_p_tahun
 *
 * @author agung.hp
 * @since 01-11-2012 10:52:31
 */
Bds.store.p_tahun = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_tahun&method=read',
                create : Webi.ROUTE_URL + '&class=p_tahun&method=create',
                update: Webi.ROUTE_URL + '&class=p_tahun&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_tahun&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'tahun_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'tahun_id', type: 'int'},
			{name: 'tahun_aktif', allowBlank: false},
			{name: 'tahun_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'tahun_creation_by'},
			{name: 'tahun_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'tahun_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_tahun.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_tahun, Ext.data.Store);
Ext.reg('store_p_tahun', Bds.store.p_tahun);