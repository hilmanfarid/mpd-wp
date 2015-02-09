/**
 * @class Bds.grid.p_app_menu
 * Grid for table bds_p_app_menu
 *
 * @author wiliamdecosta@gmail.com
 * @since 23-10-2012 12:07:20
 */
Bds.grid.p_app_menu = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.p_app_menu();
        
        this.columns = [
            {header: Bds.properties.menu_id, hidden: true, sortable: false, dataIndex: 'menu_id'},
			{header: 'Menu', hidden: false, sortable: false, dataIndex: 'menu_code', width:354, renderer:function(value,meta,rec){
			     
                var padding = ((rec.get('menu_level')-1) * 30) + 5;
			    if(rec.get('menu_level') == 1) {
			       var padStyle = "style=\"padding-left:"+ padding + "px;font-weight:bold;font-size:12px;color:"+ rec.get('font_color') +";\"";
			    }else {
			       var padStyle = 'style="padding-left:'+ padding +'px;font-weight:'+ rec.get('font_style') +';color:'+ rec.get('font_color') +';"';
			    }
			    
			    meta.attr = padStyle;
			    return value;        
			}},
			{header: Bds.properties.menu_listing_no, hidden: false, sortable: false, dataIndex: 'menu_listing_no', width: 65},
			{header: 'Nama File', hidden: false, sortable: false, dataIndex: 'menu_file_name', width:154},
			{header: 'Level', hidden: true, sortable: false, dataIndex: 'menu_level', width:154},
			
			{header: Bds.properties.menu_is_active, hidden: true, sortable: false, dataIndex: 'menu_is_active'},
			{header: Bds.properties.menu_description, hidden: true, sortable: false, dataIndex: 'menu_description'},
			{header: Bds.properties.menu_creation_date, hidden: true, sortable: false, dataIndex: 'menu_creation_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.menu_creation_by, hidden: true, sortable: false, dataIndex: 'menu_creation_by'},
			{header: Bds.properties.menu_updated_date, hidden: true, sortable: false, dataIndex: 'menu_updated_date', width: 35, renderer: Webi.format.dateRenderer},
			{header: Bds.properties.menu_updated_by, hidden: true, sortable: false, dataIndex: 'menu_updated_by'}
        ];

        // super
        Bds.grid.p_app_menu.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			'menu_id': '',
			'menu_pid': '',
			'menu_code': '',
			'menu_file_name': '',
			'menu_listing_no': '',
			'menu_is_active': 'Y',
			'menu_description': '',
			'menu_creation_date': '',
			'menu_creation_by': '',
			'menu_updated_date': '',
			'menu_updated_by': ''
        };
        return defaultData;
    },
    
    buildTopToolbar : function() {
        var buttons = [];
        
        this.searchMenu = new Ext.form.TextField({emptyText:'Nama Menu / Nama File Modul', width:250});
        this.searchMenu.on('specialkey',this.onSearchText,this);
        
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
        buttons.push(this.searchMenu);
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
        
        var searchMenu = this.searchMenu.getValue();
                
        if(!Ext.isEmpty(searchMenu)) {
            p['searchMenu'] = searchMenu;      
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
        this.searchMenu.reset();
    }
});
Ext.reg('grid_p_app_menu', Bds.grid.p_app_menu);