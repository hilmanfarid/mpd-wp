/**
 * @class Bds.store.p_vat_type_dtl_cls
 * Store for table bds_p_vat_type_dtl_cls
 *
 * @since 13-12-2012 16:29:27
 */
Bds.store.p_vat_type_dtl_cls = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=p_vat_type_dtl_cls&method=read',
                create : Webi.ROUTE_URL + '&class=p_vat_type_dtl_cls&method=create',
                update: Webi.ROUTE_URL + '&class=p_vat_type_dtl_cls&method=update',
                destroy: Webi.ROUTE_URL + '&class=p_vat_type_dtl_cls&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'p_vat_type_dtl_cls_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name : 'p_vat_type_dtl_cls_id', type: 'int'},
            {name : 'p_vat_type_dtl_id', type: 'int'},
            {name : 'code'},
            {name : 'vat_code'},
            {name : 'description'},
            {name : 'vat_pct', type: 'float'},
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
	Bds.store.p_vat_type_dtl_cls.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.p_vat_type_dtl_cls, Ext.data.Store);
Ext.reg('store_p_vat_type_dtl_cls', Bds.store.p_vat_type_dtl_cls);