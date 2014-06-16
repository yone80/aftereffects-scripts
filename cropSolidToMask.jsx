/**
 * cropSolidToMask.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  //========================================
  // Load Library
  //========================================
  var aesu = {};
  
  (function() { 
    #include lib/math.jsxinc;
  }).call(aesu);
  
  (function() { 
    #include lib/vector2.jsxinc;
  }).call(aesu);
  
  (function() { 
    #include lib/rect.jsxinc;
  }).call(aesu);
  
  (function() { 
    #include lib/proj.jsxinc;
  }).call(aesu);
  
  (function() { 
    #include lib/shape.jsxinc;
  }).call(aesu);
  
  
  //========================================
  // Functions
  //========================================
  var cropSolidToMask = function(layer) {
    var masks = layer.property("Masks"), 
        masksBounds;
    
    masksBounds = aesu.getAllMasksBounds(masks);
    
    var source = layer.source, 
        originalWidth = source.width, 
        originalHeight = source.height, 
        newWidth = Math.ceil(masksBounds.width), 
        newHeight = Math.ceil(masksBounds.height);
    
    var originalAnchor = layer.anchorPoint.value;
    
    
    if(aesu.numTimesUsedItem(layer.source) > 1) {
      var comp = layer.containingComp, 
          layers = comp.layers, 
          idx = 1;
      
      while(aesu.searchItemByName("Crop to mask " + idx) !== null) {idx++;}
      
      var color = source.mainSource.color, 
          name = "Crop to mask " + idx, 
          newLayer = layers.addSolid(color, name, originalWidth, originalHeight, 1), 
          newSource = newLayer.source,
          folder = aesu.searchItemByName("Crop to mask");
          
      layer.replaceSource(newSource, true);
      newLayer.remove();
      
      if(folder === null || !(folder instanceof FolderItem))
        folder = app.project.items.addFolder("Crop to mask");
      
      newSource.parentFolder = folder;
    }
    
    layer.source.width = newWidth;
    layer.source.height = newHeight;
    layer.anchorPoint.setValue(originalAnchor - [masksBounds.left, masksBounds.top, 0]);
    
    
    // reScale and rePosition shape
    var maskPath, shape;
    for(var i = 1; i <= masks.numProperties; i++) {
      maskPath = masks.property(i).property("Mask Path");
      shape = maskPath.value;
      
      aesu.scaleShape(shape, [originalWidth / newWidth,  originalHeight / newHeight]);
      aesu.translateShape(shape, [masksBounds.left, masksBounds.top] * -1);
      
      maskPath.setValue(shape);
    }
  };


  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  
  app.beginUndoGroup("Crop Solid to Mask Bounds");
  
  var selLayers = comp.selectedLayers;
  
  for(var i = 0; i < selLayers.length; i++) {
    if((selLayers[i] instanceof AVLayer) && 
       (selLayers[i].source.mainSource instanceof SolidSource))
    {
      if(selLayers[i].property("Masks").numProperties !== 0)
        cropSolidToMask(selLayers[i]);
    }
  }
  
  app.endUndoGroup();

})();