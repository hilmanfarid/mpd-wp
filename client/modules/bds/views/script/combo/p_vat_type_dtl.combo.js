/**
 * @class Bds.combo.p_vat_type_dtl
 * ComboBox for table bds_p_vat_type_dtl
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.combo.p_vat_type_dtl = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.p_vat_type_dtl_code,
    name: 'p_vat_type_dtl_id',
    store: {xtype:'store_p_vat_type_dtl'},
    displayField:'_display_field_',
    valueField: 'p_vat_type_dtl_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_vat_type_dtl.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('p_vat_type_dtl_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_vat_type_dtl', Bds.combo.p_vat_type_dtl);