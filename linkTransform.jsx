/**
 * linkTransform.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  //========================================
  // Constants
  //========================================
  // Expression
  //----------------------------------------
  var expHead = """res = value;
L = null; try{L = effect("Reference Layer")(1);}catch(e){}
rndAmp = 0; try{rndAmp = L.effect("Random Amp")(1);}catch(e){}
if(L != null){
  seedRandom(effect("Random Seed")(1) + index, true);
  rnd = random(rndAmp) - rndAmp * 0.5;
  offset = effect("Offset Time")(1);""";

  var expTail = """
}
res;""";

  var expPos = expHead +
               "\n  res += L.position.valueAtTime(time - offset + rnd) - [thisComp.width / 2, thisComp.height / 2, 0];" + 
               expTail;

  var expRot = expHead +
               "\n  res += L.rotation.valueAtTime(time - offset + rnd);" + 
               expTail;

  var expRotX = expHead +
                "\n  res += L.rotationX.valueAtTime(time - offset + rnd);" + 
                expTail;

  var expRotY = expHead +
                "\n  res += L.rotationY.valueAtTime(time - offset + rnd);" + 
                expTail;

  var expRotZ = expHead +
                "\n  res += L.rotationZ.valueAtTime(time - offset + rnd);" + 
                expTail;

  var expScale3D = expHead +
                   "\n  refScale = L.scale.valueAtTime(time - offset + rnd);" + 
                   "\n  res *= 0.01;" + 
                   "\n  res = [refScale[0] * res[0], refScale[1] * res[1], refScale[2] * res[2]];" + 
                   expTail;

  var expScale = expHead +
                 "\n  refScale = L.scale.valueAtTime(time - offset + rnd);" + 
                 "\n  res *= 0.01;" + 
                 "\n  res = [refScale[0] * res[0], refScale[1] * res[1]];" + 
                 expTail;

  var expOpacity = expHead +
                   "\n  res = (res * 0.01) * L.opacity.valueAtTime(time - offset + rnd);" + 
                   expTail;


  //========================================
  // Functions
  //========================================
  var instanceOfAVLayer = function(layer) {
    return (layer instanceof AVLayer) || (layer instanceof ShapeLayer) || (layer instanceof TextLayer);
  };

  var addExpressionController = function(layer, name, value, matchName) {
    if(layer.property("Effects").property(name) !== null) return;
    
    var ctrl = layer.property("Effects").addProperty(matchName);
    ctrl.name = name;
    ctrl.property(1).setValue(value);
  };


  //----------------------------------------
  var setupLayer = function(layer, refLayer) {
    if(!instanceOfAVLayer(layer)) return;
    
    var dimCheck = null;
    
    if(layer.threeDLayer && refLayer.threeDLayer)
      dimCheck = "3D3D";
    else if(!layer.threeDLayer && !refLayer.threeDLayer)
      dimCheck = "2D2D";
      
    switch(dimCheck) {
      case "3D3D":
        layer.rotationX.expression = expRotX;
        layer.rotationY.expression = expRotY;
        layer.rotationZ.expression = expRotZ;
        layer.scale.expression = expScale3D;
        break;
      case "2D2D":
        layer.rotation.expression = expRot;
        layer.scale.expression = expScale;
        break;
    }
    
    if(dimCheck !== null) {
      layer.position.expression = expPos;
      layer.opacity.expression = expOpacity;
      
      addExpressionController(layer, "Reference Layer", refLayer.index, "ADBE Layer Control");
      addExpressionController(layer, "Offset Time", 0, "ADBE Slider Control");
      addExpressionController(layer, "Random Seed", 12345, "ADBE Slider Control");
    }
  };

  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length < 2) return;
  
  app.beginUndoGroup("Link Transform");
  
  var selLayers = comp.selectedLayers.slice(0, -1), 
      refLayer = comp.selectedLayers[comp.selectedLayers.length - 1];
  
  if(!instanceOfAVLayer(refLayer)) return;
  addExpressionController(refLayer, "Random Amp", 0, "ADBE Slider Control");
  
  for(var i = 0; i < selLayers.length; i++)
    setupLayer(selLayers[i], refLayer);
  
  app.endUndoGroup();
  
})();