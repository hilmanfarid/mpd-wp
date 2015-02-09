/**
 * @class Bds.combo.DashboardRumahSakit
 * Static ComboBox DashboardRumahSakit
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.DashboardRumahSakit = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'DashboardRumahSakit',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['',''], ['1', 'KECAMATAN'],['2', 'JENIS RUMAH SAKIT']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.DashboardRumahSakit.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_DashboardRumahSakit', Bds.combo.DashboardRumahSakit);