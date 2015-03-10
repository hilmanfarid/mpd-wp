/**
 * @class Bds.combo.p_finance_period
 * ComboBox for table bds_p_finance_period
 *
 * @since 13-12-2012 20:06:34
 */
Bds.combo.p_finance_period = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.p_finance_period_code,
    name: 'p_finance_period_id',
    store: {xtype:'store_p_finance_period'},
    displayField:'_display_field_',
    valueField: 'p_finance_period_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:10,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_finance_period.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('p_finance_period_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_finance_period', Bds.combo.p_finance_period);