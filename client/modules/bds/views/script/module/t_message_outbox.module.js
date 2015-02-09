/**
 * @class Bds.module.t_message_outbox
 * Module panel for table t_message_outbox
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.t_message_outbox = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data t_message_outbox',
    editTitle: 'Update Data t_message_outbox',
    winWidth:700,
    winHeight:400,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_message_outbox.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_message_outbox({border: false});
        this.initGridEvents();
        
        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_message_outbox();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_message_outbox', Bds.module.t_message_outbox);