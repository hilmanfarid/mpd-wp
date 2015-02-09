/**
 * @class Bds.combo.branch
 * ComboBox for table bds_branch
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.combo.branch = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.branch_code,
    name: 'branch_id',
    store: {xtype:'store_branch'},
    displayField:'_display_field_',
    valueField: 'branch_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.branch.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('branch_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_branch', Bds.combo.branch);