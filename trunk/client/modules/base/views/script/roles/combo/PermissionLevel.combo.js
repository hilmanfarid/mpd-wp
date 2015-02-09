/**
 * @class Base.combo.ActiveStatus
 * Static ComboBox ActiveStatus
 *
 * @since 22-01-2010 15:42:16
 * @author wiliamdecosta@gmail.com
 */
Base.combo.PermissionLevel = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Level Akses',
    typeAhead: false,
    triggerAction: 'all',
    lazyRender: true,    
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [['0', 'NONE'],['1', 'OVERVIEW'],['2', 'READ'],['3', 'EDIT'],['4', 'ADD'],['5', 'DELETE'],['6', 'ADMIN']]
    }),
    valueField: 'id',
    displayField: 'name',
    editable: false,
    initComponent : function() {
        // super
        Base.combo.PermissionLevel.superclass.initComponent.call(this);
    }
});
Ext.reg('combo_PermissionLevel', Base.combo.PermissionLevel);