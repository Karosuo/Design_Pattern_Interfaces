document.addEventListener('DOMContentLoaded',function(){
   var folders = ["Acciones", "Comida", "Juguetes", "Lugares", "Pronombres","Sentimientos"];
    myPhraseContainer = new PhraseRow("PhraseContainer");           
    
    var myImagePanel = new ImageGridPanel(6,"PatternContainer",myPhraseContainer);
    myImagePanel.setFolder(folders[0]); 
    myImagePanel.loadPics();    
    myImagePanel.loadSelector(15);
    
    myUtils = new myUtilities("PatternContainer",myImagePanel,folders);     
    myUtils.setupMenu();
    

    //myDrawerRM = new Drawer_RM("PatternContainer", folders, "Drawer");
});

$(window).load(function(){
        //calls the myUtilities object and puts the floated divs
    myUtils.loadFloatDivs();
        //adds listener to the orientation change, reposition the floated divs
    window.addEventListener('orientationchange', doOnOrientationChange);
});

/*Not an object
Detects the chang of orientation*/
function doOnOrientationChange()
{
    myUtils.loadFloatDivs();
}

function Drawer_RM(myContainer, newFolders, RM){

}