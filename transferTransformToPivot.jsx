/**
 * transferTransformToPivot.jsx
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
    
    aesu.transferProperty(srcLayer.property("ADBE Transform Group").property("ADBE Position"), dstLayer.property("ADBE Transform Group").property("ADBE Position"));
    
    if(dstLayer.threeDLayer) {
      aesu.transferProperty(srcLayer.property("ADBE Transform Group").property("ADBE Orientation"), dstLayer.property("ADBE Transform Group").property("ADBE Orientation"));
      aesu.transferProperty(srcLayer.property("ADBE Transform Group").property("ADBE Rotate X"), dstLayer.property("ADBE Transform Group").property("ADBE Rotate X"));
      aesu.transferProperty(srcLayer.property("ADBE Transform Group").property("ADBE Rotate Y"), dstLayer.property("ADBE Transform Group").property("ADBE Rotate Y"));
    }
    aesu.transferProperty(srcLayer.property("ADBE Transform Group").property("ADBE Rotate Z"), dstLayer.property("ADBE Transform Group").property("ADBE Rotate Z"));
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
    
    layer.property("ADBE Transform Group").property("ADBE Position").setValue([0, 0, 0]);
    if(layer.threeDLayer) {
      layer.property("ADBE Transform Group").property("ADBE Orientation").setValue([0, 0, 0]);
      layer.property("ADBE Transform Group").property("ADBE Rotate X").setValue(0);
      layer.property("ADBE Transform Group").property("ADBE Rotate Y").setValue(0);
    } 
    layer.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(0);
    
    return pivot;
  };


  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  
  app.beginUndoGroup("Transfer Transform to Pivot");
  
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