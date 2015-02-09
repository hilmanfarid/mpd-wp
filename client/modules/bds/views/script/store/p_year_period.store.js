/**
 * @class Bds.store.p_year_period
 * Store for table bds_p_year_period
 *
 * @since 13-12-2012 16:29:27
 */
Bds.store.p_year_period = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_year_period&method=read',
                create : Webi.ROUTE_URL + '&class=p_year_period&method=create',
                update: Webi.ROUTE_URL + '&class=p_year_period&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_year_period&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'p_year_period_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name : 'p_year_period_id', type: 'int'},
            {name : 'year_code'},
            {name : 'start_date', type: 'date', dateFormat: 'Y-m-d'},
            {name : 'end_date', type: 'date', dateFormat: 'Y-m-d'},
            {name : 'p_status_list_id', type: 'int'},
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
	Bds.store.p_year_period.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_year_period, Ext.data.Store);
Ext.reg('store_p_year_period', Bds.store.p_year_period);