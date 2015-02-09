/**
 * @class Bds.combo.p_school_level
 * ComboBox for table bds_p_school_level
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_school_level = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Level Sekolah',
    name: 'p_school_level_id',
    store: {xtype:'store_p_school_level'},
    displayField:'_display_field_',
    valueField: 'p_school_level_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_school_level.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('p_school_level_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_school_level', Bds.combo.p_school_level);