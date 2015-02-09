Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
     onRender : function(ct, position){
          this.winFrameName = 'iframe-'+ this.id;
          this.el = ct.createChild({tag: 'iframe', id: this.winFrameName, name: this.winFrameName, frameBorder: 0, src: this.url});
     },
     // scarface addition
     getWindowObject: function(){
        for (var i=0; i < window.frames.length; i++){
            if (window.frames[i].name == this.winFrameName) return window.frames[i];
        }
        return;
     },
     // scarface addition
     getFrameObject: function(){
        return Ext.get(this.winFrameName).dom;
     },
     // scarface addition
     setURL: function(url){
        this.getFrameObject().src = url;
     }
});