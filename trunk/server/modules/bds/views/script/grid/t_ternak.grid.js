/**
 * @class Bds.grid.t_ternak
 * Grid for table bds_t_ternak
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.grid.t_ternak = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_ternak();
        var cbp_parameter = new Bds.combo.p_parameter();
        this.columns = [
            {header: Bds.properties.ternak_id, hidden: true, sortable: true, dataIndex: 'ternak_id'},
			{header: Bds.properties.type_id, hidden: true, sortable: true, dataIndex: 'type_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.ternak_tahun, hidden: false, sortable: true, dataIndex: 'ternak_tahun', width: 80},
			{header: Bds.properties.ternak_populasi, hidden: false, sortable: true, dataIndex: 'ternak_populasi', width: 180, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.ternak_jml_potong, hidden: false, sortable: true, dataIndex: 'ternak_jml_potong', width: 180, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.ternak_produksi_daging, hidden: false, sortable: true, dataIndex: 'ternak_produksi_daging', width: 180, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.t_ternak.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'ternak_id': '',
			'type_id': this.store.baseParams.param_id || '',
			'ternak_tahun': '',
			'ternak_populasi': '',
			'ternak_jml_potong': '',
			'ternak_produksi_daging': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_ternak', Bds.grid.t_ternak);