/**
 * @class Bds.grid.t_pasar_detail
 * Grid for table bds_t_pasar_detail
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.grid.t_pasar_detail = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_pasar_detail();
        
        this.columns = [
            {header: Bds.properties.pasar_det_id, hidden: true, sortable: true, dataIndex: 'pasar_det_id'},
			{header: Bds.properties.pasar_id, hidden: true, sortable: true, dataIndex: 'pasar_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.pasar_det_tahun, hidden: false, sortable: true, dataIndex: 'pasar_det_tahun', width: 80},
			{header: Bds.properties.pasar_det_jml_ruang, hidden: false, sortable: true, dataIndex: 'pasar_det_jml_ruang', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.pasar_det_jml_pedagang_aktif, hidden: false, sortable: true, dataIndex: 'pasar_det_jml_pedagang_aktif', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.pasar_det_jml_pedagang_pasif, hidden: false, sortable: true, dataIndex: 'pasar_det_jml_pedagang_pasif', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width:120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width:120}
        ];

        // super
        Bds.grid.t_pasar_detail.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'pasar_det_id': '',
			'pasar_id': this.store.baseParams.pasar_id || '',
			'pasar_det_tahun': '',
			'pasar_det_jml_ruang': '',
			'pasar_det_jml_pedagang_aktif': '',
			'pasar_det_jml_pedagang_pasif': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_pasar_detail', Bds.grid.t_pasar_detail);