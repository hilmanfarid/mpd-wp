/**
 * @class Bds.combo.d_wisata
 * ComboBox for table bds_d_wisata
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.combo.d_wisata = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.wisata_code,
    name: 'wisata_id',
    store: {xtype:'store_d_wisata'},
    displayField:'_display_field_',
    valueField: 'wisata_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_wisata.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('wisata_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_wisata', Bds.combo.d_wisata);