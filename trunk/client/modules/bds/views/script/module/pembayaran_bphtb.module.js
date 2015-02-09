/**
 * @class Bds.module.pembayaran_bphtb
 * Module panel for table bds_pembayaran_bphtb
 */
Bds.module.pembayaran_bphtb = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.d_skpd_addTitle,
    editTitle: Bds.properties.d_skpd_editTitle,
    winWidth:469,
    winHeight:371,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.pembayaran_bphtb.superclass.initComponent.call(this);
    },
    buildPanel : function(){
		this.form = new Bds.form.pembayaran_bphtb();
		this.form.btnSave.text='Bayar';
		this.form.disable();
		this.form.btnCancel.on('click',function(){
		    this.form.fields.bphtb_info.setValue('');
		    this.form.disable();
		},this);
		this.form2 = new Bds.form.inquiry();
		this.form2.btnCancel.text="Cancel Pembayaran BPHTB";
		if(_GNAME=='administrator'||_GNAME=='supervisor'){
    		this.form2.btnCancel.show();
    	}else{
    	    this.form2.btnCancel.hide();
    	}
		this.form2.btnSave.text='Inquiry';
		this.form2.on('enabledetail',function(data){
		    var arr_items=[];
		    var arr_isi=[];
		    arr_items = data.items.o_ret_code.split('@');
		    arr_isi=arr_items[0].split('|');
		    this.form.fields.bphtb_amount.setValue(arr_isi[7]);
		    this.form.fields.bit48.setValue(arr_items[0]);
		    this.form.fields.bphtb_info.setValue(arr_items[1].replace(/\|/g,'\n'));
		    this.form.fields.no_registration.setValue(this.form2.fields.no_registration.getValue());
		    this.form.enable();
		},this);
		return {
		    xtype: 'panel',
		    layout: 'border',
		    border: false,
		    style : 'background-color: #DFE8F6',
		    items : [
		        {
		            region: 'center',
		            margins: '1 1 0 1',
		            layout: 'fit',
		            minHeight: 110,
		            items: this.form2
		        },
		        {
		            region: 'south',
		            margins: '0 1 1 1',
		            cmargins: '1 1 1 1',
		            height: 400,
		            minHeight: 110,
		            split: true,
		            collapsible: true,
		            collapseMode: 'mini',
		            hideCollapseTool: true,
		            layout: 'fit',
		            items: this.form
		        }
		    ]
		};
    },
    buildForm : function(){
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_pembayaran_bphtb', Bds.module.pembayaran_bphtb);