/**
 * @class Bds.combo.d_agr_komoditas
 * ComboBox for table bds_d_agr_komoditas
 *
 * @since 13-12-2012 16:29:27
 * @author agung.hp
 */
Bds.combo.d_agr_komoditas = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.code,
    name: 'd_agr_komiditas_id',
    store: {xtype:'store_d_agr_komoditas'},
    displayField:'_display_field_',
    valueField: 'd_agr_komiditas_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_agr_komoditas.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('d_agr_komiditas_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_agr_komoditas', Bds.combo.d_agr_komoditas);