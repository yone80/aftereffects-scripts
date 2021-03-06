﻿/**
 * Selection Rack.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function(thisObj) {
  //========================================
  // Constants
  //========================================
  var NUM_BUTTONS = 4;


  //========================================
  // UI
  //========================================
  // UI Handler
  //----------------------------------------
  var btnOnClick = function() {
    app.beginUndoGroup("Selection Rack");
    
    var comp = app.project.activeItem;
    if(!(comp instanceof CompItem)) return;
      
    var shiftKey = ScriptUI.environment.keyboardState.shiftKey, 
        altKey = ScriptUI.environment.keyboardState.altKey, 
        selLayers = comp.selectedLayers;
    
    if(shiftKey) {
      this.savedLayers = [];
      for(var i = 0; i < selLayers.length; i++) {
        this.savedLayers.push(selLayers[i]);
      }
      
      if(this.savedLayers.length !== 0) {
        this.comp = comp;
        this.text = this.savedLayers.length;
      } else {
        this.comp = undefined;
        this.text = "Empty";
      }
    } else {
      if(this.comp === comp && this.savedLayers.length !== 0) {
        if(!altKey) {
          for(var i = 0; i < selLayers.length; i++)
            selLayers[i].selected = false;
        }
        
        var missingIdx = [];
        for(var i = 0; i < this.savedLayers.length; i++) {
          try {
            this.savedLayers[i].selected = altKey? false : true;
          } catch(e) {
            missingIdx.push(i);
          }
        }
        
        while(missingIdx.length > 0)
          this.savedLayers.splice(missingIdx.pop(), 1);
        
        if(this.savedLayers.length !== 0) {
          this.text = this.savedLayers.length;
        } else {
          this.comp = undefined;
          this.text = "Empty";
        }
      }
      
      if(this.comp !== undefined && this.comp !== comp)
        alert("This Slection is included in different Composition");
    }
    
    app.endUndoGroup();
  };


  //========================================
  // Main Build UI
  //========================================
  var buildUI = function(owner) {
    var frame = (owner instanceof Panel)? owner : new Window("palette", "My window name", undefined);
        
    frame.orientation = "row";
    frame.margins = 4;
    frame.spacing = 4;
    
    var btn;
    for(var i = 0; i < NUM_BUTTONS; i++) {
      btn = frame.add("button", undefined, "Empty");
      btn.comp = undefined;
      btn.savedLayers = [];
      
      btn.preferredSize = [44, 22];
      btn.onClick = btnOnClick;
    }
    
    frame.layout.layout(true);
    return frame;
  }
  
  
  var myScriptPanel = buildUI(thisObj);
  
  if((myScriptPanel != null) && (myScriptPanel instanceof Window)) {
    myScriptPanel.center();
    myScriptPanel.show();
  }
  
})(this);