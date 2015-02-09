/**
 * @class Bds.form.d_wisata
 * Form panel for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 */
Bds.form.t_message_inbox = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    baseCls: 'x-plain',
    initComponent : function() {
        // super
        Bds.form.t_message_inbox.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.t_message_inbox_id = new Ext.form.Hidden({fieldLabel: 'Isi', name: 't_message_inbox_id',readOnly:true, allowBlank: true,anchor:'100%',height:'100%'});    
        this.fields.message_type = new Bds.combo.p_message_type({fieldLabel: 'Jenis Pesan', name: 'message_type',readOnly:true, allowBlank: true});
        this.fields.message_body = new Ext.form.HtmlEditor({fieldLabel: 'Isi', name: 'message_body',readOnly:true, allowBlank: true,anchor:'100%',height:'100%'});    
        this.on('loadrecord',function(){
            var sendRequest = new Webi.Server;
            params={}
            params.t_message_inbox_id=this.fields.t_message_inbox_id.getValue();
            params.message_status = 'V';
            sendRequest.showStatus=false;
            sendRequest.setURL('ws.php?type=json&module=bds&class=t_message_inbox&method=update');
            sendRequest.setParam('items',Ext.encode(params));
            sendRequest.onFailure =function(response, options){
                Ext.Msg.show({
                    title:'Perhatian',
                    msg: ('Pengiriman send_message Gagal'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR,
                    minWidth: 200
                });
            }
            this.fireEvent('create', this, this.record, this.actionType);
            var thisForm=this;
            sendRequest.onSuccess= function(response, options){
                if (this.showProgress == true){
                    Ext.MessageBox.hide();
                }
                try{
                    var data = Ext.decode(response.responseText);
                    
                    if (data.success && data.success == true){
                        if (this.showStatus == true){
                            Webi.info.msg(this.statusTitle, data.msg || this.successMsg);
                        }
                        //thisForm.fireEvent('enabledetail',data);
                        this.fireEvent("success", this, data);
                    }else{
                        if (this.showStatus == true){
                            Ext.MessageBox.alert(this.statusTitle, data.msg || this.failureMsg);
                        }
                        //Ext.MessageBox.alert("Pengiriman send_message Gagal",data.items.o_ret_code);
                        this.fireEvent("failure", this, data);
                    }
                }catch (e){
                    if (e.name == 'SyntaxError'){
                        this.onFailure(response, options);
                    }else{
                        throw e;
                    }
                }
            }
            sendRequest.request();    
        },this);
        return [
            this.fields.t_message_inbox_id,
            this.fields.message_type,
            this.fields.message_body
        ];
    },
    focusField: function(){
    	this.fields.message_type.focus();
    },
    onCreate : function(btn, ev) {
        var sendRequest = new Webi.Server;
        sendRequest.showStatus=false;
        var param={};
        param.p_message_type_id=this.fields.message_type.getValue();
        param.message_body =this.fields.message_body.getValue();
        sendRequest.setParam('items',Ext.encode(param));
        sendRequest.setURL('ws.php?type=json&module=bds&class=t_message_inbox&method=update');
        sendRequest.onFailure =function(response, options){
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Pengiriman send_message Gagal'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
                minWidth: 200
            });
        }
        this.fireEvent('create', this, this.record, this.actionType);
        var thisForm=this;
        sendRequest.onSuccess= function(response, options){
            if (this.showProgress == true){
                Ext.MessageBox.hide();
            }
            try{
                var data = Ext.decode(response.responseText);
                
                if (data.success && data.success == true){
                    if (this.showStatus == true){
                        Webi.info.msg(this.statusTitle, data.msg || this.successMsg);
                    }
                    thisForm.fireEvent('enabledetail',data);
                    this.fireEvent("success", this, data);
                    Ext.getCmp('doc-body').remove(Ext.getCmp('module-send_message'));
                }else{
                    if (this.showStatus == true){
                        Ext.MessageBox.alert(this.statusTitle, data.msg || this.failureMsg);
                    }
                    Ext.MessageBox.alert("Pengiriman send_message Gagal",data.items.o_ret_code);
                    this.fireEvent("failure", this, data);
                }
            }catch (e){
                if (e.name == 'SyntaxError'){
                    this.onFailure(response, options);
                }else{
                    throw e;
                }
            }
        }
        sendRequest.request();
    },
    sendCancel : function(){
        var sendRequest = new Webi.Server;
        var param='&no_registration='+this.fields.no_registration.getValue();
        sendRequest.showStatus=false;
        sendRequest.setURL('ws.php?type=json&module=bds&class=send_message&method=cancelPembayaran'+param);
        sendRequest.onFailure =function(response, options){
            Ext.Msg.show({
                title:'Perhatian',
                msg: ('Pengiriman send_message Gagal'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
                minWidth: 200
            });
        }
        var thisForm=this;
        sendRequest.onSuccess= function(response, options){
            if (this.showProgress == true){
                Ext.MessageBox.hide();
            }
            try{
                var data = Ext.decode(response.responseText);
                
                if (data.success && data.success == true){
                    if (this.showStatus == true){
                        Webi.info.msg(this.statusTitle, data.msg || this.successMsg);
                    }
                    
                    Ext.MessageBox.alert("Informasi",data.items.f_manual_reversal);
                }else{
                    if (this.showStatus == true){
                        Ext.MessageBox.alert(this.statusTitle, data.msg || this.failureMsg);
                    }
                    Ext.MessageBox.alert("Pengiriman send_message Gagal",data.items.f_manual_reversal);
                    this.fireEvent("failure", this, data);
                }
            }catch (e){
                if (e.name == 'SyntaxError'){
                    this.onFailure(response, options);
                }else{
                    throw e;
                }
            }
        }
        sendRequest.request();
    },
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
        this.btnPrint = new Ext.Button({
        	itemId: 'btnPrintBphtb',
            text: 'Print Laporan',
            iconCls: '',
            handler: this.onPrint,
            scope: this
        });
        this.btnPrint2 = new Ext.Button({
        	itemId: 'btnPrintBphtbExcel',
            text: 'Print Laporan Excel',
            iconCls: '',
            handler: this.onPrintExcel,
            scope: this
        });
        this.cetakUlang = new Ext.Button({
        	itemId: 'cetakUlang',
            text: 'Cetak Ulang Kwitansi',
            iconCls: '',
            handler: this.onCetakUlang,
            scope: this
        });
        return [this.btnCancel];
    },
    onCetakUlang : function(){
        var params='?registration_no='+this.fields.no_registration.getValue();
        window.open("http://172.16.20.2:81/mpd/report/cetak_duplikat_kwitansi_bphtb.php"+params, "_blank", "toolbar=0,location=0,menubar=0");
    },
    onPrint : function(){
        var params='?uid='+_UNAME;    
        window.open("http://172.16.20.2:81/mpd/trans/t_laporan_penerimaan_bphtb_teller.php"+params, "_blank", "toolbar=0,location=0,menubar=0");
    },
    onPrintExcel : function(){
        var params='?uid='+_UNAME+'&report_type=excel';    
        window.open("http://172.16.20.2:81/mpd/trans/t_laporan_penerimaan_bphtb_teller.php"+params, "_blank", "toolbar=0,location=0,menubar=0");
    }
});
