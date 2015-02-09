/**
 * @class Bds.module.p_global_param
 * Module panel for table bds_p_global_param
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_global_param = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_global_param_addTitle,
    editTitle: Bds.properties.p_global_param_editTitle,
    winWidth:442,
    winHeight:307,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_global_param.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_global_param({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_global_param();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_p_global_param', Bds.module.p_global_param);