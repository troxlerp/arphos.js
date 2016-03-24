// TODO: unlock button when jumping via nav

(function($,window,document){
    "use strict";
        var lock = false,
            anchor = "home",
            navH = ($(".navbar").height()),
            navHeight = navH + "px",
            flow;

 // jump & lock section when clicking a link in the navbar
    function getLink() {
        flow = (this.hash.substr(1));
        document.getElementById('unlocker').innerHTML = 'UNLOCK';
        
        $(".anchor").css('padding-top',navHeight);
        $(".anchor").css('margin-top' ,'-' + navHeight);
        var hashTop = ($("#" + flow).offset().top);
        if (hashTop <= ($(window).scrollTop())){
            $(document).scrollTop(hashTop);
        };
        if (($("#" + flow).height()) < ($(window).height())){
            //to be done
            if(lock == true){
                return; 
            }
        }
        
        $(document).scroll(function(){
            if (lock == true){return;}
            else{
                lockArea(flow);
            };
        });
    };
    $('a').click(getLink);
 
    function lockArea(anchor){

            
            var wTop = $(window).scrollTop(),
            dHeight = $(document).height(),
            wHeight = $(window).height(),
            anchorTop = ($("#" + anchor).offset().top),
            eBottom = dHeight - anchorTop - $("#" + anchor).height(),
            wholeBottom = dHeight - wHeight - wTop +navH,
            xBottom = dHeight - eBottom - wHeight + navH;
        
            if(wTop < anchorTop){
               
                $(window).scrollTop(anchorTop);
            } else if (wholeBottom < eBottom) {           
                $(window).scrollTop(xBottom);
            };
            
    };
        
        $(window).resize(function(){
            lockArea(window.location.hash.substr(1));
        });   
    
     var toggleLock = document.getElementById('unlocker');
            toggleLock.addEventListener('click', function() {
                lock =!lock;
                
              if(lock == true){
                    document.getElementById('unlocker').innerHTML = 'LOCK';}
                else{document.getElementById('unlocker').innerHTML = 'UNLOCK';};
                
            }, false);

}(jQuery,this,document));