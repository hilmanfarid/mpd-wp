/**
 * @class Bds.store.t_wisata_detail
 * Store for table bds_t_wisata_detail
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.store.t_wisata_detail = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=t_wisata_detail&method=read',
                create : Webi.ROUTE_URL + '&class=t_wisata_detail&method=create',
                update: Webi.ROUTE_URL + '&class=t_wisata_detail&method=update',
                destroy: Webi.ROUTE_URL + '&class=t_wisata_detail&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'wisata_det_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'wisata_det_id', type: 'int'},
			{name: 'wisata_id', type: 'int'},
			{name: 'wisata_code'},
			{name: 'wisata_det_tahun', allowBlank: false, type: 'int'},
			{name: 'wisata_det_jml_peg_pria', type: 'int'},
			{name: 'wisata_det_jml_peg_wanita', type: 'int'},
			{name: 'wisata_det_jml_wisman', type: 'int'},
			{name: 'wisata_det_jml_wisdom', type: 'int'},
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
	Bds.store.t_wisata_detail.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.t_wisata_detail, Ext.data.Store);
Ext.reg('store_t_wisata_detail', Bds.store.t_wisata_detail);