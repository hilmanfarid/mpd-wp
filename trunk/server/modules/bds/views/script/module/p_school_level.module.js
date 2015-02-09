/**
 * @class Bds.module.p_school_level
 * Module panel for table bds_p_school_level
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_school_level = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_school_level_addTitle,
    editTitle: Bds.properties.p_school_level_editTitle,
    winWidth:501,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_school_level.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_school_level({border: false});
        this.initGridEvents();

        /* set masterId name for master-detail grid handling */
		this.masterId = 'p_school_level_id';
		this.displayId = 'code';
		
		this.details = {
			p_school_type: new Bds.module.p_school_type({disabled: true})
		};
		
		this.details.p_school_type.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'p_school_type',
		    border: false,
		    items: [
				{itemId: 'p_school_type', title: 'Jenis Sekolah', layout: 'fit', items: this.details.p_school_type}
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
        this.form = new Bds.form.p_school_level();
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_p_school_level', Bds.module.p_school_level);