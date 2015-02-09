/**
 * @class Bds.store.t_vat_settlement
 * Store for table bds_t_vat_settlement
 *
 * @author hliman farid
 * @since 13-12-2012 16:29:27
 */
Bds.store.t_vat_settlement = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_vat_settlement&method=read',
                create : Webi.ROUTE_URL + '&class=t_vat_settlement&method=create',
                update: Webi.ROUTE_URL + '&class=t_vat_settlement&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_vat_settlement&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_vat_setllement_id',
            root: 'items',
            messageProperty: 'message'
        }, [
            {name : 't_vat_setllement_id', type: 'int'},
        	{name : 't_customer_order_id', type: 'int'},
        	{name : 'settlement_date', type: 'date', dateFormat: 'Y-m-d'},
        	{name : 'p_finance_period_id', type: 'int'},
        	{name : 't_cust_account_id', type: 'int'},
        	{name : 'npwd'},
        	{name : 'total_trans_amount'},
        	{name : 'total_vat_amount'},
        	{name : 'p_settlement_type_id'},
        	{name : 'finance_period_code'},
        	{name : 'total_penalty_amount'},
        	{name : 'payment_key'},
        	{name : 'is_settled'},
        	{name : 'due_date'},
        	{name : 'payment_due_day'},
        	{name : 'order_no', type: 'int'},
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
	Bds.store.t_vat_settlement.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_vat_settlement, Ext.data.Store);
Ext.reg('store_t_vat_settlement', Bds.store.t_vat_settlement);