/**
 * @class Bds.form.d_wisata
 * Form panel for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 */
Bds.form.send_message = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    baseCls: 'x-plain',
    initComponent : function() {
        // super
        Bds.form.send_message.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.message_type = new Bds.combo.p_message_type({fieldLabel: 'Jenis Pesan', name: 'p_message_type_id', allowBlank: true});
        this.fields.message_body = new Ext.form.HtmlEditor({fieldLabel: 'Isi', name: 'message_body', allowBlank: true,anchor:'100%',height:'100%'});    
        return [
            this.fields.message_type,
            this.fields.message_body
        ];
    },
    focusField: function(){
    	this.fields.no_registration.focus();
    },
    onCreate : function(btn, ev) {
        var sendRequest = new Webi.Server;
        sendRequest.successMsg = 'Pesan Sudah Terkirim';
        sendRequest.showStatus=true;
        var param={};
        param.p_message_type_id=this.fields.message_type.getValue();
        param.message_body =this.fields.message_body.getValue();
        sendRequest.setParam('items',Ext.encode(param));
        sendRequest.setURL('ws.php?type=json&module=bds&class=t_message_outbox&method=create');
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
    onCancel : function(btn, ev){
        var thisForm=this;

        var sendRequest = new Webi.Server;
        var param='&no_registration='+this.fields.no_registration.getValue();
        param+='&getAll=Y';
        sendRequest.showStatus=false;
        sendRequest.setURL('ws.php?type=json&module=bds&class=send_message&method=read'+param);
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
                    var arr_items=[];
        		    var arr_isi=[];
        		    var arr_table=[]
        		    arr_items = data.items.o_ret_code.split('@');
        		    arr_isi=arr_items[0].split('|');
        		    arr_table = arr_items[1].split('|');
        		    var theTable='<table style="font-size:12px;">';
        		    for (i = 0; i < arr_table.length; i++) {
        		    	var tabContent=arr_table[i].split(':');
        		    	theTable+='<tr><td>'+tabContent[0]+'</td><td>: '+tabContent[1]+'</td></tr>';
        		    }
        		    theTable+='</table>';
                    Ext.Msg.show({
                       title:'Anda yakin untuk melakukan cancel pada transaksi ini?',
                       msg: theTable,
                       buttons: Ext.Msg.YESNO,
                       fn: function(id,text,opt){
                            if(id=='yes'){
                                thisForm.sendCancel();
                            }             
                       },
                       animEl: 'elId',
                       icon: Ext.MessageBox.QUESTION
                    });
                    this.fireEvent("success", this, data);
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
        return [this.btnSave];
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
