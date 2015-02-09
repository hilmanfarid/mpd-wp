/**
 * @class Bds.combo.p_parameter
 * ComboBox for table bds_p_parameter
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_parameter = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.param_code,
    name: 'param_id',
    store: {xtype:'store_p_parameter'},
    displayField:'_display_field_',
    valueField: 'param_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_parameter.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('param_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_parameter', Bds.combo.p_parameter);