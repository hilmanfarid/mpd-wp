/**
 * @class Bds.form.p_global_type
 * Form panel for table bds_p_global_type
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_global_type = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_global_type.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.gtype_id = new Ext.form.Hidden({fieldLabel: Bds.properties.gtype_id, name: 'gtype_id', allowBlank: true});

        this.fields.gtype_code = new Ext.form.TextField({fieldLabel: Bds.properties.gtype_code, name: 'gtype_code', allowBlank: false, width: 245});

        this.fields.gtype_description = new Ext.form.TextArea({fieldLabel: Bds.properties.gtype_description, name: 'gtype_description', allowBlank: true, anchor: '95%'});

        /*this.fields.gtype_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.gtype_creation_date, name: 'gtype_creation_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.gtype_creation_by = new Ext.form.TextField({fieldLabel: Bds.properties.gtype_creation_by, name: 'gtype_creation_by', allowBlank: true, width: 245});

        this.fields.gtype_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.gtype_updated_date, name: 'gtype_updated_date', allowBlank: true, format: 'd-m-Y'});

        this.fields.gtype_updated_by = new Ext.form.TextField({fieldLabel: Bds.properties.gtype_updated_by, name: 'gtype_updated_by', allowBlank: true, width: 245});
        
        this.details_p_global_param = new Bds.module.p_global_param({batchWrite: true, height:215});
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'create'){
                this.details_p_global_param.setBatchWriteMode(true);
                this.details_p_global_param.grid.store.baseParams.gtype_id = '';
                this.details_p_global_param.grid.store.loadData({items:[], total: 0}, false);
                this.details_p_global_param.grid.pagingTb.updateInfo();
            }else{
                this.details_p_global_param.setBatchWriteMode(false);
                this.details_p_global_param.grid.store.baseParams.gtype_id = record.get('gtype_id');
                this.details_p_global_param.grid.store.load();
            }
        }, this);*/
        return [
            this.fields.gtype_id,
			this.fields.gtype_code,
			this.fields.gtype_description
			
			/*,
			this.fields.gtype_creation_date,
			this.fields.gtype_creation_by,
			this.fields.gtype_updated_date,
			this.fields.gtype_updated_by,
			{xtype: 'tabpanel', resizeTabs:true, enableTabScroll:true, defaults: {autoScroll:true}, activeTab: 0, items: [{title: 'Global Parameter', items: this.details_p_global_param}]}
            */
        ];
    },
    focusField: function(){
    	this.fields.gtype_code.focus();
    }
});
