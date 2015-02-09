/**
 * @class Bds.grid.t_agr_komod_prod
 * Grid for table bds_t_agr_komod_prod
 *
 * @author agung.hp
 * @since 13-12-2012 16:29:27
 */
Bds.grid.t_agr_komod_prod = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_agr_komod_prod();
        
        this.columns = [
            {header: Bds.properties.t_agr_komod_prod_id, hidden: true, sortable: true, dataIndex: 't_agr_komod_prod_id'},
			{header: Bds.properties.d_agr_komiditas_id, hidden: true, sortable: true, dataIndex: 'd_agr_komiditas_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.tahun, hidden: false, sortable: true, dataIndex: 'tahun', width: 100},
			{header: Bds.properties.luas_tanam, hidden: false, sortable: true, dataIndex: 'luas_tanam', width: 165, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.luas_panen, hidden: false, sortable: true, dataIndex: 'luas_panen', width: 165, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.productivity, hidden: false, sortable: true, dataIndex: 'productivity', width: 191, renderer: Webi.format.floatRenderer},
			{header: 'Produksi', hidden: false, sortable: true, dataIndex: 'produksi', width: 191, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.description, hidden: false, sortable: true, dataIndex: 'description', width:200},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.t_agr_komod_prod.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_agr_komod_prod_id': '',
			'd_agr_komiditas_id': this.store.baseParams.d_agr_komiditas_id || '',
			'tahun': '',
			'luas_tanam': '',
			'luas_panen': '',
			'productivity': '',
			'produksi': '',
			'description': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_agr_komod_prod', Bds.grid.t_agr_komod_prod);