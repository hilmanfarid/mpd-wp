/**
 * @class Bds.grid.d_bandung
 * Grid for table bds_d_bandung
 *
 * @author agung.hp
 * @since 13-12-2012 22:05:03
 */
Bds.grid.d_bandung = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_bandung();
        
        this.columns = [
            {header: Bds.properties.bandung_id, hidden: true, sortable: true, dataIndex: 'bandung_id'},
			{header: Bds.properties.bandung_luas_area, hidden: false, sortable: true, dataIndex: 'bandung_luas_area', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_lintang1, hidden: false, sortable: true, dataIndex: 'bandung_lintang1', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_lintang2, hidden: false, sortable: true, dataIndex: 'bandung_lintang2', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_bujur1, hidden: false, sortable: true, dataIndex: 'bandung_bujur1', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_bujur2, hidden: false, sortable: true, dataIndex: 'bandung_bujur2', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_tinggi_max, hidden: false, sortable: true, dataIndex: 'bandung_tinggi_max', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_tinggi_min, hidden: false, sortable: true, dataIndex: 'bandung_tinggi_min', width: 65, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.bandung_description, hidden: false, sortable: true, dataIndex: 'bandung_description'},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by'},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by'}
        ];

        // super
        Bds.grid.d_bandung.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'bandung_id': '',
			'bandung_luas_area': '',
			'bandung_lintang1': '',
			'bandung_lintang2': '',
			'bandung_bujur1': '',
			'bandung_bujur2': '',
			'bandung_tinggi_max': '',
			'bandung_tinggi_min': '',
			'bandung_description': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_bandung', Bds.grid.d_bandung);