/**
 * @class Bds.combo.p_wilayah
 * ComboBox for table bds_p_wilayah
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_wilayah = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.wilayah_kode,
    name: 'wilayah_id',
    store: {xtype:'store_p_wilayah'},
    displayField:'_display_field_',
    valueField: 'wilayah_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_wilayah.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('wilayah_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_wilayah', Bds.combo.p_wilayah);