/**
 * @class Bds.module.cust_acc_month
 * Module panel for table cust_acc_month
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.cust_acc_month = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data Transaksi',
    editTitle: 'Update Data Transaksi',
    winWidth:550,
    winHeight:200,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.cust_acc_month.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.cust_acc_month({border: false});
        this.initGridEvents();
        
        this.masterId = 'p_finance_period_id';
		this.displayId = 'code';
		
		this.details = {
			cust_acc_trans: new Bds.module.cust_acc_trans({disabled: true})
		};
		
		this.details.cust_acc_trans.grid.store.on('beforeload', this.onBeforeLoadDetail, this);
		
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'cust_acc_trans',
		    border: false,
		    items: [
				{itemId: 'cust_acc_trans', title: 'Detail Transaksi', layout: 'fit', items: this.details.cust_acc_trans}
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
        this.form = new Bds.form.cust_acc_trans();
		this.initFormEvents();
		
		
		return this.form;
    },
    onRowSelectMasterGrid: function(sm, row, rec){
        var activeTab = this.tabPanel.getActiveTab();
        var detail = this.details[activeTab.getItemId()];
        var start_period = rec.get('start_period');
        var end_period = rec.get('end_period');
        
        if (this.displayId){
            var i = activeTab.title.indexOf(':');
            if (i == -1){
                activeTab.setTitle(activeTab.title + ' : '  + rec.get(this.displayId));
            }else{
                activeTab.setTitle(activeTab.title.substring(0, (i - 1)) + ' : '  + rec.get(this.displayId));
            }
        }
        if (Ext.isEmpty(start_period)||Ext.isEmpty(end_period)){
            detail.disable();
            detail.grid.store.removeAll();
        }else{
        	
            detail.enable();
            if ((detail.grid.store.baseParams['start_period']&&detail.grid.store.baseParams['end_period']) && (detail.grid.store.baseParams['start_period'] == start_period && detail.grid.store.baseParams['end_period'] == end_period)){
                detail.grid.store.reload();
            }else{
                detail.grid.store.baseParams['start_period'] = start_period;
                detail.grid.store.baseParams['end_period'] = end_period;
                detail.grid.store.baseParams['t_cust_account_id'] = rec.get('t_cust_account_id');
                detail.grid.store.baseParams['p_vat_type_dtl_id'] = rec.get('p_vat_type_dtl_id');
                
                detail.grid.npwd.store.baseParams.t_cust_account_id=rec.get('t_cust_account_id');
                detail.grid.p_vat_type_dtl_id.setValue(rec.get('p_vat_type_dtl_id'));
                detail.grid.store.load();
                
                detail.grid.npwd.store.load();
                detail.grid.npwd.setValue(rec.get('t_cust_account_id'));
                detail.grid.p_vat_type_dtl_id.store.load();

                detail.grid.npwd.setRawValue(rec.get('npwd'));
            }
        }
    },
    onBeforeLoadDetail: function(store, options){
         
        if (Ext.isEmpty(store.baseParams['start_period'])&&Ext.isEmpty(store.baseParams['end_period'])){
            Ext.Msg.alert('Perhatian', 'Silahkan pilih data utama terlebih dahulu');
            return false;
        }
        return true;
    }
});

Ext.reg('module_cust_acc_month', Bds.module.cust_acc_month);