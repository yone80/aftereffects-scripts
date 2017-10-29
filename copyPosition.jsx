/**
 * copyPosition.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length < 2) return;
  
  app.beginUndoGroup("Copy Position");
  
  var selLayers = comp.selectedLayers.slice(0, -1), 
      refLayer = comp.selectedLayers[comp.selectedLayers.length - 1], 
      refAnchorVal = [0, 0, 0];
  
  if(!(refLayer instanceof CameraLayer) && !(refLayer instanceof LightLayer))
    refAnchorVal = refLayer.property("ADBE Transform Group").property("ADBE Anchor Point").value;
  
  var curPos, saveParent, keyValue;
  for(var i = 0; i < selLayers.length; i++) {
    curPos = selLayers[i].property("ADBE Transform Group").property("ADBE Position");
    saveParent = selLayers[i].parent;
    
    selLayers[i].parent = refLayer;
    
    if(curPos.numKeys > 0) {
      curPos.setValueAtTime(selLayers[i].time, refAnchorVal);
    } else {
      curPos.setValue(refAnchorVal);
    }
        
    selLayers[i].parent = saveParent;
  }
  
  app.endUndoGroup();
  
})();