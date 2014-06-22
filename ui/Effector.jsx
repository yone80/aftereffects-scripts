/**
 * Efector.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */

(function(thisObj) {
  //----------------------------------------
  // UI Variable
  //----------------------------------------
  var cb_use_indicator, 
      cb_set_position, 
      cb_set_rotation, 
      cb_set_scale,
      cb_set_opacity, 
      ddl_layers_controler,
      ddl_layers_reference;


  //========================================
  // Expressions
  //========================================
  var expr_distance = 
  """state = false;
  var ref, ctrl, range, rndAmp, linearAtt, t;

  ref = ctrl = null;
  try{
    ref = effect("Reference Layer")(1);
    ctrl = effect("Effector Layer")(1);
    range = ctrl.effect("Range")(1);
    rndAmp = ctrl.effect("Random Amplitude")(1);
    seedRandom(ctrl.effect("Random Seed")(1), true);
    linearAtt = ctrl.effect("Linear Attenuation")(1);
    
    state = true;
  } catch(err) {}

  state = state && ref.effect !== undefined && (ctrl.effect("Enable")(1) == 1);
  res = 0;

  if(state) {
    ctrlWP = ctrl.toWorld(ctrl.anchorPoint);
    targetWP = toWorld(anchorPoint, -1000);
    if(linearAtt == 0){
      len = length(ctrlWP, targetWP);
      completion = linear(len, 0, range, 0, 1);
    }else{
      facing = dot(ctrl.toWorldVec([0, 0, -1]),  (targetWP - ctrlWP));
      facing += random() * rndAmp;
      completion = linear(facing, 0, range, 0, 1);
    }

    res = linear(completion, 0, 1, ref.inPoint, ref.outPoint);
  }

  res;""";

  var expr_base = 
  """var state = false;
  var ref, ctrl;

  ref = ctrl = null;
  try{
    ref = effect("Reference Layer")(1);
    ctrl = effect("Effector Layer")(1);
    
    state = true;
  } catch(err) {}

  state = state && (ctrl.effect("Enable")(1) == 1);

  var result = value, 
      t = effect("Distance from Controller")(1);
  """;

  var expr_pos = 
  """
  if(state)
    result += ref.position.valueAtTime(t) - [thisComp.width / 2, thisComp.height / 2, 0];

  result;""";

  var expr_rotX = 
  """
  if(state)
    result += ref.rotationX.valueAtTime(t);

  result;""";

  var expr_rotY = 
  """
  if(state)
    result += ref.rotationY.valueAtTime(t);

  result;""";

  var expr_rotZ = 
  """
  if(state)
    result += ref.rotationZ.valueAtTime(t);

  result;""";

  var expr_scale = 
  """
  if(state){
    var scaleAmp = ref.scale.valueAtTime(t) * 0.01;
    if(scaleAmp.length === 3)
      result = [value[0] * scaleAmp[0], value[1] * scaleAmp[1], value[2] * scaleAmp[2]];
    else
      result = [value[0] * scaleAmp[0], value[1] * scaleAmp[1]];
  }

  result;""";

  var expr_oapacity = 
  """
  if(state){
    var opacityAmp = ref.opacity.valueAtTime(t) * 0.01;
    result = value * opacityAmp;
  }

  result;""";

  //========================================
  // Utilities
  //========================================
  var forEachSelectedLayers = function(callback) {
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;
    
    var selLayers = comp.selectedLayers;
    for(var i = 0; i < selLayers.length; i++) {
      callback(selLayers[i], comp);
    }
  };

  var forEachCompLayers = function(callback) {
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;
    
    var layers = comp.layers;
    for(var i = 1; i <= layers.length; i++) {
      callback(layers[i], comp);
    }
  };


  //========================================
  // Functions
  //========================================
  // Expression Controls Shortcut
  //----------------------------------------
  var addExpressionController = function(matchName, layer, name, value, expr) {
    var ctrl = layer.property("Effects").addProperty(matchName);
    ctrl.name = name;
    ctrl.property(1).setValue(value);
    if(expr !== undefined)
      ctrl.property(1).expression = expr;
    
    return ctrl;
  };


  //----------------------------------------
  var addControlLayer = function(comp, idx) {
    var l = comp.layers.addNull();
    l.name = "Effector-" + idx.toString();
    l.label = 10;
    l.threeDLayer = true;
    l.rotationY.setValue(90);
    
    addExpressionController("ADBE Slider Control", l, "Range", 400);
    addExpressionController("ADBE Slider Control", l, "Random Amplitude", 0);
    addExpressionController("ADBE Slider Control", l, "Random Seed", 1234);
    addExpressionController("ADBE Checkbox Control", l, "Linear Attenuation", 1);
    addExpressionController("ADBE Checkbox Control", l, "Enable", 1);
    
    
    return l;
  };

  var addIndicatorLayer = function(comp, idx, controller) {
    var l = comp.layers.addSolid([0, 0, 0], "Indicator-" + idx.toString(), comp.width, comp.height, comp.pixelAspect);
    l.name = "Indicator-" + idx.toString();
    l.label = 10;
    l.guideLayer = true;
    l.locked = true;
    
    var ctrlName = controller.name;
    var startPointExp = "L = thisComp.layer(\"" + ctrlName + "\"); L.toComp(L.anchorPoint);";
    var endPointExp = "L = thisComp.layer(\"" + ctrlName + "\"); range = L.effect(\"Range\")(1); L.toComp(L.anchorPoint + [0, 0, -range]);";
    
    var beam = l.property("Effects").addProperty("ADBE Laser");
    //beam.name = "";
    beam.property(1).expression = startPointExp;
    beam.property(2).expression = endPointExp;
    beam.property(3).setValue(1);
    beam.property(4).setValue(0.5);
    beam.property(5).setValue(2);
    beam.property(6).setValue(2);
    beam.property(7).setValue(0);
    beam.property(8).setValue([1, 1, 1]);
    beam.property(9).setValue([1, 1, 1]);
    beam.property(10).setValue(false);
    
    var circle1 = l.property("Effects").addProperty("ADBE Circle");
    //circle.name = "";
    circle1.property(1).expression = startPointExp;
    circle1.property(2).setValue(18);
    circle1.property(3).setValue(1);
    circle1.property(12).setValue(2);
    
    var circle2 = l.property("Effects").addProperty("ADBE Circle");
    //circle.name = "";
    circle2.property(1).expression = endPointExp;
    circle2.property(2).setValue(8);
    circle2.property(12).setValue(2);
    
    return l;
  };

  var setupLayer = function(layer, comp) {
    if(layer.matchName == "ADBE Camera Layer" || layer.matchName == "ADBE Light Layer") return;
    if(!layer.threeDLayer) {
      alert(layer.name + " is not 3DLayer");
      return;
    }
    
    layer.label = 9;
    
    var ddlCtrlSel = ddl_layers_controler.selection;
    var ctrlLayerIdx = ddlCtrlSel == 0? 0 : comp.layer(ddlCtrlSel).index;
    
    var ddlRefSel = ddl_layers_reference.selection;
    var refLayerIdx = ddlRefSel == 0? 0 : comp.layer(ddlRefSel).index;
   
    if(layer.effect("Effector Layer") == null)
      addExpressionController("ADBE Layer Control", layer, "Effector Layer", ctrlLayerIdx);
    else
      layer.effect("Effector Layer")(1).setValue(ctrlLayerIdx);
    
    if(layer.effect("Reference Layer") == null)
      addExpressionController("ADBE Layer Control", layer, "Reference Layer", refLayerIdx);
    else
      layer.effect("Reference Layer")(1).setValue(refLayerIdx);
    
    if(layer.effect("Distance from Controller") == null)
      addExpressionController("ADBE Slider Control", layer, "Distance from Controller", 0);
    
    layer.effect("Distance from Controller")(1).expression = expr_distance;
   
    if(cb_set_position.value)
      layer.position.expression = expr_base + expr_pos;
    
    if(cb_set_rotation.value) {
      layer.rotationX.expression = expr_base + expr_rotX;
      layer.rotationY.expression = expr_base + expr_rotY;
      layer.rotationZ.expression = expr_base + expr_rotZ;
    }
    
    if(cb_set_scale.value)
      layer.scale.expression = expr_base + expr_scale;
    
    if(cb_set_opacity.value)
      layer.opacity.expression = expr_base + expr_oapacity;
  };

  //----------------------------------------
  var refreshLayersList = function(list) {
    list.removeAll();
    var selItem = list.add("item", "None");
    list.add("separator");
    
    forEachCompLayers(function(layer, comp) {
      if(layer.matchName == "ADBE Camera Layer" || layer.matchName == "ADBE Light Layer") return;
      
      list.add("item", layer.name);
    });
    
    list.selection = selItem;
  }


  //========================================
  // Handler
  //========================================
  var addController = function() {
    app.beginUndoGroup("Add Effector");
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;
    
    var idx = 1;
    while(comp.layer("Effector-" + idx) !== null) {idx++;}
    var ctrl = addControlLayer(comp, idx);
    if(cb_use_indicator.value)
      addIndicatorLayer(comp, idx, ctrl);
    app.endUndoGroup();
  };

  var setupLayers = function() {
    app.beginUndoGroup("Setup Layers");
    
    forEachSelectedLayers(setupLayer);
    
    app.endUndoGroup();
  };

  var refleshLists = function() {
    refreshLayersList(ddl_layers_controler);
    refreshLayersList(ddl_layers_reference);
  };


  //========================================
  // Main
  //========================================
  var buildUI = function(owner) {
    var frame = (owner instanceof Panel)? thisObj : new Window("palette", "My window name", undefined);
    frame.onResizing = frame.onResize = function(){this.layout.resize()};
    frame.alignChildren = ["fill", "top"];
    frame.margins = 6;
    frame.spacing = 4;
    
    //----------------------------------------
    var grp_controller = frame.add("panel");
    grp_controller.text = "Effector";
    
    grp_controller.alignChildren = ["left", "top"];
    grp_controller.orientation = "row";
    grp_controller.margins = [4, 12,  4, 6];
    
    var btn = grp_controller.add("button", undefined, "Add Effector");
    btn.preferredSize.height = 22;
    btn.onClick = addController;
    
    cb_use_indicator = grp_controller.add("checkbox", undefined, "Indicator");
    cb_use_indicator.alignment = ["center", "center"];
    cb_use_indicator.value = true;
    
    
    //----------------------------------------
    var grp_layers = frame.add("panel");
    grp_layers.text = "Layers";
    
    grp_layers.alignChildren = ["left", "top"];
    grp_layers.orientation = "column";
    grp_layers.margins = [4, 12,  4, 6];
    
    var grp_layers_cb = grp_layers.add("group");
    grp_layers_cb.orientation = "row";
    grp_layers_cb.margins = 2;
    
    cb_set_position = grp_layers_cb.add("checkbox", undefined, "P");
    cb_set_position.value = true;
    cb_set_rotation = grp_layers_cb.add("checkbox", undefined, "R");
    cb_set_rotation.value = true;
    cb_set_scale = grp_layers_cb.add("checkbox", undefined, "S");
    cb_set_scale.value = true;
    cb_set_opacity = grp_layers_cb.add("checkbox", undefined, "O");
    cb_set_opacity.value = true;
    
    
    var btn2 = grp_layers.add("button", undefined, "Refresh Lists");
    btn2.preferredSize.height = 22;
    btn2.onClick = refleshLists;
    
    ddl_layers_controler = grp_layers.add("dropdownlist");
    ddl_layers_controler.title = "Effector Layer:";
    ddl_layers_controler.preferredSize.height = 18;
    ddl_layers_controler.alignment = ["fill", "center"];
    
    ddl_layers_reference = grp_layers.add("dropdownlist");
    ddl_layers_reference.title = "Reference Layer:";
    ddl_layers_reference.preferredSize.height = 18;
    ddl_layers_reference.alignment = ["fill", "center"];
    
    var btn3 = grp_layers.add("button", undefined, "Setup Layers");
    btn3.preferredSize.height = 22;
    btn3.alignment = ["fill", "center"];
    btn3.onClick = setupLayers;
    
    refleshLists();
    frame.layout.layout(true);
    
    return frame;
  }
  
  var myScriptPanel = buildUI(thisObj);
  
  if((myScriptPanel != null) && (myScriptPanel instanceof Window)) {
    myScriptPanel.center();
    myScriptPanel.show();
  }
  
})(this);
