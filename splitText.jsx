/**
 * splitText.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */


(function(){
  
  var comp = app.project.activeItem;
  if(!(comp instanceof CompItem)) return;
  if(comp.selectedLayers.length !== 1) return;

  app.beginUndoGroup("Decompose Text");

  var layer = comp.selectedLayers[0];
  if(!(layer instanceof TextLayer)) return;
  
  var chkL = layer.duplicate();
  var chkSrcText = chkL.property("ADBE Text Properties").property("ADBE Text Document");
  var chkTextDoc = chkSrcText.value;
  
  chkTextDoc.justification = ParagraphJustification.RIGHT_JUSTIFY;
  chkSrcText.setValue(chkTextDoc);
  
  var pos = layer.property("ADBE Transform Group").property("ADBE Position").value;
  var baseLeft = pos[0] + layer.sourceRectAtTime(comp.time, false).left;
  baseLeft -= chkL.sourceRectAtTime(comp.time, false).left;
  
  var text = layer.property("ADBE Text Properties").property("ADBE Text Document").value.text;
  
  var dupL, srcTxt, textDoc, offset;
  for(var i = 0; i < text.length; i++) {
    if(text[i] === " ") continue;
    
    chkTextDoc.text = text.slice(i);
    chkSrcText.setValue(chkTextDoc);
    offset = chkL.sourceRectAtTime(comp.time, false).left;
    
    dupL = layer.duplicate();
    srcText = dupL.property("ADBE Text Properties").property("ADBE Text Document");
    textDoc = srcText.value;
    textDoc.text = text[i];
    textDoc.justification = ParagraphJustification.CENTER_JUSTIFY;
    srcText.setValue(textDoc);
    offset += dupL.sourceRectAtTime(comp.time, false).width / 2;
    
    dupL.property("ADBE Transform Group").property("ADBE Position").setValue([baseLeft + offset, pos[1], pos[2]]);
  }
  
  layer.enabled = false;
  chkL.remove();
  
  app.endUndoGroup();

})();