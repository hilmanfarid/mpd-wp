/**
 * @class Bds.store.p_wilayah
 * Store for table bds_p_wilayah
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_wilayah = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_wilayah&method=read',
                create : Webi.ROUTE_URL + '&class=p_wilayah&method=create',
                update: Webi.ROUTE_URL + '&class=p_wilayah&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_wilayah&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'wilayah_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'wilayah_id', type: 'int'},
		    {name: 'wilayah_pid', type: 'int'},
			{name: 'wilayah_kode', allowBlank: false},
			{name: 'wilayah_nama', allowBlank: false},
			{name: 'wilayah_description'},
			{name: 'wilayah_kota'},
			{name: 'wilayah_kode_pos'},
			{name: 'wilayah_telepon'},
			{name: 'status_parent'},			
			{name: 'wilayah_status', allowBlank: false},
			{name: 'wilayah_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'wilayah_creation_by'},
			{name: 'wilayah_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'wilayah_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_wilayah.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_wilayah, Ext.data.Store);
Ext.reg('store_p_wilayah', Bds.store.p_wilayah);