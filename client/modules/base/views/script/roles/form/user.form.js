/**
 * @class Base.form.user
 * Form panel for table core_user
 *
 * @since 22-01-2010 13:23:18
 * @author wiliamdecosta@gmail.com
 */
Base.form.user = Ext.extend(Webi.form.FormPanel, {
    hideStatus : false,
    enableRoleModification: true,
    enableUserNameModification: true,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Base.form.user.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        this.fields = {};
        this.fields.user_id = new Ext.form.Hidden({fieldLabel: Base.properties.user_id, name: 'user_id', allowBlank: true});
		
		if (this.enableUserNameModification === true){
		    this.fields.user_name = new Ext.form.TextField({fieldLabel: Base.properties.user_name, name: 'user_name', allowBlank: false, anchor: '95%', maxLength: 255});
            var passwordLabel = Base.properties.user_password;
        }else{
            this.fields.user_name = new Ext.form.DisplayField({fieldLabel: Base.properties.user_name, name: 'user_name', allowBlank: true, anchor: '95%'});
            var passwordLabel = 'Ganti Password';
        }
        
		this.fields.user_password = new Ext.form.TextField({fieldLabel: passwordLabel, name: 'user_password1', allowBlank: true, anchor: '95%', inputType: 'password', maxLength: 255});
		this.fields.user_repass = new Ext.form.TextField({fieldLabel: 'Ulangi Password', name: 'user_password2', allowBlank: true, anchor: '95%', inputType: 'password', maxLength: 255});
		this.fields.user_realname = new Ext.form.TextField({fieldLabel: Base.properties.user_realname, name: 'user_realname', allowBlank: false, anchor: '95%', maxLength: 255});
		this.fields.user_email = new Ext.form.TextField({fieldLabel: Base.properties.user_email, name: 'user_email', allowBlank: true, anchor: '95%', maxLength: 255, vtype: 'email'});

        if (this.hideStatus === true){
            this.fields.user_status = new Ext.form.Hidden({name: 'user_status', allowBlank: true});
        }else{
		    this.fields.user_status = new Base.combo.ActiveStatus({fieldLabel: Base.properties.user_status, name: 'user_status', allowBlank: false});
	    }
	    
	    if (this.enableRoleModification === true){
		    this.fields.role_id = new Base.combo.role({fieldLabel: 'Grup Utama', name: 'role_id', allowBlank: false, anchor: '95%'});
            this.on('loadrecord', function(){
                this.fields.role_id.store.load();
            }, this);
        }else{
            this.fields.role_id = new Ext.form.DisplayField({fieldLabel: 'Grup Utama', name: 'role_name', allowBlank: true, anchor: '95%'});
        }
        
        this.on('loadrecord', this.onLoadRecord, this);
        
        this.fields.user_password.on('blur', function(field){
            if (this.actionType == 'update' && field.getValue() == '') return;
            
            if (field.getValue().trim() == ''){
                field.markInvalid('Password tidak boleh kosong');
            }
        }, this);

        this.fields.user_password.on('change', function(field){
            if (this.actionType == 'update' && field.getValue() == '') return;
            
            if (field.getValue().trim() == ''){
                field.markInvalid('Password tidak boleh kosong');
            }
        }, this);

        this.fields.user_repass.on('blur', function(field){
            if (this.actionType == 'update' && field.getValue() == '' && this.fields.user_password.getValue() == this.fields.user_repass.getValue()) return;
            
            if (this.fields.user_password.getValue() != this.fields.user_repass.getValue()){
                this.fields.user_repass.markInvalid('Password tidak sama');
                return false;
            }
        }, this);

        this.fields.user_repass.on('change', function(field){
            if (this.actionType == 'update' && field.getValue() == '' && this.fields.user_password.getValue() == this.fields.user_repass.getValue()) return;            
            
            if (this.fields.user_password.getValue() != this.fields.user_repass.getValue()){
                this.fields.user_repass.markInvalid('Password tidak sama');
                return false;
            }
        }, this);
                
        this.on('beforecreate', function(){
            if (this.validateUser()){
                this.record.set('user_password', this.fields.user_password.getValue());
                
                return true;
            }else{
                return false;
            }
        }, this);

        this.on('beforeupdate', function(){
            if (this.validateUser()){
                if (this.fields.user_password.getValue() != ''){
                    this.record.set('user_password', this.fields.user_password.getValue());
                }
                return true;
            }else{
                return false;
            }
        }, this);
        
        return [
            this.fields.user_id,
			this.fields.user_name,
			this.fields.user_password,
			this.fields.user_repass,
			this.fields.user_realname,
			this.fields.user_email,
			this.fields.role_id,
			this.fields.user_status
        ];
    },
    focusField: function(){
    	this.fields.user_name.focus();
    },
    onLoadRecord: function(form, record, actionType){
        this.fields.user_password.setValue('');
        this.fields.user_repass.setValue('');
    },
    validateUser: function(){
        var valid = true;
        if (this.fields.user_name.getValue().trim() == ''){
            this.fields.user_name.setValue('');
            this.fields.user_name.markInvalid('Nama User tidak boleh kosong');
            valid = false;
        }

        if (this.fields.user_realname.getValue().trim() == ''){
            this.fields.user_realname.setValue('');
            this.fields.user_realname.markInvalid('Nama Lengkap tidak boleh kosong');
            valid = false;
        }


        if (this.actionType == 'update' && 
            this.fields.user_password.getValue() == '' && 
            this.fields.user_password.getValue() == this.fields.user_repass.getValue()){
            
            // nothing todo with empty password if in update mode
            
        }else{
            if (this.fields.user_password.getValue().trim() == ''){
                this.fields.user_password.markInvalid('Password tidak boleh kosong');
                valid = false;
            }else if(this.fields.user_password.getValue().length < 5){
                this.fields.user_repass.markInvalid('Panjang password minimal 5 karakter');
                valid = false;              
            }
            
            if (this.fields.user_password.getValue() != this.fields.user_repass.getValue()){
                this.fields.user_repass.markInvalid('Password tidak sama');
                valid = false;  
            }
        }
        
        if (!valid) return false;
        
        return true;
    }
});
