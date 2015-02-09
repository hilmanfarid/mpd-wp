/**
 * @class Bds.grid.d_trayek
 * Grid for table bds_d_trayek
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.grid.d_trayek = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_trayek();
        
        this.columns = [
            {header: Bds.properties.trayek_id, hidden: true, sortable: true, dataIndex: 'trayek_id'},
			{header: Bds.properties.trayek_listing_no, hidden: false, sortable: true, dataIndex: 'trayek_listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.trayek_code, hidden: false, sortable: true, dataIndex: 'trayek_code', width:125},
			{header: Bds.properties.trayek_name, hidden: false, sortable: true, dataIndex: 'trayek_name', width:180},
			{header: Bds.properties.trayek_panjang, hidden: false, sortable: true, dataIndex: 'trayek_panjang', width: 150, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.trayek_description, hidden: false, sortable: true, dataIndex: 'trayek_description', width:250},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.d_trayek.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'trayek_id': '',
			'trayek_code': '',
			'trayek_name': '',
			'trayek_panjang': '',
			'trayek_listing_no': '',
			'trayek_description': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_trayek', Bds.grid.d_trayek);