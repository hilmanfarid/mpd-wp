/**
 * @class Bds.combo.ArahAngin
 * Static ComboBox ArahAngin
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.combo.JenisCuaca = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Jenis Cuaca',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [[1, 'Udara'],[2, 'Curah Hujan'],[3, 'Angin']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.JenisCuaca.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_JenisCuaca', Bds.combo.JenisCuaca);