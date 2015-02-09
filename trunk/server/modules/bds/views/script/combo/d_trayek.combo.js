/**
 * @class Bds.combo.d_trayek
 * ComboBox for table bds_d_trayek
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.combo.d_trayek = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.trayek_code,
    name: 'trayek_id',
    store: {xtype:'store_d_trayek'},
    displayField:'_display_field_',
    valueField: 'trayek_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_trayek.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('trayek_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_trayek', Bds.combo.d_trayek);