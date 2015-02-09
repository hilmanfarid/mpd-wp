/**
 * @class Bds.store.branch
 * Store for table bds_branch
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.branch = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=branch&method=read',
                create : Webi.ROUTE_URL + '&class=branch&method=create',
                update: Webi.ROUTE_URL + '&class=branch&method=update',
                destroy: Webi.ROUTE_URL + '&class=branch&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'branch_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'branch_id', type: 'int'},
		    {name: 'branch_name'},
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
	Bds.store.branch.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.branch, Ext.data.Store);
Ext.reg('store_branch', Bds.store.branch);