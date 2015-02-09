/**
 * @class Bds.module.p_parameter
 * Module panel for table bds_p_parameter
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_parameter = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_parameter_addTitle,
    editTitle: Bds.properties.p_parameter_editTitle,
    winWidth:501,
    winHeight:217,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_parameter.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_parameter({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_parameter();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_p_parameter', Bds.module.p_parameter);