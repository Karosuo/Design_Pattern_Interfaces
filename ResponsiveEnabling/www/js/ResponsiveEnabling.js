document.addEventListener('DOMContentLoaded',function(){
   var folders = ["Pronombres","Acciones","Predicados"];
    myPhraseContainer = new PhraseRow("PhraseContainer");           
    
    var myIP0 = new ImageGridPanel(3,"PatternContainer",myPhraseContainer);
    myIP0.createComboBox();
    myIP0.createPics();
    myIP0.enableImageClick();
    myIP0.createMoreButton();    
    
    myIP0.setFolder(folders[0]);     
    myIP0.loadSelector(10);
    myIP0.loadPics();
    
    var myIP1 = new ImageGridPanel(3,"PatternContainer",myPhraseContainer);
    myIP1.createComboBox();
    myIP1.createPics();
    myIP1.createMoreButton();    
    
    myIP1.setFolder(folders[1]);     
    myIP1.loadSelector(10);
    myIP1.loadPics();    
    //$("#image_board2 .PECSimg").css("opacity",0.5);
    $("#image_board2 .PECSimg").attr("style","opacity:0.5;");
    //$("#image_board2 .PECSimg").css("background-color","rgba(255,255,255,0.4)");
    
    var myIP2 = new ImageGridPanel(3,"PatternContainer",myPhraseContainer);
    myIP2.createComboBox();
    myIP2.createPics();
    myIP2.createMoreButton();    
    
    myIP2.setFolder(folders[2]);     
    myIP2.loadSelector(10);
    myIP2.loadPics();
    visuallyDisable(3);
    
    $("#PatternContainer").append('<input class="moreButton" id="resetButton" type="button" value="Reiniciar">"');
    $("#PatternContainer #resetButton").click(function(){
        location.reload(true);
    });
    
    /*    
    var myIP1 = new ImageGridPanel(6,"PatternContainer",myPhraseContainer);
    myIP1.setFolder(folders[1]);     
    myIP1.loadSelector(15);
    
    var myUtils1 = new myUtilities("PatternContainer",myIP1,folders);     
    myUtils1.setupSelectableDiv();
    
    var myIP2 = new ImageGridPanel(6,"PatternContainer",myPhraseContainer);
    myIP2.setFolder(folders[2]);     
    myIP2.loadSelector(15);
    
    var myUtils2 = new myUtilities("PatternContainer",myIP2,folders);     
    myUtils2.setupSelectableDiv();
    */
    //myImagePanel.loadPics();    
    //myUtils0.addSelectableDiv();
    

    //myDrawerRM = new Drawer_RM("PatternContainer", folders, "Drawer");
});