(function($,window,document){
    "use strict";
        var lock = false,
            position = 0,
            anchor = "home",
            navHeight = ($(".navbar").height()),
            flow;
    
    function getLink() {
        flow = (this.hash.substr(1));
        document.getElementById('unlocker').innerHTML = 'UNLOCK';
        $(".anchor").css("padding-top","-" + navHeight + "px");
        var hashTop = ($("#" + flow).offset().top);
        if (hashTop <= ($(window).scrollTop())){
            $(document).scrollTop(hashTop);
        };
        $(document).scroll(function(){
            lockScrollingAnchor(flow);
        });
    };
    $('a').click(getLink);

 
    function lockScrollingAnchor(anchor){
        
        if (lock == true){return;}
        else{
            var anchorTop = ($("#" + anchor).offset().top),
            wholeTop = $(window).scrollTop(),
            eBottom = $(document).height() - anchorTop - $("#" + anchor).height(),
            wholeBottom = $(document).height() - $(window).height() - $(window).scrollTop(),
            xBottom = $(document).height() - eBottom - ($(window).height());
            
            if(wholeTop < anchorTop){
                $(window).scrollTop(anchorTop);
            } else if (wholeBottom < eBottom) {           
                $(window).scrollTop(xBottom);
            } else{};
            };
    };
    
     var destroyAnchor = document.getElementById('unlocker');
            destroyAnchor.addEventListener('click', function() {
                lock =!lock;
                
              if(lock == true){
                    document.getElementById('unlocker').innerHTML = 'LOCK';}
                else{document.getElementById('unlocker').innerHTML = 'UNLOCK';};
                

            
            }, false);

}(jQuery,this,document));