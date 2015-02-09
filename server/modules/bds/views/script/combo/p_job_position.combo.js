/**
 * @class Bds.combo.p_job_position
 * ComboBox for table bds_p_job_position
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_job_position = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.jobpos_code,
    name: 'jobpos_id',
    store: {xtype:'store_p_job_position'},
    displayField:'_display_field_',
    valueField: 'jobpos_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_job_position.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('jobpos_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_job_position', Bds.combo.p_job_position);