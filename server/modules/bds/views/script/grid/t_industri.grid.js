/**
 * @class Bds.grid.t_industri
 * Grid for table bds_t_industri
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.grid.t_industri = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_industri();
        
        this.columns = [
            {header: Bds.properties.industri_id, hidden: true, sortable: true, dataIndex: 'industri_id'},
			{header: Bds.properties.industri_tahun, hidden: false, sortable: true, dataIndex: 'industri_tahun', width: 65},
			{header: Bds.properties.industri_jml_unit, hidden: false, sortable: true, dataIndex: 'industri_jml_unit', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.industri_peg_pria, hidden: false, sortable: true, dataIndex: 'industri_peg_pria', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.industri_peg_wanita, hidden: false, sortable: true, dataIndex: 'industri_peg_wanita', width: 140, renderer: Webi.format.intRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.t_industri.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'industri_id': '',
			'type_id': this.store.baseParams.param_id || '',
			'industri_tahun': '',
			'industri_jml_unit': '',
			'industri_peg_pria': '',
			'industri_peg_wanita': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_industri', Bds.grid.t_industri);