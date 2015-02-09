/**
 * @class Bds.grid.d_puskesmas
 * Grid for table bds_d_puskesmas
 *
 * @author agung.hp
 * @since 06-12-2012 12:02:05
 */
Bds.grid.d_puskesmas = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_puskesmas();
        var cbp_wilayah = new Bds.combo.p_wilayah();
        this.columns = [
            {header: Bds.properties.puskesmas_id, hidden: true, sortable: true, dataIndex: 'puskesmas_id'},
			{header: Bds.properties.puskesmas_listing_no, hidden: false, sortable: true, dataIndex: 'puskesmas_listing_no', width:80, renderer: Webi.format.intRenderer},
			{header: Bds.properties.puskesmas_kode, hidden: false, sortable: true, dataIndex: 'puskesmas_kode', width:158},
			{header: Bds.properties.puskesmas_name, hidden: false, sortable: true, dataIndex: 'puskesmas_name', width:243},
			{header: Bds.properties.puskesmas_alamat, hidden: false, sortable: true, dataIndex: 'puskesmas_alamat', width:254},
			{header: Bds.properties.kecamatan_id, hidden: false, sortable: true, dataIndex: 'wilayah_nama', width: 120},
			{header: Bds.properties.puskesmas_kode_pos, hidden: false, sortable: true, dataIndex: 'puskesmas_kode_pos', width:104},
			{header: Bds.properties.puskesmas_description, hidden: false, sortable: true, dataIndex: 'puskesmas_description', width:200},
			{header: Bds.properties.puskesmas_creation_date, hidden: false, sortable: true, dataIndex: 'puskesmas_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.puskesmas_created_by, hidden: false, sortable: true, dataIndex: 'puskesmas_created_by', width: 120},
			{header: Bds.properties.puskesmas_updated_date, hidden: false, sortable: true, dataIndex: 'puskesmas_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.puskesmas_updated_by, hidden: false, sortable: true, dataIndex: 'puskesmas_updated_by', width: 120}
        ];

        // super
        Bds.grid.d_puskesmas.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'puskesmas_id': '',
			'kecamatan_id': '',
			'puskesmas_kode': '',
			'puskesmas_name': '',
			'puskesmas_alamat': '',
			'puskesmas_kode_pos': '',
			'puskesmas_description': '',
			'puskesmas_creation_date': '',
			'puskesmas_created_by': '',
			'puskesmas_updated_date': '',
			'puskesmas_updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_puskesmas', Bds.grid.d_puskesmas);