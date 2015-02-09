/**
 * @class Bds.grid.t_modern_mart
 * Grid for table bds_t_modern_mart
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.grid.t_modern_mart = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_modern_mart();
        var cbp_parameter = new Bds.combo.p_parameter();
        this.columns = [
            {header: Bds.properties.mmart_id, hidden: true, sortable: true, dataIndex: 'mmart_id'},
			{header: Bds.properties.type_id, hidden: true, sortable: true, dataIndex: 'type_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.param_code, hidden: true, sortable: true, dataIndex: 'param_code'},
			{header: Bds.properties.mmart_tahun, hidden: false, sortable: true, dataIndex: 'mmart_tahun', width: 65},
			{header: Bds.properties.mmart_jml_unit, hidden: false, sortable: true, dataIndex: 'mmart_jml_unit', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.mmart_jml_peg_pria, hidden: false, sortable: true, dataIndex: 'mmart_jml_peg_pria', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.mmart_jml_peg_wanita, hidden: false, sortable: true, dataIndex: 'mmart_jml_peg_wanita', width: 140, renderer: Webi.format.intRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.t_modern_mart.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'mmart_id': '',
			'type_id': this.store.baseParams.param_id || '',
			'mmart_tahun': '',
			'mmart_jml_unit': '',
			'mmart_jml_peg_pria': '',
			'mmart_jml_peg_wanita': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_modern_mart', Bds.grid.t_modern_mart);