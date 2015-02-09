/**
 * @class Bds.form.d_wisata
 * Form panel for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.form.pembayaran_bphtb = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    baseCls: 'x-plain',
    initComponent : function() {
        // super
        Bds.form.pembayaran_bphtb.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
                
        this.fields.bphtb_info = new Ext.form.TextArea({fieldLabel: 'Informasi BPHTB', name: 'bphtb_info', allowBlank: true,anchor:'95%',height:200,readOnly:true});
        this.fields.bphtb_amount = new Ext.form.Hidden({fieldLabel: 'Informasi BPHTB', name: 'bphtb_amount', allowBlank: true,anchor:'95%',height:200,readOnly:true});
        this.fields.bit48 = new Ext.form.Hidden({fieldLabel: 'Informasi BPHTB', name: 'bit48', allowBlank: true,anchor:'95%',height:200,readOnly:true});
        this.fields.no_registration = new Ext.form.Hidden({fieldLabel: 'Informasi BPHTB', name: 'no_registration', allowBlank: true,anchor:'95%',height:200,readOnly:true});
            return [
            this.fields.bphtb_amount,
            this.fields.bit48,
            this.fields.no_registration,
            this.fields.bphtb_info
        ];
    },
    focusField: function(){
    	this.fields.bphtb_info.focus();
    },
    onCreate : function(btn, ev) {
        var rec = this.getForm().getValues();
        this.getForm().submit({
	        url: Webi.ROUTE_URL + '&class=inquiry&method=execPembayaran',
	        waitMsg: 'Menyimpan data...',
	        params: {
    			items: Ext.encode(rec.data)
	        },
            success: function(form, action) {
                //var params='?user_name'+_UNAME;
                var params='?registration_no='+this.fields.no_registration.getValue();
                //this.hideActionProgress('create', true);
                /*var message = action.result.items.o_ret_code;
                message=message.split('|');
                Ext.Msg.show({
                        title:'Informasi',
                        msg: (action.result.items.o_ret_code),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO,
                        minWidth: 200
                    });*/
                window.open("http://172.16.20.2:81/mpd/report/cetak_duplikat_kwitansi_bphtb.php"+params, "_blank", "toolbar=0,location=0,menubar=0");
                //location.href="172.16.20.2/mpd/report/cetak_duplikat_kwitansi_bphtb.php"+params;
            },
            failure: function(form, action) {
                //this.hideActionProgress('create', false);
                var message = action.result.message;
                    Ext.Msg.show({
                        title:'Perhatian',
                        msg: (message.o_ret_code),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR,
                        minWidth: 200
                    });
            },
            scope: this
	     });
    }
});
