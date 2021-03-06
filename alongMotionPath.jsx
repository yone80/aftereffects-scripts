﻿/**
 * railMotionPath.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  //========================================
  // Constants
  //========================================
  // Expression
  //----------------------------------------
  var EXP_POSITION = """res = value;
L = null; try{L = effect("Motion Path Layer")(1);}catch(e){}
offset = 0; try{offset = L.effect("Offset All")(1);}catch(e){}
if(L !== null){
  inP = L.inPoint; outP = L.outPoint;
  offset = (offset + effect("Offset")(1)) % 100;
  t = linear(offset, 0, 100, inP, outP);
  res = L.toWorld(L.anchorPoint, t);
}
res;""";

  var EXP_POSITION_2D3D = """res = value;
L = null; try{L = effect("Motion Path Layer")(1);}catch(e){}
offset = 0; try{offset = L.effect("Offset All")(1);}catch(e){}
if(L !== null){
  inP = L.inPoint; outP = L.outPoint;
  offset = (offset + effect("Offset")(1)) % 100;
  t = linear(offset, 0, 100, inP, outP);
  res = L.toComp(L.anchorPoint, t);
}
res;""";

  var EXP_ORIENTATION = """res = value;
current = toWorld(anchorPoint);
L = null; try{L = effect("Motion Path Layer")(1);}catch(e){}
offset = 0; try{offset = L.effect("Offset All")(1);}catch(e){}
if(L !== null){
  inP = L.inPoint; outP = L.outPoint;
  offset = (offset + effect("Offset")(1)) % 100;
  t = linear(offset, 0, 100, inP, outP);
  next = L.toWorld(L.anchorPoint, t + 0.001);
  res = lookAt(current, next);
}
res;""";

  var EXP_ROTATION = """res = value;
current = toWorld(anchorPoint);
L = null; try{L = effect("Motion Path Layer")(1);}catch(e){}
offset = 0; try{offset = L.effect("Offset All")(1);}catch(e){}
if(L !== null){
  inP = L.inPoint; outP = L.outPoint;
  offset = (offset + effect("Offset")(1)) % 100;
  t = linear(offset, 0, 100, inP, outP);
  len = L.toWorld(L.anchorPoint, t + 0.001) - current;
  res += radiansToDegrees(Math.atan2(len[1], len[0]));
}
res;""";

  var EXP_ROTATION_2D3D = """res = value;
current = toWorld(anchorPoint);
L = null; try{L = effect("Motion Path Layer")(1);}catch(e){}
offset = 0; try{offset = L.effect("Offset All")(1);}catch(e){}
if(L !== null){
  inP = L.inPoint; outP = L.outPoint;
  offset = (offset + effect("Offset")(1)) % 100;
  t = linear(offset, 0, 100, inP, outP);
  len = L.toComp(L.anchorPoint, t + 0.001) - current;
  res += radiansToDegrees(Math.atan2(len[1], len[0]));
}
res;""";


  //========================================
  // Functions
  //========================================
  var instanceOfAVLayer = function(layer) {
    return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
  };

  var addExpressionController = function(layer, name, value, matchName) {
    if(layer.property("ADBE Effect Parade").property(name) !== null) return;
    
    var ctrl = layer.property("ADBE Effect Parade").addProperty(matchName);
    ctrl.name = name;
    ctrl.property(1).setValue(value);
  };

  var setupLayer = function(layer, refLayer) {
    if(!instanceOfAVLayer(layer)) return;
    
    var dimCheck = null;
    
    if(layer.threeDLayer && refLayer.threeDLayer)
      dimCheck = "3D3D";
    else if(!layer.threeDLayer && !refLayer.threeDLayer)
      dimCheck = "2D2D";
    else if(!layer.threeDLayer && refLayer.threeDLayer)
      dimCheck = "2D3D";
      
    switch(dimCheck) {
      case "3D3D":
        layer.property("ADBE Transform Group").property("ADBE Position").expression = EXP_POSITION;
        layer.property("ADBE Transform Group").property("ADBE Orientation").expression = EXP_ORIENTATION;
        break;
      case "2D2D":
        layer.property("ADBE Transform Group").property("ADBE Position").expression = EXP_POSITION;
        layer.property("ADBE Transform Group").property("ADBE Rotate Z").expression = EXP_ROTATION;
        break;
      case "2D3D":
        layer.property("ADBE Transform Group").property("ADBE Position").expression = EXP_POSITION_2D3D;
        layer.property("ADBE Transform Group").property("ADBE Rotate Z").expression = EXP_ROTATION_2D3D;
        break;
    }
    
    if(dimCheck !== null) {
      addExpressionController(layer, "Motion Path Layer", refLayer.index, "ADBE Layer Control");
      addExpressionController(layer, "Offset", 0, "ADBE Slider Control");
    }
  };

  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length < 2) return;
  
  app.beginUndoGroup("Along Motion Path");
  
  var selLayers = comp.selectedLayers.slice(0, -1), 
      refLayer = comp.selectedLayers[comp.selectedLayers.length - 1];
  
  if(!instanceOfAVLayer(refLayer)) return;  
  addExpressionController(refLayer, "Offset All", 0, "ADBE Slider Control");
  
  for(var i = 0; i < selLayers.length; i++)
    setupLayer(selLayers[i], refLayer);
  
  app.endUndoGroup();
  
})();