/**
 * @class Bds.store.p_wilayah_person
 * Store for table bds_p_wilayah_person
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.p_wilayah_person = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_wilayah_person&method=read',
                create : Webi.ROUTE_URL + '&class=p_wilayah_person&method=create',
                update: Webi.ROUTE_URL + '&class=p_wilayah_person&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_wilayah_person&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'wp_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'wp_id', type: 'int'},
			{name: 'param_id', type: 'int'},
			{name: 'agama_id', type: 'int'},
			{name: 'jk_id', type: 'int'},			
			
			{name: 'param_code'},
			{name: 'jobpos_id', type: 'int'},
			{name: 'jobpos_code'},
			{name: 'jobpos_status'},
			{name: 'wilayah_id', type: 'int'},
			{name: 'wilayah_kode'},
			{name: 'wilayah_status'},
			{name: 'rsp_name', allowBlank: false},
			{name: 'rsp_start_position_year', type: 'int'},
			{name: 'rsp_end_position_year', type: 'int'},
			{name: 'rsp_valid_from', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rsp_valid_to', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rsp_date_of_birth', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rsp_place_of_birth'},
			{name: 'rsp_age', type: 'int'},
			{name: 'rsp_address_1'},
			{name: 'rsp_address_2'},
			{name: 'rsp_address_3'},
			{name: 'rsp_id_no'},
			{name: 'rsp_phone_no'},
			{name: 'rsp_mobile_no'},
			{name: 'rsp_description'},
			{name: 'rsp_creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rsp_created_by'},
			{name: 'rsp_updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'rsp_updated_by'},
			{name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.p_wilayah_person.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_wilayah_person, Ext.data.Store);
Ext.reg('store_p_wilayah_person', Bds.store.p_wilayah_person);