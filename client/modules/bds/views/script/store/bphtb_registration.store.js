/**
 * @class Bds.store.bphtb_registration
 * Store for table bds_bphtb_registration
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.store.bphtb_registration = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=bphtb_registration&method=read',
                create : Webi.ROUTE_URL + '&class=bphtb_registration&method=create',
                update: Webi.ROUTE_URL + '&class=bphtb_registration&method=update',
                destroy: Webi.ROUTE_URL + '&class=bphtb_registration&method=destroy'
            }
        }),
        
        
        
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_bphtb_registration_id',
            root: 'items',
            messageProperty: 'message'
        }, [
            {name: 't_bphtb_registration_id',type:'int'},
            {name: 'receipt_no'},
            {name: 'registration_no'},
            {name: 'njop_pbb'},
            {name: 'payment_date',type: 'date', dateFormat: 'Y-m-d'},
            {name: 'wp_name'}, 
            {name: 'wp_address_name'},
            {name: 'kelurahan_name'},
            {name: 'kecamatan_name'},
            {name: 'land_area'},
            {name: 'building_area'},
            {name: 'land_total_price'},
            {name: 'payment_amount'},
            {name: 'bphtb_amt_final'},
            {name: 'date_start', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'date_end', type: 'date', dateFormat: 'Y-m-d'},
            {name: '_display_field_'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.bphtb_registration.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.bphtb_registration, Ext.data.Store);
Ext.reg('store_bphtb_registration', Bds.store.bphtb_registration);