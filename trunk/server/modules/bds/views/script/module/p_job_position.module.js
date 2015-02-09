/**
 * @class Bds.module.p_job_position
 * Module panel for table bds_p_job_position
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.module.p_job_position = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.p_job_position_addTitle,
    editTitle: Bds.properties.p_job_position_editTitle,
    winWidth:559,
    winHeight:250,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.p_job_position.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.p_job_position({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.p_job_position();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_p_job_position', Bds.module.p_job_position);