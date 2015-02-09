/**
 * @class Bds.grid.d_wisata
 * Grid for table bds_d_wisata
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.grid.d_wisata = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_wisata();
        
        this.columns = [
            {header: Bds.properties.wisata_id, hidden: true, sortable: true, dataIndex: 'wisata_id'},
			{header: Bds.properties.wisata_code, hidden: false, sortable: true, dataIndex: 'wisata_code'},
			{header: Bds.properties.wisata_name, hidden: false, sortable: true, dataIndex: 'wisata_name',width: 200},
			{header: Bds.properties.wisata_address_1, hidden: false, sortable: true, dataIndex: 'wisata_address_1',width: 270},
			{header: Bds.properties.wisata_address_2, hidden: false, sortable: true, dataIndex: 'wisata_address_2',width: 270},
			{header: Bds.properties.wisata_kota, hidden: false, sortable: true, dataIndex: 'wisata_kota'},
			{header: Bds.properties.wisata_kode_pos, hidden: false, sortable: true, dataIndex: 'wisata_kode_pos'},
			{header: Bds.properties.wisata_phone_no, hidden: false, sortable: true, dataIndex: 'wisata_phone_no'},
			{header: Bds.properties.wisata_website, hidden: false, sortable: true, dataIndex: 'wisata_website',width: 200},
			{header: Bds.properties.wisata_listing_no, hidden: false, sortable: true, dataIndex: 'wisata_listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.wisata_description, hidden: false, sortable: true, dataIndex: 'wisata_description',width: 200},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by'},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by'}
        ];

        // super
        Bds.grid.d_wisata.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'wisata_id': '',
			'wisata_code': '',
			'wisata_name': '',
			'wisata_address_1': '',
			'wisata_address_2': '',
			'wisata_kota': '',
			'wisata_kode_pos': '',
			'wisata_phone_no': '',
			'wisata_website': '',
			'wisata_listing_no': '',
			'wisata_description': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_wisata', Bds.grid.d_wisata);