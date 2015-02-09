/**
 * @class Bds.form.p_role_menu
 * Form panel for table core_p_role_menu
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_role_menu = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_role_menu.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
		
		this.fields.rolemenu_id = new Ext.form.Hidden({fieldLabel: Bds.properties.permission_id, name: 'rolemenu_id', allowBlank: true});
        this.fields.menu_id = new Ext.form.Hidden({fieldLabel: 'Menu ID', name: 'menu_id', allowBlank: false});
        
        this.fields.menu_level = new Ext.form.DisplayField({fieldLabel: 'Level Menu', name: 'menu_level', allowBlank: true});
        this.fields.rolemenu_status = new Bds.combo.YesNo({fieldLabel: 'Set Aktif?', name: 'rolemenu_status', allowBlank: true, width:100});
        
        return [
            this.fields.rolemenu_id,
			this.fields.menu_id,
			{xtype: 'displayfield', fieldLabel: 'Menu', name: 'menu_code'},
			this.fields.menu_level,
			this.fields.rolemenu_status
        ];
    },
    focusField: function(){
    	return true;
    },
    /**
     * buildUI
     * @private
     */
    buildUI: function(){
        this.btnUpdate = new Ext.Button({
        	itemId: 'btnUpdate',
            text: 'Set Menu',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this
        });
        
        this.btnCancel = new Ext.Button({
        	itemId: 'btnCancel',
            text: 'Tutup',
            iconCls: 'icon-closewin',
            handler: this.onCancel,
            scope: this
        });
        
        return [this.btnUpdate, this.btnCancel];
    },
    setButton: function(){
        // no need to set button for p_role_menu
	} 
});
