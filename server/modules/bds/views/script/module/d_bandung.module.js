/**
 * @class Bds.module.d_bandung
 * Module panel for table bds_d_bandung
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
Bds.module.d_bandung = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_bandung_addTitle,
    editTitle: Bds.properties.d_bandung_editTitle,
    winWidth:400,
    winHeight:429,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.d_bandung.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.panelbandung = new Bds.form.d_bandung();
        this.initPanelBandungEvents();

        return this.panelbandung;
    },
    buildForm : function(){
        this.form = new Bds.form.d_bandung();
		this.initFormEvents();
		
		
		return this.form;
    },
    initPanelBandungEvents: function(){
		// fire when user click add button on form
        this.panelbandung.on('create', this.onCreate, this);
		// fire when user click update button on form
        this.panelbandung.on('update', this.onUpdate, this);
        // fire when user click close/cancel button on form
        this.panelbandung.on('cancel', this.onCancel, this); 
        
        this.panelbandung.store.on('beforewrite', this.showActionProgress, this);
         
        this.panelbandung.store.on('write', this.hideActionProgress, this);

       // this.panelbandung.store.on('exception', this.onException, this);  
    },
    onCreate: function(form, rec, type){
        var doreq = this.fireEvent('beforecreate', this, form.store, form, rec, type);
        form.store.insert(0, rec);
        /*if (doreq !== false){
    		form.store.insert(0, rec);
    		if (!this.batchWrite){
    		    form.store.save();
    	    }else{
    	        if (this.grid.pagingTb) this.grid.pagingTb.updateInfo();
    	        this.form.loadRecord(new this.grid.store.recordType(this.grid.getDefaultData()), 'create');
    	    }
        }*/
	},
	showActionProgress: function(){
		this.panelbandung.el.mask(Webi.TXT_SAVING, 'x-mask-loading');      
    },
    hideActionProgress: function(store, action, result, res, rs){
    	    if (true){
        		/*this.panelbandung.statusbar.setStatus({
                    iconCls: 'x-status-saved',
                    text: 'Data berhasil ' + (action == 'create' ? 'disimpan' : 'disimpan')
                });*/
                
                Ext.Msg.alert('Status', 'Data Berhasil Disimpan.');
            }else{
        		/*this.panelbandung.statusbar.setStatus({
                    iconCls: 'x-status-error',
                    text: 'Terjadi kesalahan, mohon periksa kembali data anda'
                });*/
            }

    	this.panelbandung.el.unmask();
    }
});

Ext.reg('module_d_bandung', Bds.module.d_bandung);