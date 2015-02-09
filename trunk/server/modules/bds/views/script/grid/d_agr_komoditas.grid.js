/**
 * @class Bds.grid.d_agr_komoditas
 * Grid for table bds_d_agr_komoditas
 *
 * @author agung.hp
 * @since 13-12-2012 16:29:27
 */
Bds.grid.d_agr_komoditas = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_agr_komoditas();
        var cbp_parameter = new Bds.combo.p_parameter();
        this.columns = [
            {header: Bds.properties.d_agr_komiditas_id, hidden: true, sortable: true, dataIndex: 'd_agr_komiditas_id'},
			{header: Bds.properties.listing_no, hidden: false, sortable: true, dataIndex: 'listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.code, hidden: false, sortable: true, dataIndex: 'code', width:129},
			{header: Bds.properties.komoditas_name, hidden: false, sortable: true, dataIndex: 'komoditas_name', width:205},
			{header: 'Jenis Tanaman', hidden: false, sortable: true, dataIndex: 'param_name', width: 120},
			{header: Bds.properties.phone_no, hidden: true, sortable: true, dataIndex: 'phone_no'},
			{header: Bds.properties.website, hidden: true, sortable: true, dataIndex: 'website'},
			{header: Bds.properties.description, hidden: false, sortable: true, dataIndex: 'description'},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.d_agr_komoditas.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'd_agr_komiditas_id': '',
			'type_id': '',
			'code': '',
			'komoditas_name': '',
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
Ext.reg('grid_d_agr_komoditas', Bds.grid.d_agr_komoditas);