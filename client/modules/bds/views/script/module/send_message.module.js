/**
 * @class Bds.module.send_message
 * Module panel for table bds_send_message
 */
Bds.module.send_message = Ext.extend(Webi.module.Panel, {
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
        Bds.module.send_message.superclass.initComponent.call(this);
    },
    buildPanel : function(){
		this.form = new Bds.form.send_message();
		this.form.btnSave.text='Kirim Pesan';
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

Ext.reg('module_send_message', Bds.module.send_message);