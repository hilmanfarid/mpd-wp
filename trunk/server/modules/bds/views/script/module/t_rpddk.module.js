/**
 * @class Bds.module.t_rpddk
 * Module panel for table bds_t_rpddk
 *
 * @since 13-12-2012 20:06:34
 * @author agung.hp
 */
Bds.module.t_rpddk = Ext.extend(Webi.module.Panel, {
    addTitle: Bds.properties.t_rpddk_addTitle,
    editTitle: Bds.properties.t_rpddk_editTitle,
    winWidth:400,
    winHeight:250,
    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // super
        Bds.module.t_rpddk.superclass.initComponent.call(this);
    },
    buildPanel : function(){
        this.grid = new Bds.grid.t_rpddk({border: false});
        this.firstTime = true;
        this.initGridEvents();
        
        this.cbJenis = new Bds.combo.JenisData({fieldLabel:'Jenis Data Per', name:'jenisdata', disabled: false, anchor:'95%',emptyText: 'Pilih Jenis Data'});
        this.grid.on('new', function(grid, rec, btn, ev){
          //  rec.set('jenisdata_name', this.cbJenis.getRawValue());
        }, this);
        this.cbJenis.on('select', function(combo, record, index){
            this.grid.store.baseParams.jenisdata = this.cbJenis.getValue();
            this.grid.jenisdata_name = this.cbJenis.getRawValue();
            this.grid.store.load();
        }, this);
        
        this.grid.store.on('beforeload', function(store, options){
            if (Ext.isEmpty(this.cbJenis.getValue())){
                this.grid.disable();
                if (this.firstTime){
                    this.firstTime = false;
                }
                return false;
            }else{
                if (this.grid.disabled) this.grid.enable();
                this.grid.store.baseParams.jenisdata = this.cbJenis.getValue();    
            }
            return true;
        }, this);
  
        return {
		    xtype: 'panel',
		    layout: 'border',
		    border: false,
		    items : [
		        {
		            region: 'north',
		            margins: '1 1 0 1',
		            layout: 'column',
		            labelWidth:75,
		            height:55,
		            bodyStyle: 'padding:5px;',
		            items: [
								{
									labelAlign: 'top', columnWidth:0.25, layout: 'form', border:false, baseCls: 'x-plain',
									items: [this.cbJenis]
								}							
                    ]
		        },
		        {
		            region: 'center',
		            margins: '1 1 1 1',
		            layout: 'fit',
		            minHeight: 110,
		            items: this.grid
		        }
		    ]
		};

        
    },
    buildForm : function(){
        this.form = new Bds.form.t_rpddk();
		this.initFormEvents();
		
		return this.form;
    }
});

Ext.reg('module_t_rpddk', Bds.module.t_rpddk);