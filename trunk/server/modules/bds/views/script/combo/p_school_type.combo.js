/**
 * @class Bds.combo.p_school_type
 * ComboBox for table bds_p_school_type
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_school_type = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Jenis Sekolah',
    name: 'p_school_type_id',
    store: {xtype:'store_p_school_type'},
    displayField:'_display_field_',
    valueField: 'p_school_type_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.p_school_type.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('p_school_type_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_p_school_type', Bds.combo.p_school_type);