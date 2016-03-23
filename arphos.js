// TODO: unlock button when jumping via nav

(function($,window,document){
    "use strict";
        var lock = false,
            position = 0,
            anchor = "home",
            navHeight = ($(".navbar").height()),
            flow,
            b1 ={
                anch:1000,
                numTypeA:1,
                bottomA:false,
                
                dist:6000,
                numTypeD:1
                },
            b2 ={
                anch:10,
                numTypeA:"percent",
                bottomA:false,
                
                dist:2000,
                numTypeD:"pixels" //default
                };

 // jump & lock section when clicking a link in the navbar
    function getLink() {
        flow = (this.hash.substr(1));
        document.getElementById('unlocker').innerHTML = 'UNLOCK';
        $(".anchor").css("padding-top","-" + navHeight + "px");
        $(".anchor").css("margin-top","-" + (navHeight*(-1)) + "px");
        var hashTop = ($("#" + flow).offset().top);
        if (hashTop <= ($(window).scrollTop())){
            $(document).scrollTop(hashTop);
        };
        
        if (($("#" + flow).height()) < ($(window).height())){
            if(lock == true){
                return; 
            }
        }
        
        $(document).scroll(function(){
            lockArea(flow);
        });
    };
    $('a').click(getLink);
 
    function lockArea(anchor,distance){
        if (lock == true){return;}
        else{
            
            const wTop = $(window).scrollTop();
            const dHeight = $(document).height();
            const wHeight = $(window).height();
            var eBottom;
            var anchorTop;
            if (typeof anchor == "string"){ //if redirected from getLink()
                anchorTop = ($("#" + anchor).offset().top);
                eBottom = dHeight - anchorTop - $("#" + anchor).height()
                
                }
            else{anchorTop = anchor; // redirected from setAnchor
                eBottom = dHeight - anchorTop - distance
                };
                        
            var wholeBottom = dHeight - wHeight - wTop,
                xBottom = dHeight - eBottom - wHeight;
            if(wTop < anchorTop){
               
                $(window).scrollTop(anchorTop);
            } else if (wholeBottom < eBottom) {           
                $(window).scrollTop(xBottom);
            } else{};
            };
    };
   
    function buttonAnchor(i,an){
        var i = 1,
        arr = [b1,b2];
        //anchor
        var an = arr[i].anch;
        // bottom switch
        if (arr[i].bottomA == true){
            arr[i].anch -= ($(document).height()*(-1));
        };
        
        if(arr[i].numTypeA == "percent"){
            an = ($(document).height()) * (arr[i].anch / 100)
        };        
        return an;
    };
    
    function buttonDistance(i,di){
        var i = 1,
        arr = [b1,b2];       
        //distance
        var di = arr[i].dist;
        if(arr[i].numTypeD == "percent"){
            di = ($(document).height()) * (arr[i].dist / 100)
        };
        return di;
    };
    
   $("#submit").click(function setAnchor(){
    var anch = parseInt(document.getElementById("submit-anchor").value);
    var dist = parseInt(document.getElementById("submit-distance").value);
       document.getElementById('unlocker').innerHTML = 'UNLOCK';
            lockArea(anch,dist);
       
            $(document).scroll(function(){
                lockArea(anch,dist) 
                });
   });
        
        $(window).resize(function(){
            lockArea();
        });
    
        $("#anchorButton").click(function (){  
            var i = parseInt(document.getElementById("anchorButton").value);
            var anch = buttonAnchor(i),
            dist = buttonDistance(i);
            console.log(anch);
            console.log(dist);
            document.getElementById('unlocker').innerHTML = 'UNLOCK';
                    lockArea(anch,dist);
            $(document).scroll(function(){
                        lockArea(anch,dist) 
                });
            });   
    
     var destroyAnchor = document.getElementById('unlocker');
            destroyAnchor.addEventListener('click', function() {
                lock =!lock;
                
              if(lock == true){
                    document.getElementById('unlocker').innerHTML = 'LOCK';}
                else{document.getElementById('unlocker').innerHTML = 'UNLOCK';};
                

            
            }, false);

}(jQuery,this,document));