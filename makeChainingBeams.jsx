/**
 * makeChainingBeams.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  //========================================
  // Constants
  //========================================
  var CLOSE_PATH = false;
  
  
  //----------------------------------------
  // Expression
  //----------------------------------------
  var expr_get_point_position = """
var num = thisLayer("ADBE Effect Parade").numProperties, 
    baseIndex = effect("- Normalized Offset").propertyIndex;
    startIdx = baseIndex + 1, 
    sldr = effect("Get Point")(1), 
    totalLen = 0, 
    ref = [];

res = [0, 0];

if((num - baseIndex) > 0) {
  var l;
  for(var i=startIdx; i<=num; i++){
    l = length(effect(i)(1), effect(i)(2));
    ref.push(l);
    totalLen += l;
  }

  var point = linear(sldr, 0, 100, 0, totalLen);

  l = 0;
  var start, end, map, vec;
  for(var i=0; i<ref.length; i++){
    l += ref[i];
    if(point < l){
      start = l - ref[i];
      end = l;
      map = linear(point, start, end, 0, 1);
      vec = effect(i + startIdx)(2) - effect(i + startIdx)(1);
      
      res = effect(i + startIdx)(1) + (vec * map);
      break;
    }
  }

  if(sldr >= 100)
    res = effect(num)(2);
}
res;
"""
  
  var expr_offset_point = """
var num = thisLayer("ADBE Effect Parade").numProperties, 
    baseIndex = thisProperty.propertyGroup(1).propertyIndex;
    startIdx = baseIndex + 1, 
    sldr = effect("Line Offset")(1), 
    totalLen = 0, 
    ref = [];

var res = 0; 

if((num - baseIndex) > 0) {
  var l;
  for(var i=startIdx; i<=num; i++){
    l = length(effect(i)(1), effect(i)(2));
    ref.push(l);
    totalLen += l;
  }

  var point = linear(sldr, -100, 100, -totalLen, totalLen);

  l = 0;
  var revIdx, start, end;
  for(var i=0; i<ref.length; i++){
    if(point > 0){
      l += ref[i];
      if(point < l){
        start = l - ref[i] + 0.0001;
        end = l - 0.0001;
        res = i + linear(point, start, end, 0, 1);
        break;
      }
    }else{
      revIdx = ref.length-1 - i;
      l += ref[revIdx];
      if(-point < l){
        start = l - ref[revIdx] + 0.0001;
        end = l - 0.0001;
        res = -(i + linear(-point, start, end, 0, 1));
       break;
      }
    }
  }

  if(!res)
    res = point === 0? 0 : (point < 0? - ref.length : ref.length);
}
res;
""";
  
  var expr_start_point_position = """
var baseProp = effect("- Normalized Offset"), 
    baseIndex = baseProp.propertyIndex, 
    startIndex = baseIndex + 1;
    sldr = baseProp(1), 
    numBeams = thisLayer("ADBE Effect Parade").numProperties - baseIndex;

var res = [0, 0];

if(numBeams > 0) {
  var idx;

  if(sldr < 0){
    if(-sldr < numBeams)
      idx = Math.floor(-sldr) + 1;
    else
      idx = numBeams;
  }else{
    idx = 1;
  }

  var revIdx = numBeams - idx, 
      fxIdx = revIdx + startIndex, 
      start = effect(fxIdx)(1), 
      end = effect(fxIdx)(2);

  var vec;
  if(sldr < 0){
    if(-sldr < numBeams){
      vec = start - end;
      res = end + vec * (-sldr - (idx-1));
    }else{
      res = start;
    }
  }else{
    res = end;
  }
}
res;
""";
  
  var expr_start_point_rotation = """
var baseProp = effect("- Normalized Offset"), 
    baseIndex = baseProp.propertyIndex, 
    startIndex = baseIndex + 1;
    sldr = baseProp(1), 
    numBeams = thisLayer("ADBE Effect Parade").numProperties - baseIndex;

var res = 0;

if(numBeams > 0) {
  var idx;

  if(sldr < 0){
    if(-sldr < numBeams)
      idx = Math.floor(-sldr) + 1;
    else
      idx = numBeams;
  }else{
    idx = 1;
  }

  var revIdx = numBeams - idx, 
      fxIdx = revIdx + startIndex, 
      start = effect(fxIdx)(1), 
      end = effect(fxIdx)(2);

  var vec = start - end;
  res = radiansToDegrees(Math.atan2(vec[1], vec[0]));
}
res;
""";
  
  var expr_end_point_position = """
var baseProp = effect("- Normalized Offset"), 
    baseIndex = baseProp.propertyIndex, 
    sldr = baseProp(1), 
    numBeams = thisLayer("ADBE Effect Parade").numProperties - baseIndex;

var res = [0, 0];

if(numBeams > 0) {
  var idx;

  if(sldr > 0){
    if(sldr < numBeams)
      idx = Math.floor(sldr) + 1;
    else
      idx = numBeams;
  }else{
    idx = 1;
  }

  var fxIdx = idx + baseIndex, 
      start = effect(fxIdx)(1), 
      end = effect(fxIdx)(2);

  var vec;
  if(sldr > 0){
    if(sldr < numBeams){
      vec = end - start;
      res = start + vec * (sldr - (idx-1));
    }else{
      res = end;
    }
  }else{
    res = start;
  }
}
res;
""";
  
  var expr_end_point_rotation = """
var baseProp = effect("- Normalized Offset"), 
    baseIndex = baseProp.propertyIndex, 
    sldr = baseProp(1), 
    numBeams = thisLayer("ADBE Effect Parade").numProperties - baseIndex;

var res = 0;

if(numBeams > 0) {
  var idx;

  if(sldr > 0){
    if(sldr < numBeams)
      idx = Math.floor(sldr) + 1;
    else
      idx = numBeams;
  }else{
    idx = 1;
  }

  var fxIdx = idx + baseIndex, 
      start = effect(fxIdx)(1), 
      end = effect(fxIdx)(2);

  var vec = end - start;
  res = radiansToDegrees(Math.atan2(vec[1], vec[0]));
}
res;
""";
  
  var expr_beam_time = """
var baseProp = effect("- Normalized Offset"), 
    baseIndex = baseProp.propertyIndex, 
    sldr = baseProp(1), 
    num = thisLayer("ADBE Effect Parade").numProperties - baseIndex, 
    idx = thisProperty.propertyGroup(1).propertyIndex - baseIndex;

var res = undefined;

var revIdx;
if(sldr > 0){
  res = linear(sldr - (idx - 1), 0, 1, 50, 100);
}else{
  revIdx = num - idx;
  res = linear(-sldr - revIdx, 0, 1, 50, 0);
}

res;
""";
  
  var expr_beam_thickness = """
var thisFx = thisProperty.propertyGroup(1);
if(thisFx(4) >= 100 || thisFx(4) <= 0)
  0;
else
  effect("Thickness")(1);
""";
  
  
  //========================================
  // Functions
  //========================================
  var addExpressionController = function(matchName, layer, name, value, expr) {
    var ctrl = layer.property("Effects").addProperty(matchName);
    ctrl.name = name;
    ctrl.property(1).setValue(value);
    if(expr !== undefined)
      ctrl.property(1).expression = expr;
    
    return ctrl;
  };
  
  var addBeamEffect = function(layer, name, startLayerName, endLayerName) {
    var beam = layer.property("Effects").addProperty("ADBE Laser");
    beam.name = name;
    // Starting Point
    beam.property(1).expression = "L = thisComp.layer(\"" + startLayerName + "\"); L.toComp(L.anchorPoint)";
    // Ending Point
    beam.property(2).expression = "L = thisComp.layer(\"" + endLayerName + "\"); L.toComp(L.anchorPoint)";
    // Length
    beam.property(3).setValue(1);
    // Time
    beam.property(4).expression = expr_beam_time;
    // Starting Thickness
    beam.property(5).expression = expr_beam_thickness;
    // Ending Thickness
    beam.property(6).expression = expr_beam_thickness;
    // Softness
    beam.property(7).setValue(0);
    // Inside Color
    beam.property(8).expression = """effect("Color")(1)""";
    // Outside Color
    beam.property(9).expression = """effect("Color")(1)""";
    // 3D Perspective
    beam.property(10).setValue(0);
    // Composit On Original
    beam.property(11).setValue(1);
  };
  
  var addSetMatteEffect = function(layer) {
    var fx = layer.property("Effects").addProperty("ADBE Set Matte3");
    fx.name = "- Set Matte";
    // Teke Matt From Layer
    fx.property(1).setValue(0);
    // Use For Matte
    fx.property(2).setValue(10);
    // Invert Matte
    fx.property(3).setValue(0);
    // Stretch Matte to Fit
    fx.property(4).setValue(0);
    // Composite Matte with Original
    fx.property(5).setValue(0);
    // Premultiply Matte Layer
    fx.property(6).setValue(0);
  };
  
  var makeContext = function(comp) {
    
    var ctxName, ctxCounter = 0;
    do {
      ctxCounter += 1;
      ctxName = "Beams Context " + ctxCounter;
    }while(comp.layer(ctxName) !== null)
    
    var ctx = comp.layers.addSolid([0, 0, 0], "Beams Context Solid", comp.width, comp.height, comp.pixelAspect);
    ctx.name = ctxName;
    
    addExpressionController("ADBE Color Control", ctx, "Color", [1, 1 ,1]);
    addExpressionController("ADBE Slider Control", ctx, "Thickness", 4);
    addExpressionController("ADBE Slider Control", ctx, "Line Offset", 0);
    addExpressionController("ADBE Slider Control", ctx, "Get Point", 0);
    
    addExpressionController("ADBE Point Control", ctx, "Get Point Position", [0, 0]);
    addExpressionController("ADBE Point Control", ctx, "Start Point Position", [0, 0]);
    addExpressionController("ADBE Angle Control", ctx, "Start Point Rotation", 0);
    addExpressionController("ADBE Point Control", ctx, "End Point Position", [0, 0]);
    addExpressionController("ADBE Angle Control", ctx, "End Point Rotation", 0);
    
    addSetMatteEffect(ctx);
    addExpressionController("ADBE Slider Control", ctx, "- Normalized Offset", 0, expr_offset_point);
    
    ctx.property("Effects").property(5).property(1).expression = expr_get_point_position;
    ctx.property("Effects").property(6).property(1).expression = expr_start_point_position;
    ctx.property("Effects").property(7).property(1).expression = expr_start_point_rotation;
    ctx.property("Effects").property(8).property(1).expression = expr_end_point_position;
    ctx.property("Effects").property(9).property(1).expression = expr_end_point_rotation;
    
    return ctx;
  };
  
  
  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length < 2) return;
  
  app.beginUndoGroup("Make Chaining Beams");
  
  var selLayers = comp.selectedLayers;
  
  var ctx = makeContext(comp);
  for(var i = 0; i < selLayers.length - 1; i++) {
    addBeamEffect(ctx, "Beam " + (i + 1), selLayers[i].name, selLayers[i + 1].name);
  }
  
  if(CLOSE_PATH)
    addBeamEffect(ctx, "Beam " + (i + 1), selLayers[selLayers.length - 1].name, selLayers[0].name);
  
  app.endUndoGroup();

})();