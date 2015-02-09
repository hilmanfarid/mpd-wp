/**
 * @class Bds.grid.p_wilayah_person
 * Grid for table bds_p_wilayah_person
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_wilayah_person = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_wilayah_person();
        var cbp_parameter = new Bds.combo.p_parameter();
		var cbp_wilayah = new Bds.combo.p_wilayah();
		
        this.columns = [
            {header: Bds.properties.wp_id, hidden: true, sortable: true, dataIndex: 'wp_id'},
			{header: Bds.properties.param_id, hidden: true, sortable: true, dataIndex: 'param_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.param_code, hidden: true, sortable: true, dataIndex: 'param_code'},
			{header: 'Region', hidden: true, sortable: true, dataIndex: 'wilayah_id', width: 211, renderer: Webi.format.comboRenderer(cbp_wilayah)},
			{header: 'Jabatan', hidden: false, sortable: true, dataIndex: 'jobpos_code'},
			{header: Bds.properties.wilayah_kode, hidden: true, sortable: true, dataIndex: 'wilayah_kode'},
			{header: Bds.properties.rsp_name, hidden: false, sortable: true, dataIndex: 'rsp_name', width:202},
			{header: Bds.properties.rsp_start_position_year, hidden: false, sortable: true, dataIndex: 'rsp_start_position_year', width: 80, renderer: Webi.format.intRenderer},
			{header: Bds.properties.rsp_end_position_year, hidden: false, sortable: true, dataIndex: 'rsp_end_position_year', width: 80, renderer: Webi.format.intRenderer},
			{header: Bds.properties.rsp_valid_from, hidden: false, sortable: true, dataIndex: 'rsp_valid_from', width: 100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rsp_valid_to, hidden: false, sortable: true, dataIndex: 'rsp_valid_to', width: 100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rsp_date_of_birth, hidden: false, sortable: true, dataIndex: 'rsp_date_of_birth', width: 147, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rsp_place_of_birth, hidden: false, sortable: true, dataIndex: 'rsp_place_of_birth', width: 187},
			{header: Bds.properties.rsp_age, hidden: true, sortable: true, dataIndex: 'rsp_age', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.rsp_address_1, hidden: true, sortable: true, dataIndex: 'rsp_address_1'},
			{header: Bds.properties.rsp_address_2, hidden: true, sortable: true, dataIndex: 'rsp_address_2'},
			{header: Bds.properties.rsp_address_3, hidden: true, sortable: true, dataIndex: 'rsp_address_3'},
			{header: Bds.properties.rsp_id_no, hidden: false, sortable: true, dataIndex: 'rsp_id_no', width:190},
			{header: Bds.properties.rsp_phone_no, hidden: false, sortable: true, dataIndex: 'rsp_phone_no', width:190},
			{header: Bds.properties.rsp_mobile_no, hidden: false, sortable: true, dataIndex: 'rsp_mobile_no', width:190},
			{header: Bds.properties.rsp_description, hidden: true, sortable: true, dataIndex: 'rsp_description'},
			{header: Bds.properties.rsp_creation_date, hidden: false, sortable: true, dataIndex: 'rsp_creation_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rsp_created_by, hidden: false, sortable: true, dataIndex: 'rsp_created_by', width: 110},
			{header: Bds.properties.rsp_updated_date, hidden: false, sortable: true, dataIndex: 'rsp_updated_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.rsp_updated_by, hidden: false, sortable: true, dataIndex: 'rsp_updated_by', width: 110}
        ];

        // super
        Bds.grid.p_wilayah_person.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'wp_id': '',
			'param_id': '',
			'jobpos_id': '',
		    'wilayah_id': this.store.baseParams.wilayah_id || '',
		    'wilayah_status': this.store.baseParams.wilayah_status || '',
			'rsp_name': '',
			'rsp_start_position_year': '',
			'rsp_end_position_year': '',
			'rsp_valid_from': '',
			'rsp_valid_to': '',
			'rsp_date_of_birth': '',
			'rsp_place_of_birth': '',
			'rsp_age': '',
			'rsp_address_1': '',
			'rsp_address_2': '',
			'rsp_address_3': '',
			'rsp_id_no': '',
			'rsp_phone_no': '',
			'rsp_mobile_no': '',
			'rsp_description': '',
			'rsp_creation_date': '',
			'rsp_created_by': '',
			'rsp_updated_date': '',
			'rsp_updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_p_wilayah_person', Bds.grid.p_wilayah_person);