Ext.namespace('Webi.grid');

/**
 * TableEditor Grid
 */
Webi.grid.GridPanel = Ext.extend(Ext.grid.GridPanel, {
    width: 600,
    height: 400,
    pageSize: 50,
    viewConfig: {
        forceFit: true
    },
    usePaging: true, 
    enableAdd: true,
    enableEdit: true,
    enableDelete: true,
    initComponent : function() {
        // relay the Store's CRUD events into this grid so these events can be conveniently listened-to in our application-code.
        this.relayEvents(this.store, ['destroy', 'save', 'update']);

        // build toolbars and buttons.
        this.tbar = this.buildTopToolbar();
        this.bbar = this.buildBottomToolbar();

         // add a create event for convenience in our application-code.
        this.addEvents({
            /**
             * @event new
             * Fires when user clicks [add] button
             * @param {GridPanel} this
             */
            'new' : true,
            /**
             * @event modify
             * Fires when user clicks [edit] button
             * @param {GridPanel} this
             */
            'modify' : true,
            /**
             * @event beforenew
             * Fires before user clicks [add] button
             * @param {GridPanel} this
             */
            'beforenew' : true,
            /**
             * @event beforemodify
             * Fires before user clicks [edit] button
             * @param {GridPanel} this
             */
            'beforemodify' : true,
            'delete': true
        });

        // super
        Webi.grid.GridPanel.superclass.initComponent.call(this);

            this.on('celldblclick', function(grid, rowIndex, columnIndex, e){
                if (this.enableEdit === true){
                    this.onModify(this.getTopToolbar().getComponent('btnEdit'), e);
                }
            }, this);

        this.getSelectionModel().on('rowselect', function(sm, row, rec){
            if (this.enableEdit === true){
            	var btnEdit = this.getTopToolbar().getComponent('btnEdit');    
                if (btnEdit && btnEdit.disabled) btnEdit.enable();
            }
            
            if (this.enableDelete === true){
    			var btnDelete = this.getTopToolbar().getComponent('btnDelete');
                if (btnDelete && btnDelete.disabled) btnDelete.enable();
            }
        }, this);
    },
    /**
     * getDefaultData
     */
    getDefaultData: function(){
        var defaultData = {};
        return defaultData;
    }, 
    /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        var buttons = [];
        
        if (this.enableAdd === true){
            buttons.push({
                itemId: 'btnNew',
                text: 'Tambah',
                iconCls: 'icon-add',
                handler: this.onNew,
                scope: this
            });
        }

        if (this.enableEdit === true){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'icon-edit',
                handler: this.onModify,
                disabled: true,
                scope: this
            });
        }
        
        if (this.enableDelete === true){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                disabled: true,
                scope: this
            });
        }        

        if (this.usePaging === false){
            if (buttons.length > 1) buttons.push('-');
            buttons.push({
                itemId: 'btnReload',
                text: 'Reload',
                iconCls: 'x-tbar-loading',
                handler: function(){
                    this.store.reload();
                },
                scope: this
            });
        }
        
        return buttons;
    },
    /**
     * buildBottomToolbar
     */
    buildBottomToolbar : function() {
        if (this.usePaging){
    	    this.pagingTb = new Ext.PagingToolbar({pageSize: this.pageSize, store: this.store, displayInfo: true});
            return this.pagingTb;
        }
        return;
    },
    /**
     * onNew
     */
    onNew : function(btn, ev) {
        var doreq = this.fireEvent('beforenew', this, btn, ev);
        
        if (doreq !== false){
            var rec = new this.store.recordType(this.getDefaultData());
            this.fireEvent('new', this, rec, btn, ev);
        }
    },
    /**
     * onNew
     */
    onModify : function(btn, ev) {
        var rec = this.getSelectionModel().getSelected();
        
        if (!rec) {
            return false;
        }

        var doreq = this.fireEvent('beforemodify', this, rec, btn, ev);
        
        if (doreq !== false){
            this.fireEvent('modify', this, rec, btn, ev);
        }
    },
    /**
     * onDelete
     */
    onDelete : function(btn, ev) {
        var records = this.getSelectionModel().getSelections();
        if (records.length < 1) {
            return false;
        }
        Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin akan menghapus data tersebut?', function(btn){
            if (btn != 'yes') return;
            this.deleteRecords(records);
        }, this);
    },
    /**
     * delete
     */    
    deleteRecords : function(records){
        for (var i in records){
            this.store.remove(records[i]);
        }
        this.fireEvent('delete', this, this.store, records);
    }
});