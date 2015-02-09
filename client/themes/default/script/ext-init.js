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
                if(Ext.isEmpty(value)){
                    value=0;
                }
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
/**
 * Copyright(c) 2011
 *
 * Licensed under the terms of the Open Source LGPL 3.0
 * http://www.gnu.org/licenses/lgpl.html
 * @author Greivin Britton, brittongr@gmail.com
 *     
 * @changes
 * No currency symbol by default    
 * No decimalPrecision in config
 * Supporting any character as thousand separator
 * Improved 
 
 * Removed unnecessary code to create format template, now using float.toFixed(this.decimalPrecission)    
 */
	
Ext.ux.NumericField = function(config){
	var defaultConfig = 
    {
		style: 'text-align:right;'
    };
    
    Ext.ux.NumericField.superclass.constructor.call(this, Ext.apply(defaultConfig, config));

    //Only if thousandSeparator doesn't exists is assigned when using decimalSeparator as the same as thousandSeparator
	if(this.useThousandSeparator && this.decimalSeparator == ',' && Ext.isEmpty(config.thousandSeparator))
		this.thousandSeparator = '.';
	else
		if(this.allowDecimals && this.thousandSeparator == '.' && Ext.isEmpty(config.decimalSeparator))
			this.decimalSeparator = ',';
		
    this.onFocus = this.onFocus.createSequence(this.onFocus);
};

Ext.extend(Ext.ux.NumericField, Ext.form.NumberField, 
{
    currencySymbol: null,
	useThousandSeparator: true,
	thousandSeparator: ',',
	alwaysDisplayDecimals: true,
	setValue: function(v){
	   Ext.ux.NumericField.superclass.setValue.call(this, v);
       
	   this.setRawValue(this.getFormattedValue(this.getValue()));
    },
	/**
	 * No more using Ext.util.Format.number, Ext.util.Format.number in ExtJS versions
	 * less thant 4.0 doesn't allow to use a different thousand separator than "," or "."
	 * @param {Number} v
	 */
    getFormattedValue: function(v){
       
		if (Ext.isEmpty(v) || !this.hasFormat()) 
            return v;
	    else 
        {
			var neg = null;
			
			v = (neg = v < 0) ? v * -1 : v;	
			v = this.allowDecimals && this.alwaysDisplayDecimals ? v.toFixed(this.decimalPrecision) : v;
			
			if(this.useThousandSeparator)
			{
				if(this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator))
					throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
				
				if(this.thousandSeparator == this.decimalSeparator)
					throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
				
				var v = String(v);
		
				var ps = v.split('.');
                ps[1] = ps[1] ? ps[1] : null;
                
                var whole = ps[0];
                
                var r = /(\d+)(\d{3})/;

				var ts = this.thousandSeparator;
				
                while (r.test(whole)) 
                    whole = whole.replace(r, '$1' + ts + '$2');
            
			    v = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
			}
			
			return String.format('{0}{1}{2}', (neg ? '-' : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + ' '), v);
        }
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function(v){
		//Replace the currency symbol and thousand separator
        return Ext.ux.NumericField.superclass.parseValue.call(this, this.removeFormat(v));
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} v
     */
    removeFormat: function(v){
        if (Ext.isEmpty(v) || !this.hasFormat()) 
            return v;
        else 
        {
			v = v.replace(this.currencySymbol + ' ', '');
			
			v = this.useThousandSeparator ? v.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : v;
			//v = this.allowDecimals && this.decimalPrecision > 0 ? v.replace(this.decimalSeparator, '.') : v;
			
            return v;
        }
    },
    /**
     * Remove the format before validating the the value.
     * @param {Number} v
     */
    getErrors: function(v){
        return Ext.ux.NumericField.superclass.getErrors.call(this, this.removeFormat(v));
    },
	hasFormat: function()
	{
		return this.decimalSeparator != '.' || this.useThousandSeparator == true || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;	
	},
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function(){
		this.setRawValue(this.removeFormat(this.getRawValue()));
    }
});
Ext.reg('numericfield', Ext.ux.NumericField);