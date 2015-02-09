/**
 * @class Bds.combo.p_app_menu
 * ComboBox for table bds_p_app_menu
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.combo.p_app_menu = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: Bds.properties.menu_code,
    name: 'menu_id',
    store: {xtype:'store_p_app_menu'},
    displayField: '_display_field_',
    valueField: 'menu_id',
    typeAhead: false,
    loadingText: 'Searching...',
    pageSize:50,
    minChars: 2,
    triggerAction: 'all',
    lazyRender: true, 
    tpl: '<tpl for="."><div class="x-combo-list-item" style="padding-left:{padding_level}px;font-weight:{font_style};color:{font_color};">{_display_field_}</div></tpl>',
    initComponent : function() {
        // super
        Bds.combo.p_app_menu.superclass.initComponent.call(this);

        this.on('change', function(combo, newValue, oldValue){
            if(!parseInt(newValue)){
                combo.setValue('');
            }
        }, this);                

        this.store.on('load', function(store, records, options){
            var id = this.getValue();
            
            if (store.find('menu_id', id) != -1){
                this.setValue(id);
            }
        }, this);
    }
    
    
});
Ext.reg('combo_p_app_menu', Bds.combo.p_app_menu);