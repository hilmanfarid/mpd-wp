/**
 * @class Bds.combo.d_rumahsakit
 * ComboBox for table bds_d_rumahsakit
 *
 * @since 05-12-2012 12:48:54
 * @author agung.hp
 */
Bds.combo.d_rumahsakit = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.rs_kode,
    name: 'rs_id',
    store: {xtype:'store_d_rumahsakit'},
    displayField:'_display_field_',
    valueField: 'rs_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_rumahsakit.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('rs_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_rumahsakit', Bds.combo.d_rumahsakit);