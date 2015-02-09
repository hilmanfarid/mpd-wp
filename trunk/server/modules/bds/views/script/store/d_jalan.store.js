/**
 * @class Bds.store.d_jalan
 * Store for table bds_d_jalan
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.d_jalan = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_jalan&method=read',
                create : Webi.ROUTE_URL + '&class=d_jalan&method=create',
                update: Webi.ROUTE_URL + '&class=d_jalan&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_jalan&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'd_jalan_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'd_jalan_id', type: 'int'},
		    {name: 'code'},
		    {name: 'jalan_name'},
			{name: 'klas_admin_id', type: 'int'},
		    {name: 'klas_admin_code'},
			{name: 'klas_fungsi_id', type: 'int'},
		    {name: 'klas_fungsi_code'},
			{name: 'klas_muat_id', type: 'int'},
		    {name: 'klas_muat_code'},
		    {name: 'panjang'},
			{name: 'listing_no', type: 'int'},
			{name: 'description'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'created_by'},
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
	Bds.store.d_jalan.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_jalan, Ext.data.Store);
Ext.reg('store_d_jalan', Bds.store.d_jalan);

