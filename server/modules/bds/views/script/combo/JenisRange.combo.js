/**
 * @class Bds.combo.YesNo
 * Static ComboBox YesNo
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.JenisRange = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'JenisRange',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['STRING', 'STRING'],['NUMERIK', 'NUMERIK'],['DATE', 'DATE']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.JenisRange.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_JenisRange', Bds.combo.JenisRange);