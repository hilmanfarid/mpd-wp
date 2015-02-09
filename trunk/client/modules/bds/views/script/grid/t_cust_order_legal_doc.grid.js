/**
 * @class Bds.grid.t_cust_order_legal_doc
 * Grid for table shop_t_cust_order_legal_doc
 *
 * @author Hilman
 * @since 10-05-2013 06:15:36
 */
Bds.grid.t_cust_order_legal_doc = Ext.extend(Webi.grid.GridPanel, {
    t_cust_order_legal_doc_type:'',
    viewConfig:{forceFit:false},
    initComponent : function() {
        this.store = new Bds.store.t_cust_order_legal_doc();
        if(!Ext.isEmpty(this.t_cust_order_legal_doc_type)){
            this.store.baseParams.t_cust_order_legal_doc_type=this.t_cust_order_legal_doc_type;
        }
        this.columns = [
            {header: "t_cust_order_legal_doc_id", hidden: true, sortable: true, dataIndex: 't_cust_order_legal_doc_id'},
			{header: "t_customer_order_id", hidden: true, sortable: true, dataIndex: 't_customer_order_id', width: 50},
			{header: "Jenis dokumen", hidden: false, sortable: true, dataIndex: 'p_legal_doc_type_id', width:134},
			{header: "Deskripsi", hidden: false, sortable: true, dataIndex: 'legal_doc_desc', width:134},
			{header: "Orign filename", hidden: false, sortable: true, dataIndex: 'origin_file_name', width: 127},
			{header: "File folder", hidden: false, sortable: true, dataIndex: 'file_folder', width: 127},
			{header: "Filename", hidden: false, sortable: true, dataIndex: 'file_name', width: 127},
        ];

        // super
        Bds.grid.t_cust_order_legal_doc.superclass.initComponent.call(this);
        
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
    getDefaultData: function(){
        var defaultData = {
			't_cust_order_legal_doc_id': '',
			't_customer_order_id': this.store.baseParams.t_customer_order_id || '',
			'p_legal_doc_type_id': '',
			'legal_doc_desc': '',
			'origin_file_name': '',
			'file_folder': '',
			'file_name': ''
        };
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
    
    onExcel: function(btn, ev) {
    	
    	var rec = this.getSelectionModel().getSelected();
    	
    	var url_print = 'index.php?module=rwnetshop&class=po_merchan_print&method=toExcel';
    	var po_id = this.store.baseParams.po_id;
    	var merchan_id = rec.get('merchan_id');
    	
    	var mchrpt_id = rec.get('mchrpt_id');
    	    	
    	url_print += '&po_id=' + po_id;
    	url_print += '&merchan_id=' + merchan_id;
    	url_print += '&mchrpt_id=' + mchrpt_id;
    	
    	location.href = url_print;
    },
    onSendMail: function(btn, ev) {
        
    	
    	var rec = this.getSelectionModel().getSelected();
    	if (Ext.isEmpty(rec.get('mchrpt_id'))){
    	    Ext.Msg.show({
                title:'Perhatian',
                msg: ('Bukti transfer dari PO tersebut belum dimasukan'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
                minWidth: 200
            });
    	    return false;
    	}
    	var url_print = 'index.php?module=rwnetshop&class=po_merchan_print&method=sendMail';
    	var po_id = this.store.baseParams.po_id;
    	var merchan_id = rec.get('merchan_id');
    	var mchrpt_id = rec.get('mchrpt_id');
    	
    	url_print += '&po_id=' + po_id;
    	url_print += '&merchan_id=' + merchan_id;
    	url_print += '&mchrpt_id=' + mchrpt_id;
    	
        var sendRequest = new Webi.Server;
        sendRequest.setURL(url_print);
        sendRequest.onFailure =function(response, options){
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Pengiriman Email Gagal'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
                minWidth: 200
            });
        }
        sendRequest.request();
    	
    }
});
Ext.reg('grid_t_cust_order_legal_doc', Bds.grid.t_cust_order_legal_doc);