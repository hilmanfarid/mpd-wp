/**
 * @class Bds.store.t_message_outbox
 * Store for table bds_t_message_outbox
 *
 * @since 13-12-2012 16:29:27
 */
Bds.store.t_message_outbox = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_message_outbox&method=read',
                create : Webi.ROUTE_URL + '&class=t_message_outbox&method=create',
                update: Webi.ROUTE_URL + '&class=t_message_outbox&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_message_outbox&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_message_outbox_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name : 't_message_outbox_id', type: 'int'},
            {name : 'p_message_type_id', type: 'int'},
            {name : 't_cust_account_id', type: 'int'},
            {name : 'message_type'},
            {name : 'message_status'},
            {name : 'message_body'},
            {name : 'p_app_role_id_to', type: 'int'},
            {name : 'closing_date', type: 'date', dateFormat: 'Y-m-d'},
            {name : 'closed_by'},
			{name : 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name : 'creation_time'},
			{name : 'created_by'},
			{name : 'update_date', type: 'date', dateFormat: 'Y-m-d'},
			{name : 'update_by'},
			{name : '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_message_outbox.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_message_outbox, Ext.data.Store);
Ext.reg('store_t_message_outbox', Bds.store.t_message_outbox);