/**
 * @class Bds.grid.d_rumahsakit
 * Grid for table bds_d_rumahsakit
 *
 * @author agung.hp
 * @since 05-12-2012 12:48:54
 */
Bds.grid.d_rumahsakit = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_rumahsakit();
        var cbp_parameter = new Bds.combo.p_parameter();
        this.columns = [
            {header: Bds.properties.rs_id, hidden: true, sortable: true, dataIndex: 'rs_id'},
			{header: Bds.properties.rs_listing_no, hidden: false, sortable: true, dataIndex: 'rs_listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: 'Kode Rumah Sakit', hidden: false, sortable: true, dataIndex: 'rs_kode', width:142},
			{header: Bds.properties.rs_name, hidden: false, sortable: true, dataIndex: 'rs_name', width:203},
			{header: 'Jenis Rumah Sakit', hidden: false, sortable: true, dataIndex: 'param_name', width:169},
			{header: Bds.properties.rs_alamat1, hidden: false, sortable: true, dataIndex: 'rs_alamat1', width:206},
			{header: Bds.properties.rs_alamat2, hidden: false, sortable: true, dataIndex: 'rs_alamat2', width:206},
			{header: Bds.properties.rs_kode_pos, hidden: false, sortable: true, dataIndex: 'rs_kode_pos'},
			{header: Bds.properties.rs_phone, hidden: false, sortable: true, dataIndex: 'rs_phone'},
			{header: Bds.properties.rs_website, hidden: false, sortable: true, dataIndex: 'rs_website', width:196},
			{header: Bds.properties.rs_description, hidden: true, sortable: true, dataIndex: 'rs_description'},
			{header: Bds.properties.rs_creation_date, hidden: false, sortable: true, dataIndex: 'rs_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rs_created_by, hidden: false, sortable: true, dataIndex: 'rs_created_by'},
			{header: Bds.properties.rs_updated_date, hidden: false, sortable: true, dataIndex: 'rs_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rs_updated_by, hidden: false, sortable: true, dataIndex: 'rs_updated_by'}
        ];

        // super
        Bds.grid.d_rumahsakit.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'rs_id': '',
			'jenis_id': '',
			'rs_kode': '',
			'rs_name': '',
			'rs_alamat1': '',
			'rs_alamat2': '',
			'rs_kode_pos': '',
			'rs_phone': '',
			'rs_website': '',
			'rs_listing_no': '',
			'rs_description': '',
			'rs_creation_date': '',
			'rs_created_by': '',
			'rs_updated_date': '',
			'rs_updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_rumahsakit', Bds.grid.d_rumahsakit);