/**
 * @class Bds.store.t_message_inbox
 * Store for table bds_t_message_inbox
 *
 * @since 13-12-2012 16:29:27
 */
Bds.store.t_message_inbox = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_message_inbox&method=read',
                create : Webi.ROUTE_URL + '&class=t_message_inbox&method=create',
                update: Webi.ROUTE_URL + '&class=t_message_inbox&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_message_inbox&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_message_inbox_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name : 't_message_inbox_id', type: 'int'},
            {name : 'p_message_type_id', type: 'int'},
            {name : 't_cust_account_id', type: 'int'},
            {name : 'message_status'},
            {name : 'message_type'},
            {name : 'creation_time'},
            {name : 'message_body'},
            {name : 'p_app_role_id_to', type: 'int'},
            {name : 'closing_date', type: 'date', dateFormat: 'Y-m-d'},
            {name : 'closed_by'},
			{name : 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name : 'created_by'},
			{name : 'updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name : 'updated_by'},
			{name : '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_message_inbox.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_message_inbox, Ext.data.Store);
Ext.reg('store_t_message_inbox', Bds.store.t_message_inbox);