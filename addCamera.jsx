/**
 * addCamera.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  var addExpressionController = function(layer, name, value, matchName) {
    if(layer.property("Effects").property(name) !== null) return;
    
    var ctrl = layer.property("Effects").addProperty(matchName);
    ctrl.name = name;
    ctrl.property(1).setValue(value);
  };


  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  
  app.beginUndoGroup("Add Camera");
  
  var zoom = 995.5556, 
      camPos = [comp.width / 2, comp.height / 2, -zoom], 
      nameIdx = 1, 
      cam,
      pivots = new Array(2), 
      ctrl;
  
  while(comp.layer("Camera " + nameIdx) !== null) {nameIdx++;}
  
  
  //----------------------------------------
  // Add Layers
  //----------------------------------------  
  cam = comp.layers.addCamera("Camera " + nameIdx, [camPos[0], camPos[1]]);
  cam.autoOrient = AutoOrientType.NO_AUTO_ORIENT;
  
  cam.property("Camera Options").property("Zoom").setValue(zoom);
  cam.position.setValue(camPos);
  
  pivots[0] = comp.layers.addNull();
  pivots[0].name = "Cam " + nameIdx + " X-OrbitX";
  pivots[0].threeDLayer = true;
  
  pivots[1] = pivots[0].duplicate();
  pivots[1].name = "Cam " + nameIdx + " Y-OrbitY";
  
  ctrl = pivots[1].duplicate();
  ctrl.name = "Camera " + nameIdx + " Controller";
  
  cam.parent = pivots[0];
  pivots[0].parent = pivots[1];
  pivots[1].parent = ctrl;
  
  
  //----------------------------------------
  // Add Controllers
  //----------------------------------------
  addExpressionController(ctrl, "Heading", 0, "ADBE Angle Control");
  addExpressionController(ctrl, "Pitch", 0, "ADBE Angle Control");
  addExpressionController(ctrl, "Bank", 0, "ADBE Angle Control");
  addExpressionController(ctrl, "Orbit X", 0, "ADBE Angle Control");
  addExpressionController(ctrl, "Orbit Y", 0, "ADBE Angle Control");
  addExpressionController(ctrl, "Orbit Distance", zoom, "ADBE Slider Control");
  addExpressionController(ctrl, "Zoom", zoom, "ADBE Slider Control");
  addExpressionController(ctrl, "Focus Shift", 0, "ADBE Slider Control");
  addExpressionController(ctrl, "Aperture", 14.1732, "ADBE Slider Control");
  
  
  //----------------------------------------
  // Add Expressions
  //----------------------------------------
  cam.position.expression = "[0, 0, -thisComp.layer(\"" + ctrl.name + "\").effect(\"Orbit Distance\")(1)]";
  cam.property("Camera Options").property("Zoom").expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Zoom\")(1)";
  cam.property("Camera Options").property("Focus Distance").expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Orbit Distance\")(1) + thisComp.layer(\"" + ctrl.name + "\").effect(\"Focus Shift\")(1)";
  cam.property("Camera Options").property("Aperture").expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Aperture\")(1)";
  
  pivots[0].rotationX.expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Orbit X\")(1)";
  pivots[1].rotationY.expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Orbit Y\")(1)";
  
  cam.rotationX.expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Pitch\")(1)";
  cam.rotationY.expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Heading\")(1)";
  cam.rotationZ.expression = "thisComp.layer(\"" + ctrl.name + "\").effect(\"Bank\")(1)";
  
  ctrl.rotationZ.expression = "0";
    
  
  //----------------------------------------
  // Enabled - Shy - Locked
  //----------------------------------------
  for(var i = 0; i < pivots.length; i++) {
    pivots[i].enabled = false;
    pivots[i].shy = true;
    pivots[i].locked = true;
  }
  comp.hideShyLayers = true;
  
  app.endUndoGroup();
})();