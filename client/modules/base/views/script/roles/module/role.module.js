/**
 * @class Base.module.role
 * Module panel for table core_role
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.module.role = Ext.extend(Webi.module.Panel, {
    addTitle: Base.properties.role_addTitle,
    editTitle: Base.properties.role_editTitle,
    winWidth:400,
    winHeight:155,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.module.role.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Base.grid.role({border: false});
        this.initGridEvents();

		/* set masterId name for master-detail grid handling */
		this.masterId = 'role_id';
		this.displayId = 'role_name';
		
		this.details = {
			role_permission: new Base.module.role_permission({disabled: true}),
			p_role_menu: new Bds.module.p_role_menu({disabled: true})
		};
		
		this.details.role_permission.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		this.details.p_role_menu.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'role_permission',
		    border: false,
		    items: [
				{itemId: 'role_permission', title: 'Hak Akses Grup', layout: 'fit', items: this.details.role_permission},
				{itemId: 'p_role_menu', title: 'Pengaturan Menu Grup', layout: 'fit', items: this.details.p_role_menu}
			]
		});
		this.tabPanel.on('tabchange', function(tabpanel, tab){
		    var sm = this.grid.getSelectionModel();
		    var rec = sm.getSelected();
		
		    if (rec) this.onRowSelectMasterGrid(sm, null, rec);
		}, this);

		this.grid.getSelectionModel().on('rowselect', this.onRowSelectMasterGrid, this);

        /* return configured layout */
		return {
		    xtype: 'panel',
		    layout: 'border',
		    border: false,
		    items : [
		        {
		            region: 'center',
		            margins: '1 1 0 1',
		            layout: 'fit',
		            minHeight: 110,
		            items: this.grid
		        },
		        {
		            region: 'south',
		            margins: '0 1 1 1',
		            cmargins: '1 1 1 1',
		            height: 300,
		            minHeight: 110,
		            split: true,
		            collapsible: true,
		            collapseMode: 'mini',
		            hideCollapseTool: true,
		            layout: 'fit',
		            items: this.tabPanel
		        }
		    ]
		};
    },
    buildForm : function(){
        this.form = new Base.form.role();
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_role', Base.module.role);