/**
 * @class Bds.form.p_parameter_type
 * Form panel for table bds_p_parameter_type
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_parameter_type = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_parameter_type.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.ptype_id = new Ext.form.Hidden({fieldLabel: Bds.properties.ptype_id, name: 'ptype_id', allowBlank: true});

        this.fields.ptype_code = new Ext.form.TextField({fieldLabel: Bds.properties.ptype_code, name: 'ptype_code', allowBlank: false, width: 245});

        this.fields.ptype_listing_no = new Ext.form.NumberField({fieldLabel: Bds.properties.ptype_listing_no, name: 'ptype_listing_no', allowBlank: false, allowDecimals: false, allowNegative: false, width:50});

        
        this.fields.ptype_description = new Ext.form.TextField({fieldLabel: Bds.properties.ptype_description, name: 'ptype_description', allowBlank: true, anchor:'95%'});

        /*this.fields.ptype_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.ptype_creation_date, name: 'ptype_creation_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.ptype_creation_by = new Ext.form.TextField({fieldLabel: Bds.properties.ptype_creation_by, name: 'ptype_creation_by', allowBlank: true, width: 245});

        this.fields.ptype_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.ptype_updated_date, name: 'ptype_updated_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.ptype_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.ptype_updated_by, name: 'ptype_updated_by', allowBlank: true, width: 245});
        
        this.details_p_parameter = new Bds.module.p_parameter({batchWrite: true, height:215});
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'create'){
                this.details_p_parameter.setBatchWriteMode(true);
                this.details_p_parameter.grid.store.baseParams.ptype_id = '';
                this.details_p_parameter.grid.store.loadData({items:[], total: 0}, false);
                this.details_p_parameter.grid.pagingTb.updateInfo();
            }else{
                this.details_p_parameter.setBatchWriteMode(false);
                this.details_p_parameter.grid.store.baseParams.ptype_id = record.get('ptype_id');
                this.details_p_parameter.grid.store.load();
            }
        }, this);*/
        
        this.fields.ptype_code.on('change', function(field,newVal,oldVal){
            this.fields.ptype_code.setValue( newVal.toUpperCase() );
        }, this);
        
        return [
            this.fields.ptype_id,
			this.fields.ptype_code,
			this.fields.ptype_listing_no,
			this.fields.ptype_description
			/*this.fields.ptype_creation_date,
			this.fields.ptype_creation_by,
			this.fields.ptype_updated_date,
			this.fields.ptype_updated_by,
			{xtype: 'tabpanel', resizeTabs:true, enableTabScroll:true, defaults: {autoScroll:true}, activeTab: 0, items: [{title: 'Parameter', items: this.details_p_parameter}]}
            */
        ];
    },
    focusField: function(){
    	this.fields.ptype_code.focus();
    }
});
