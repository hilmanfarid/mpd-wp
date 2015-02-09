/**
 * @class Bds.combo.p_message_type
 * ComboBox for table bds_p_message_type
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.combo.p_message_type = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.p_message_type_code,
    name: 'p_message_type_id',
    store: {xtype:'store_p_message_type'},
    displayField:'message_type',
    valueField: 'p_message_type_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_message_type.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('p_message_type_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_message_type', Bds.combo.p_message_type);