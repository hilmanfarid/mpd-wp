/**
 * @class Base.module.user
 * Module panel for table core_user
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.module.user = Ext.extend(Webi.module.Panel, {
    addTitle: Base.properties.user_addTitle,
    editTitle: Base.properties.user_editTitle,
    winWidth:400,
    winHeight:300,
    /**
     * initComponent
     * @protected
     * TODO : permission per user
     */
    initComponent : function() {
        // super
        Base.module.user.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Base.grid.user({border: false});
        this.initGridEvents();
        
		/* set masterId name for master-detail grid handling */
		this.masterId = 'user_id';
		
		this.details = {
			user_role: new Base.module.user_role({disabled: true})
		};
		
		this.details.user_role.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    resizeTabs:true,
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'user_role',
		    border: false,
		    items: [
				{itemId: 'user_role', title: 'Grup User', layout: 'fit', items: this.details.user_role}
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
		            height: 200,
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
        this.form = new Base.form.user();
		this.initFormEvents();
				
		return this.form;
    }
});

Ext.reg('module_user', Base.module.user);