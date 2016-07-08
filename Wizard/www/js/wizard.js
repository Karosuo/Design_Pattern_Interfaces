document.addEventListener('DOMContentLoaded',function(){    
    var folders = ["Pronombres", "Acciones","Predicados"]; //Must be in the order to apear in wizard
    var myWizard = new WizardPattern("PatternContainer", folders);    
});


function WizardPattern(myContainer, newFolders){
    this.folders = newFolders;
    this.container = myContainer;
    this.myPhraseContainer;
    this.myImagePanel;
    
    this.setup = function(){
        $("#"+this.container).append("<h3>Pronombres</h3>");
        this.myPhraseContainer = new PhraseRow("PhraseContainer");
        this.myImagePanel = new ImageGridPanel(5,"PatternContainer",this.myPhraseContainer);
        this.myImagePanel.setFolder(this.folders[0]);
        this.myImagePanel.loadPics();    
        this.myImagePanel.loadSelector(15)
        $("#"+this.container).append("<input id='nextBtn' type='button' value='Siguiente'>");
        
        $("#"+this.container+" #nextBtn").click({param1:this},nextOption);
    };
    
    nextOption = function(event){
        var ImagePanel = event.data.param1;
        ImagePanel.myImagePanel.page = 1;
        if(ImagePanel.myImagePanel.currentFolder == "Pronombres")
        {
            ImagePanel.myImagePanel.setFolder("Acciones");
            ImagePanel.myPhraseContainer.SelectPhraseComponent(2);
        }
        else if(ImagePanel.myImagePanel.currentFolder == "Acciones")
        {
            ImagePanel.myImagePanel.setFolder("Predicados");
            ImagePanel.myPhraseContainer.SelectPhraseComponent(3);
            $("#nextBtn").attr('value','Reiniciar');
        }
        else
        {
            ImagePanel.myImagePanel.setFolder("Pronombres");
            ImagePanel.myPhraseContainer.SelectPhraseComponent(1);
            $("#nextBtn").attr('value','Siguiente');
        }
        ImagePanel.myImagePanel.loadPics();
        $("#"+ImagePanel.container+" h3").html(ImagePanel.myImagePanel.currentFolder);
    };
    
    //Constructor
    this.setup();
}