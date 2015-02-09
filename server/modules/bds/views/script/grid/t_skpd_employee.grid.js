/**
 * @class Bds.grid.t_skpd_employee
 * Grid for table bds_t_skpd_employee
 *
 * @author agung.hp
 * @since 13-12-2012 14:15:12
 */
Bds.grid.t_skpd_employee = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_skpd_employee();
        
        this.columns = [
            {header: Bds.properties.t_skpd_employee_id, hidden: true, sortable: true, dataIndex: 't_skpd_employee_id'},
			{header: Bds.properties.d_skpd_id, hidden: true, sortable: true, dataIndex: 'd_skpd_id', width: 65, renderer: Webi.format.intRenderer},
			{header: Bds.properties.tahun, hidden: false, sortable: true, dataIndex: 'tahun', width: 84},
			{header: Bds.properties.jml_peg_organik, hidden: false, sortable: true, dataIndex: 'jml_peg_organik', width: 170, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.jml_peg_non_organik, hidden: false, sortable: true, dataIndex: 'jml_peg_non_organik', width: 170, renderer: Webi.format.floatRenderer},
			{header: Bds.properties.description, hidden: false, sortable: true, dataIndex: 'description', width:260},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.creation_by, hidden: false, sortable: true, dataIndex: 'creation_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.t_skpd_employee.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_skpd_employee_id': '',
			'd_skpd_id': this.store.baseParams.d_skpd_id || '',
			'tahun': '',
			'jml_peg_organik': '',
			'jml_peg_non_organik': '',
			'description': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_skpd_employee', Bds.grid.t_skpd_employee);