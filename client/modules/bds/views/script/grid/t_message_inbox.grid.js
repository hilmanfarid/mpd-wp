/**
 * @class Bds.grid.t_message_inbox
 * Grid for table bds_t_message_inbox
 *
 * @author Hilman Farid
 * @since 23-10-2012 12:07:20
 */
Bds.grid.t_message_inbox = Ext.extend(Webi.grid.GridPanel, {
    viewConfig:{forceFit:true},
    initComponent : function() {
        this.store = new Bds.store.t_message_inbox();
        this.columns = [
            {header: 'Jenis Pesan', hidden: false, sortable: true, dataIndex: 'message_type', width: 20},
            {header: 'Terkirim',align:'left', hidden: false, sortable: true, dataIndex: 'creation_date', width: 20, renderer:function(value, meta, record){
                meta.attr = 'style="text-align:left;"';
                var t = Ext.util.Format.date(value, 'd-m-Y');
                var dt = new Date();
                if (t == '31-10-1900') value = t = '';
                if(dt.format('d-m-Y') == t){
                    var tm = new Date(record.get('creation_time'));
                    return record.get('creation_time');
                    //return Ext.util.Format.date(record.get('creation_time'), 'Y-m-d h:i:s A');
                }
                return t;
                }
            },
            {header: 'Status', hidden: false, sortable: true, dataIndex: 'message_status', width: 20},
            {header: 'isi', hidden: true, sortable: true, dataIndex: 'message_body'},
        ];
        // super
        Bds.grid.t_message_inbox.superclass.initComponent.call(this);
    },
    getDefaultData: function(){
        var defaultData = {
			't_message_outbox_id': '',
            'p_message_type_id'  : '',
            't_cust_account_id'  : '',
            'message_status'     : '',
            'message_body'       : '',
            'p_app_role_id_to'   : '',
            'closing_date'       : '',
            'closed_by'          : ''
        };
        return defaultData;
    }
});
Ext.reg('grid_t_message_inbox', Bds.grid.t_message_inbox);