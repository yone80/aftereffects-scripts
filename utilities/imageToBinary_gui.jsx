/**
 * imageToBinary_gui.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */

#target estoolkit

(function() {
  
  var imageToBinary = function(path){
    var reg_head = /^\(new String\(/,
        reg_tail = /\)\)$/, 
        reg_extension = /(.*)(?:\.([^.]+$))/, 
        inFile = File(path), 
        txt = "";
    
    if(inFile !== null) {
      inFile.open ("r");
      inFile.encoding = "BINARY";
      
      var temp = inFile.read();
      inFile.close();
      
      txt = temp.toSource().replace(reg_head, "").replace(reg_tail, "");
    }
    
    return txt;
  };
  
  var buildUI = function() {
    var frame = new Window("palette", "Image binary Viewer", undefined);
    
    var grp = frame.add("group");
    grp.orientation = "row";
    
    var pnl_image = grp.add("panel");
    
    var img = pnl_image.add("image");
    img.preferredSize = [128, 128];
    
    var btn = pnl_image.add("button", undefined, "Open Image");
    
    et = grp.add("edittext", undefined, "", {readonly: true, multiline: true, scrolling: true});
    et.preferredSize = [512, 186];
    
    btn.onClick = function(){
      var path = File.openDialog(), 
          invalidImage = false;
      
      if(path !== null) {
        try {
          img.image = path;
        } catch(e) {
          alert(e);
          invalidImage = true;
        }
        
        if(!invalidImage) {
          et.text = imageToBinary(path);
          et.active = true;
        }
      }
    };
    
    frame.layout.layout(true);
    return frame;
  };
  
  var myPanel = buildUI();
  
  myPanel.center();
  myPanel.show();
})();