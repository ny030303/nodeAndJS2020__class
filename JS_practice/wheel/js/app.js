window.onload = function() {

    $("section").on("mousemove", function(e) {
        let x = e.pageX;
        let y = e.pageY;
        // let {pageX:x, pageY:y} = e;
        $(".objp11").css({"bottom": 20 + y /30 +"px", "right": 20 + x / 30 + "px"});
        $(".objp12").css({"bottom": -40 - y /30 +"px", "right": 130 - x / 30 + "px"});
        $(".objp13").css({"top": 180 + y /30 +"px", "right": 60 + x / 30 + "px"});
        
        $(".objp21").css({"right": -180 - (x/30) +"px", "bottom": -480-(y/30) + "px"});
        $(".objp22").css({"right": 130+(x/50) +"px", "bottom": -40-(y/50) + "px"});
        

        $(".objp31").css({"right": 280-(x/30) +"px", "bottom": 30-(y/30) + "px"});
        $(".objp32").css({"right": 110+(x/20) +"px", "bottom": -270+(y/20) + "px"});
        $(".objp33").css({"right": -70+(x/20) +"px", "bottom": -130+(y/20) + "px"});
        

        $(".objp41").css({"right": 20-(x/30)+"px", "bottom": -120-(y/30) + "px"});
        $(".objp42").css({"right": 0+(x/30)+"px", "bottom": -180+(y/20) + "px"});
        
    });

    $("#menu > li").on("click", function(e) {
        e.preventDefault(); // prevent => 예방하다, => 기본 => 이건 기본 동작을 막는 코드이다.

        // !!! 주의사항 this 제이쿼리에 쓸때는 함수를 화살표 함수를 쓰면 안된다.
        let idx = $(this).index(); // 몇번째 애가 클릭 된건지를 알려준다.

        let h = $("section").height(); 
        let scrollDistance = h * idx; // 몇번째 애인지를 높이에 곱해준다.

        // window.scroll(0, scrollDistance);
        // window.scrollTo({top:scrollDistance, behavior:'smooth'});

        $("html, body").stop().animate({"scrollTop": scrollDistance}, 1000);
    });

    $(window).on("scroll", function(e) {
        const y = window.scrollY;
        
        // console.log(window.scrollY);
        $("#menu > li").removeClass("on");

        // 판별을 시작해서 y값에 따라서 menu > li 중에서 on 이 붙어야할 녀석을 판별해주는 거
        const h = $("section").height();
        const bottomY = y + h;
        if(y >= 0 && y < h ) {
            $("#menu > li").eq(0).addClass("on");
        } else if(y < 2 * h) {
            $("#menu > li").eq(1).addClass("on");
        } else if(y < 3 * h) {
            $("#menu > li").eq(2).addClass("on");
        } else if(y < 4 * h) {
            $("#menu > li").eq(3).addClass("on");
        }

        if(bottomY <= h) {
            $("#menu > li").eq(0).addClass("on");
        } else if(bottomY < 2 * h) {
            $("#menu > li").eq(1).addClass("on");
        } else if(bottomY < 3 * h) {
            $("#menu > li").eq(2).addClass("on");
        } else if(bottomY < 4 * h) {
            $("#menu > li").eq(3).addClass("on");
        }
    });

    $("section").on("wheel", function(e){
        if(!$("html, body").is(":animated")) {
            const d = e.originalEvent.deltaY;
            const idx = $(this).index();
            const h = $("section").height();
            if(d > 0 && idx != 3) { // 스크롤을 아래로 내리는거
                $("html, body").stop().animate({"scrollTop": h * (idx +1)}, 1000);
            } else if( d < 0 && idx != 0) { // 스크롤을 위로 올리는거야
                $("html, body").stop().animate({"scrollTop": h * (idx -1)}, 1000);
            }
        }
    });
    

}