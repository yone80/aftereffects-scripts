/**
 * makePivot.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


//========================================
// Functions
//========================================
var isAVLayerInstance = function(layer) {
  return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
};

var addPivot = function(layer, comp) {
  if(!isAVLayerInstance(layer)) return null;
  
  var pivot = comp.layers.addNull();
  
  pivot.name = layer.name + " - pivot";
  pivot.label = 14;
  pivot.inPoint = layer.stretch >= 0? layer.inPoint : layer.outPoint;
  pivot.outPoint = layer.stretch >= 0? layer.outPoint : layer.inPoint;
  pivot.threeDLayer = layer.threeDLayer;
  pivot.moveBefore(layer);
  
  if(layer.parent !== null)
    pivot.parent = layer.parent;
    
  pivot.position.setValue(layer.position.value);
  
  if(layer.threeDLayer) {
    pivot.orientation.setValue(layer.orientation.value);
    pivot.rotationX.setValue(layer.rotationX.value);
    pivot.rotationY.setValue(layer.rotationY.value);
    pivot.rotationZ.setValue(layer.rotationZ.value);
  } else {
    pivot.rotation.setValue(layer.rotation.value);
  }
  
  layer.parent = pivot;
  return pivot;
};


//========================================
// Main
//========================================
(function() {
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  
  app.beginUndoGroup("Make Pivot");
  
  var layers = comp.layers,
      selLayers = comp.selectedLayers,
      newLayers = [];

  for(var i = 0; i < selLayers.length; i++) {
    var pivot = addPivot(selLayers[i], comp);
    
    if(pivot !==  null)
      newLayers.push(pivot);
  }
  
  for(var i = 0; i < selLayers.length; i++)
    selLayers[i].selected = false;
  
  for(var i = 0; i < newLayers.length; i++)
    newLayers[i].selected = true;
  
  app.endUndoGroup();
})();