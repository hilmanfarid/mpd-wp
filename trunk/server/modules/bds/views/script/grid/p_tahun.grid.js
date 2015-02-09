/**
 * @class Bds.grid.p_tahun
 * Grid for table bds_p_tahun
 *
 * @author agung.hp
 * @since 01-11-2012 10:52:31
 */
Bds.grid.p_tahun = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_tahun();
        var cbYesNo = new Bds.combo.YesNo();
        this.columns = [
            {header: Bds.properties.tahun_id, hidden: false, sortable: true, dataIndex: 'tahun_id'},
			{header: Bds.properties.tahun_aktif, hidden: false, sortable: true, dataIndex: 'tahun_aktif', width: 100, renderer: Webi.format.comboRenderer(cbYesNo)},
			{header: Bds.properties.tahun_creation_date, hidden: false, sortable: true, dataIndex: 'tahun_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.tahun_creation_by, hidden: false, sortable: true, dataIndex: 'tahun_creation_by', width: 120},
			{header: Bds.properties.tahun_updated_date, hidden: false, sortable: true, dataIndex: 'tahun_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.tahun_updated_by, hidden: false, sortable: true, dataIndex: 'tahun_updated_by', width: 120}
        ];

        // super
        Bds.grid.p_tahun.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'tahun_id': '',
			'tahun_aktif': '',
			'tahun_creation_date': '',
			'tahun_creation_by': '',
			'tahun_updated_date': '',
			'tahun_updated_by': ''
        };
        return defaultData;
    }
});
Ext.reg('grid_p_tahun', Bds.grid.p_tahun);