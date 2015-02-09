/**
 * @class Bds.grid.p_role_menu
 * Grid for table core_p_role_menu
 *
 * @author wiliamdecosta@gmail.com
 * @since 22-01-2010 13:23:17
 */
Bds.grid.p_role_menu = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store =new Bds.store.p_role_menu();
        var cbStatus = new Bds.combo.YesNo();
        this.columns = [
            {
				header: 'ID', 
				dataIndex: 'rolemenu_id', sortable: true, hidden: true
			},        
            {
				header: 'Role ID', 
				dataIndex: 'role_id', sortable: true, hidden: true
			},
			{
				header: 'Menu', 
				dataIndex: 'menu_code', sortable: true, hidden: false, width:354, renderer:function(value,meta,rec){
			     
                 var padding = ((rec.get('menu_level')-1) * 30) + 5;
			    if(rec.get('menu_level') == 1) {
			       var padStyle = "style=\"padding-left:"+ padding + "px;font-weight:bold;font-size:12px;color:"+ rec.get('font_color') +";\"";
			    }else {
			       var padStyle = 'style="padding-left:'+ padding +'px;font-weight:'+ rec.get('font_style') +';color:'+ rec.get('font_color') +';"';
			    }
			    
			    meta.attr = padStyle;

			    return value;        
			}},
			
			{
				header: 'Aktif?', 
				dataIndex: 'rolemenu_status', sortable: true, hidden: false, 
				renderer: Webi.format.comboRenderer(cbStatus), width: 158
			}
        ];

        // super
        Bds.grid.p_role_menu.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
            'rolemenu_id': '',
			'role_id': this.store.baseParams.role_id || '',
			'menu_id': '',
			'rolemenu_status': ''
        };
        return defaultData;
    },
    /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        var buttons = [];

        if (this.enableEdit === true){
            buttons.push({
                itemId: 'btnEdit',
                text: 'Set Aktif',
                iconCls: 'icon-edit',
                handler: this.onModify,
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
Ext.reg('grid_p_role_menu', Bds.grid.p_role_menu);