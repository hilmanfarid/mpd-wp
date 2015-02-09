/**
 * @class Bds.grid.d_pasar
 * Grid for table bds_d_pasar
 *
 * @author agung.hp
 * @since 14-12-2012 01:58:20
 */
Bds.grid.d_pasar = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_pasar();
        
        this.columns = [
            {header: Bds.properties.pasar_id, hidden: true, sortable: true, dataIndex: 'pasar_id'},
			{header: Bds.properties.pasar_listing_no, hidden: false, sortable: true, dataIndex: 'pasar_listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.pasar_code, hidden: false, sortable: true, dataIndex: 'pasar_code', width:157},
			{header: Bds.properties.pasar_name, hidden: false, sortable: true, dataIndex: 'pasar_name', width:190},
			{header: Bds.properties.pasar_address1, hidden: false, sortable: true, dataIndex: 'pasar_address1', width:220},
			{header: Bds.properties.pasar_address2, hidden: false, sortable: true, dataIndex: 'pasar_address2', width:220},
			{header: Bds.properties.pasar_kota, hidden: false, sortable: true, dataIndex: 'pasar_kota', width:172},
			{header: Bds.properties.pasar_kodepos, hidden: false, sortable: true, dataIndex: 'pasar_kodepos', width:65},
			{header: Bds.properties.pasar_phone_no, hidden: false, sortable: true, dataIndex: 'pasar_phone_no'},
			{header: Bds.properties.pasar_description, hidden: true, sortable: true, dataIndex: 'pasar_description'},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.d_pasar.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'pasar_id': '',
			'pasar_code': '',
			'pasar_name': '',
			'pasar_address1': '',
			'pasar_address2': '',
			'pasar_kota': '',
			'pasar_kodepos': '',
			'pasar_phone_no': '',
			'pasar_listing_no': '',
			'pasar_description': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_pasar', Bds.grid.d_pasar);