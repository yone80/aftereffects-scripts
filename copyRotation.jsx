/**
 * copyRotation.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


//========================================
// Functions
//========================================
var instanceOfAVLayer = function(layer) {
  return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
};

var setPropertyValue = function(property, newValue, propertyValueType) {
  if(property.propertyType === PropertyType.PROPERTY && 
     property.propertyValueType === propertyValueType) 
  {
    if(property.canVaryOverTime && property.numKeys > 0) {
      var layer = property;
      while(layer.containingComp === undefined) layer = layer.parentProperty;
      property.setValueAtTime(layer.time, newValue);
    } else {
      property.setValue(newValue);
    }
  }
};


//----------------------------------------
var copyRotation2D = function(selLayers, refLayer) {
  var refRotation = 0;
  
  do {
    refRotation += refLayer.rotation.value;
  } while(refLayer = refLayer.parent)
  
  for(var i = 0; i < selLayers.length; i++) {
    if(instanceOfAVLayer(selLayers[i]) && !selLayers[i].threeDLayer)
      setPropertyValue(selLayers[i].rotation, refRotation, PropertyValueType.OneD);
  }
};

var copyRotation3D = function(selLayers, refLayer, comp) {
  var saveParent, tmpOrientation;
  
  for(var i = 0; i < selLayers.length; i++) {
    if((instanceOfAVLayer(selLayers[i]) && selLayers[i].threeDLayer) || (selLayers[i] instanceof CameraLayer)) {
      saveParent = selLayers[i].parent;
      selLayers[i].parent = refLayer;
      
      setPropertyValue(selLayers[i].rotationX, 0, PropertyValueType.OneD);
      setPropertyValue(selLayers[i].rotationY, 0, PropertyValueType.OneD);
      setPropertyValue(selLayers[i].rotationZ, 0, PropertyValueType.OneD);
      setPropertyValue(selLayers[i].orientation, [0, 0, 0], PropertyValueType.ThreeD_SPATIAL);
          
      selLayers[i].parent = saveParent;
      
      tmpOrientation = selLayers[i].orientation.value;
      setPropertyValue(selLayers[i].rotationX, refOrientation[0], PropertyValueType.OneD);
      setPropertyValue(selLayers[i].rotationY, refOrientation[1], PropertyValueType.OneD);
      setPropertyValue(selLayers[i].rotationZ, refOrientation[2], PropertyValueType.OneD);
      setPropertyValue(selLayers[i].orientation, [0, 0, 0], PropertyValueType.ThreeD_SPATIAL);
    }
  }
};


//========================================
// Main
//========================================
(function() {
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length < 2) return;
  
  app.beginUndoGroup("Copy Rotation");
  
  var selLayers = comp.selectedLayers.slice(0, -1), 
      refLayer = comp.selectedLayers[comp.selectedLayers.length - 1];
  
  if((instanceOfAVLayer(refLayer) && refLayer.threeDLayer) || (refLayer instanceof CameraLayer))
    copyRotation3D(selLayers, refLayer, comp);
  else if(instanceOfAVLayer(refLayer) && !refLayer.threeDLayer)
    copyRotation2D(selLayers, refLayer);
  
  app.endUndoGroup();
})();