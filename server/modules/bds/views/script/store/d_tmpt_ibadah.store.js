/**
 * @class Bds.store.d_tmpt_ibadah
 * Store for table bds_d_tmpt_ibadah
 *
 * @author agung.hp
 * @since 13-12-2012 22:05:03
 */
Bds.store.d_tmpt_ibadah = function(config){
	var config = config || {};
	Ext.applyIf(config, {
        proxy: new Ext.data.HttpProxy({
            api: {
                read : Webi.ROUTE_URL + '&class=d_tmpt_ibadah&method=read',
                create : Webi.ROUTE_URL + '&class=d_tmpt_ibadah&method=create',
                update: Webi.ROUTE_URL + '&class=d_tmpt_ibadah&method=update',
                destroy: Webi.ROUTE_URL + '&class=d_tmpt_ibadah&method=destroy'
            }
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'tibdh_id',
            root: 'items',
            messageProperty: 'message'
        }, [
		    {name: 'tibdh_id', type: 'int'},
			{name: 'agama_id', type: 'int'},
			{name: 'param_code'},
			{name: 'kecamatan_id', type: 'int'},
			{name: 'wilayah_kode'},
			{name: 'wilayah_nama'},
			{name: 'tibdh_code'},
			{name: 'tibdh_name', allowBlank: false},
			{name: 'tibdh_alamat'},
			{name: 'tibdh_kode_pos'},
			{name: 'tibdh_description'},
			{name: 'tibdh_listing_no', type: 'int'},
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
	Bds.store.d_tmpt_ibadah.superclass.constructor.call(this, config);
};

Ext.extend(Bds.store.d_tmpt_ibadah, Ext.data.Store);
Ext.reg('store_d_tmpt_ibadah', Bds.store.d_tmpt_ibadah);