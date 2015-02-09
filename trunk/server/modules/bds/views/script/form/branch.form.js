/**
 * @class Bds.form.branch
 * Form panel for table bds_branch
 *
 * @since 23-10-2012 12:07:20
 * @author Hilman Farid
 */
Bds.form.branch = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.branch.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.branch_id = new Ext.form.Hidden({fieldLabel: 'ID', name: 'branch_id', allowBlank: true});
        this.fields.branch_name = new Ext.form.TextField({fieldLabel: 'Cabang', name: 'branch_name', allowBlank: false, width:120});
        return [
            this.fields.branch_id,
			this.fields.branch_name
        ];
    },
    focusField: function(){
    	this.fields.branch_name.focus();
    }
});
