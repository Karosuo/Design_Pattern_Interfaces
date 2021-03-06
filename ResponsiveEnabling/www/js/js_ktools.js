var globalCurrentFolder = 0; //Indicates the folder that's gonna be next putted on the button
var globalImgGridCounter = 0; //indica cuantas galerias hay en el contenedor
var globalstringCounter = ""; //paleativo para concatenar 0 sin afectar al nombre

document.addEventListener('DOMContentLoaded',function(){
   
});


/*Toggle alpha chanel of the element*/
function toggleAlpha(element, selector)
{
    $(selector).css("opacity","1.0");
    $(element).css("opacity","0.5"); 
} 

function ImageGridPanel(newImageAmount, newContainer, myPhraseContainer){
    this.page = 1; //Number of page, that is being shown
    this.NumImages = newImageAmount; //Amount of images needed per page
    this.container = newContainer; //Name of the container
    this.currentFolder = ""; //Name of the current image folder 
    this.IMGpanelID = "";
    globalImgGridCounter++; //increments number of image galeries    
    
    if(globalImgGridCounter == 1)
    {
        globalstringCounter = "";
    }else
    {
        globalstringCounter = globalImgGridCounter.toString();        
    }
    this.IMGpanelID = globalstringCounter;
    
    $('#'+this.container).append('<div class="image_board" id="image_board'+this.IMGpanelID+'"></div>'); //adds e image board
    
        /*Create the select tag to chose how many images to show*/
    this.createComboBox = function(){
        $('#'+this.container + ' #image_board'+this.IMGpanelID).append('<select id="AmountSelector"></select>');
    }; 
    
        /*Create the img tags under the container*/
    this.createPics = function(){
        var i; //index to count images
        $('#'+this.container + ' #image_board'+this.IMGpanelID+' img').remove();

        for(i=0; i<this.NumImages; i++)
        {
            $('#'+this.container + ' #image_board'+this.IMGpanelID).append('<img alt='+i+' class="PECSimg">');
        }

            //Error loading image    
        $(".PECSimg").error({param1:this},ImageLoadError);
    };
    
    this.enableImageClick = function(){
        $("#image_board"+this.IMGpanelID+" .PECSimg").click(function(){ 
            var selector = "#image_board"+this.IMGpanelID+" .PECSimg";
            toggleAlpha(this, selector);
            //setPhraseImgs($(this).attr('src'));
        });
        
        $("#image_board"+this.IMGpanelID+" .PECSimg").click({param1:this},ImageClick);
    };
    
    enableFixedImageClick = function(number){
        $("#image_board"+number+" .PECSimg").click(function(){  
            var selector = "#image_board"+number+" .PECSimg";
            toggleAlpha(this, selector);
            //setPhraseImgs($(this).attr('src'));
        });
        
        $("#image_board"+number+" .PECSimg").click({param1:this},ImageClick);    
    };
    
    ImageClick = function(event){
        myPhraseContainer.setPhraseComponent($(this).attr('src'));
        if(myPhraseContainer.images[0] != "images/empty.png")
        {
            enableFixedImageClick(2); 
            visuallyEnable(2);
        }
        
        if(myPhraseContainer.images[1] != "images/empty.png")
        {
            enableFixedImageClick(3);
            visuallyEnable(3);
        }
    };
    
    visuallyEnable = function(number){
        $("#image_board"+number+" .PECSimg").css("opacity",1);
    };
    visuallyDisable = function(number){
        $("#image_board"+number+" .PECSimg").css("opacity",0.2);
    };
    
    ImageLoadError = function(event){
        event.data.param1.page = 0; //reset the page
    };
       
    
        /*Callback functions to button more images click*/
    this.moreImages = function(event){
        var ImagePanel = event.data.param1;
        ImagePanel.nextPage();
        ImagePanel.loadPics();
    }; 
    
        /*Set current folder*/
    this.setFolder = function(newFolder){this.currentFolder = newFolder;};
    
    this.createMoreButton = function(){
        $('#'+this.container + ' #image_board'+this.IMGpanelID+' input').remove();
        $('#'+this.container + ' #image_board'+this.IMGpanelID).append('<input class="moreButton" type="button" value="Mas...">');
        
        $('#'+this.container + ' #image_board'+this.IMGpanelID+' input').click({param1:this},this.moreImages);
    }                              
    
        /*Load the images currently created, that correspond to current page*/
    this.loadPics = function(){
        var imageList = $('#'+this.container + ' #image_board'+this.IMGpanelID).children("img");
        var i=0; //index for the imageList
        var j = 1; //index for the current page        

        for(i=0; i<imageList.length; i++)
        {
            imageList[i].src = "images/"+this.currentFolder+"/("+((this.page-1)*this.NumImages+j)+").png";   
            j++;             
        }
        
        /*Reset alpha*/
        $(".PECSimg").css("opacity","1.0");
    };
    
    this.loadSelector = function(limit)
    {//Loads the combo box, it's to indicate how many elements will be displayed
        var i = 0;
        for(i=0 ;i < limit; i++)
        {
            $("#image_board"+this.IMGpanelID+" #AmountSelector").append('<option value=\"'+(i+1)+'\">'+(i+1)+' elements</option>');
        }
        $("#image_board"+this.IMGpanelID+" #AmountSelector").change({param1:this},changeImageAmount);
        
    }
    
    changeImageAmount = function(event){
        ImagePanel = event.data.param1;
        ImagePanel.page = 1;
        ImagePanel.NumImages = this.value;
        ImagePanel.createPics();
        ImagePanel.createMoreButton();
        ImagePanel.loadPics();
    };
        
        /*Increments the page number*/
    this.nextPage = function(){this.page++;};
    
        //Constructor operations
    //this.createComboBox();
    //this.createPics();
    //this.createMoreButton();    
}

function PhraseRow(newContainer,title){
    this.images = ["","",""]; //images src
    this.phraseComponent = "Sujeto"; //define if it's on subject, verb o predicate    
    
    var i; //index to create 3 images
    $('#'+newContainer).append('<div id="phraseContainer"></div>');
    
    if(title != null)
    {
        $('#'+newContainer+' #phraseContainer').append("<h1>"+title+"</h1>");       
    }
    

    $('#'+newContainer+' #phraseContainer').append('<h1>Frase</h1>');    

    /*
    $('#'+newContainer+' #phraseContainer').append('<p id="Sujeto">Sujeto</p>');    
    $('#'+newContainer+' #phraseContainer').append('<p id="Verbo">Verbo</p>');    
    $('#'+newContainer+' #phraseContainer').append('<p id="Predicado">Predicado</p>');*/

    for(i=0; i<3; i++)
    {
        this.images[i] = "images/empty.png";
        $('#'+newContainer+' #phraseContainer').append('<img alt='+(i+1)+' src='+this.images[i]+' class="phraseImg">');
    }

    $('#'+newContainer+' #phraseContainer img').click(function(){ 
        var selector = '#'+newContainer+' #phraseContainer img';
        toggleAlpha(this,selector);        
    });    

    
    PhraseImageClick = function(event){
        var PhraseHolder = event.data.param1;
        var altProp = $(this).attr('alt');
        if(altProp == 1)
        {PhraseHolder.phraseComponent = "Sujeto"}
        else if(altProp == 2)
        {PhraseHolder.phraseComponent = "Verbo"}
        else
        {PhraseHolder.phraseComponent = "Predicado"}
    };
    
    
    this.setPhraseComponent = function(newSelectedImage){
  
        if(this.phraseComponent == "Sujeto")
        {
            this.images[0] = newSelectedImage;
        }else if(this.phraseComponent == "Verbo")
        {
            this.images[1] = newSelectedImage;
        }else
        {
            this.images[2] = newSelectedImage;
        }
        var imageList = $("#phraseContainer").children("img");
        var i;
        for(i=0; i<3; i++)
        {
            imageList[i].src = this.images[i];
        }
    };
    
    this.SelectPhraseComponent = function(option){
        switch(option)
        {
            case 1:
                this.phraseComponent = "Sujeto";
                break;
            case 2:
                this.phraseComponent = "Verbo";
                break;
            case 3:
                this.phraseComponent = "Predicado";
                break;
        }
    };
    
    $('#'+newContainer+' #phraseContainer img').click({param1:this},PhraseImageClick);
}


function myUtilities(newContainer,newImagePanel, newFolders){
    this.container = newContainer;
    this.imp = newImagePanel;
    this.folders = newFolders;
    
    this.loadFloatDivs = function(){
            //Vertical offset, avoid overlap with combobox
        var topOffset = $("#"+this.container).position().top + $("#AmountSelector").height();
        var floatTagHeight = $("#"+this.container+" .floatTagD").height();
                
            //Puts the floated divs in the pattern section
        $("#"+this.container+" .floatDiv").attr("style","top: "+topOffset+"px;");
        //$("#"+this.container+" .floatDiv").css("height",imgBoardHeight);
        resizeFloatDiv(this.container);
        
        $("#"+this.container+" .floatTagD").attr("style","top: "+topOffset+"px;");
        //$("#"+this.container+" .floatTagM").attr("style","top: "+topOffset+"px;");
        
        $("#"+this.container+" .floatTagD").click({param1:this},this.tagClick);
        //$("#"+this.container+" .floatTagM").click({param1:this},this.tagClick);
        
        $("#"+this.container+" .floatTagD").css("background-size",floatTagHeight);
    }; 
    
   
    
    this.tagClick = function(event){
        var container = event.data.param1.container;
        $("#"+container+" .floatDiv").animate({            
            width: "toggle"
            },{
            step: function(now,fx){
                var floatDivWidth = $("#"+container+" .floatDiv").width();
                var floatTagWidth = $("#"+container+" .floatTagD").width();
                $("#"+container+" .floatTagD").css("left",floatDivWidth-floatTagWidth);
            }
        });
    }
    
    this.setupMenu = function(){
        var i;
        $("#"+this.container).append("<div class='MenuDiv'></div>");
        //$("#"+this.container).append("<div class='floatTagD'></div>");
        for(i=0; i<this.folders.length; i++)
        {
            $("#"+this.container+" .MenuDiv").append("<p class='selectableDiv' id="+this.folders[i]+">"+this.folders[i]+"</p>");
        }
        
        $("#"+this.container+" .MenuDiv  .selectableDiv").click({param1:this.imp,param2:".MenuDiv"},this.selectFolder);
    };
    
    this.setupSelectableDiv = function(){        
        $("#"+this.container).append("<div class='MenuDiv'></div>");
        //$("#"+this.container).append("<div class='floatTagD'></div>");
    };
    
    this.addSelectableDiv = function(folder){
      
        if(folder == null)
        {
            if(!(globalCurrentFolder < this.folders.length))
            {
                globalCurrentFolder = 0;
            }

            $("#"+this.container+" .MenuDiv").append("<p class='selectableDiv' id="+this.folders[globalCurrentFolder]+">"+this.folders[globalCurrentFolder]+"</p>");

            $("#"+this.container+" .MenuDiv  .selectableDiv").click({param1:this.imp,param2:".MenuDiv"},this.selectFolder);    
            globalCurrentFolder++;    
        }
        else
        {
            $("#"+this.container+" .MenuDiv").append("<p class='selectableDiv' id="+this.folders[folder]+">"+this.folders[folder]+"</p>");

            $("#"+this.container+" .MenuDiv  .selectableDiv").click({param1:this.imp,param2:".MenuDiv"},this.selectFolder);    
        }
        
        
    };
    
    this.setupDrawer = function(){
        var i;
        $("#"+this.container).append("<div class='floatDiv'></div>");
        $("#"+this.container).append("<div class='floatTagD'></div>");
        for(i=0; i<this.folders.length; i++)
        {
            $("#"+this.container+" .floatDiv").append("<p class='selectableDiv' id="+this.folders[i]+">"+this.folders[i]+"</p>");
        }
        
        $("#"+this.container+" .floatDiv .selectableDiv").click({param1:this.imp, param2:".floatDiv"},this.selectFolder);
    };

    
    this.selectFolder = function(event){
        var myImageGP = event.data.param1;
        var myClass = event.data.param2;
        myImageGP.currentFolder = this.innerHTML;
        $(myClass+" .selectableDiv").css("font-weight", "normal");                
        $(myClass+" #"+this.innerHTML).css("font-weight", "bold");
        myImageGP.page = 1;
        myImageGP.loadPics();
    };
}

function resizeFloatDiv(container){
        var imgBoardHeight = $("#image_board").height();
        $("#"+container+" .floatDiv").css("height",imgBoardHeight);
    }