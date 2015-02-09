/**
 * @class Bds.module.d_trayek
 * Module panel for table bds_d_trayek
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.module.d_trayek = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_trayek_addTitle,
    editTitle: Bds.properties.d_trayek_editTitle,
    winWidth:565,
    winHeight:243,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_trayek.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_trayek({border: false});
        this.initGridEvents();

        /* set masterId name for master-detail grid handling */
		this.masterId = 'trayek_id';
		this.displayId = 'trayek_name';
		
		this.details = {
			t_armada: new Bds.module.t_armada({disabled: true})
		};
		
		this.details.t_armada.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 't_armada',
		    border: false,
		    items: [
				{itemId: 't_armada', title: 'Armada', layout: 'fit', items: this.details.t_armada}
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
        this.form = new Bds.form.d_trayek();
		this.initFormEvents();
				
		return this.form;
    }
});

Ext.reg('module_d_trayek', Bds.module.d_trayek);