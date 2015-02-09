/**
 * @class Bds.grid.t_cuaca
 * Grid for table bds_t_cuaca
 *
 * @author agung.hp
 * @since 13-12-2012 14:15:12
 */
Bds.grid.t_cuaca = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_cuaca();
        var cbMonths = new Bds.combo.Months();
		var cbArahAngin = new Bds.combo.ArahAngin();
        this.columns = [
            {header: Bds.properties.t_cuaca_id, hidden: true, sortable: true, dataIndex: 't_cuaca_id'},
			{header: Bds.properties.tahun, hidden: false, sortable: true, dataIndex: 'tahun', width: 80},
			{header: Bds.properties.bulan, hidden: false, sortable: true, dataIndex: 'bulan', width: 114, renderer: Webi.format.comboRenderer(cbMonths)},
			{header: Bds.properties.penguapan, hidden: false, sortable: true, dataIndex: 'penguapan', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.tekanan_udara, hidden: false, sortable: true, dataIndex: 'tekanan_udara', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.kelembaban, hidden: false, sortable: true, dataIndex: 'kelembaban', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.suhu_max, hidden: false, sortable: true, dataIndex: 'suhu_max', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.suhu_min, hidden: false, sortable: true, dataIndex: 'suhu_min', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.suhu_rata2, hidden: false, sortable: true, dataIndex: 'suhu_rata2', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.curah_hujan, hidden: false, sortable: true, dataIndex: 'curah_hujan', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.hari_hujan, hidden: false, sortable: true, dataIndex: 'hari_hujan', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.prosen_sinar, hidden: false, sortable: true, dataIndex: 'prosen_sinar', width: 140, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.angin_rata2, hidden: false, sortable: true, dataIndex: 'angin_rata2', width: 180, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.arah_rata2, hidden: false, sortable: true, dataIndex: 'arah_rata2', width: 140, renderer: Webi.format.comboRenderer(cbArahAngin)},
			{header: Bds.properties.angin_max, hidden: false, sortable: true, dataIndex: 'angin_max', width: 180, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.arah_max, hidden: false, sortable: true, dataIndex: 'arah_max', width: 180, renderer: Webi.format.comboRenderer(cbArahAngin)},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.t_cuaca.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_cuaca_id': '',
			'tahun': '',
			'bulan': '',
			'penguapan': '',
			'tekanan_udara': '',
			'kelembaban': '',
			'suhu_max': '',
			'suhu_min': '',
			'suhu_rata2': '',
			'curah_hujan': '',
			'hari_hujan': '',
			'prosen_sinar': '',
			'angin_rata2': '',
			'arah_rata2': '',
			'angin_max': '',
			'arah_max': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_cuaca', Bds.grid.t_cuaca);