/**
 * @class Bds.combo.t_siswa
 * ComboBox for table bds_t_siswa
 *
 * @since 02-11-2012 13:33:33
 * @author agung.hp
 */
Bds.combo.t_siswa = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.tahun,
    name: 't_siswa_id',
    store: {xtype:'store_t_siswa'},
    displayField:'_display_field_',
    valueField: 't_siswa_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true,    
    initComponent : function() {
        // super
        Bds.combo.t_siswa.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('t_siswa_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
});
Ext.reg('combo_t_siswa', Bds.combo.t_siswa);