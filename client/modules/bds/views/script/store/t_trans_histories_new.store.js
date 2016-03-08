/**
 * @class Bds.store.t_vat_settlement
 * Store for table bds_t_vat_settlement
 *
 * @author hliman farid
 * @since 13-12-2012 16:29:27
 */
Bds.store.t_trans_histories_new = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_trans_histories&method=read_histories',
                create : Webi.ROUTE_URL + '&class=t_trans_histories&method=create',
                update: Webi.ROUTE_URL + '&class=t_trans_histories&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_trans_histories&method=destroy'
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
            {name : 'p_vat_type_id', type: 'int'},
            {name : 'p_vat_type_dtl_id', type: 'int'},
            {name : 't_cust_account_id', type: 'int'},
            {name : 't_customer_order_id', type: 'int'},
            {name : 'start_period', type: 'date', dateFormat: 'Y-m-d'},
            {name : 'end_period', type: 'date', dateFormat: 'Y-m-d'},
            
        	{name : 'type_code'},
        	{name : 'periode_pelaporan'},
        	{name : 'tgl_pelaporan'},
        	{name : 'total_transaksi'},
        	{name : 'total_pajak'},
        	{name : 'payment_key'},
        	{name : 'kenaikan'},
        	{name : 'kenaikan1'},
        	{name : 'total_denda'},
        	{name : 'tgl_pembayaran'},
        	{name : 'kuitansi_pembayaran'},
        	{name : 'payment_amount'}
        	
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_trans_histories_new.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_trans_histories_new, Ext.data.Store);
Ext.reg('store_t_trans_histories_new', Bds.store.t_trans_histories_new);