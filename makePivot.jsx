/**
 * makePivot.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  //========================================
  // Functions
  //========================================
  var instanceOfAVLayer = function(layer) {
    return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
  };

  var addPivot = function(layer, comp) {
    if(!instanceOfAVLayer(layer)) return null;
    
    var pivot = comp.layers.addNull();
    
    pivot.name = layer.name + " - pivot";
    pivot.label = 14;
    pivot.inPoint = layer.stretch >= 0? layer.inPoint : layer.outPoint;
    pivot.outPoint = layer.stretch >= 0? layer.outPoint : layer.inPoint;
    pivot.threeDLayer = layer.threeDLayer;
    pivot.moveBefore(layer);
    
    if(layer.parent !== null)
      pivot.parent = layer.parent;
      
    pivot.property("ADBE Transform Group").property("ADBE Position").setValue(layer.property("ADBE Transform Group").property("ADBE Position").value);
    
    if(layer.threeDLayer) {
      pivot.property("ADBE Transform Group").property("ADBE Orientation").setValue(layer.property("ADBE Transform Group").property("ADBE Orientation").value);
      pivot.property("ADBE Transform Group").property("ADBE Rotate X").setValue(layer.property("ADBE Transform Group").property("ADBE Rotate X").value);
      pivot.property("ADBE Transform Group").property("ADBE Rotate Y").setValue(layer.property("ADBE Transform Group").property("ADBE Rotate Y").value);
    }
    pivot.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(layer.property("ADBE Transform Group").property("ADBE Rotate Z").value);
    
    layer.parent = pivot;
    return pivot;
  };


  //========================================
  // Main
  //========================================
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