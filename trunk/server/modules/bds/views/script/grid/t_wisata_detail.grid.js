/**
 * @class Bds.grid.t_wisata_detail
 * Grid for table bds_t_wisata_detail
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.grid.t_wisata_detail = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_wisata_detail();
        
        this.columns = [
            {header: Bds.properties.wisata_det_id, hidden: true, sortable: true, dataIndex: 'wisata_det_id'},
			{header: Bds.properties.wisata_id, hidden: true, sortable: true, dataIndex: 'wisata_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.wisata_det_tahun, hidden: false, sortable: true, dataIndex: 'wisata_det_tahun', width: 65},
			{header: Bds.properties.wisata_det_jml_peg_pria, hidden: false, sortable: true, dataIndex: 'wisata_det_jml_peg_pria', width: 130, renderer: Webi.format.intRenderer},
			{header: Bds.properties.wisata_det_jml_peg_wanita, hidden: false, sortable: true, dataIndex: 'wisata_det_jml_peg_wanita', width: 155, renderer: Webi.format.intRenderer},
			{header: Bds.properties.wisata_det_jml_wisman, hidden: false, sortable: true, dataIndex: 'wisata_det_jml_wisman', width: 190, renderer: Webi.format.intRenderer},
			{header: Bds.properties.wisata_det_jml_wisdom, hidden: false, sortable: true, dataIndex: 'wisata_det_jml_wisdom', width: 165, renderer: Webi.format.intRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 105, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 105},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 105, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 105}
        ];

        // super
        Bds.grid.t_wisata_detail.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'wisata_det_id': '',
			'wisata_id': this.store.baseParams.wisata_id || '',
			'wisata_det_tahun': '',
			'wisata_det_jml_peg_pria': '',
			'wisata_det_jml_peg_wanita': '',
			'wisata_det_jml_wisman': '',
			'wisata_det_jml_wisdom': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_wisata_detail', Bds.grid.t_wisata_detail);