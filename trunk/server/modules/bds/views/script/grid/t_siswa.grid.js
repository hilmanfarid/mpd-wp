/**
 * @class Bds.grid.t_siswa
 * Grid for table bds_t_siswa
 *
 * @author agung.hp
 * @since 02-11-2012 13:33:33
 */
Bds.grid.t_siswa = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_siswa();
        
        this.columns = [
            {header: Bds.properties.t_siswa_id, hidden: true, sortable: true, dataIndex: 't_siswa_id'},
			{header: Bds.properties.d_sekolah_id, hidden: true, sortable: true, dataIndex: 'd_sekolah_id', width: 50},
			{header: Bds.properties.tahun, hidden: false, sortable: true, dataIndex: 'tahun', width: 110},
			{header: Bds.properties.jml_masuk, hidden: false, sortable: true, dataIndex: 'jml_masuk', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.jml_lulus, hidden: false, sortable: true, dataIndex: 'jml_lulus', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.jml_aktif, hidden: false, sortable: true, dataIndex: 'jml_aktif', width: 120, renderer: Webi.format.intRenderer},
			{header: Bds.properties.description, hidden: true, sortable: true, dataIndex: 'description'},
			{header: 'Tgl Pembuatan', hidden: false, sortable: true, dataIndex: 'creation_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Dibuat Oleh', hidden: false, sortable: true, dataIndex: 'creation_by', width: 112},
			{header: 'Tgl Update', hidden: false, sortable: true, dataIndex: 'updated_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Diupdate Oleh', hidden: false, sortable: true, dataIndex: 'updated_by', width: 112}
        ];

        // super
        Bds.grid.t_siswa.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_siswa_id': '',
			'd_sekolah_id': this.store.baseParams.d_sekolah_id || '',
			'tahun': '',
			'jml_masuk': '',
			'jml_lulus': '',
			'jml_aktif': '',
			'description': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_siswa', Bds.grid.t_siswa);