/**
 * transferTransform.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  //========================================
  // Load Library
  //========================================
  var aesu = {};
  
  (function() { 
    #include lib/layer.jsxinc;
  }).call(aesu);
  
  (function() { 
    #include lib/keyframe.jsxinc;
  }).call(aesu);
  
  
  //========================================
  // Functions
  //========================================
  var transferTransformProperties = function(srcLayer, dstLayer) {
    if(srcLayer.threeDLayer !== dstLayer.threeDLayer) {
      throw new Error("Mismatch Layer Dimention");
      return;
    }
    
    aesu.transferProperty(srcLayer.position, dstLayer.position);
    
    if(dstLayer.threeDLayer) {
      aesu.transferProperty(srcLayer.orientation, dstLayer.orientation);
      aesu.transferProperty(srcLayer.rotationX, dstLayer.rotationX);
      aesu.transferProperty(srcLayer.rotationY, dstLayer.rotationY);
      aesu.transferProperty(srcLayer.rotationZ, dstLayer.rotationZ);
    } else {
      aesu.transferProperty(srcLayer.rotation, dstLayer.rotation);
    }
    
    aesu.transferProperty(srcLayer.scale, dstLayer.scale);
  };


  //----------------------------------------
  var addParent = function(layer, comp) {
    if(!aesu.instanceOfAVLayer(layer)) return null;
    
    var pivot = comp.layers.addNull();
    
    pivot.name = layer.name + " - pivot";
    pivot.label = 14;
    pivot.inPoint = layer.stretch >= 0? layer.inPoint : layer.outPoint;
    pivot.outPoint = layer.stretch >= 0? layer.outPoint : layer.inPoint;
    pivot.threeDLayer = layer.threeDLayer;
    pivot.moveBefore(layer);
    
    if(layer.parent !== null)
      pivot.parent = layer.parent;
      
    transferTransformProperties(layer, pivot);
    
    layer.parent = pivot;
    
    layer.position.setValue([0, 0, 0]);
    if(layer.threeDLayer) {
      layer.orientation.setValue([0, 0, 0]);
      layer.rotationX.setValue(0);
      layer.rotationY.setValue(0);
      layer.rotationZ.setValue(0);
      layer.scale.setValue([100, 100, 100]);
    } else {
      layer.rotation.setValue(0);
      layer.scale.setValue([100, 100]);
    }
    
    return pivot;
  };


  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  
  app.beginUndoGroup("Transfer Transform");
  
  var selLayers = comp.selectedLayers,
      newLayers = [];
  
  for(var i = 0; i < selLayers.length; i++) {
    var pivot = addParent(selLayers[i], comp);
    
    if(pivot !==  null)
      newLayers.push(pivot);
  }
  
  for(var i = 0; i < selLayers.length; i++)
    selLayers[i].selected = false;
  
  for(var i = 0; i < newLayers.length; i++)
    newLayers[i].selected = true;
  
  app.endUndoGroup();
  
})();