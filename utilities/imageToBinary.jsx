/**
 * imageToBinary.jsx
 * @author twitter.com/yone80 (Satoru Yonekura)
 */

#target estoolkit

(function(){
  var reg_head = /^\(new String\(/,
      reg_tail = /\)\)$/, 
      reg_extension = /(.*)(?:\.([^.]+$))/, 
      inFile = File.openDialog();
  
  if(inFile !== null) {
    var outFile = File(inFile.path + "/" + inFile.name.match(reg_extension)[1] + "_binary.txt");
    
    inFile.open ("r");
    inFile.encoding = "binary";
    
    var temp = inFile.read();
    inFile.close();
    
    outFile.open("w");
    outFile.write(temp.toSource().replace(reg_head, "").replace(reg_tail, ""));
    outFile.close();
  }

})();