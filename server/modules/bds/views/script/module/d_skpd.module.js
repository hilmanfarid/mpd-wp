/**
 * @class Bds.module.d_skpd
 * Module panel for table bds_d_skpd
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.module.d_skpd = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_skpd_addTitle,
    editTitle: Bds.properties.d_skpd_editTitle,
    winWidth:469,
    winHeight:371,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_skpd.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.d_skpd({border: false});
        this.initGridEvents();
        
        /* set masterId name for master-detail grid handling */
		this.masterId = 'd_skpd_id';
		this.displayId = 'skpd_name';
		
		this.details = {
			t_skpd_employee: new Bds.module.t_skpd_employee({disabled: true})
		};
		
		this.details.t_skpd_employee.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 't_skpd_employee',
		    border: false,
		    items: [
				{itemId: 't_skpd_employee', title: 'Peternakan', layout: 'fit', items: this.details.t_skpd_employee}
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
        this.form = new Bds.form.d_skpd();
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_d_skpd', Bds.module.d_skpd);