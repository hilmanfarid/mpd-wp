/**
 * @class Bds.grid.t_armada
 * Grid for table bds_t_armada
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.grid.t_armada = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_armada();
        
        this.columns = [
            {header: Bds.properties.armada_id, hidden: true, sortable: true, dataIndex: 'armada_id'},
			{header: Bds.properties.trayek_id, hidden: true, sortable: true, dataIndex: 'trayek_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.armada_tahun, hidden: false, sortable: true, dataIndex: 'armada_tahun', width: 80},
			{header: 'Jumlah Armada', hidden: false, sortable: true, dataIndex: 'armada_jml', width: 130, renderer: Webi.format.intRenderer},
			{header: Bds.properties.armada_jml_angkot, hidden: false, sortable: true, dataIndex: 'armada_jml_angkot', width: 130, renderer: Webi.format.intRenderer},
			{header: Bds.properties.armada_jml_biskota, hidden: false, sortable: true, dataIndex: 'armada_jml_biskota', width: 130, renderer: Webi.format.intRenderer},
			{header: Bds.properties.armada_jml_lain, hidden: false, sortable: true, dataIndex: 'armada_jml_lain', width: 130, renderer: Webi.format.intRenderer},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width:120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width:120}
        ];

        // super
        Bds.grid.t_armada.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'armada_id': '',
			'trayek_id': this.store.baseParams.trayek_id || '',
			'armada_tahun': '',
			'armada_jml': '',
			'armada_jml_angkot': '',
			'armada_jml_biskota': '',
			'armada_jml_lain': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_armada', Bds.grid.t_armada);