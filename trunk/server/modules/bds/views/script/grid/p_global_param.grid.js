/**
 * @class Bds.grid.p_global_param
 * Grid for table bds_p_global_param
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_global_param = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_global_param();
        var cbYesNo = new Bds.combo.YesNo();
        this.columns = [
            {header: Bds.properties.gparam_id, hidden: true, sortable: true, dataIndex: 'gparam_id'},
			{header: Bds.properties.gtype_id, hidden: true, sortable: true, dataIndex: 'gtype_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.gparam_code, hidden: false, sortable: true, dataIndex: 'gparam_code', width:154},
			{header: Bds.properties.gparam_type_1, hidden: false, sortable: true, dataIndex: 'gparam_type_1', width:110},
			{header: Bds.properties.gparam_value_1, hidden: false, sortable: true, dataIndex: 'gparam_value_1', width:128},
			{header: Bds.properties.gparam_is_range, hidden: false, sortable: true, dataIndex: 'gparam_is_range', width: 90, renderer: Webi.format.comboRenderer(cbYesNo)},
			{header: Bds.properties.gparam_value_2, hidden: false, sortable: true, dataIndex: 'gparam_value_2', width:124},
			{header: Bds.properties.gparam_description, hidden: true, sortable: true, dataIndex: 'gparam_description'},
			{header: Bds.properties.gparam_creation_date, hidden: false, sortable: true, dataIndex: 'gparam_creation_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.gparam_creation_by, hidden: false, sortable: true, dataIndex: 'gparam_creation_by', width: 110},
			{header: Bds.properties.gparam_updated_date, hidden: false, sortable: true, dataIndex: 'gparam_updated_date', width: 110, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.gparam_updated_by, hidden: false, sortable: true, dataIndex: 'gparam_updated_by', width: 110}
        ];

        // super
        Bds.grid.p_global_param.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'gparam_id': '',
			'gtype_id': this.store.baseParams.gtype_id || '',
			'gparam_code': '',
			'gparam_value_1': '',
			'gparam_type_1': '',
			'gparam_is_range': '',
			'gparam_value_2': '',
			'gparam_description': '',
			'gparam_creation_date': '',
			'gparam_creation_by': '',
			'gparam_updated_date': '',
			'gparam_updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_p_global_param', Bds.grid.p_global_param);