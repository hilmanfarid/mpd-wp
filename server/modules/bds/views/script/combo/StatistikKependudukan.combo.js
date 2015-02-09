/**
 * @class Bds.combo.YesNo
 * Static ComboBox YesNo
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.StatistikKependudukan = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'StatistikKependudukan',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['1', 'USIA'],['2', 'PENDIDIKAN']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.StatistikKependudukan.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_StatistikKependudukan', Bds.combo.StatistikKependudukan);