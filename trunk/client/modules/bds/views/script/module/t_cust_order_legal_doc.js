/**
 * @class Bds.module.t_cust_order_legal_doc
 * Module panel for table shop_t_cust_order_legal_doc
 */
Bds.module.t_cust_order_legal_doc = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_cust_order_legal_doc_addTitle,
    editTitle: Bds.properties.t_cust_order_legal_doc_editTitle,
    winWidth:600,
    winHeight:500,
    t_cust_order_legal_doc_type:'main',
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_cust_order_legal_doc.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_cust_order_legal_doc({border: false,t_cust_order_legal_doc_type:this.t_cust_order_legal_doc_type});
        this.initGridEvents();
         
        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_cust_order_legal_doc({t_cust_order_legal_doc_type:this.t_cust_order_legal_doc_type});
		this.initFormEvents();
		
		
		return this.form;
    },
    onWrite : function(store, action, result, res, rs){
        
    	this.hideActionProgress(action, true);
    	
    	if (this.win && this.win.isVisible()){
            this.win.hide();
        }
    },
    
    onCreate: function(form, rec, type){
        this.submitForm(form, rec, type);
	},
	onUpdate: function(form, rec, type){
	    if(Ext.isEmpty(rec.get('t_cust_order_legal_doc_image'))) {
	        this.submitForm(form, rec, 'create');    
	    }else {
	        this.submitForm(form, rec, 'update');
	    }
	},
	/*
	*/
	submitForm: function(form, rec, type){
        form.getForm().submit({
	        url: Webi.ROUTE_URL + '&class=t_cust_order_legal_doc&method=' + type,
	        waitMsg: 'Menyimpan data...',
	        params: {
    			items: Ext.encode(rec.data)
	        },
            success: function(form, action) {
                this.hideActionProgress(action.result.type, true);
                
                if (action.result.type == 'create'){
                    var r = new this.grid.store.recordType(action.result.items);
                    this.grid.store.insert(0, r);
                    this.grid.store.commitChanges();
                    this.grid.pagingTb.updateInfo();
                    this.form.loadRecord(new this.grid.store.recordType(this.grid.getDefaultData()), 'create');
                }else{
                    this.win.hide();
                    this.grid.store.reload();
                }
            },
            failure: function(form, action) {
            	
                this.hideActionProgress(action.result.type, false);
                switch (action.failureType) {
                     case Ext.form.Action.CLIENT_INVALID:
                         Ext.Msg.alert('Failure', 'Isian form masih belum benar');
                         break;
                     case Ext.form.Action.CONNECT_FAILURE:
                         Ext.Msg.alert('Failure', 'Komunikasi Ajax gagal. Mohon periksa koneksi jaringan anda');
                         break;
                     case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.message);
                       
                }
            },
            scope: this
	     });
	}
});

Ext.reg('module_t_cust_order_legal_doc', Bds.module.t_cust_order_legal_doc);