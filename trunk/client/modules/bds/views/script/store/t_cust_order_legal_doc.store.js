/**
 * @class Bds.store.t_cust_order_legal_doc
 * @since 23-04-2013 12:49:36
 */
Bds.store.t_cust_order_legal_doc = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_cust_order_legal_doc&method=read',
                create : Webi.ROUTE_URL + '&class=t_cust_order_legal_doc&method=create',
                update: Webi.ROUTE_URL + '&class=t_cust_order_legal_doc&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_cust_order_legal_doc&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_cust_order_legal_doc_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 't_cust_order_legal_doc_id', type: 'int'},
			{name: 't_customer_order_id', type: 'int'},
			{name: 'p_legal_doc_type_id'},
			{name: 'legal_doc_desc'},
			{name: 'origin_file_name'},
			{name: 'file_folder'},
			{name: 'file_name'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_cust_order_legal_doc.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_cust_order_legal_doc, Ext.data.Store);
Ext.reg('store_t_cust_order_legal_doc', Bds.store.t_cust_order_legal_doc);