/**
 * @class Bds.module.p_wilayah
 * Module panel for table bds_p_wilayah
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_wilayah = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_wilayah_addTitle,
    editTitle: Bds.properties.p_wilayah_editTitle,
    winWidth:629,
    winHeight:209,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_wilayah.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_wilayah({border: false});
        this.initGridEvents();

        /* set masterId name for master-detail grid handling */
	    this.masterId = 'wilayah_id';
		this.displayId = 'wilayah_nama';
		
		this.details = {
			detail_wilayah_info: new Bds.form.p_wilayah_info({disabled:true}),
			detail_wilayah_person: new Bds.module.p_wilayah_person({disabled:true})
		};
		this.details.detail_wilayah_info.on('update', this.onUpdate, this);
		this.details.detail_wilayah_person.on('update', this.onUpdate, this);
				
		this.tabPanel = new Ext.TabPanel({
		    enableTabScroll:true,
		    defaults: {autoScroll:true},
		    activeTab: 'detail_wilayah_info',
		    border: false,
		    items: [
				{itemId: 'detail_wilayah_info', title: 'Informasi Wilayah', layout: 'fit', items: this.details.detail_wilayah_info},
				{itemId: 'detail_wilayah_person', title: 'Pejabat Daerah', layout: 'fit', items: this.details.detail_wilayah_person}
				
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
		            height: 210,
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
        this.form = new Bds.form.p_wilayah();
		this.initFormEvents();
		
		
		return this.form;
    },
    
    onUpdate: function(form, rec, type){
	    this.grid.store.save();
	},
	
	hideActionProgress: function(action, success){
    	if (this.win && this.win.isVisible()){
    	    this.form.enable();
    	    if (success){
        		this.win.statusbar.setStatus({
                    iconCls: 'x-status-saved',
                    text: 'Data berhasil ' + (action == 'create' ? 'disimpan' : 'diupdate')
                });
                var rec = this.grid.getSelectionModel().getSelected();
                Webi.info.msg('Info', 'Info Wilayah '+ rec.get('wilayah_nama') +' Berhasil Di-Update');
            }else{
        		this.win.statusbar.setStatus({
                    iconCls: 'x-status-error',
                    text: 'Terjadi kesalahan, mohon periksa kembali data anda'
                });
            }
    	}else if (this.grid && this.grid.el.isMasked()){
    		this.grid.el.unmask();
		}    
    },
    
    onRowSelectMasterGrid: function(sm, row, rec){
        var activeTab = this.tabPanel.getActiveTab();
        var detail = this.details[activeTab.getItemId()];
        var masterIdVal = rec.get(this.masterId);
        
        if (this.displayId){
            var i = activeTab.title.indexOf(':');
            if (i == -1){
                activeTab.setTitle(activeTab.title + ' : '  + rec.get(this.displayId));
            }else{
                activeTab.setTitle(activeTab.title.substring(0, (i - 1)) + ' : '  + rec.get(this.displayId));
            }
        }
        
        if (Ext.isEmpty(masterIdVal)){
            detail.disable();
            detail.grid.store.removeAll();
        }else{
        	
            detail.enable();
            
            var rec = this.grid.getSelectionModel().getSelected();
            this.details.detail_wilayah_info.loadRecord(rec, 'update');
            
            if(activeTab.getItemId() == 'detail_wilayah_info') return;
            detail.grid.store.baseParams['wilayah_status'] = rec.get('wilayah_status');
                        
            if (detail.grid.store.baseParams[this.masterId] && detail.grid.store.baseParams[this.masterId] == masterIdVal){
                detail.grid.store.reload();
            }else{
                detail.grid.store.baseParams[this.masterId] = masterIdVal;
                detail.grid.store.load();
            }
        }
    }
});

Ext.reg('module_p_wilayah', Bds.module.p_wilayah);