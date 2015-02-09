/**
 * @class Bds.grid.d_jalan
 * Grid for table bds_d_jalan
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.d_jalan = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_jalan();
        
        this.columns = [
            {header: 'ID', hidden: true, sortable: true, dataIndex: 'd_jalan_id'},
			{header: 'No Urut', hidden: false, sortable: true, dataIndex: 'listing_no', width:60},
			{header: 'Kode', hidden: false, sortable: true, dataIndex: 'code', width:100},
			{header: 'Nama', hidden: false, sortable: true, dataIndex: 'jalan_name', width:200},
			{header: 'Kelas (admin)', hidden: false, sortable: true, dataIndex: 'klas_admin_code', width:120},
			{header: 'Kelas (fungsi)', hidden: false, sortable: true, dataIndex: 'klas_fungsi_code', width:120},
			{header: 'Kelas (muat)', hidden: false, sortable: true, dataIndex: 'klas_muat_code', width:120},
			{header: 'Panjang (km)', hidden: false, sortable: true, dataIndex: 'panjang', width:95},
			{header: 'Deskripsi', hidden: false, sortable: true, dataIndex: 'description', width:300}
        ];

        // super
        Bds.grid.d_jalan.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'd_jalan_id': '',
			'code': '',
			'jalan_name': '',
            'klas_admin_code': '',
            'klas_fungsi_code': '',
            'klas_muat_code': '',
            'panjang': '',
            'listing_no': '',
            'description': '',
            'status': '',                           
            'creation_date': '',
            'createdn_by': '',
            'updated_date': '',
            'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_jalan', Bds.grid.d_jalan);