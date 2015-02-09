/**
 * @class Bds.store.p_job_position
 * Store for table bds_p_job_position
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_job_position = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_job_position&method=read',
                create : Webi.ROUTE_URL + '&class=p_job_position&method=create',
                update: Webi.ROUTE_URL + '&class=p_job_position&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_job_position&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'jobpos_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'jobpos_id', type: 'int'},
		    {name: 'jobpos_code'},
		    {name: 'jobpos_status'},
			{name: 'jobpos_listing_no'},
			{name: 'jobpos_description'},
			{name: 'jobpos_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'jobpos_creation_by'},
			{name: 'jobpos_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'jobpos_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_job_position.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_job_position, Ext.data.Store);
Ext.reg('store_p_job_position', Bds.store.p_job_position);