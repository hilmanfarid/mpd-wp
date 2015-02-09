/**
 * @class Bds.store.p_app_menu
 * Store for table bds_p_app_menu
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_app_menu = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_app_menu&method=read',
                create : Webi.ROUTE_URL + '&class=p_app_menu&method=create',
                update: Webi.ROUTE_URL + '&class=p_app_menu&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_app_menu&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'menu_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'menu_id', type: 'int'},
			{name: 'menu_pid', type: 'int'},
			{name: 'menu_code'},
			{name: 'menu_path'},
			{name: 'menu_level', type: 'int'},
			{name: 'menu_file_name'},
			{name: 'menu_listing_no', type: 'float'},
			{name: 'menu_is_active'},
			{name: 'menu_description'},
			{name: 'menu_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'menu_creation_by'},
			{name: 'menu_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'menu_updated_by'},
			{name: 'padding_level', type:'int'},
			{name: 'font_style'},
			{name: 'font_color'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_app_menu.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_app_menu, Ext.data.Store);
Ext.reg('store_p_app_menu', Bds.store.p_app_menu);