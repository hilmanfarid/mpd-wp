/**
 * @class Bds.store.cust_acc_trans
 * Store for table bds_cust_acc_trans
 *
 * @author hilman farid
 * @since 23-10-2012 12:07:20
 */
Bds.store.cust_acc_trans = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=cust_acc_trans&method=read',
                create : Webi.ROUTE_URL + '&class=cust_acc_trans&method=create',
                update: Webi.ROUTE_URL + '&class=cust_acc_trans&method=update',
                destroy: Webi.ROUTE_URL + '&class=cust_acc_trans&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_cust_acc_dtl_trans_id',
            root: 'items',
            messageProperty: 'message'
        }, [
            {name: 't_cust_acc_dtl_trans_id',type: 'int'},
            {name: 't_cust_account_id',type: 'int'},
			{name: 'p_vat_type_dtl_id',type: 'int'},
            {name: 'npwd'},
            {name: 'trans_date', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'trans_date_txt'},
            {name: 'bill_no'},
            {name: 'service_desc'},
            {name: 'service_charge',type: 'float'},
            {name: 'vat_charge',type: 'float'},
            {name: 'description'},
            {name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.cust_acc_trans.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.cust_acc_trans, Ext.data.Store);
Ext.reg('store_cust_acc_trans', Bds.store.cust_acc_trans);