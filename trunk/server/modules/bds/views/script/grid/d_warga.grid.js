/**
 * @class Bds.grid.d_warga
 * Grid for table bds_d_warga
 *
 * @author agung.hp
 * @since 31-10-2012 11:02:06
 */
Bds.grid.d_warga = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.d_warga();
        var cbd_warga = new Bds.combo.d_warga();
		var cbp_parameter = new Bds.combo.p_parameter();
		var cbp_wilayah = new Bds.combo.p_wilayah();
        this.columns = [
            /*{header: Bds.properties.warga_id, hidden: true, sortable: true, dataIndex: 'warga_id'},
			{header: Bds.properties.warga_pid, hidden: true, sortable: true, dataIndex: 'warga_pid', width: 50, renderer: Webi.format.comboRenderer(cbd_warga)},
			{header: Bds.properties.warga_kk_no, hidden: false, sortable: true, dataIndex: 'warga_kk_no'},
			{header: Bds.properties.warga_ktp_no, hidden: false, sortable: true, dataIndex: 'warga_ktp_no'},
			{header: Bds.properties.warga_name, hidden: false, sortable: true, dataIndex: 'warga_name'},
			{header: Bds.properties.jk_id, hidden: false, sortable: true, dataIndex: 'jk_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.warga_ktp_date, hidden: false, sortable: true, dataIndex: 'warga_ktp_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_ktpvalid_to, hidden: false, sortable: true, dataIndex: 'warga_ktpvalid_to', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_kkvalid_to, hidden: false, sortable: true, dataIndex: 'warga_kkvalid_to', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_tgl_lahir, hidden: false, sortable: true, dataIndex: 'warga_tgl_lahir', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_tempat_lahir, hidden: false, sortable: true, dataIndex: 'warga_tempat_lahir'},
			{header: Bds.properties.goldarah_id, hidden: false, sortable: true, dataIndex: 'goldarah_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.agama_id, hidden: false, sortable: true, dataIndex: 'agama_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.statnikah_id, hidden: false, sortable: true, dataIndex: 'statnikah_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.hubkel_id, hidden: false, sortable: true, dataIndex: 'hubkel_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.warga_address_1, hidden: false, sortable: true, dataIndex: 'warga_address_1'},
			{header: Bds.properties.warga_address_2, hidden: false, sortable: true, dataIndex: 'warga_address_2'},
			{header: Bds.properties.warga_kota, hidden: false, sortable: true, dataIndex: 'warga_kota'},
			{header: Bds.properties.warga_kode_pos, hidden: false, sortable: true, dataIndex: 'warga_kode_pos'},
			{header: Bds.properties.pendidikan_id, hidden: false, sortable: true, dataIndex: 'pendidikan_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.jobtype_id, hidden: false, sortable: true, dataIndex: 'jobtype_id', width: 50, renderer: Webi.format.comboRenderer(cbp_parameter)},
			{header: Bds.properties.wilayah_id, hidden: false, sortable: true, dataIndex: 'wilayah_id', width: 50, renderer: Webi.format.comboRenderer(cbp_wilayah)},
			{header: Bds.properties.warga_job_company, hidden: false, sortable: true, dataIndex: 'warga_job_company'},
			{header: Bds.properties.warga_job_address, hidden: false, sortable: true, dataIndex: 'warga_job_address'},
			{header: Bds.properties.warga_job_kota, hidden: false, sortable: true, dataIndex: 'warga_job_kota'},
			{header: Bds.properties.warga_description, hidden: false, sortable: true, dataIndex: 'warga_description'},
			{header: Bds.properties.warga_creation_date, hidden: false, sortable: true, dataIndex: 'warga_creation_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_created_by, hidden: false, sortable: true, dataIndex: 'warga_created_by'},
			{header: Bds.properties.warga_updated_date, hidden: false, sortable: true, dataIndex: 'warga_updated_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_updated_by, hidden: false, sortable: true, dataIndex: 'warga_updated_by'}
            */
            {header: Bds.properties.warga_id, hidden: true, sortable: true, dataIndex: 'warga_id'},
			{header: Bds.properties.warga_name, hidden: false, sortable: true, dataIndex: 'warga_name', width:212},
			{header: Bds.properties.warga_ktp_no, hidden: false, sortable: true, dataIndex: 'warga_ktp_no', width:200},
			{header: Bds.properties.warga_tgl_lahir, hidden: false, sortable: true, dataIndex: 'warga_tgl_lahir', width: 75, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_tempat_lahir, hidden: false, sortable: true, dataIndex: 'warga_tempat_lahir', width:150},
			{header: Bds.properties.warga_address_1, hidden: true, sortable: true, dataIndex: 'warga_address_1'},
			{header: Bds.properties.warga_address_2, hidden: true, sortable: true, dataIndex: 'warga_address_2'},
			{header: Bds.properties.warga_kota, hidden: false, sortable: true, dataIndex: 'warga_kota'},
			{header: Bds.properties.warga_kode_pos, hidden: false, sortable: true, dataIndex: 'warga_kode_pos'},
			{header: Bds.properties.warga_description, hidden: true, sortable: true, dataIndex: 'warga_description'},
			{header: Bds.properties.warga_creation_date, hidden: false, sortable: true, dataIndex: 'warga_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_created_by, hidden: false, sortable: true, dataIndex: 'warga_created_by', width: 120},
			{header: Bds.properties.warga_updated_date, hidden: false, sortable: true, dataIndex: 'warga_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.warga_updated_by, hidden: false, sortable: true, dataIndex: 'warga_updated_by', width: 120}
        
        ];

        // super
        Bds.grid.d_warga.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'warga_id': '',
			'warga_pid': this.store.baseParams.warga_id || '',
			'warga_kk_no': '',
			'warga_ktp_no': '',
			'warga_name': '',
			'jk_id': '',
			'warga_ktp_date': '',
			'warga_ktpvalid_to': '',
			'warga_kkvalid_to': '',
			'warga_tgl_lahir': '',
			'warga_tempat_lahir': '',
			'goldarah_id': '',
			'agama_id': '',
			'statnikah_id': '',
			'hubkel_id': '',
			'warga_address_1': '',
			'warga_address_2': '',
			'warga_kota': '',
			'warga_kode_pos': '',
			'pendidikan_id': '',
			'jobtype_id': '',
			'wilayah_id': '',
			'warga_job_company': '',
			'warga_job_address': '',
			'warga_job_kota': '',
			'warga_description': '',
			'warga_creation_date': '',
			'warga_created_by': '',
			'warga_updated_date': '',
			'warga_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        if (this.enableAdd === true){
            buttons.push({
                itemId: 'btnNew',
                text: 'Tambah Anggota Keluarga',
                iconCls: 'icon-add',
                handler: this.onNew,
                scope: this
            });
        }

        if (this.enableEdit === true){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'icon-edit',
                handler: this.onModify,
                disabled: true,
                scope: this
            });
        }
        
        if (this.enableDelete === true){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                disabled: true,
                scope: this
            });
        }        

        if (this.usePaging === false){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnReload',
                text: 'Reload',
                iconCls: 'x-tbar-loading',
                handler: function(){
                    this.store.reload();
                },
                scope: this
            });
        }
        
        return buttons;
    }
});
Ext.reg('grid_d_warga', Bds.grid.d_warga);