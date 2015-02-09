/**
 * @class Bds.module.t_message_inbox
 * Module panel for table t_message_inbox
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.t_message_inbox = Ext.extend(Webi.module.Panel, {
    addTitle: 'Tambah Data t_message_inbox',
    editTitle: 'Update Data t_message_inbox',
    winWidth:700,
    winHeight:400,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_message_inbox.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_message_inbox({border: false});
        this.initGridEvents();
        
        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_message_inbox();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_message_inbox', Bds.module.t_message_inbox);