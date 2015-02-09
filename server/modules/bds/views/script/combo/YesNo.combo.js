/**
 * @class Bds.combo.YesNo
 * Static ComboBox YesNo
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.YesNo = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'YesNo',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['Y', 'Ya'],['T', 'Tidak']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.YesNo.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_YesNo', Bds.combo.YesNo);