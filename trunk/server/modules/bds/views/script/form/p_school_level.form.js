/**
 * @class Bds.form.p_school_level
 * Form panel for table bds_p_school_level
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_school_level = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_school_level.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.p_school_level_id = new Ext.form.Hidden({fieldLabel: Bds.properties.p_school_level_id, name: 'p_school_level_id', allowBlank: true});

        this.fields.p_school_level_code = new Ext.form.TextField({fieldLabel: Bds.properties.p_school_level_code, name: 'code', allowBlank: false, width: 245});

        this.fields.p_school_level_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.p_school_level_listing_no, name: 'listing_no', allowBlank: false, allowDecimals: false, allowNegative: false, width:50});

        this.fields.p_school_level_description = new Ext.form.TextField({fieldLabel: Bds.properties.p_school_level_description, name: 'description', allowBlank: true, anchor:'95%'});

        return [
            this.fields.p_school_level_id,
			this.fields.p_school_level_code,
			this.fields.p_school_level_listing_no,
			this.fields.p_school_level_description
        ];
    },
    focusField: function(){
    	this.fields.code.focus();
    }
});
