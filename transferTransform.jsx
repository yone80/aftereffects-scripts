/**
 * transferTransform.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


//========================================
// Functions
//========================================
var instanceOfAVLayer = function(layer) {
  return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
};

//----------------------------------------
var copyKeyframe = function(srcProp, keyIndex, dstProp, time) {
  if(time === undefined) time = srcProp.keyTime(keyIndex);
  var newKey = dstProp.addKey(time), 
      keyRoving = false;
  
  dstProp.setValueAtKey(newKey, srcProp.keyValue(keyIndex));
  
  dstProp.setTemporalAutoBezierAtKey(newKey, srcProp.keyTemporalContinuous(keyIndex));
  dstProp.setTemporalContinuousAtKey(newKey, srcProp.keyTemporalAutoBezier(keyIndex));
  dstProp.setTemporalEaseAtKey(newKey, srcProp.keyInTemporalEase(keyIndex), 
                                       srcProp.keyOutTemporalEase(keyIndex));
  
  if( srcProp.propertyValueType === PropertyValueType.TwoD_SPATIAL || 
      srcProp.propertyValueType === PropertyValueType.ThreeD_SPATIAL) 
  {
    dstProp.setSpatialContinuousAtKey(newKey, srcProp.keySpatialContinuous(keyIndex));
    dstProp.setSpatialAutoBezierAtKey(newKey, srcProp.keySpatialAutoBezier(keyIndex));
    dstProp.setSpatialTangentsAtKey(newKey, srcProp.keyInSpatialTangent(keyIndex), 
                                            srcProp.keyOutSpatialTangent(keyIndex));
    keyRoving = srcProp.keyRoving(keyIndex);
  }
  
  dstProp.setInterpolationTypeAtKey(newKey, srcProp.keyInInterpolationType(keyIndex), 
                                            srcProp.keyOutInterpolationType(keyIndex));
  
  return {keyIndex: newKey, keyRoving: keyRoving};
};

var copyAllKeyframes = function(srcProp, dstProp) {
  var roveKeys = [];
  
  for(var k = 1; k <= srcProp.numKeys; k++) {
    var returnObj = copyKeyframe(srcProp, k, dstProp);
    if(returnObj.keyRoving) roveKeys.push(returnObj.keyIndex);
  }
  
  for(var i = 0; i < roveKeys.length; i++)
    dstProp.setRovingAtKey(roveKeys[i], true);
};

//----------------------------------------
var transferProperty = function(srcProp, dstProp) {
  if(srcProp.propertyValueType !== dstProp.propertyValueType) {
    throw new Error("Mismatch PropertyValueType");
    return;
  }
  
  if(dstProp.canVaryOverTime && srcProp.numKeys > 0) {
    copyAllKeyframes(srcProp, dstProp);
    
    while(srcProp.numKeys > 0)
      srcProp.removeKey(1);
    
    srcProp.setValue(dstProp.value);
  } else {
    dstProp.setValue(srcProp.value);
  }
  /*
  if(destProp.canSetExpression) {
    dstProp.expression = srcProp.expression;
    srcProp.expression = "";
  }
  */
};

var transferTransformProperties = function(srcLayer, dstLayer) {
  if(srcLayer.threeDLayer !== dstLayer.threeDLayer) {
    throw new Error("Mismatch Layer Dimention");
    return;
  }
  
  transferProperty(srcLayer.position, dstLayer.position);
  
  if(dstLayer.threeDLayer) {
    transferProperty(srcLayer.orientation, dstLayer.orientation);
    transferProperty(srcLayer.rotationX, dstLayer.rotationX);
    transferProperty(srcLayer.rotationY, dstLayer.rotationY);
    transferProperty(srcLayer.rotationZ, dstLayer.rotationZ);
  } else {
    transferProperty(srcLayer.rotation, dstLayer.rotation);
  }
  
  transferProperty(srcLayer.scale, dstLayer.scale);
};


//----------------------------------------
var addParent = function(layer, comp) {
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
(function() {
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