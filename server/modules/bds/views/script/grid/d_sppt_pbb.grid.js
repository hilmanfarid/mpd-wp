/**
 * @class Bds.grid.d_sppt_pbb
 * Grid for table bds_d_sppt_pbb
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.grid.d_sppt_pbb = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_sppt_pbb();
        
        this.columns = [
            {header: Bds.properties.sppt_pbb_id, hidden: true, sortable: true, dataIndex: 'sppt_pbb_id'},
			{header: Bds.properties.sppt_pbb_tahun, hidden: false, sortable: true, dataIndex: 'sppt_pbb_tahun', width: 80},
			{header: Bds.properties.sppt_pbb_buah, hidden: false, sortable: true, dataIndex: 'sppt_pbb_buah', width: 120, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.sppt_pbb_terhutang, hidden: false, sortable: true, dataIndex: 'sppt_pbb_terhutang', width: 120, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.d_sppt_pbb.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'sppt_pbb_id': '',
			'kecamatan_id': this.store.baseParams.wilayah_id || '',
			'sppt_pbb_tahun': '',
			'sppt_pbb_buah': '',
			'sppt_pbb_terhutang': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_sppt_pbb', Bds.grid.d_sppt_pbb);