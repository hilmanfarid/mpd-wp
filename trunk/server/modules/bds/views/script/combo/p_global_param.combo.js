/**
 * @class Bds.combo.p_global_param
 * ComboBox for table bds_p_global_param
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_global_param = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.gparam_code,
    name: 'gparam_id',
    store: {xtype:'store_p_global_param'},
    displayField:'_display_field_',
    valueField: 'gparam_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_global_param.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('gparam_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_global_param', Bds.combo.p_global_param);