/**
 * @class Base.combo.user
 * ComboBox for table core_user
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.combo.user = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Base.properties.user_name,
    name: 'user_id',
    store: {xtype:'store_user'},
    displayField:'_display_field_',
    valueField: 'user_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Base.combo.user.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('user_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_user', Base.combo.user);