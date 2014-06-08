/**
 * transferTransform.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */

//========================================
// Constructor
//========================================
function KeyContainer(valueType) {
  this.propertyValueType = valueType;
  this.keys = [];
}


//========================================
// Functions
//========================================
var isAVLayerInstance = function(layer) {
  return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
};


//----------------------------------------
var collectAllKeyframes = function(prop) {
  if(prop.numKeys === 0) {
    alert("ERROR : collectAllKeyframes()" + "\n" + "- Property.numKeys === 0");
    return null;
  }
  
  var keyContainer = new KeyContainer(prop.propertyValueType);
  var keyTime, keyValue,
      autoBezierT, contBezierT, 
      inEase, outEase, 
      autoBezierS, contBezierS, 
      inTangent, outTangent, 
      roving, 
      inInterp, outInterp;
  
  for(var i = 1; i <= prop.numKeys; i++) {
    keyTime = prop.keyTime(i);
    keyValue = prop.keyValue(i);
    
    autoBezierT = prop.keyTemporalAutoBezier(i);
    contBezierT = prop.keyTemporalContinuous(i);
    inEase = prop.keyInTemporalEase(i);
    outEase = prop.keyOutTemporalEase(i);
  
    if(prop.propertyValueType === PropertyValueType.TwoD_SPATIAL || prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
      autoBezierS = prop.keySpatialAutoBezier(i);
      contBezierS = prop.keySpatialContinuous(i);
      inTangent = prop.keyInSpatialTangent(i);
      outTangent = prop.keyOutSpatialTangent(i);
      roving = prop.keyRoving(i);
    }
    
    inInterp = prop.keyInInterpolationType(i);
    outInterp = prop.keyOutInterpolationType(i);
    
    keyContainer.keys[i - 1] = { "keyIndex": i, "keyTime": keyTime, "keyValue": keyValue, 
                                 "contBezierT": contBezierT, "autoBezierT": autoBezierT, 
                                 "inEase": inEase, "outEase": outEase, 
                                 "contBezierS": contBezierS, "autoBezierS": autoBezierS,
                                 "inTangent": inTangent, "outTangent": outTangent, 
                                 "roving": roving, 
                                 "inInterp": inInterp, "outInterp": outInterp};
  }
  
  return keyContainer;
};

var setKeyframes = function(prop, keyContainer) {
  if(prop.numKeys !== 0) {
    alert("ERROR : setKeyframes()" + "\n" + "- Property.numKeys !== 0");
    return;
  }
  if(prop.propertyValueType !== keyContainer.propertyValueType) {
    alert("ERROR : setKeyframes()" + "\n" + "- Mismatch PropertyValueType.");
    return;
  }
  
  var keys = keyContainer.keys, newKey, roveKeys = [];
  
  for(var i = 0; i < keys.length; i++) {
    newKey = prop.addKey(keys[i].keyTime);
    
    prop.setValueAtKey(newKey, keys[i].keyValue);
    
    prop.setTemporalAutoBezierAtKey(newKey, keys[i].autoBezierT);
    prop.setTemporalContinuousAtKey(newKey, keys[i].contBezierT);
    prop.setTemporalEaseAtKey(newKey, keys[i].inEase, keys[i].outEase);
    
    if(prop.propertyValueType === PropertyValueType.TwoD_SPATIAL || prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
      prop.setSpatialAutoBezierAtKey(newKey, keys[i].autoBezierS);
      prop.setSpatialContinuousAtKey(newKey, keys[i].contBezierS);
      prop.setSpatialTangentsAtKey(newKey, keys[i].inTangent, keys[i].outTangent);
      if(keys[i].roving) roveKeys.push(newKey);
    }
    
    prop.setInterpolationTypeAtKey(newKey, keys[i].inInterp, keys[i].outInterp);
  }
  
  for(var i = 0; i < roveKeys.length; i++)
    prop.setRovingAtKey(roveKeys[i], true);
};

var transferProperty = function(srcProp, destProp) {
  if(srcProp.propertyValueType !== destProp.propertyValueType) {
    alert("ERROR : cloneProperty()" + "\n" + "- Mismatch PropertyValueType.");
    return;
  }
  
  if(destProp.canVaryOverTime && srcProp.numKeys !== 0) {
    var keyContainer = collectAllKeyframes(srcProp);
    if(keyContainer !== null) setKeyframes(destProp, keyContainer);
    
    while(srcProp.numKeys > 0)
      srcProp.removeKey(1);
    srcProp.setValue(destProp.value);
  } else {
    destProp.setValue(srcProp.value);
  }
  /*
  if(destProp.canSetExpression) {
    destProp.expression = srcProp.expression;
    srcProp.expression = "";
  }
  */
};

var transferTransformProperties = function(srcLayer, destLayer) {
  if(srcLayer.threeDLayer !== destLayer.threeDLayer) {
    alert("ERROR : transferTransformProperties()" + "\n" + "- Mismatch Layer Dimention.");
    return;
  }
  
  transferProperty(srcLayer.position, destLayer.position);
  
  if(destLayer.threeDLayer) {
    transferProperty(srcLayer.orientation, destLayer.orientation);
    transferProperty(srcLayer.rotationX, destLayer.rotationX);
    transferProperty(srcLayer.rotationY, destLayer.rotationY);
    transferProperty(srcLayer.rotationZ, destLayer.rotationZ);
  } else {
    transferProperty(srcLayer.rotation, destLayer.rotation);
  }
  
  transferProperty(srcLayer.scale, destLayer.scale);
};


//----------------------------------------
var addParent = function(layer, comp) {
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