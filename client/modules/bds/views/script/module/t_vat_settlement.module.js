/**
 * @class Bds.module.t_vat_settlement
 * Module panel for table t_vat_settlement
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.t_vat_settlement = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data Pelaporan',
    editTitle: 'Update Data Pelaporan',
    winWidth:500,
    winHeight:500,
    /**
     * initComponent
     * @protected
     */
    initWinForm: function(){
        
		this.win = new Webi.WinForm({width:this.winWidth, height:this.winHeight, items: this.buildForm()});
		this.win.on('hide', function(w){
			this.form.reset();
			this.grid.store.load();
		}, this);
		this.form.on('hide',function(){
			this.win.hide();
			this.form.show();
		},this);
    },
    initComponent : function() {
        // super
        Bds.module.t_vat_settlement.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_vat_settlement({border: false});
        this.initGridEvents();
        
        this.masterId = 't_customer_order_id';
		this.displayId = 'payment_key';
		
		this.details = {
			t_cust_order_legal_doc: new Bds.module.t_cust_order_legal_doc({disabled: true})
		};
		
		this.details.t_cust_order_legal_doc.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 't_cust_order_legal_doc',
		    border: false,
		    items: [
				{itemId: 't_cust_order_legal_doc', title: 'Dokumen Pendukung', layout: 'fit', items: this.details.t_cust_order_legal_doc}
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
		            height: 230,
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
        this.form = new Bds.form.t_vat_settlement();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_vat_settlement', Bds.module.t_vat_settlement);