/**
 * @class Bds.grid.p_job_position
 * Grid for table bds_p_job_position
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_job_position = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    
    initComponent : function() {
        this.store = new Bds.store.p_job_position();
        var cbRegion = new Bds.combo.TipeWilayah();
        
        
        this.columns = [
            {header: Bds.properties.jobpos_id, hidden: true, sortable: true, dataIndex: 'jobpos_id'},
			{header: 'No Urut', hidden: false, sortable: true, dataIndex: 'jobpos_listing_no', width:70},
			{header: Bds.properties.jobpos_code, hidden: false, sortable: true, dataIndex: 'jobpos_code', width:164},
			{header: Bds.properties.jobpos_description, hidden: false, sortable: true, dataIndex: 'jobpos_description', width:330},
			{header: 'Region', hidden: false, sortable: true, dataIndex: 'jobpos_status', width:150, renderer: Webi.format.comboRenderer(cbRegion)},
			{header: Bds.properties.jobpos_creation_date, hidden: false, sortable: true, dataIndex: 'jobpos_creation_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.jobpos_creation_by, hidden: false, sortable: true, dataIndex: 'jobpos_creation_by', width: 120,},
			{header: Bds.properties.jobpos_updated_date, hidden: false, sortable: true, dataIndex: 'jobpos_updated_date', width: 120, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.jobpos_updated_by, hidden: false, sortable: true, dataIndex: 'jobpos_updated_by', width:120}
        ];

        // super
        Bds.grid.p_job_position.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'jobpos_id': '',
			'jobpos_code': '',
			'jobpos_listing_no': '',
			'jobpos_description': '',
			'jobpos_creation_date': '',
			'jobpos_creation_by': '',
			'jobpos_updated_date': '',
			'jobpos_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchKodePosisi = new Ext.form.TextField({emptyText:'Kode Posisi', width:150});
                
        this.searchKodePosisi.on('specialkey',this.onSearchText,this);
        
        if (this.enableAdd === true){
            buttons.push({
                itemId: 'btnNew',
                text: 'Tambah',
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
        
        buttons.push('->');
        buttons.push({xtype: 'tbtext', text: 'Cari :'});
        buttons.push(this.searchKodePosisi);
        buttons.push(' ');
        
        buttons.push({
            itemId: 'btnReset',
            text: 'Reset',
            handler: this.onReset,
            scope: this
        });
        
        return buttons;
    },
    
    getSearchParams:function() {
    	var p = {};
        
        var searchKodePosisi = this.searchKodePosisi.getValue();
                
        if(!Ext.isEmpty(searchKodePosisi)) {
            p['searchKodePosisi'] = searchKodePosisi;      
        }
        
		return p;
    },
    
    onSearchText: function(field, e) {
    	if(e.getKey() == e.ENTER) {
    		this.onSearch();	
    	}
    },
    
    onSearch: function() {
    	this.store.baseParams = this.getSearchParams();
   		this.store.load();
    },
    
    onReset: function() {
        this.resetFields();
    	this.store.baseParams = {};
    	this.store.load();
    },
    
    resetFields: function() {
        this.searchKodePosisi.reset();
    }
});
Ext.reg('grid_p_job_position', Bds.grid.p_job_position);