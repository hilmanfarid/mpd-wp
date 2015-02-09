/**
 * @class Base.combo.ActiveStatus
 * Static ComboBox ActiveStatus
 *
 * @since 22-01-2010 15:42:16
 * @author wiliamdecosta@gmail.com
 */
Base.combo.MainRoleStatus = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Status Grup',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['1', 'Utama'],['0', '']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Base.combo.MainRoleStatus.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_MainRoleStatus', Base.combo.MainRoleStatus);