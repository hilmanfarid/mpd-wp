/**
 * @class Bds.module.t_skpd_employee
 * Module panel for table bds_t_skpd_employee
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.module.t_skpd_employee = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_skpd_employee_addTitle,
    editTitle: Bds.properties.t_skpd_employee_editTitle,
    winWidth:517,
    winHeight:236,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_skpd_employee.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_skpd_employee({border: false});
        this.initGridEvents();

        return this.grid;
    },
    buildForm : function(){
        this.form = new Bds.form.t_skpd_employee();
		this.initFormEvents();
		
		
		return this.form;
    }
});

Ext.reg('module_t_skpd_employee', Bds.module.t_skpd_employee);