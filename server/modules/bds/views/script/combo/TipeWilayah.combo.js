/**
 * @class Bds.combo.YesNo
 * Static ComboBox YesNo
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.TipeWilayah = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'YesNo',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [ ['11', 'PROPINSI'], ['21', 'KABUPATEN'], ['22','KOTA'], ['31','KECAMATAN'], ['41','DESA'], ['42','KELURAHAN'], ['51','RW'], ['61','RT'] ]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.TipeWilayah.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_TipeWilayah', Bds.combo.TipeWilayah);