/**
 * shiftPosition.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function() {
  
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length < 2) return;
  
  app.beginUndoGroup("Shift Position");
  
  var selLayers = comp.selectedLayers.slice(0, -1), 
      refLayer = comp.selectedLayers[comp.selectedLayers.length - 1], 
      refAnchorVal = [0, 0, 0];
  
  if(!(refLayer instanceof CameraLayer) && !(refLayer instanceof LightLayer))
    refAnchorVal = refLayer.anchorPoint.value;
  
  var curPos, saveParent, curPosVal, keyValue;
  for(var i = 0; i < selLayers.length; i++) {
    curPos = selLayers[i].position;
    saveParent = selLayers[i].parent;
    
    selLayers[i].parent = refLayer;
    curPosVal = curPos.value;
    
    if(curPos.numKeys > 0) {
      for(var k = 1; k <= curPos.numKeys; k++) {
        keyValue = curPos.keyValue(k);
        curPos.setValueAtKey(k, keyValue + (refAnchorVal - curPosVal));
      }
    } else {
      curPos.setValue(refAnchorVal);
    }
        
    selLayers[i].parent = saveParent;
  }
  
  app.endUndoGroup();
  
})();