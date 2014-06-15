/**
 * decomposeText.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function(){
  
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length !== 1) return;
  
  app.beginUndoGroup("Decompose Text");
  
  var layer = comp.selectedLayers[0];
  if(!(layer instanceof TextLayer)) return;
  
  var text = layer.Text.property("Source Text").value.text;
  var tWidth = layer.sourceRectAtTime(comp.time, false).width;
  var pos = layer.position.value;
  pos[0] += layer.sourceRectAtTime(comp.time, false).left;
  var newLayers = [];
  var xPos = 0;
  
  var dupL, srcTxt, textDoc;
  for(var i = 0; i < text.length; i++) {
    dupL = layer.duplicate();
    srcText = dupL.Text.property("Source Text");
    textDoc = srcText.value;
    
    textDoc.text = text.slice(i);
    srcText.setValue(textDoc);
    xPos = tWidth - dupL.sourceRectAtTime(comp.time, false).width;
    
    textDoc.text = text[i];
    srcText.setValue(textDoc);
    dupL.position.setValue([pos[0] + xPos, pos[1], pos[2]]);
    
    newLayers.push(dupL);
  }

  for(var i = 0; i < newLayers.length; i++) {
    if(newLayers[i].Text.property("Source Text").value.text === " ")
      newLayers[i].remove();
    else
      newLayers[i].selected = true;
  }

  layer.selected = false;
  layer.enabled = false;
  
  app.endUndoGroup();
  
})();