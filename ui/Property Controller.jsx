/**
 * Property Controller.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function(thisObj) {
  
  //========================================
  // Load Module
  //========================================
  var aesu = {};
  
  (function() {
    #include ../lib/math.jsxinc
  }).call(aesu);
  
  (function() {
    #include ../lib/property.jsxinc
  }).call(aesu);
  
  
  //========================================
  // Constants
  //========================================
  var binary_icon_set = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01+IDATx\u00DA\u00ECU\u0081\r\u00820\x10\x04\u00E3\x022\x02\u008EPG\u0090\x11t\x04W\u00C0\x11`\x04\x19\x01F\u0080\x11\u00EC\b:\u0082\u008C\u0080\u00F7\u00C9\u00D5T\x04\u0081\u0088\u0092\x18\u009A|\u00DA\u00D2\u00FF\u00BF\u00FF\u00BFoq\u00AB\u00AAr\u00A6\x18\x0Bg\u00A21\x03\u00FFl,\u009B>j\u00AD}L>\u00B7\u00A5RJ\x7F\x15\x18\u0080+L)A\u00AF\u00D6Q\u00D0\u00D7!|D\f6\x1E\u0092\u00B11Z\x7F\u0090\u008C\u0082\x14CK-\u0099\u00EA\x1E\x19\x1D R\u009D\x04rD\u00A0%\u00BF+\u008A\u008F\u00FD\u0096&\x19\u00CE\u0093\u00AE\u00E6\x12\u0085\x10F'\u00F2\\\x07\r1\u0089C\u00A9\u0088G\u00F0\u00C8\x00@bRTp\x1D\u00B7e\u00EF\u00D6_.Fj\x00$\u0090\x18\x11_yva\u0086\u0099\u00A5\u009Bb\u00EFY\u00F6\u00B9\u0080uq\u00FCr\u009D` F\u00D2L\x1B\u0096\u00FE\u00CC\u00A63T\u00A4\u00D8W\"X\u00E7\u00CCz\u009C\u00EB\u00C4\x00\u00E0[\u00EF\u00B1\u00BC\u00D5\x1A&\u0090\u00E0F}@\u00AC\u00CC\u00EC\x0Eu\u00AC\u00AB\u0095\u00B1\u00B1\u00BA\u0086\u00DF\u00A5\u00F0\u00C41\u00F9\u00B1\u00EF\u00B0\"\u00A7\u0089\u00F5\u00B0\u00A4\u00F5\u00EE'5\u00C6\u00C7\u008E:r^\u00B6\u00F1\u00DD\u00D6\\\x0F\u00BE[\u00AE\u00942\u00DC6\u00E9\u00B0r\u00EA\u009D\x0Fw\u00FE\x1F\u00FF=\u00F0]\u0080\x01\x005Q\u008BDz\u00DC\u00BB\u0083\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_add = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00dIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081t0\u00F0\u00EC\u00D9\u00B3i@\u00BC\u009B\u009A.\x14\x04b\u0097\x01\u00F32\x0B\x0Eo\"\u00BBH\t\u008B\u00D8=cc\u00E3{D\x1B\b\x04\u00BB\t\u0088U\x00q'V\u009D\u00A0\u00AC\u0087\x0F\u009F9s\u00A6\x1C\u0088\u00FF\x13R\x07\u00C3\u00C3#a\u009F\u0085\u0086\x19Q\u0080q\u00B4\u00F8\x1A|\x06\x02\x04\x18\x00\b\u00B0S\u00F8\u00B5\u00DD\u00BBS\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_sub = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00FIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081\u00A3\x06\u0092\x01XpI\u009C={V\tH)\u00A1\t\u00BF766>K\u0096\u0081@\x10\n\u00C4\x1Dhb{\u0080\u00D8\x15\u009F\u0081\u008C\u00A3Yo\u00D4\u00C0\u00E1h @\u0080\x01\x00:\u00E0\r\x03\u00B7\u008BPZ\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_mul = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00\u008EIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\u00E3\u00A8\u0081\u0083\u00CF@\x06\u0090\u0081\u00D8\u00F0\u00993g\\\u00B0\u0088\x19\x03\u00B1 .= \u00CC\u0084\u00CD\u0092\u00B3g\u00CF*\x01\u00A9\u00DD@z&\u0092\u00981H\f\u0088\u00D3\u00C8\u00F22\u00D0\x00\u0090F\u0090\u0081\u00B3\u00A0\x18d\u00D8jcc\u00E3t\u00B2\u00C3\x10\u00C9P\x10\u0098E\u00C80\x10`\" \x7F\x16\u0088\u00DFS%\u0096\u0091\u00C2l5\u00D4\u00E0\u0099\u00C4\u00B8\x12\u00AB\u0081\u00D0H9\u0083\x1CfH\u00DE\u00AF\x00\u008Au\u0092\u0093l\u00D2\u00B0\u0088\u0085\x12J6\u00A3yy$\x18\b\x10`\x005\u00A6\u00CD\u00E6v^\u00AA\\\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_div = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00yIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081\u0094\x03\x16B\n\u00CE\u009E={\x06H)\x01\u00B1\u0089\u00B1\u00B1\u00F1=j\u00B8\x10d\u0098 \x14S\u00EEB\u0090\u00CB@\u0086\x01]w\u0096\x18\x03\x19\u00B1%l\u00A07]\b\u0085\x04\u00D0\u0082\u00F7\u00A4\u00B8p7\x01\x03]\u0081x\x0F\u00D1.\u00A4i\u00B2\x01z?\x14\u0088\u00CB\u00A9\u0099\x0EW\x01q\x07\x11\u00E1Jt,wB\u0093\x0E\u00F9\u00B1<Z8\f\u00AC\u0081\x00\x01\x06\x00H\u00CE$\u00BB\x04<_2\x00\x00\x00\x00IEND\u00AEB`\u0082";
  var binary_icon_rnd = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00\u00FDIDATx\u00DA\u00ECU\u008B\t\u00830\x10M\u008A\x0B\u00D8\x11\\!+\u00B8\u0082\u008E`G\u00B0#\u00D4\x11\u00DA\x11\u00EA\bu\x04\u00B3\u0082#\u00D4\x11\u00EC;x\u0082\u0084\u00C6Xi)\u0088\x07GB\u00EE\u00B8\u0097{/\x1F=\f\u0083\u00FA\u0087\x1D\u00D4\u009Fl\x07\u00DE\x06\u00B0\u00B5\u00F6\x02/\u00DE\u00C5\"'1\u00C5\u00F0\u0098.\u00C1O\u00C6\x18\u00BB\x12\u00DB\u00C0\u00FB\u00C5\x1D\x03H\u008B\x13\u00F8\u00FE\x0B6\u00A2@\u00BC\u0086\x17S\u00EA0tpa&\u00E3<\x1F\x19A\\:,\x19S\u00EC\u00B6\u00F9Hc\x14\u0089\t\u00DA8\u00D4]e\u008D\u008Ct\u00E3\u00C6\u0098/\u00ECX\u00C6\u008E\u008C/?\\(\"\u00CF\u00D9\x13.\u00C5r'\\\u00A1\u00F0\u008Ds\u00D9T\u00C2yF\u0099*\u008E\u00BDO\u00DFY\u008D1\u009C\u00D9\u00A1k\u00BEb\u00F1\\\u0087\u008B\u00A9\u00E6\u00CE\u00FB\u00A9\u00C6+,^{\u008F\x05\u00BC\u00A4~!\x13\u00DAS\u00E4&\u0094\u00AB\u00F40\x16\x06\u00A6\u0096\u008B\u00BA\u00E6\u00C9\u0096\u00FC\x16\u00A0-\u00B5\u00AF}\u00F9\u00FA\u00DB\u00DF\"\u00AF\u0094\n=:z\u00FF\u008F7\x0F\u00FC\x12`\x00\x14\u00B6Z\u0099\u00BC\u00F6\u00C8\x0B\x00\x00\x00\x00IEND\u00AEB`\u0082";
  
  var PATH_DEPTH = 6, 
      PATH_NUM_ROW = Math.ceil(PATH_DEPTH / 2);


  //========================================
  // Functions
  //========================================
  // Utilities
  //----------------------------------------
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
  
  var opRnd = function(oldValue, newValue) {
    var res = [], rnd1, rnd2, rnd;

    for(var i = 0; i < oldValue.length; i++) {
      if(newValue[i] !== null) {
        rnd1 = Math.sqrt(-2 * Math.log(Math.random()));
        rnd2 = 2 * Math.PI * Math.random();
        rnd = Math.random() > 0.5? rnd = rnd1 * Math.cos(rnd2) : rnd = rnd1 * Math.sin(rnd2);;
        rnd = rnd * newValue[i];
        
        res[i] = oldValue[i] + rnd;
      } else {
        res[i] = oldValue[i];
      }
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
      case "rnd":
        res = opRnd(oldValue, newValue);
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
      aesu.shiftPropertyValue(prop, result);
    else
      aesu.setPropertyValue(prop, result);
  };

  var applyLayerProperty = function(prop, newValue) {
    aesu.setPropertyValue(prop, newValue);
  };

  var applyColorProperty = function(prop, newValue) {
    aesu.setPropertyValue(prop, newValue);
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
      btn_float_set, btn_float_add, btn_float_sub, btn_float_mul, btn_float_div, btn_float_rnd;
      
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
    btn_float_rnd.value = (this === btn_float_rnd)? true : false;
    
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
    var defaultColor = aesu.rgbToHex(pickedColor[0] * 255, pickedColor[1] * 255, pickedColor[2] * 255);
    var hexColor = $.colorPicker(defaultColor);
    
    if(hexColor !== -1) {
      var rgb = aesu.hexToRGB(hexColor);
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
    
    btn_float_rnd = grp_float_row4.add("iconButton", undefined, binary_icon_rnd, {toggle: true, name: "rnd"});
    btn_float_rnd.preferredSize = [32, 22];
    btn_float_rnd.onClick = btnFloatOperatorOnClick;
    
    
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