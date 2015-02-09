/**
 * @class Bds.combo.p_global_type
 * ComboBox for table bds_p_global_type
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_global_type = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.gtype_code,
    name: 'gtype_id',
    store: {xtype:'store_p_global_type'},
    displayField:'_display_field_',
    valueField: 'gtype_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_global_type.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('gtype_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_global_type', Bds.combo.p_global_type);