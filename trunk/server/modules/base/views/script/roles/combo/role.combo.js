/**
 * @class Base.combo.role
 * ComboBox for table core_role
 *
 * @since 22-01-2010 13:23:17
 * @author wiliamdecosta@gmail.com
 */
Base.combo.role = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Base.properties.role_name,
    name: 'role_id',
    displayField:'_display_field_',
    valueField: 'role_id',
    typeAhead: false,
    loadingText: 'Searching...',
    triggerAction: 'all',
    lazyRender: true,    
    lastQuery: '',
    editable: false,
    initComponent : function() {
        this.store = new Base.store.role();
        this.store.baseParams = -1;
        
        // super
        Base.combo.role.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('role_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_role', Base.combo.role);