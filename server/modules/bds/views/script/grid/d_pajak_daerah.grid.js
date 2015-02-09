/**
 * @class Bds.grid.d_pajak_daerah
 * Grid for table bds_d_pajak_daerah
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.grid.d_pajak_daerah = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_pajak_daerah();
        
        this.columns = [
            {header: Bds.properties.pjk_daerah_id, hidden: true, sortable: true, dataIndex: 'pjk_daerah_id'},
			{header: Bds.properties.pjk_daerah_tahun, hidden: false, sortable: true, dataIndex: 'pjk_daerah_tahun', width: 80},
			{header: Bds.properties.pjk_daerah_target, hidden: false, sortable: true, dataIndex: 'pjk_daerah_target', width: 120, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.pjk_daerah_realisasi, hidden: false, sortable: true, dataIndex: 'pjk_daerah_realisasi', width: 120, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.d_pajak_daerah.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'pjk_daerah_id': '',
			'jenis_id': this.store.baseParams.param_id || '',
			'pjk_daerah_tahun': '',
			'pjk_daerah_target': '',
			'pjk_daerah_realisasi': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_pajak_daerah', Bds.grid.d_pajak_daerah);