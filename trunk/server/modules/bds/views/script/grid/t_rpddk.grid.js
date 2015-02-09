/**
 * @class Bds.grid.t_rpddk
 * Grid for table bds_t_rpddk
 *
 * @author agung.hp
 * @since 13-12-2012 20:06:34
 */
Bds.grid.t_rpddk = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_rpddk();
        
        this.columns = [
            {header: Bds.properties.t_rpddk_id, hidden: true, sortable: true, dataIndex: 't_rpddk_id'},
			{header: Bds.properties.jenis_data, hidden: false, sortable: true, dataIndex: 'jenisdata',
			renderer:function(value, meta, record){
            		var jenis =new Array("","Usia","Pendidikan");
                	return jenis[value];
				}
			},
			{header: Bds.properties.kelompok_id, hidden: false, sortable: true, dataIndex: 'kelompok'},
			{header: Bds.properties.tahun, hidden: false, sortable: true, dataIndex: 'tahun'},
			{header: Bds.properties.laki, hidden: false, sortable: true, dataIndex: 'laki'},
			{header: Bds.properties.perempuan, hidden: false, sortable: true, dataIndex: 'perempuan'},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'creation_by'},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 100, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by'}
        ];

        // super
        Bds.grid.t_rpddk.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_rpddk_id': '',
			'jenisdata': this.store.baseParams.jenisdata||'',
			'jenisdata_name': this.jenisdata_name||'',
			'kelompok_id': '',
			'tahun': '',
			'laki': '',
			'perempuan': '',
			'creation_date': '',
			'creation_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_rpddk', Bds.grid.t_rpddk);