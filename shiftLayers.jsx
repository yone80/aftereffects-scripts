/**
 * shiftLayers.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */

(function(){
  
  var shiftLayer = function(layer, time) {
    var inPoint = layer.stretch >= 0? layer.inPoint : layer.outPoint, 
        margin = inPoint - layer.startTime;
    
    layer.startTime = time - margin;
  };

  
  //========================================
  // Main
  //========================================
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  
  app.beginUndoGroup("Shift Layers");
  
  var selLayers = comp.selectedLayers;
  var inPoint, dur, start, end = comp.time;
  
  for(var i = 0; i < selLayers.length; i++) {
    inPoint = selLayers[i].stretch >= 0? selLayers[i].inPoint : selLayers[i].outPoint;
    if(start === undefined) {
      start = inPoint;
    } else {
      if(inPoint < start) start = inPoint;
    }
  };
  
  dur = end - start;
  
  for(var i = 0; i < selLayers.length; i++)
    shiftLayer(selLayers[i], start + dur * i);
  
  app.endUndoGroup();
  
})();