/**
 * @class Bds.combo.d_pasar
 * ComboBox for table bds_d_pasar
 *
 * @since 14-12-2012 01:58:20
 * @author agung.hp
 */
Bds.combo.d_pasar = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.pasar_code,
    name: 'pasar_id',
    store: {xtype:'store_d_pasar'},
    displayField:'_display_field_',
    valueField: 'pasar_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_pasar.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('pasar_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_pasar', Bds.combo.d_pasar);