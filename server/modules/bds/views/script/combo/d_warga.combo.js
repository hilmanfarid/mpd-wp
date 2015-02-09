/**
 * @class Bds.combo.d_warga
 * ComboBox for table bds_d_warga
 *
 * @since 31-10-2012 11:02:06
 * @author agung.hp
 */
Bds.combo.d_warga = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.warga_ktp_no,
    name: 'warga_id',
    store: {xtype:'store_d_warga'},
    displayField:'_display_field_',
    valueField: 'warga_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_warga.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('warga_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_warga', Bds.combo.d_warga);