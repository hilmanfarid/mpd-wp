/**
 * @class Bds.grid.p_wilayah
 * Grid for table bds_p_wilayah
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_wilayah = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_wilayah();
        var cbTipeWilayah = new Bds.combo.TipeWilayah();
        
        this.columns = [
            {header: Bds.properties.wilayah_id, hidden: true, sortable: false, dataIndex: 'wilayah_id'},
			{header: Bds.properties.wilayah_kode, hidden: false, sortable: false, dataIndex: 'wilayah_kode', width:128, renderer:function(value,meta,rec){
			    if(rec.get('wilayah_status') == '11') {
                    meta.attr = 'style="font-weight:bold;"';
                }
                
                if(rec.get('wilayah_status') == '21' || rec.get('wilayah_status') == '22') {
                    meta.attr = 'style="font-weight:bold;"';
                }  
                
                if(rec.get('wilayah_status') == '31') {
                    meta.attr = 'style="font-weight:bold;"';
                } 
                  			
                return value;
			}},
			{header: Bds.properties.wilayah_nama, hidden: false, sortable: false, dataIndex: 'wilayah_nama', width:407, renderer:function(value,meta,rec){
                if(rec.get('wilayah_status') == '11') {
                    meta.attr = 'style="font-weight:bold;"';
                }
                
                if(rec.get('wilayah_status') == '21' ||  rec.get('wilayah_status') == '22' ) {
                    meta.attr = 'style="font-weight:bold;padding-left:20px;"';
                }                
                
                if(rec.get('wilayah_status') == '31') {
                    meta.attr = 'style="font-weight:bold;padding-left:40px;"';
                }
                
                if(rec.get('wilayah_status') == '41' || rec.get('wilayah_status') == '42') {
                    meta.attr = 'style="padding-left:60px;"';
                }
                                
                if(rec.get('wilayah_status') == '51') {
                    meta.attr = 'style="padding-left:80px;"';
                }
                
                if(rec.get('wilayah_status') == '61') {
                    meta.attr = 'style="padding-left:100px;"';
                }
                
                return value;
			}},
			
			
			{header: Bds.properties.wilayah_description, hidden: true, sortable: false, dataIndex: 'wilayah_description', width:250},
			{header: Bds.properties.wilayah_status, hidden: false, sortable: false, dataIndex: 'wilayah_status', width:100, renderer: Webi.format.comboRenderer(cbTipeWilayah)},
			{header: Bds.properties.wilayah_creation_date, hidden: true, sortable: false, dataIndex: 'wilayah_creation_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.wilayah_creation_by, hidden: true, sortable: false, dataIndex: 'wilayah_creation_by'},
			{header: Bds.properties.wilayah_updated_date, hidden: true, sortable: false, dataIndex: 'wilayah_updated_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.wilayah_updated_by, hidden: true, sortable: false, dataIndex: 'wilayah_updated_by'}
        ];

        // super
        Bds.grid.p_wilayah.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'wilayah_id': '',
			'wilayah_pid': '',
			'wilayah_kode': '',
			'wilayah_nama': '',
			'wilayah_description': '',
			'wilayah_status': '11',
			'wilayah_creation_date': '',
			'wilayah_creation_by': '',
			'wilayah_updated_date': '',
			'wilayah_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchWilayah = new Ext.form.TextField({emptyText:'Kode / Nama Wilayah', width:200});
        this.searchWilayah.on('specialkey',this.onSearchText,this);
        
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
        buttons.push(this.searchWilayah);
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
        
        var searchWilayah = this.searchWilayah.getValue();
                
        if(!Ext.isEmpty(searchWilayah)) {
            p['searchWilayah'] = searchWilayah;      
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
        this.searchWilayah.reset();
    }
});
Ext.reg('grid_p_wilayah', Bds.grid.p_wilayah);