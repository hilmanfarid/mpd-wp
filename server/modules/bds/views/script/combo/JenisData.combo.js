/**
 * @class Bds.combo.JenisData
 * Static ComboBox JenisData
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.combo.JenisData = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'JenisData',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [[1, 'Usia'],[2, 'Pendidikan']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.JenisData.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_JenisData', Bds.combo.JenisData);