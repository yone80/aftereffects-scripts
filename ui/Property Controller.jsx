/**
 * Property Controller.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function(thisObj) {
  
  //========================================
  // Constants
  //========================================
  var binary_icon_set = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01#IDATx\u00DA\u00ECU\x0B\r\u00C20\x10]\t\x02&a8\u00A8\u0084\u00E1\x00\x1C\u00E0\u0080\u00A0`A\x01\x12\u0086\x03p\x00\x0E\u00C0\x018\x18\nV\u00DE\u00C1\x1B\u00B947\u00BE\x01\x12B\u0093\u0097u\u00BD\u00EB{\u00BD\u00F6\u00AEu!\u0084\u00E4\x1B\u00AD\u0093|\u00A9\u00FD\u0085?\u00D6\u00BA\u00D6 \x12.\u00C3'\u00E3\u00EF\u00C19\u00B7}\u00AB0\x04S|\x16\x14\u00DD+S\u00FF^Bp\u00CC\u00B8\u00D8\u00E9#\x117\u0093z/\x04\u00E3\u0081\u00F5\u00A3g\x1CGjF\x04T\u00E1\u00DCJ\u00EER3\u00BE\u00A2\u00F0H\u00FA\u00C4\u00A8\u008D\u00E8\u0082\u00BA\u00AE\x07@\x00J \u00D36\u00DA\x0B`\x03\u00A4\u00C4B|i\u00F3@N{\u00C9~n\u00F1\u009C.-\u0083\\\u009CW\u00D6\x02\u00D0\u00DF\u00C9\u00E2\"\u00DF*\u009A/s\x0BK\u00EC\u00AA\u00B0\"\u00F0$\u00A9$:\u008E\x05\x0B\u00CF\b\u00B7\u00D61Kh\b\u00A4<\u00B7K\u0086\u00BB\u00A8\u00BD|\u00814\u0089\x12eh\u00A2\x12n\t\u008C\u00EF\u00E0\u00CDn98\u00FD:1+uf\u008B\u00F0\x04A\u00CD\u00D5\u00C5\u00D2\u00D4\u00F9V\u00EDN_q\f\u00E8#\u00F6\u0083\u0094\u0096U\u00D3.~\x16\u00F1\u009F+\u00C2uK%x\x1E\u0081\u00E9\u00C3\u009D\u00F3\u00D78\u00DC\u00FF=\u00FEy\u00E1\u00A3\x00\x03\x00\u00D4f\u008B\u00D4\u00DC\u00BDW\u00FE\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_add = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00bIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\u00E3\u00A8\u0081\u0083\u00CF@&B\n\u0080\x16:\x00q=\u00D1&\u0082\\\u0088\x0F\u00FF\u00FB\u00F7\u00AF\x1E\u0088\u00FF\x13R\x07\u00C3L\fT\x06T7\x10\u00977\u00FF\x13\u00C0\u00F5\u00B8\u00BC\u008C5\u0096A\x11\u0081\u00C4\u008D\x07\u00E2\x04 vD\x12{\u00C0\u00C8\u00C8\u00F8`\u00F8F\u00CAC >0\u009A\u0097\u0087\u00B0\u0081\x00\x01\x06\x00\u00CB\x0E\u00F0\u00E5\u00D1\x00_2\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_sub = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00AIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081\u00A3\x06\x0Ej\x03\u00819\u00A8\u00FE?&\u00D8O\u00C8@F\\Y\x0F(\u00AE\x00\u00A4\x14\u00D0\u0084?022^ \u00CB\u00C0\u00D1X\x1E5\u0090\u008E\x06\x02\x04\x18\x00\u00F6T%E\u009B\u00D1>?\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_mul = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00\u009AIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\u00E3\u00A8\u0081\u0083\u00CF@&\\\x12@\u008B\x04\u0088\x11#\u00CA@\u00A0F\x05 u\x1FH'\u00A0\x19\u00B6\x1FH\u00D7\u00E35\x11\u00E4el\u00F8\u00DF\u00BF\x7F\u00F3\u0081\u00F8?\x10'\x00\u00B1\x00\x10\u009F\u0087b\x01\\z\u00C0\u00C1\u0087O\x12\u00C9\u00D0\u00FB\u00C4\x18F\u008C\u0081 \u0097\u00BD\u0087\x1AZ@\u00C80\u00BC\x06\u00A2y\x13\u00EE}B\x06\u00B2\u00E0\u0089\u00E1\u00FDP\u00AE###\u00E3\x07h\u00F2\u009A\x0F\u00A2\u0081\u00FC\x05\u00B8\u00E2\u0084\x05O|]\x00\u00E2B\u0090a\u00E0\x04\u00CB\u00C8\u0098\b4\u00EC\x03T|4\u00EB\u008Dh\x03\x01\x02\f\x00\u00DE\u0082HP3\x00A*\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_div = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00yIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081t0\x10\u0098\n\u00FA\u0081x=\x10\x0B\x10e\"(\u00D9\u00E0\u00C3\u00FF\u00FE\u00FD\u00FB\x0F\u00C5\x0E\u0084\u00D4\u00820\x0B\x11v\x06\x02\u00B1\x02##\u00E3\x01b\x1C\u00C8H\u0097\u0084\u00FD\u009F0p\u00C0e ./;\x12p\u00C8\x05\u00B2\u00BD\f\u0094W\x00R\x02\u00C00\u00BC@\u00ADX~\x0F\u008De\x03bb\u0099\u0098\u0084\u00FD\x00\u0088?@\u00F1 \u0089\u00E5Q\x03I\x02\x00\x01\x06\x00\x18\u00F3\u00BER[\u00A5\u00C7\u0099\x00\x00\x00\x00IEND\u00AEB`\u0082";

  var PATH_DEPTH = 6, 
      PATH_NUM_ROW = Math.ceil(PATH_DEPTH / 2);


  //========================================
  // Functions
  //========================================
  // Utilities
  //----------------------------------------
  var rgbToHex = function(r, g, b) {
    var rgb = b | (g << 8) | (r << 16);
    return rgb //(0x1000000 | rgb).toString(16).slice(1);
  };

  var hexToRGB = function(hexColor) {
    var r = hexColor >> 16;
    var g = (hexColor & 0x00ff00) >> 8;
    var b = hexColor & 0xff;
    return [r, g, b];
  };

  var isNumber = function(obj) {
    if(typeof(obj) != "number" && typeof(obj) != "string")
      return false;
    else
      return obj == parseFloat(obj) && isFinite(obj);
  }


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

  var shiftPropertyValue = function(property, newValue, propertyValueType) {
    if(property.propertyType === PropertyType.PROPERTY && 
       property.propertyValueType === propertyValueType) 
    {
      if(property.canVaryOverTime && property.numKeys > 0) {
        var propValue = property.value, 
            keyValue, diff;
        
        if(property.propertyValueType === PropertyValueType.ThreeD_SPATIAL || 
           property.propertyValueType === PropertyValueType.ThreeD)
        {
          diff = [newValue[0] - propValue[0], 
                  newValue[1] - propValue[1], 
                  newValue[2] - propValue[2]];
          
          for(var k = 1; k <= property.numKeys; k++) {
            keyValue = property.keyValue(k);
            property.setValueAtKey(k, [keyValue[0] + diff[0], 
                                       keyValue[1] + diff[1], 
                                       keyValue[2] + diff[2]]);
          }
        }
         
        if(property.propertyValueType === PropertyValueType.TwoD_SPATIAL || 
           property.propertyValueType === PropertyValueType.TwoD)
        {
          diff = [newValue[0] - propValue[0], 
                  newValue[1] - propValue[1]];
          
          for(var k = 1; k <= property.numKeys; k++) {
            keyValue = property.keyValue(k);
            property.setValueAtKey(k, [keyValue[0] + diff[0], 
                                       keyValue[1] + diff[1]]);
          }
        }
       
        if(property.propertyValueType === PropertyValueType.OneD) {
          diff = newValue - property.value;
          
          for(var k = 1; k <= property.numKeys; k++)
            property.setValueAtKey(k, property.keyValue(k) + diff);
        }
      } else {
        property.setValue(newValue);
      }
    }
  };


  //----------------------------------------
  // Number Array Operator
  //----------------------------------------
  var opSet = function(oldValue, newValue) {
    var res = [];
    for(var i = 0; i < oldValue.length; i++)
      res[i] = (newValue[i] !== null)? newValue[i] : oldValue[i];
    return res;
  }

  var opAdd = function(oldValue, newValue) {
    var res = [];
    for(var i = 0; i < oldValue.length; i++)
      res[i] = (newValue[i] !== null)? oldValue[i] + newValue[i] : oldValue[i];
    return res;
  }

  var opSub = function(oldValue, newValue) {
    var res = [];
    for(var i = 0; i < oldValue.length; i++)
      res[i] = (newValue[i] !== null)? oldValue[i] - newValue[i] : oldValue[i];
    return res;
  }

  var opMul = function(oldValue, newValue) {
    var res = [];
    for(var i = 0; i < oldValue.length; i++)
      res[i] = (newValue[i] !== null)? oldValue[i] * newValue[i] : oldValue[i];
    return res;
  }

  var opDiv = function(oldValue, newValue) {
    var res = [];
    for(var i = 0; i < oldValue.length; i++) {
      if(newValue[i] !== null && newValue[i] !== 0)
        res[i] = oldValue[i] / newValue[i];
      else
        res[i] = oldValue[i];
    }
    return res;
  }

  var calc = function(oldValue, newValue, op) {
    var res;
    switch(op) {
      case "set":
        res = opSet(oldValue, newValue);
        break;
      case "add":
        res = opAdd(oldValue, newValue);
        break;
      case "sub":
        res = opSub(oldValue, newValue);
        break;
      case "mul":
        res = opMul(oldValue, newValue);
        break;
      case "div":
        res = opDiv(oldValue, newValue);
        break;
    }
    
    return res;
  }


  //----------------------------------------
  // Set Property
  //----------------------------------------
  var is3DProperty = function(propType) {
    return propType === PropertyValueType.ThreeD_SPATIAL || propType === PropertyValueType.ThreeD;
  };

  var is2DProperty = function(propType) {
    return propType === PropertyValueType.TwoD_SPATIAL || propType === PropertyValueType.TwoD;
  };

  var is1DProperty = function(propType) {
    return propType === PropertyValueType.OneD;
  };

  var isNumberProperty = function(propType) {
    return is3DProperty(propType) || is2DProperty(propType) || is1DProperty(propType);
  };

  var applyNumberProperty = function(prop, newValue, op, shift) {
    if(!(prop instanceof Property) || !(isNumberProperty(prop.propertyValueType))) return;
    
    var propType = prop.propertyValueType, 
        oldValue, result;
    
    if(is1DProperty(propType)) {
      oldValue = [];
      oldValue[0] = prop.value;
    } else {
      oldValue = prop.value;
    }
    
    result = calc(oldValue, newValue, op);
    
    if(is3DProperty(propType)) {
      result = [result[0], result[1], result[2]];
    } else if(is2DProperty(propType)) {
      result = [result[0], result[1]];
    } else if(is1DProperty(propType)) {
      result = result[0];
    }
    
    if(shift)
      shiftPropertyValue(prop, result, prop.propertyValueType);
    else
      setPropertyValue(prop, result, prop.propertyValueType);
    
  };

  var applyLayerProperty = function(prop, newValue) {
    setPropertyValue(prop, newValue, PropertyValueType.LAYER_INDEX);
  };

  var applyColorProperty = function(prop, newValue) {
    setPropertyValue(prop, newValue, PropertyValueType.COLOR);
  };


  //========================================
  // UI
  //========================================
  // Variables for UI
  //----------------------------------------
  var selectedOperator = "set", 
      onLayerIndexRefresh = false,
      pickedColor = [1.0, 0.0, 0.0, 1.0];

  var grp_float, grp_layer, grp_color;

  var tb_propPath = [], ddl_valueType, 
      tb_values = [], tb_incValues = [];

  var grp_float_row2, grp_float_row4,
      cb_float_increment, cb_float_shift, 
      btn_float_set, btn_float_add, btn_float_sub, btn_float_mul, btn_float_div;
      
  var ddl_layer_list;


  //----------------------------------------
  // Utilities for UI Handler
  //----------------------------------------
  var cleanupPropertyPath = function() {
    var propPath = [];
    
    for(var i = 0; i < tb_propPath.length; i++) {
      if(tb_propPath[i].text !== "")
        propPath.push(tb_propPath[i].text);
      else
        break;
    }
    
    return propPath;
  };

  var buildPropertyPath = function(layer, propPath) {
    var p = layer;
        
    for(var i = 0; i < propPath.length; i++) {
      p = p.property(propPath[i]);
      if(p === null) break;
    }
    
    return p;
  };

  var getNumberArrayFields = function(textFields) {
    var result = [];
    var chkNull = 0;
    
    for(var i = 0; i < textFields.length; i++) {
      if(textFields[i].text !== "") {
        if(isNumber(textFields[i].text)) {
          result[i] = parseFloat(textFields[i].text);
        } else {
          result = -1;
          break;
        }
      } else {
        result[i] = null;
        chkNull += 1;
      }
    }

    if(chkNull === textFields.length)
      result = -1;
    
    return result;
  };


  //----------------------------------------
  // UI Handler - Property Path Group
  //----------------------------------------
  var btnDetectOnClick = function() {
    var selProps = [], propPath = [], prop;
    
    forEachSelectedLayers(function(layer, comp) {
      selProps = selProps.concat(layer.selectedProperties);
    })
    
    prop = selProps[0];
    if(prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup)
      prop = selProps[1];
    
    if(prop.propertyType === PropertyType.PROPERTY) {
      do {
        propPath.unshift(prop.name);
        prop = prop.parentProperty;
      } while (prop.containingComp === undefined);
      
      for(var i = 0; i < tb_propPath.length; i++) {
        tb_propPath[i].text = "";
      }
      
      for(var i = 0; i < propPath.length; i++) {
        tb_propPath[i].text = propPath[i];
      }
    }
  };

  var btnClearOnClick = function() {
    for(var i = 0; i < tb_propPath.length; i++) {
      tb_propPath[i].text = "";
    }
  };

  var btnCheckPropertyPathOnClick = function() {
    var propPath = cleanupPropertyPath();
    var prop;
    var propTypes = [];
    var propType;
    
    forEachSelectedLayers(function(layer, comp) {
      prop = buildPropertyPath(layer, propPath);
      
      if(prop !== null) {
        propType = prop.propertyValueType;
        
        var hasElement = false;
        for(var i = 0; i < propTypes.length; i++) {
          if(propTypes[i] === propType)
            hasElement = true;
        }
        if(!hasElement)
          propTypes.push(propType);
      }
    });
    
    if(propTypes.length === 0) {
      alert("This property is not found in selected layers");
      return;
    }
    
    if(propTypes.length > 1) {
      alert("Multiple property type found");
      return;
    }
    
    if(isNumberProperty(propTypes[0]))
      ddl_valueType.selection = ddl_valueType.items[0];
    else if(propTypes[0] === PropertyValueType.LAYER_INDEX)
      ddl_valueType.selection = ddl_valueType.items[1];
    else if(propTypes[0] === PropertyValueType.COLOR)
      ddl_valueType.selection = ddl_valueType.items[2];
    else
      alert("This property type is not supported");
  };


  var ddlValueTypeOnChange = function() {
    if(ddl_valueType.selection === null) ddl_valueType.selection = ddl_valueType.items[0];
    var selType = ddl_valueType.selection.text;
    
    if(selType === "Number") {
      grp_float.enabled = true;
    } else {
      grp_float.enabled = false;
    }
    
    if(selType === "Layer") {
      grp_layer.enabled = true;
      ddlLayerIndexReflesh();
    } else {
      grp_layer.enabled = false;
    }
    
    if(selType === "Color") {
      grp_color.enabled = true;
    } else {
      grp_color.enabled = false;
    }
  };


  //----------------------------------------
  // UI Handler - Number Group
  //----------------------------------------
  var cbFloatIncrementOnChange = function() {
    if(cb_float_increment.value) {
      grp_float_row2.enabled = true;
      grp_float_row4.enabled = false;
    } else {
      grp_float_row2.enabled = false;
      grp_float_row4.enabled = true;
    }
  };

  var btnClearNumOnClick = function() {
    for(var i = 0; i < tb_values.length; i++)
      tb_values[i].text = "";
    
    for(var i = 0; i < tb_incValues.length; i++)
      tb_incValues[i].text = "";
  };

  var btnFloatOperatorOnClick = function() {
    // Simulate toggle button
    btn_float_set.value = (this === btn_float_set)? true : false;
    btn_float_add.value = (this === btn_float_add)? true : false;
    btn_float_sub.value = (this === btn_float_sub)? true : false;
    btn_float_mul.value = (this === btn_float_mul)? true : false;
    btn_float_div.value = (this === btn_float_div)? true : false;
    
    selectedOperator = this.properties.name;
  };


  //----------------------------------------
  // UI Handler - Layer Index Group
  //----------------------------------------
  var ddlLayerIndexReflesh = function() {
    onLayerIndexRefresh = true;
    
    ddl_layer_list.removeAll();
    
    ddl_layer_list.add("item", "None");
    ddl_layer_list.add("separator");
    
    forEachCompLayers(function(layer){
      ddl_layer_list.add("item", layer.name);
    });
    
    ddl_layer_list.selection = ddl_layer_list.items[0];
    
    onLayerIndexRefresh = false;
  };

  var ddlLayerIndexOnChange = function() {
    if(!onLayerIndexRefresh && ddl_layer_list.selection === null)
      ddl_layer_list.selection = ddl_layer_list.items[0];
  };


  //----------------------------------------
  // UI Handler - Color Group
  //----------------------------------------
  var btnColorOnDraw = function() {
    var g = this.graphics;
    g.drawOSControl();
    if(this.enabled) {
      g.rectPath(0.5, 0.5, this.size[0] - 1, this.size[1] - 1);
      g.fillPath(g.newBrush(g.BrushType.SOLID_COLOR, pickedColor));
      g.strokePath(g.newPen(g.PenType.SOLID_COLOR, [0.1, 0.1, 0.1, 1.0], 1));
    } else {
      g.rectPath(0.5, 0.5, this.size[0] - 1, this.size[1] - 1);
      g.fillPath(g.newBrush(g.BrushType.SOLID_COLOR, [pickedColor[0], pickedColor[1], pickedColor[2], 0.3]));
      g.strokePath(g.newPen(g.PenType.SOLID_COLOR, [0.1, 0.1, 0.1, 1.0], 0.3));
    }
  };

  var btnColorOnClick = function() {
    var defaultColor = rgbToHex(pickedColor[0] * 255, pickedColor[1] * 255, pickedColor[2] * 255);
    var hexColor = $.colorPicker(defaultColor);
    
    if(hexColor !== -1) {
      var rgb = hexToRGB(hexColor);
      pickedColor = [rgb[0]/255, rgb[1]/255, rgb[2]/255, 1.0];
    }
  };


  //----------------------------------------
  // UI Handler - Apply Group
  //----------------------------------------
  var btnApplyOnClick = function() {
    var propPath = cleanupPropertyPath(), 
        newValue, incValue, 
        newValueType = ddl_valueType.selection.text;
    
    if(propPath.length == 0) {
      alert("Property path is empty.");
      return;
    }
    
    //----------------------------------------
    if(newValueType === "Number") {
      newValue = getNumberArrayFields(tb_values);
      if(newValue === -1) { 
        alert("Number fields are empty or invalid");
        return;
      }
          
      if(cb_float_increment.value) {
        incValue = getNumberArrayFields(tb_incValues);
        if(incValue === -1) { 
          alert("Increment number fields are empty or invalid");
          return;
        }
      }
    }
    
    if(newValueType === "Layer") {
      newValue = ddl_layer_list.selection.index;
      newValue = newValue === 0? 0 : newValue - 1;
      // Todo: Check layer number.
    }
    
    if(newValueType === "Color") {
      newValue = pickedColor;
    }
    
    //----------------------------------------
    app.beginUndoGroup("Property Controller");
    
    var counter = 0;
    forEachSelectedLayers(function(layer, comp) {
      var p = buildPropertyPath(layer, propPath);
      
      if(newValueType === "Number") {
        if(cb_float_increment.value) {
          if(counter > 0) {
            for(var j = 0; j < incValue.length; j++) {
              if(newValue[j] !== null && incValue[j] !== null)
                newValue[j] += incValue[j];
            }
          }
          applyNumberProperty(p, newValue, "set", cb_float_shift.value);
        } else {
          applyNumberProperty(p, newValue, selectedOperator, cb_float_shift.value);
        }
      }
      ++counter;
      
      if(newValueType === "Layer") {
        applyLayerProperty(p, newValue);
      }
      
      if(newValueType === "Color") {
        applyColorProperty(p, newValue);
      }
    });
    
    app.endUndoGroup();
  };

  var btnAddKeyOnClick = function() {
    var propPath = cleanupPropertyPath();
    
    if(propPath.length == 0) {
      alert("Property path is empty.");
      return;
    }
    
    //----------------------------------------
    app.beginUndoGroup("Property Controller");
    
    forEachSelectedLayers(function(layer, comp) {
      var prop = buildPropertyPath(layer, propPath);
      
      if(prop !== null && 
         prop.propertyType === PropertyType.PROPERTY && 
         prop.canVaryOverTime)
      {
        prop.addKey(layer.time);
      }
    });
    
    app.endUndoGroup();
  };


  //========================================
  // Main Build UI
  //========================================
  var buildUI = function(owner) {
    var frame = (owner instanceof Panel)? owner : new Window("palette", "My window name", undefined);
        
    frame.orientation = "column";
    frame.margins = 4;
    frame.spacing = 4;
    //frame.onResizing = frame.onResize = function(){this.layout.resize()};
    
    var sep;
    
    
    //----------------------------------------
    // Property Path
    //----------------------------------------
    var grp_prop, grp_prop_op, grp_prop_text, grp_prop_row1, 
        btn_prop_detect, btn_prop_clear, btn_prop_getType;
    
    grp_prop = frame.add("group");
    grp_prop.orientation = "column";
    grp_prop.spacing = 4;
    
    grp_prop_op = grp_prop.add("group");
    grp_prop_op.spacing = 2;
    
    btn_prop_detect = grp_prop_op.add("button", undefined, "Detect")
    btn_prop_detect.preferredSize = [94, 22];
    btn_prop_detect.onClick = btnDetectOnClick;
    
    btn_prop_clear = grp_prop_op.add("button", undefined, "Clear Path")
    btn_prop_clear.preferredSize = [94, 22];
    btn_prop_clear.onClick = btnClearOnClick;
    
    for(var i = 0; i < PATH_NUM_ROW; i++) {
      grp_prop_text = grp_prop.add("group");
      grp_prop_text.spacing = 2;
      for(var j = 0; j < 2; j++) {
        tb_propPath[i * 2 + j] = grp_prop_text.add("editText");
        tb_propPath[i * 2 + j].preferredSize = [94, 18];
      }
    }
    
    tb_propPath[0].text = "position";
    
    grp_prop_row1 = grp_prop.add("group");
    grp_prop_row1.spacing = 2;
    
    btn_prop_getType = grp_prop_row1.add("button", undefined, "Check Path")
    btn_prop_getType.preferredSize = [94, 22];
    btn_prop_getType.onClick = btnCheckPropertyPathOnClick;
    
    ddl_valueType = grp_prop_row1.add("dropdownlist");
    ddl_valueType.preferredSize = [94, 22];
    ddl_valueType.add("item", "Number");
    ddl_valueType.add("item", "Layer");
    ddl_valueType.add("item", "Color");
    ddl_valueType.selection = ddl_valueType.items[0];
    ddl_valueType.onChange = ddlValueTypeOnChange;
    
    //---------- property path end
    sep = frame.add("panel");
    sep.minimumSize.width = sep.maximumSize.width = 188;
    sep.minimumSize.height = sep.maximumSize.height = 4;
    
    //----------------------------------------
    // Number
    //----------------------------------------
     var grp_float_row1, grp_float_row3, 
         btn_float_clearNum;
    
    grp_float = frame.add("group");
    grp_float.spacing = 4;
    grp_float.orientation = "column";
    grp_float.alignChildren = ["fill", "center"];
    
    
    //---------- number row 1
    grp_float_row1 = grp_float.add("group");
    grp_float_row1.spacing = 2;
    
    for(var i = 0; i < 3; i++) {
      tb_values[i] = grp_float_row1.add("editText");
      tb_values[i].preferredSize = [62, 18];
    }
    
    
    //---------- number row 2
    grp_float_row2 = grp_float.add("group");
    grp_float_row2.spacing = 2;
    
    for(var i = 0; i < 3; i++) {
      tb_incValues[i] = grp_float_row2.add("editText");
      tb_incValues[i].preferredSize = [62, 18];
    }
    
    grp_float_row2.enabled = false;
    
    
    //---------- number row 3
    grp_float_row3 = grp_float.add("group");
    grp_float_row3.spacing = 4;
    
    cb_float_shift = grp_float_row3.add("checkbox", undefined, "Shift");
    cb_float_shift.alignment = ["left", "bottom"];
    
    cb_float_increment = grp_float_row3.add("checkbox", undefined, "Increment");
    cb_float_increment.alignment = ["left", "bottom"];
    cb_float_increment.onClick = cbFloatIncrementOnChange;
    
    btn_float_clearNum = grp_float_row3.add("button", undefined, "Clear Num")
    btn_float_clearNum.preferredSize = [70, 22];
    btn_float_clearNum.alignment = ["right", "center"];
    btn_float_clearNum.onClick = btnClearNumOnClick;
    
    //---------- number row 4
    var btnSize = [22, 22];
    
    grp_float_row4 = grp_float.add("panel");
    grp_float_row4.spacing = 4;
    grp_float_row4.margins = 2;
    grp_float_row4.orientation = "row";
        
    btn_float_set = grp_float_row4.add("iconButton", undefined, binary_icon_set, {toggle: true, name: "set"});
    btn_float_set.preferredSize = [32, 22];
    btn_float_set.value = true;
    btn_float_set.onClick = btnFloatOperatorOnClick;
    
    btn_float_add = grp_float_row4.add("iconButton", undefined, binary_icon_add, {toggle: true, name: "add"});
    btn_float_add.preferredSize = btnSize;
    btn_float_add.onClick = btnFloatOperatorOnClick;
    
    btn_float_sub = grp_float_row4.add("iconButton", undefined, binary_icon_sub, {toggle: true, name: "sub"});
    btn_float_sub.preferredSize = btnSize;
    btn_float_sub.onClick = btnFloatOperatorOnClick;
    
    btn_float_mul = grp_float_row4.add("iconButton", undefined, binary_icon_mul, {toggle: true, name: "mul"});
    btn_float_mul.preferredSize = btnSize;
    btn_float_mul.onClick = btnFloatOperatorOnClick;
    
    btn_float_div = grp_float_row4.add("iconButton", undefined, binary_icon_div, {toggle: true, name: "div"});
    btn_float_div.preferredSize = btnSize;
    btn_float_div.onClick = btnFloatOperatorOnClick;
    
    
    //---------- number end
    sep = frame.add("panel");
    sep.minimumSize.width = sep.maximumSize.width = 188;
    sep.minimumSize.height = sep.maximumSize.height = 4;
    
    
    //----------------------------------------
    // Layer Index
    //----------------------------------------
    var btn_layer_reflesh;
    
    grp_layer = frame.add("group");
    grp_layer.spacing = 4;
    
    ddl_layer_list = grp_layer.add("dropdownlist");
    ddl_layer_list.preferredSize = [114, 22];
    ddl_layer_list.onChange = ddlLayerIndexOnChange;
    
    btn_layer_reflesh = grp_layer.add("button", undefined, "Reflesh");
    btn_layer_reflesh.preferredSize = [70, 22];
    btn_layer_reflesh.onClick = ddlLayerIndexReflesh;
    
    
    //---------- layer index end
    grp_layer.enabled = false;
    
    sep = frame.add("panel");
    sep.minimumSize.width = sep.maximumSize.width = 188;
    sep.minimumSize.height = sep.maximumSize.height = 4;
    
    
    //----------------------------------------
    // Color
    //----------------------------------------
    var btn_color_pick, btn_color;
    
    grp_color = frame.add("group");
    grp_color.spacing = 4;
    
    btn_color = grp_color.add("button", undefined, "Color!");
    btn_color.preferredSize = [188, 22];
    btn_color.onDraw = btnColorOnDraw;
    btn_color.onClick = btnColorOnClick;
    
    //---------- color end
    grp_color.enabled = false;
    
    sep = frame.add("panel");
    sep.minimumSize.width = sep.maximumSize.width = 188;
    sep.minimumSize.height = sep.maximumSize.height = 4;
    
    
    //----------------------------------------
    // Apply
    //----------------------------------------
    var grp_apply, btn_apply, btn_addKey;
    
    grp_apply = frame.add("group");
    grp_apply.spacing = 4;
    
    btn_apply = grp_apply.add("button", undefined, "Apply");
    btn_apply.preferredSize = [114, 22];
    btn_apply.onClick = btnApplyOnClick;
    
    btn_addKey = grp_apply.add("button", undefined, "Add Key");
    btn_addKey.preferredSize = [70, 22];
    btn_addKey.onClick = btnAddKeyOnClick;
    
    
    frame.layout.layout(true);
    return frame;
  }
  
  
  var myScriptPanel = buildUI(thisObj);
  
  if((myScriptPanel != null) && (myScriptPanel instanceof Window)) {
    myScriptPanel.center();
    myScriptPanel.show();
  }
  
})(this);