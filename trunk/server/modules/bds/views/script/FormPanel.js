Ext.namespace('Webi.form');

/**
 * @class Webi.form.FormPanel
 * A typical FormPanel extension
 */
Webi.form.FormPanel = Ext.extend(Ext.form.FormPanel, {
    defaultType: 'textfield',
    baseCls: 'x-plain',
    buttonAlign: 'center',
    // private A pointer to the currently loaded record
    record: null,
    actionType : '',
    autoScroll : true,
    bodyStyle:'padding:5px;',
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // build the form-fields.  Always a good idea to defer form-building to a method so that this class can
        // be over-ridden to provide different form-fields
        this.items = this.buildForm();

        // build form-buttons
        this.buttons = this.buildUI();

        // add a create event for convenience in our application-code.
        this.addEvents({
            /**
             * @event create
             * Fires when user clicks [add] button
             * @param {FormPanel} this
             * @param {Object} values, the Form's values object
             */
            create : true,
            /**
             * @event update
             * Fires when user clicks [update] button
             * @param {FormPanel} this
             * @param {Object} values, the Form's values object
             */
            update : true,
            /**
             * @event cancel
             * Fires when user clicks [cancel] button
             * @param {FormPanel} this
             */
            cancel : true,
            /**
             * @event loadrecord
             * Fires when loadRecord
             * @param {FormPanel} this
             */
             loadrecord: true,
             
             beforecreate: true,
             beforeupdate: true
        });

        // super
        Webi.form.FormPanel.superclass.initComponent.call(this);
        
        if (this.actionType != '') this.setButton();
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        return [];
    },

    /**
     * buildUI
     * @private
     */
    buildUI: function(){
        this.btnSave = new Ext.Button({
        	itemId: 'btnSave',
            text: 'Simpan',
            iconCls: 'icon-save',
            handler: this.onCreate,
            scope: this
        });
        
        this.btnUpdate = new Ext.Button({
        	itemId: 'btnUpdate',
            text: 'Update',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this,
            hidden: true
        });
        
        this.btnCancel = new Ext.Button({
        	itemId: 'btnCancel',
            text: 'Tutup',
            iconCls: 'icon-closewin',
            handler: this.onCancel,
            scope: this
        });
        
        return [this.btnSave, this.btnUpdate, this.btnCancel];
    },
    /**
     * loadRecord
     * @param {Record} rec
     */
    loadRecord : function(rec, type) {
        this.record = rec;

		if (this.actionType != type){
        	this.actionType = type;
        	this.setButton();
		}

        this.getForm().loadRecord(rec);
        this.fireEvent('loadrecord', this, rec, type);
        this.getForm().clearInvalid();
	    this.focusField();
    },
	setButton: function(){
		if (this.actionType == 'create'){
            this.btnSave.setVisible(true);
            this.btnUpdate.setVisible(false);
		}else{
            this.btnSave.setVisible(false);
            this.btnUpdate.setVisible(true);
		}
	},
    /**
     * onCreate
     */
    onCreate : function(btn, ev) {
        if (!this.getForm().isValid()) {
            Ext.MessageBox.alert("Perhatian", "Data yang anda masukan belum benar. Mohon periksa kembali");
            return false;
        }
        var doreq = this.fireEvent('beforecreate', this, btn, ev);
        
        if (doreq !== false){
            this.getForm().updateRecord(this.record);
            this.fireEvent('create', this, this.record, this.actionType);
        }
    },
    /**
     * onUpdate
     */
    onUpdate : function(btn, ev) {
        
        if (this.record == null) {
            return;
        }
        if (!this.getForm().isValid()) {
            Ext.MessageBox.alert("Perhatian", "Data yang anda masukan belum benar. Mohon periksa kembali");
            return false;
        }
        
        var doreq = this.fireEvent('beforeupdate', this, btn, ev);

        if (doreq !== false){
            this.getForm().updateRecord(this.record);
            this.fireEvent('update', this, this.record, this.actionType);
        }
    },
    /**
     * onCancel
     */
    onCancel : function(btn, ev){
        this.fireEvent('cancel', this, btn, ev);
    },
    reset: function(){
        this.getForm().reset();
        this.record = null;
        this.actionType = '';
    }
});

/**
 * @class Webi.WinForm
 * A typical WinFormPanel extension
 */
Webi.WinForm = Ext.extend(Ext.Window, {
	layout:'fit',
	minWidth: 300,
    minHeight: 200,
    closeAction:'hide',
    closable: false,
    modal: true,
    
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        this.statusbar = new Ext.ux.StatusBar({
            defaultText: '&nbsp;',
            busyText : Webi.TXT_SAVING,
            busyIconCls : 'x-status-saving'
        });
        
        this.bbar = this.statusbar;

        // super
        Webi.WinForm.superclass.initComponent.call(this);
        
        this.on('beforehide', function(){
            this.statusbar.clearStatus({useDefaults: true});
        }, this);
    }
});