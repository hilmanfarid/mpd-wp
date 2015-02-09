Ext.ns('Webi.module');

/**
 * @class Webi.module.Panel
 * Module panel component
 */
Webi.module.Panel = Ext.extend(Ext.Panel, {
    layout: 'fit',
    border:false,
    addTitle: 'Tambah Data',
    editTitle: 'Edit Data',
    winWidth:500,
    winHeight:300,
    batchWrite: false,
    
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // build the panel
        this.items = this.buildPanel();

        // add a create event for convenience in our application-code.
        this.addEvents({
            /**
             * @event beforecreate
             */
            beforecreate : true,
            /**
             * @event beforecreate
             */
            beforeupdate : true
        });

        // super
        Webi.module.Panel.superclass.initComponent.call(this);        
    },
    buildPanel : function(){
        return {};
    },
    buildForm : function(){
		return {};
    },
    startModule: function(){
    	if (this.grid) this.grid.store.load();
    },
	/**
     * Init Default Grid Events
     */
    initGridEvents: function(){
    	// fire when user click add button from grid
		this.grid.on('new', this.onNew, this);
		// fire when user click modify button from grid
        this.grid.on('modify', this.onModify, this);
        // fire when user has confirmed the delete operation
        this.grid.on('delete', this.onDelete, this);
        // before store load event
        this.grid.store.on('beforeload', this.onBeforeLoad, this);
        // fire before posting data to server
        this.grid.store.on('beforewrite', this.onBeforeWrite, this);
        // fire when posting data to server succeded
        this.grid.store.on('write', this.onWrite, this);
        // fire when posting data to server failed
        this.grid.store.on('exception', this.onException, this);
    },
    onNew : function(grid, rec, btn, ev){
        this.showForm(grid, rec, btn, ev, 'create');
    },
    onModify : function(grid, rec, btn, ev){
        this.showForm(grid, rec, btn, ev, 'update');
    },
    showForm : function(grid, rec, btn, ev, type){
        if (!this.win) this.initWinForm();
        
        if (type == 'create')
            this.win.setTitle(this.addTitle);
        else
            this.win.setTitle(this.editTitle);

        this.win.show(btn);
        this.form.loadRecord(rec, type);        
    },
    setBatchWriteMode: function(mode){
        if (!this.win) this.initWinForm(); 

        if (mode){
            this.form.btnSave.setText("Tambah");
            this.form.btnSave.setIconClass("icon-add");
        }else{
            this.form.btnSave.setText("Simpan");
            this.form.btnSave.setIconClass("icon-save");
        }
        
        this.batchWrite = mode;
    },
    onDelete: function(grid, store, records){
		if (!this.batchWrite){
			this.grid.store.save();
		}else{
		    if (this.grid.pagingTb) this.grid.pagingTb.updateInfo();
		}
    },
    initWinForm: function(){
        
		this.win = new Webi.WinForm({width:this.winWidth, height:this.winHeight, items: this.buildForm()});
		this.win.on('hide', function(w){
			this.form.reset();
		}, this);		
    },
    onBeforeLoad: function(store, options){
        if (this.batchWrite) return false;
        
        return true;
    },
    onBeforeWrite : function(store, action, rs, options, arg){
    	this.showActionProgress();
    },
    onWrite : function(store, action, result, res, rs){
    	this.hideActionProgress(action, true);
    	
    	if (this.win && this.win.isVisible()){
        	if (action == 'create'){   
                this.form.loadRecord(new this.grid.store.recordType(this.grid.getDefaultData()), 'create');
        	}else if (action == 'update'){
        	    this.win.hide();
        	}
        }
        if (this.grid.pagingTb) this.grid.pagingTb.updateInfo();
    },
    onException : function(proxy, type, action, options, res, arg){
    	this.hideActionProgress(action, false);
        
        if (action == 'create'){
            this.grid.store.rejectChanges();
            if (Ext.isEmpty(arg[0])){
                this.grid.store.removeAt(0);
            }else{
                this.grid.store.load();
            }
        }else if (action == 'update'){
            this.grid.store.rejectChanges();
        }
    },
    showActionProgress: function(){
    	if (this.win && this.win.isVisible()){
    	    this.form.disable();
    		this.win.statusbar.showBusy();
    	}else if (this.grid && this.grid.isVisible()){
			this.grid.el.mask(Webi.TXT_SAVING, 'x-mask-loading');
		}        
    },
    hideActionProgress: function(action, success){
    	if (this.win && this.win.isVisible()){
    	    this.form.enable();
    	    if (success){
        		this.win.statusbar.setStatus({
                    iconCls: 'x-status-saved',
                    text: 'Data berhasil ' + (action == 'create' ? 'disimpan' : 'diupdate')
                });
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
    /**
     * Init Default Form Events
     */
    initFormEvents: function(){
		// fire when user click add button on form
        this.form.on('create', this.onCreate, this);
		// fire when user click update button on form
        this.form.on('update', this.onUpdate, this);
        // fire when user click close/cancel button on form
        this.form.on('cancel', this.onCancel, this);    
    },
    onCreate: function(form, rec, type){
        var doreq = this.fireEvent('beforecreate', this, this.grid.store, form, rec, type);
        if (doreq !== false){
    		this.grid.store.insert(0, rec);
    		if (!this.batchWrite){
    		    this.grid.store.save();
    	    }else{
    	        if (this.grid.pagingTb) this.grid.pagingTb.updateInfo();
    	        this.form.loadRecord(new this.grid.store.recordType(this.grid.getDefaultData()), 'create');
    	    }
        }
	},
	onUpdate: function(form, rec, type){
	    
	    var doreq = this.fireEvent('beforeupdate', this, this.grid.store, form, rec, type);
	    
	    if (doreq !== false){
    		if (!this.batchWrite){
        		this.grid.store.save();
        	}else{
        		this.win.hide();
        	}
        }
	},
	onCancel: function(form, btn, ev){
		this.win.hide();
	},
	onBeforeLoadDetail: function(store, options){
         
        if (Ext.isEmpty(store.baseParams[this.masterId])){
            Ext.Msg.alert('Perhatian', 'Silahkan pilih data utama terlebih dahulu');
            return false;
        }

        return true;
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
            if (detail.grid.store.baseParams[this.masterId] && detail.grid.store.baseParams[this.masterId] == masterIdVal){
                detail.grid.store.reload();
            }else{
                detail.grid.store.baseParams[this.masterId] = masterIdVal;
                detail.grid.store.load();
            }
        }
    }
});