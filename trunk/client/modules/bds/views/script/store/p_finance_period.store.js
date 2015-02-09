/**
 * @class Bds.store.p_finance_period
 * Store for table bds_p_finance_period
 *
 * @since 13-12-2012 16:29:27
 */
Bds.store.p_finance_period = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_finance_period&method=read',
                create : Webi.ROUTE_URL + '&class=p_finance_period&method=create',
                update: Webi.ROUTE_URL + '&class=p_finance_period&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_finance_period&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'p_finance_period_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name : 'p_finance_period_id', type: 'int'},
            {name : 'p_vat_type_id', type: 'int'},
            {name : 'code'},
            {name : 'vat_code'},
            {name : 'description'},
            {name : 'vat_pct', type: 'float'},
            {name: 'start_date_string'},
            {name: 'end_date_string'},
            {name : 'jml_bulan', type: 'float'},
            {name : 'pengali_denda', type: 'float'},
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
	Bds.store.p_finance_period.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_finance_period, Ext.data.Store);
Ext.reg('store_p_finance_period', Bds.store.p_finance_period);