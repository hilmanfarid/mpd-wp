/**
 * @class Bds.combo.d_skpd
 * ComboBox for table bds_d_skpd
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.combo.d_skpd = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.code,
    name: 'd_skpd_id',
    store: {xtype:'store_d_skpd'},
    displayField:'_display_field_',
    valueField: 'd_skpd_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_skpd.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('d_skpd_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_skpd', Bds.combo.d_skpd);