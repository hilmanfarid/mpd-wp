/**
 * @class Bds.module.p_school_type
 * Module panel for table bds_p_school_type
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_school_type = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_school_type_addTitle,
    editTitle: Bds.properties.p_school_type_editTitle,
    winWidth:501,
    winHeight:217,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_school_type.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_school_type({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_school_type();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_p_school_type', Bds.module.p_school_type);