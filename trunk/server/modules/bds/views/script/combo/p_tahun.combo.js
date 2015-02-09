/**
 * @class Bds.combo.p_tahun
 * ComboBox for table bds_p_tahun
 *
 * @since 01-11-2012 10:52:31
 * @author agung.hp
 */
Bds.combo.p_tahun = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.tahun_id,
    name: 'tahun_id',
    store: {xtype:'store_p_tahun'},
    displayField:'_display_field_',
    valueField: 'tahun_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_tahun.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('tahun_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_tahun', Bds.combo.p_tahun);