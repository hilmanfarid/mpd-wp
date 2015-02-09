/**
 * @class Bds.grid.p_school_type
 * Grid for table bds_p_school_type
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_school_type = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_school_type();
        
        this.columns = [
            {header: Bds.properties.p_school_type_id, hidden: true, sortable: true, dataIndex: 'p_school_type_id'},
			{header: Bds.properties.p_school_type_level_id, hidden: true, sortable: true, dataIndex: 'level_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.p_school_type_listing_no, hidden: false, sortable: true, dataIndex: 'listing_no', width: 70, renderer: Webi.format.intRenderer},
			{header: Bds.properties.p_school_type_code, hidden: false, sortable: true, dataIndex: 'code', width:138},
			{header: Bds.properties.p_school_type_description, hidden: false, sortable: true, dataIndex: 'description', width:250},
			{header: Bds.properties.p_school_type_creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width:100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.p_school_type_creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width:100},
			{header: Bds.properties.p_school_type_updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width:100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.p_school_type_updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width:100}
        ];

        // super
        Bds.grid.p_school_type.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'p_school_type_id': '',
			'level_id': this.store.baseParams.p_school_level_id || '',
			'code': '',
			'listing_no': '',
			'description': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_p_school_type', Bds.grid.p_school_type);