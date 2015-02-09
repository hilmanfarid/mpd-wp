/**
 * @class Bds.form.p_wilayah
 * Form panel for table bds_p_wilayah
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
Bds.form.p_wilayah_info = Ext.extend(Webi.form.FormPanel, {
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.p_wilayah_info.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        
        
        this.fields.wilayah_id = new Ext.form.Hidden({fieldLabel: Bds.properties.wilayah_id, name: 'wilayah_id', allowBlank: true});
                
        this.fields.wilayah_kota = new Ext.form.TextField({fieldLabel: 'Kota', name: 'wilayah_kota', allowBlank: true, width:250});
        
        this.fields.wilayah_kode_pos = new Ext.form.TextField({fieldLabel: 'Kode Pos', name: 'wilayah_kode_pos', allowBlank: true, width:100});

        this.fields.wilayah_telepon = new Ext.form.TextField({fieldLabel: 'Telepon', name: 'wilayah_telepon', allowBlank: true, width:200});
        
        this.fields.wilayah_description = new Ext.form.TextField({fieldLabel: Bds.properties.wilayah_description, name: 'wilayah_description', allowBlank: true, width:753});

        this.fields.wilayah_creation_date = new Ext.form.DateField({fieldLabel: Bds.properties.wilayah_creation_date, name: 'wilayah_creation_date', allowBlank: true, format: 'd-m-Y', readOnly:true});

        this.fields.wilayah_creation_by = new Ext.form.DisplayField({fieldLabel: Bds.properties.wilayah_creation_by, name: 'wilayah_creation_by', allowBlank: true, anchor: '95%'});

        this.fields.wilayah_updated_date = new Ext.form.DateField({fieldLabel: Bds.properties.wilayah_updated_date, name: 'wilayah_updated_date', allowBlank: true, format: 'd-m-Y', readOnly:true});

        this.fields.wilayah_updated_by = new Ext.form.DisplayField({fieldLabel: Bds.properties.wilayah_updated_by, name: 'wilayah_updated_by', allowBlank: true, anchor: '95%'});
        
        return [
            this.fields.wilayah_id,
            {
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'left', columnWidth:.35,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_kota]
                },{
                    labelAlign: 'left', columnWidth:.18, layout: 'form', border:false, labelWidth:60, baseCls: 'x-plain', items: [this.fields.wilayah_kode_pos]
                },{
                    labelAlign: 'left', columnWidth:.3, layout: 'form', border:false, labelWidth:60, baseCls: 'x-plain', items: [this.fields.wilayah_telepon]
                }
                ]
            },
            this.fields.wilayah_description,
            {
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'left', columnWidth:.2,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_creation_date]
                },{
                    labelAlign: 'left', columnWidth:.5, layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_creation_by]
                }]
            },
			{
                xtype: 'panel', layout:'column', border:false, baseCls: 'x-plain',
                items:[{
                    labelAlign: 'left', columnWidth:.2,  layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_updated_date]
                },{
                    labelAlign: 'left', columnWidth:.5, layout: 'form', border:false, baseCls: 'x-plain', items: [this.fields.wilayah_updated_by]
                }]
            }
        ];
    },
    focusField: function(){
    	return;
    },
    
    buildUI: function(){
        this.btnSave = new Ext.Button({
        	itemId: 'btnSave',
            text: 'Update Info',
            iconCls: 'icon-save',
            handler: this.onCreate,
            scope: this
        });
        
        this.btnUpdate = new Ext.Button({
        	itemId: 'btnUpdate',
            text: 'Update Info',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this,
            hidden: true
        });
        
        this.btnCancel = new Ext.Button({
        	itemId: 'btnCancel',
            text: 'Tutup',
            iconCls: 'icon-closewin',
            handler: this.onCancel,
            scope: this
        });
        
        return [this.btnSave, this.btnUpdate];
    }
});
