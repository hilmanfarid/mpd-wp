/**
 * @class Bds.store.npwd
 * Store for table bds_npwd
 *
 * @author hilman farid
 * @since 23-10-2012 12:07:20
 */
Bds.store.npwd = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=cust_acc_trans&method=getNpwd',
                create : Webi.ROUTE_URL + '&class=npwd&method=create',
                update: Webi.ROUTE_URL + '&class=npwd&method=update',
                destroy: Webi.ROUTE_URL + '&class=npwd&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_npwd_id',
            root: 'items',
            messageProperty: 'message'
        }, [
            {name: 't_cust_account_id', type: 'int'},
            {name: 'npwd'},
            {name: 'company_name'},
            {name: 'p_vat_type_id', type: 'int'},
            {name: 'vat_code'},
            {name: 'p_vat_type_dtl_id', type: 'int'},
            {name: 'vat_code_dtl'},
            {name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.npwd.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.npwd, Ext.data.Store);
Ext.reg('store_npwd', Bds.store.npwd);