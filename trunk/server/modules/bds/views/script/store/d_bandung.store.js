/**
 * @class Bds.store.d_bandung
 * Store for table bds_d_bandung
 *
 * @author agung.hp
 * @since 13-12-2012 22:05:03
 */
Bds.store.d_bandung = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_bandung&method=read',
                create : Webi.ROUTE_URL + '&class=d_bandung&method=create',
                update: Webi.ROUTE_URL + '&class=d_bandung&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_bandung&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'bandung_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'bandung_id', type: 'int'},
			{name: 'bandung_luas_area', type: 'float'},
			{name: 'bandung_lintang1', type: 'float'},
			{name: 'bandung_lintang2', type: 'float'},
			{name: 'bandung_bujur1', type: 'float'},
			{name: 'bandung_bujur2', type: 'float'},
			{name: 'bandung_tinggi_max', type: 'float'},
			{name: 'bandung_tinggi_min', type: 'float'},
			{name: 'bandung_description'},
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
	Bds.store.d_bandung.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_bandung, Ext.data.Store);
Ext.reg('store_d_bandung', Bds.store.d_bandung);