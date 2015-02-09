/**
 * @class Bds.form.t_cust_order_legal_doc
 * Form panel for table shop_t_cust_order_legal_doc
 *
 * @since 10-05-2013 06:15:36
 * @author agung.hp
 */
Bds.form.t_cust_order_legal_doc = Ext.extend(Webi.form.FormPanel, {
    fileUpload: true,
    defaultImageHolderContent: '<div style="text-align:center;padding-top:60px;color:#aaa;">Gambar Iklan<br/>Belum Diupload</div>',
    
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.form.t_cust_order_legal_doc.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.t_cust_order_legal_doc_id = new Ext.form.Hidden({fieldLabel: Bds.properties.t_cust_order_legal_doc_id, name: 't_cust_order_legal_doc_id', allowBlank: true});
        this.fields.t_customer_order_id = new Ext.form.Hidden({fieldLabel:'', name: 't_customer_order_id', allowBlank: true});
        this.fields.p_legal_doc_type_id = new Ext.form.TextField({fieldLabel: "Jenis Dokumen",name: 'p_legal_doc_type_id', allowBlank: false, width: 245});
        this.fields.origin_file_name = new Ext.form.TextField({fieldLabel: "Nama File",name: 'origin_file_name', allowBlank: true, width: 245});        
        this.fields.file_folder = new Ext.form.TextField({fieldLabel: "File folder",name: 'file_folder', allowBlank: false, anchor: '95%'});
		this.fields.legal_doc_desc = new Ext.form.TextField({fieldLabel: "Deskripsi",name: 'legal_doc_desc', allowBlank: false, anchor: '95%'});
        this.imageHolder = new Ext.Panel({html: '', height:150, width:150});
        this.on('loadrecord', function(form, record, actionType){
            if (actionType == 'update'){
                var imagefile = record.get('file_name');
                                
                if (!Ext.isEmpty(imagefile)){
					var re = /(?:\.([^.]+))?$/;
					var path = re.exec(imagefile)[1]; 
					path = path.trim();
					if((path=='jpeg') || (path=='jpg') || (path=='gif') || (path=='png')){
						this.imageHolder.show();
						this.imageHolder.update('<div style="padding-top:1px;padding-left:0px;"><img  src="var/files/th_'+ record.get('t_cust_order_legal_doc_id')+'_' + imagefile + '" alt="Gambar Attachment" height="150" /></div>');
					}else{
						this.imageHolder.hide();
					}
                }else{
                    this.imageHolder.update(this.defaultImageHolderContent);
                }
                           
            }else{
                this.imageHolder.update(this.defaultImageHolderContent);            
            }
        },this);
        
        this.fields.file_name = new Ext.ux.form.FileUploadField({
            emptyText: 'Upload Image',
            fieldLabel: 'Gambar',
            name: 'file_name',
            allowBlank: false,
            buttonText: '',
            buttonCfg: {
                iconCls: 'icon-upload'
            },
            anchor: '95%'
        });
        
        return [
            this.fields.t_cust_order_legal_doc_id,
			this.fields.t_customer_order_id,
			this.fields.p_legal_doc_type_id,
			this.fields.origin_file_name,
			this.fields.legal_doc_desc,
			this.fields.file_folder,
			this.fields.file_name,
			{
                xtype: 'panel',
			    baseCls: 'x-plain',
			    border: false,
                layout: 'column',
                bodyStyle: 'padding-bottom:5px; margin-left: 105px;',
                items: [
                    {columnWidth: 1, layout: 'anchor', baseCls: 'x-plain', items: [this.imageHolder]}
                ]
            }
        ];
    },
    focusField: function(){
    	return true;
    },
    /**
     * buildUI
     * @private
     */
    setButton: function(){
        // no need to set button for p_role_menu
	} 
});
