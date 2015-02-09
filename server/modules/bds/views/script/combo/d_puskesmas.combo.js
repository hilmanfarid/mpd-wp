/**
 * @class Bds.combo.d_puskesmas
 * ComboBox for table bds_d_puskesmas
 *
 * @since 06-12-2012 12:02:05
 * @author agung.hp
 */
Bds.combo.d_puskesmas = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.puskesmas_kode,
    name: 'puskesmas_id',
    store: {xtype:'store_d_puskesmas'},
    displayField:'_display_field_',
    valueField: 'puskesmas_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_puskesmas.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('puskesmas_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_puskesmas', Bds.combo.d_puskesmas);