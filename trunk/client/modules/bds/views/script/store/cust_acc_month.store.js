/**
 * @class Bds.store.cust_acc_month
 * Store for table bds_cust_acc_month
 *
 * @author hilman farid
 * @since 23-10-2012 12:07:20
 */
Bds.store.cust_acc_month = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=cust_acc_trans&method=getCustAccMonth',
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'p_month_id',
            root: 'items',
            messageProperty: 'message'
        }, [
            {name: 't_cust_account_id',type: 'int'},
            {name: 'p_finance_period_id',type: 'int'},
            {name: 'p_vat_type_dtl_id',type: 'int'},
            {name: 'jum_trans',type: 'float'},
            {name: 'jum_pajak',type: 'float'},
            {name: 'p_order_status_id'},
            {name: 'start_period'},
            {name: 'end_period'},
            {name: 'code'},
            {name: 'npwd'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.cust_acc_month.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.cust_acc_month, Ext.data.Store);
Ext.reg('store_cust_acc_month', Bds.store.cust_acc_month);