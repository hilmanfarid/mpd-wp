/**
 * @class Bds.grid.d_tmpt_ibadah
 * Grid for table bds_d_tmpt_ibadah
 *
 * @author agung.hp
 * @since 13-12-2012 22:05:03
 */
Bds.grid.d_tmpt_ibadah = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_tmpt_ibadah();
        var cbp_parameter = new Bds.combo.p_parameter();
		var cbp_wilayah = new Bds.combo.p_wilayah();
        this.columns = [
            {header: Bds.properties.tibdh_id, hidden: true, sortable: true, dataIndex: 'tibdh_id'},
			{header: Bds.properties.agama_id, hidden: true, sortable: true, dataIndex: 'agama_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.tibdh_listing_no, hidden: false, sortable: true, dataIndex: 'tibdh_listing_no', width: 65, renderer: Webi.format.intRenderer},
			{header: 'Kode Tempat Ibadah', hidden: false, sortable: true, dataIndex: 'tibdh_code', width:180},
			{header: 'Nama Tempat Ibadah', hidden: false, sortable: true, dataIndex: 'tibdh_name', width:231},
			{header: Bds.properties.tibdh_alamat, hidden: false, sortable: true, dataIndex: 'tibdh_alamat', width:270},
			{header: 'Kecamatan', hidden: false, sortable: true, dataIndex: 'wilayah_nama'},
			{header: Bds.properties.tibdh_kode_pos, hidden: false, sortable: true, dataIndex: 'tibdh_kode_pos'},
			{header: Bds.properties.tibdh_description, hidden: false, sortable: true, dataIndex: 'tibdh_description'},
			{header: Bds.properties.creation_date, hidden: false, sortable: true, dataIndex: 'creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.created_by, hidden: false, sortable: true, dataIndex: 'created_by', width: 120},
			{header: Bds.properties.updated_date, hidden: false, sortable: true, dataIndex: 'updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.updated_by, hidden: false, sortable: true, dataIndex: 'updated_by', width: 120}
        ];

        // super
        Bds.grid.d_tmpt_ibadah.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'tibdh_id': '',
			'agama_id': this.store.baseParams.param_id || '',
			'kecamatan_id': '',
			'tibdh_code': '',
			'tibdh_name': '',
			'tibdh_alamat': '',
			'tibdh_kode_pos': '',
			'tibdh_description': '',
			'tibdh_listing_no': '',
			'creation_date': '',
			'created_by': '',
			'updated_date': '',
			'updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_d_tmpt_ibadah', Bds.grid.d_tmpt_ibadah);