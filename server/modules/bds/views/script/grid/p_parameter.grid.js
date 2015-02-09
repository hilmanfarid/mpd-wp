/**
 * @class Bds.grid.p_parameter
 * Grid for table bds_p_parameter
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_parameter = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_parameter();
        
        this.columns = [
            {header: Bds.properties.param_id, hidden: true, sortable: true, dataIndex: 'param_id'},
			{header: Bds.properties.ptype_id, hidden: true, sortable: true, dataIndex: 'ptype_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.param_listing_no, hidden: false, sortable: true, dataIndex: 'param_listing_no', width: 70, renderer: Webi.format.intRenderer},
			{header: Bds.properties.param_code, hidden: false, sortable: true, dataIndex: 'param_code', width:138},
			{header: Bds.properties.param_name, hidden: false, sortable: true, dataIndex: 'param_name', width:226},
			{header: Bds.properties.param_description, hidden: false, sortable: true, dataIndex: 'param_description', width:250},
			{header: Bds.properties.param_creation_date, hidden: false, sortable: true, dataIndex: 'param_creation_date', width:100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.param_creation_by, hidden: false, sortable: true, dataIndex: 'param_creation_by', width:100},
			{header: Bds.properties.param_updated_date, hidden: false, sortable: true, dataIndex: 'param_updated_date', width:100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.param_updated_by, hidden: false, sortable: true, dataIndex: 'param_updated_by', width:100}
        ];

        // super
        Bds.grid.p_parameter.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'param_id': '',
			'ptype_id': this.store.baseParams.ptype_id || '',
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
Ext.reg('grid_p_parameter', Bds.grid.p_parameter);