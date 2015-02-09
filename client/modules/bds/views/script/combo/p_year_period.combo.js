/**
 * @class Bds.combo.p_year_period
 * ComboBox for table bds_p_year_period
 *
 * @since 13-12-2012 20:06:34
 */
Bds.combo.p_year_period = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.p_year_period_code,
    name: 'p_year_period_id',
    store: {xtype:'store_p_year_period'},
    displayField:'_display_field_',
    valueField: 'p_year_period_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_year_period.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('p_year_period_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_year_period', Bds.combo.p_year_period);