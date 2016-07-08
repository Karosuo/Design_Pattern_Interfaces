document.addEventListener('DOMContentLoaded',function(){
    var myPhraseContainer = new PhraseRow("MyContainer");    
    
    var myImagePanel = new ImageGridPanel(6,"SecondContainer",myPhraseContainer);
    myImagePanel.setFolder(folders[0]);
    myImagePanel.loadPics();    
    myImagePanel.loadSelector(15);
    
});

var folders = ["Acciones", "Comida", "Juguetes", "Lugares", "Pronombres","Sentimientos"];
