/**
 * @class Bds.grid.param_sppt_pbb
 * Grid for table bds_param_sppt_pbb
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.param_sppt_pbb = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    enableAdd:false,
    enableEdit:false,
    enableDelete:false,
    initComponent : function() {
        this.store = new Bds.store.p_wilayah();
        this.store.baseParams.wilayah_status = '31';
        
        this.columns = [
            {header: Bds.properties.wilayah_id, hidden: true, sortable: true, dataIndex: 'wilayah_id'},
			{header: 'Nama Kecamatan', hidden: false, sortable: true, dataIndex: 'wilayah_nama', width:226}
        ];

        // super
        Bds.grid.param_sppt_pbb.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'param_id': '',
			'param_code': '',
			'param_name': '',
			'param_listing_no': '',
			'param_description': '',
			'param_creation_date': '',
			'param_creation_by': '',
			'param_updated_date': '',
			'param_updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_param_sppt_pbb', Bds.grid.param_sppt_pbb);