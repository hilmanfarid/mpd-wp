/**
 * @class Bds.combo.ArahAngin
 * Static ComboBox ArahAngin
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.combo.ArahAngin = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'ArahAngin',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [[1, 'Utara'],[2, 'Timur Laut'],[3, 'Timur'],[4, 'Tenggara'],[5, 'Selatan'],[6, 'Barat Daya'],[7, 'Barat'],[8, 'Barat Laut']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.ArahAngin.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_ArahAngin', Bds.combo.ArahAngin);