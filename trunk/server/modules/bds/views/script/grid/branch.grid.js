/**
 * @class Bds.grid.branch
 * Grid for table bds_branch
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.branch = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.branch();
        
        this.columns = [
            {header: 'ID', hidden: true, sortable: true, dataIndex: 'branch_id'},
			{header: 'Nama Cabang', hidden: false, sortable: true, dataIndex: 'branch_name', width:50},
			{header: 'Tgl Pembuatan', hidden: false, sortable: true, dataIndex: 'creation_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Dibuat Oleh', hidden: false, sortable: true, dataIndex: 'created_by', width: 112},
			{header: 'Tgl Update', hidden: false, sortable: true, dataIndex: 'updated_date', width: 112, renderer: Webi.format.dateRenderer},
			{header: 'Diupdate Oleh', hidden: false, sortable: true, dataIndex: 'updated_by', width: 112}
        ];

        // super
        Bds.grid.branch.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'branch_id': '',
			'code': '',
			'hotel_name': '',
            'alias_name': '',
            'kelas_code': '',
            'jml_kamar': '',
            'address_1': '',
            'address_2': '',
            'kota': '',
            'kode_pos': '',
            'phone_no': '',
            'website': '',
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
Ext.reg('grid_branch', Bds.grid.branch);