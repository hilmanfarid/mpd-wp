/**
 * @class Bds.combo.YesNo
 * Static ComboBox YesNo
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.isRange = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'isRange',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['Y', 'Range'],['T', 'Tidak']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.isRange.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_isRange', Bds.combo.isRange);