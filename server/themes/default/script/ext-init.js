Ext.namespace('Webi.fx', 'Webi.format', 'Webi.info');

Webi.TXT_PLEASEWAIT = 'Mohon Tunggu';
Webi.TXT_SAVING = 'Sedang menyimpan data...';

Ext.onReady(function(){
    Webi.info = function(){
        var msgCt;
        
        function createBox(t, s){
            return ['<div class="msg">',
                    '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                    '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3 style="border:none;">', t, '</h3>', s, '</div></div></div>',
                    '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                    '</div>'].join('');
        }
        return {
            msg : function(title, format){
                if(!msgCt){
                    msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
                }
                msgCt.alignTo(document, 't-t');
                var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
                var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
                m.slideIn('t').pause(1).ghost("t", {remove:true});
            },
            msgBoxWait: function(title, msg){
                Ext.MessageBox.show({
                        title : title,
                        msg : msg,
                        buttons: false,
                        closable:false,
                        wait:true,
                        modal:true,
                        minWidth: 300,
                        icon:'ext-mb-download'
                    });
            },
            msgBoxWaitHide: function(){
                Ext.MessageBox.updateProgress(1);
                Ext.MessageBox.hide();
            }
        }
    }();
	    
    Webi.fx = function(){
        return {
            fade: function(val, el){
                var ob = Ext.get(el);
                if (val){
                    if (!ob.isVisible()){
                        ob.fadeIn({useDisplay:true});
                    }
                }else{
                    if (ob.isVisible()){
                        ob.fadeOut({useDisplay:true});
                    }
                }
            },
            setRowBg: function(togle, rowid){
                var row = Ext.get(rowid);
                if (togle){
                    row.setStyle('background-color', '#E1FFE3');
                }else{
                    row.setStyle('background-color', '');
                }
            }
                        
        };
    }();

    Webi.format = function(){
        return {
            number: function(value){
                v = (Math.round((value-0)*100))/100;
                v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);

                v = String(v);
                var ps = v.split('.');
                var whole = ps[0];
                var sub = ps[1] ? ','+ ps[1] : ',00';
                var r = /(\d+)(\d{3})/;
                while (r.test(whole)) {
                    whole = whole.replace(r, '$1' + '.' + '$2');
                }
                v = whole + sub;
                if(v.charAt(0) == '-'){
                    return '-' + v.substr(1);
                }
                return "" +  v;
            },
            comboRenderer: function(combo){
                return function(value){
                            var record = combo.findRecord(combo.valueField, value);
                            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
                       }
            },
            dateRenderer: function(value, meta, record){
                meta.attr = 'style="text-align:center;"';
                var t = Ext.util.Format.date(value, 'd-m-Y');
                if (t == '31-10-1900') value = t = '';
                return t;
            },
            floatRenderer : function(value, meta, record){
                meta.attr = 'style="text-align:right;"';
                return Ext.util.Format.number(value, '0.000,00/i');
            },
            intRenderer: function(value, meta, record){
                meta.attr = 'style="text-align:right;"';
                return Ext.util.Format.number(value, '0.000/i');
            }
        };
    }();

    Ext.QuickTips.init();

    Ext.PagingToolbar.prototype.displayMsg = 'Menampilkan {0} s.d {1} dari {2} data';
    Ext.PagingToolbar.prototype.emptyMsg = 'Tidak ada data untuk ditampilkan';
    Ext.PagingToolbar.prototype.beforePageText = "Hal";
    Ext.PagingToolbar.prototype.afterPageText = "dari {0}";
    Ext.PagingToolbar.prototype.firstText = "Halaman Pertama";
    Ext.PagingToolbar.prototype.prevText = "Halaman Sebelumnya";
    Ext.PagingToolbar.prototype.nextText = "Halaman Selanjutnya";
    Ext.PagingToolbar.prototype.lastText = "Halaman Akhir";
    //Ext.PagingToolbar.prototype.displayInfo = true;
    
    Ext.grid.GridPanel.prototype.loadMask = true;
    
    Ext.form.Field.prototype.msgTarget = 'qtip';
});

Webi.Server = function(config){
    config = config || {};

    Ext.apply(this, config);
    this.addEvents(
        'beforerequest',
        'success',
        'failure'
    );
    Webi.Server.superclass.constructor.call(this);
};

Ext.extend(Webi.Server, Ext.util.Observable, {
    showProgress: true,
    progressTitle: "Mohon Tunggu",
    progressMsg: "Sedang memproses data...",
    showStatus: true,
    statusTitle: "Info Status",
    successMsg: "Data berhasil di proses",
    failureMsg: "Terjadi kesalahan pada operasi yang dilakukan",
    params: {},
    url: '',
    setParams: function(params){
        this.params = params;
        return this.params;
    },
    setParam: function(name, value){
        this.params[name] = value;
        return this.params;
    },
    getParams: function(){
        return this.params;
    },
    request: function(){
        if(this.fireEvent("beforerequest", this) !== false){
            if (this.showProgress == true){
                Ext.MessageBox.show({
                    msg: this.progressMsg,
                    progressText: this.progressTitle,
                    width:300,
                    wait:true,
                    scope: this,
                    modal: true
                });
            }

            Ext.Ajax.request({
               url: this.url,
               success: this.onSuccess,
               failure: this.onFailure,
               params: this.getParams(),
               scope: this
            });
        }
    },
    onSuccess: function(response, options){
        if (this.showProgress == true){
            Ext.MessageBox.hide();
        }

        try{
            var data = Ext.decode(response.responseText);

            if (data.success && data.success == true){
                if (this.showStatus == true){
                    Webi.info.msg(this.statusTitle, data.msg || this.successMsg);
                }
                
                this.fireEvent("success", this, data);
            }else{
                if (this.showStatus == true){
                    Ext.MessageBox.alert(this.statusTitle, data.msg || this.failureMsg);
                }
                
                this.fireEvent("failure", this, data);
            }
        }catch (e){
            if (e.name == 'SyntaxError'){
                this.onFailure(response, options);
            }else{
                throw e;
            }
        }
    },
    onFailure: function(response, options){
        if (this.showProgress == true){
            Ext.MessageBox.hide();
        }

        Ext.Msg.show({
            title:'Server Error',
            msg: ('Error Status : ' + response.statusText + '<br />Terjadi kesalahan pada operasi yang dilakukan, mohon hubungi administrator mengenai kesalahan ini'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR,
            minWidth: 200
        });
    },
    setURL: function(url){
        this.url= url;  
    }
});