/**
 * @class Bds.store.t_skpd_employee
 * Store for table bds_t_skpd_employee
 *
 * @author agung.hp
 * @since 13-12-2012 14:15:12
 */
Bds.store.t_skpd_employee = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_skpd_employee&method=read',
                create : Webi.ROUTE_URL + '&class=t_skpd_employee&method=create',
                update: Webi.ROUTE_URL + '&class=t_skpd_employee&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_skpd_employee&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 't_skpd_employee_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 't_skpd_employee_id', type: 'int'},
			{name: 'd_skpd_id', type: 'int'},
			{name: 'code'},
			{name: 'tahun', allowBlank: false, type: 'int'},
			{name: 'jml_peg_organik', type: 'float'},
			{name: 'jml_peg_non_organik', type: 'float'},
			{name: 'description'},
			{name: 'creation_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'creation_by'},
			{name: 'updated_date', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'updated_by'}
        ]),
        writer: new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        }),
        autoSave: false
	});
	// call the superclass's constructor 
	Bds.store.t_skpd_employee.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_skpd_employee, Ext.data.Store);
Ext.reg('store_t_skpd_employee', Bds.store.t_skpd_employee);