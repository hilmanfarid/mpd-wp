/**
 * @class Bds.combo.npwd
 * ComboBox for table bds_npwd
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.combo.npwd = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.npwd_code,
    name: 'npwd_id',
    store: {xtype:'store_npwd'},
    displayField:'npwd',
    valueField: 't_cust_account_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.npwd.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('t_cust_account', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_npwd', Bds.combo.npwd);