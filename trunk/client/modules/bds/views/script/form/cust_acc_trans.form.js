/**
 * @class Bds.form.cust_acc_trans
 * Form panel for table bds_cust_acc_trans
 *
 * @since 23-10-2012 12:07:20
 * @author Hilman Farid
 */
Bds.form.cust_acc_trans = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.cust_acc_trans.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
       
        this.fields.t_cust_acc_dtl_trans_id = new Ext.form.Hidden({fieldLabel: 'ID', name: 't_cust_acc_dtl_trans_id', allowBlank: true});
        this.fields.t_cust_account_id = new Ext.form.Hidden({fieldLabel: 'cust_account', name: 't_cust_account_id',readOnly:true, allowBlank: true});
        this.fields.npwd = new Ext.form.Hidden({fieldLabel: 'Cabang', name: 'npwd', allowBlank: false, width:120});
        this.fields.trans_date = new Ext.form.DateField({fieldLabel: 'Tanggal Transaksi', name: 'trans_date', allowBlank: true, format: 'd-m-Y'});
        this.fields.trans_date_txt = new Ext.form.Hidden({fieldLabel: 'Cabang', name: 'trans_date_txt', allowBlank: false, width:120});
        this.fields.bill_no = new Ext.form.TextField({fieldLabel: 'No Faktur', name: 'bill_no', allowBlank: false, width:120});
        this.fields.service_desc = new Ext.form.Hidden({fieldLabel: 'Deskripsi', name: 'service_desc', allowBlank: false, width:120});
        this.fields.service_charge = new Ext.form.TextField({fieldLabel: 'Nilai Transaksi', name: 'service_charge', allowBlank: false, width:120});
        this.fields.vat_charge = new Ext.form.Hidden({fieldLabel: 'Cabang', name: 'vat_charge', allowBlank: false, width:120});
        this.fields.description = new Ext.form.Hidden({fieldLabel: 'Cabang', name: 'description', allowBlank: false, width:120});
        this.fields.p_vat_type_dtl_id = new Ext.form.Hidden({fieldLabel: 'Cabang', name: 'p_vat_type_dtl_id', allowBlank: false, width:120});
        return [
            this.fields.t_cust_acc_dtl_trans_id,
            this.fields.t_cust_account_id,
            this.fields.npwd,
            this.fields.trans_date,
            this.fields.trans_date_txt,
            this.fields.bill_no,
            this.fields.service_desc,
            this.fields.service_charge,
            this.fields.vat_charge,
            this.fields.description,
            this.fields.p_vat_type_dtl_id
        ];
    },
    focusField: function(){
    	this.fields.trans_date.focus();
    },
    onUpdate : function(btn, ev) {
        this.fields.vat_charge.setValue(this.fields.service_charge.getValue()/10);
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
    }
});
