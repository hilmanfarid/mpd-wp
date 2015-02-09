/**
 * @class Bds.combo.p_wilayah_person
 * ComboBox for table bds_p_wilayah_person
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_wilayah_person = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.rsp_id_no,
    name: 'wp_id',
    store: {xtype:'store_p_wilayah_person'},
    displayField:'_display_field_',
    valueField: 'wp_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_wilayah_person.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('wp_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_wilayah_person', Bds.combo.p_wilayah_person);