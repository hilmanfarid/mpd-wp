/**
 * @class Bds.form.p_school_type
 * Form panel for table bds_p_school_type
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_school_type = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_school_type.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.p_school_type_id = new Ext.form.Hidden({fieldLabel: Bds.properties.p_school_type_id, name: 'p_school_type_id', allowBlank: true});

        this.fields.p_school_type_level_id = new Ext.form.Hidden({fieldLabel: Bds.properties.p_school_type_level_id, name: 'level_id', allowBlank: true});

        this.fields.p_school_type_code = new Ext.form.TextField({fieldLabel: Bds.properties.p_school_type_code, name: 'code', allowBlank: false, width:150});

        this.fields.p_school_type_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.p_school_type_listing_no, name: 'listing_no', allowBlank: true, allowDecimals: false, allowNegative: false, width:50});

        this.fields.p_school_type_description = new Ext.form.TextField({fieldLabel: Bds.properties.p_school_type_description, name: 'description', allowBlank: true, anchor: '95%'});

        return [
            this.fields.p_school_type_id,
			this.fields.p_school_type_level_id,
			this.fields.p_school_type_code,
			this.fields.p_school_type_listing_no,
			this.fields.p_school_type_description
			
        ];
    },
    focusField: function(){
    	this.fields.ptype_id.focus();
    }
});
