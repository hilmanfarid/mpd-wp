/**
 * @class Bds.grid.d_skpd
 * Grid for table bds_d_skpd
 *
 * @author agung.hp
 * @since 13-12-2012 14:15:12
 */
Bds.grid.d_skpd = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_skpd();
        
        this.columns = [
            {header: Bds.properties.d_skpd_id, hidden: true, sortable: true, dataIndex: 'd_skpd_id'},
			{header: 'No Urut', hidden: false, sortable: true, dataIndex: 'listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: 'Kode', hidden: false, sortable: true, dataIndex: 'code', width:123},
			{header: 'Nama SKPD', hidden: false, sortable: true, dataIndex: 'skpd_name', width:197},
			{header: 'Alamat 1', hidden: false, sortable: true, dataIndex: 'address_1', width:221},
			{header: 'Alamat 2', hidden: false, sortable: true, dataIndex: 'address_2', width:221},
			{header: 'Kota', hidden: false, sortable: true, dataIndex: 'kota', width:161},
			{header: 'Kode Pos', hidden: false, sortable: true, dataIndex: 'kode_pos'},
			{header: 'No Telepon', hidden: false, sortable: true, dataIndex: 'phone_no', width:142},
			{header: 'Website', hidden: false, sortable: true, dataIndex: 'website', width:190},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width:120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width:120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width:120}
        ];

        // super
        Bds.grid.d_skpd.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'd_skpd_id': '',
			'code': '',
			'skpd_name': '',
			'address_1': '',
			'address_2': '',
			'kota': '',
			'kode_pos': '',
			'phone_no': '',
			'website': '',
			'listing_no': '',
			'description': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_skpd', Bds.grid.d_skpd);