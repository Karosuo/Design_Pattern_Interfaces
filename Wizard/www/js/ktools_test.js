document.addEventListener('DOMContentLoaded',function(){
    var myPhraseContainer = new PhraseRow("MyContainer");    
    
    var myImagePanel = new ImageGridPanel(5,"SecondContainer",myPhraseContainer);
    myImagePanel.setFolder(folders[1]);
    myImagePanel.loadPics();    
    myImagePanel.loadSelector(15);
    
});

var folders = ["Acciones", "Comida", "Juguetes", "Lugares", "Pronombres","Sentimientos"];
