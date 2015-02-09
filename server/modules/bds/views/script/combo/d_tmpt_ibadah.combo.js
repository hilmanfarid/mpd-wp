/**
 * @class Bds.combo.d_tmpt_ibadah
 * ComboBox for table bds_d_tmpt_ibadah
 *
 * @since 13-12-2012 22:05:03
 * @author agung.hp
 */
Bds.combo.d_tmpt_ibadah = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.tibdh_code,
    name: 'tibdh_id',
    store: {xtype:'store_d_tmpt_ibadah'},
    displayField:'_display_field_',
    valueField: 'tibdh_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.d_tmpt_ibadah.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('tibdh_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_d_tmpt_ibadah', Bds.combo.d_tmpt_ibadah);