/**
 * @class Bds.combo.Months
 * Static ComboBox Months
 *
 * @since 13-12-2012 14:15:12
 * @author agung.hp
 */
Bds.combo.Months = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Months',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [[1, 'Januari'],[2, 'Februari'],[3, 'Maret'],[4, 'April'],[5, 'Mei'],[6, 'Juni'],[7, 'Juli'],[8, 'Agustus'],[9, 'September'],[10, 'Oktober'],[11, 'November'],[12, 'Desember']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Bds.combo.Months.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_Months', Bds.combo.Months);