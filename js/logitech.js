;(function(window,document,$,undefined){

    let t=0;
    let logitech = {
        init:function(){
            this.headerFn();
            this.section01Fn();
            this.section02Fn();
            this.section03Fn();
            this.section04Fn();
            this.emailFn();
            this.chatFn();
        },
        headerFn:function(){
            headerWinW = $(window).width();

            $(window).resize(function(){
                headerWinW = $(window).width();
                if( headerWinW > 1020 ){
                    $('html').removeClass('addMobile');
                    $('#main').removeClass('addMobile');
                    $('.mobile').removeClass('addMobile');
                    $('.mobile-btn').removeClass('addClose');
                    $('.mobile-menu').removeClass('addMobile');
                    $('.mobile-subMenu').removeClass('addMobile');
                    $('.mobile-sub2Menu').removeClass('addMobile');
                }
            });


            $('.mobile-menu-btn').on({
                click: function(){
                    $(this).next().addClass('addMobile');
                }
            });

            $('.mobile-sub').on({
                click: function(){
                    $('.mobile-subMenu').removeClass('addMobile');
                }
            })

            $('.mobile-sub-btn').on({
                click: function(){
                    $(this).next().addClass('addMobile');
                }
            });

            $('.mobile-sub2').on({
                click: function(){
                    $('.mobile-sub2Menu').removeClass('addMobile');
                }
            })

            $('.mobile-btn').on({
                click:  function(event){
                    event.preventDefault();
                    $(this).toggleClass('addClose');
                    $('.mobile').toggleClass('addMobile');
                    $('.mobile-menu').toggleClass('addMobile');
                    $('.mobile-subMenu').removeClass('addMobile');
                    $('.mobile-sub2Menu').removeClass('addMobile');
                    $('#main').toggleClass('addMobile');
                    $('html').toggleClass('addMobile');
                }
            });

            $('.closeMenu').on({
                click: function(){
                    $('.mobile-btn').removeClass('addClose');
                    $('.mobile').removeClass('addMobile');
                    $('.mobile-menu').removeClass('addMobile');
                    $('#main').removeClass('addMobile');
                    $('html').removeClass('addMobile');
                }
            })
            
            $(".nav-btn").on({
                mouseenter:function(){
                    $(".sub").stop().slideUp(0);
                    $(this).children().next().stop().slideDown(500, "swing");

                }
            });

            $('.border').on({
                mouseenter:function(e){
                    e.preventDefault();
                    e.stopPropagation();
                },
            })

            $(".second-nav").on({
                mouseleave:function(){
                    $(".sub").stop().slideUp(200);
                }
            })

            $(".search").on({
                click: function(){
                    $(".sub").stop().slideUp(200);
                    $(".search-wrapper").addClass("addSearch");
                }
            });

            $(".first-nav").on({
                click: function(){
                    $(".search-wrapper").removeClass("addSearch");
                }
            });

            $("#section01").on({
                click: function(){
                    $(".search-wrapper").removeClass("addSearch");
                }
            });
            
            },
            section01Fn:function(){
                let cnt=0;
                let n=$('.slide').length-1;
                let setId = 0;
                let setId2 = 0;

                let p = null;

                setTimeout(initTimerFn, 100);

                function mainNextSlideFn(){
                    $('.slide').css({zIndex:1});
                    if(p !== null){
                        $('.slide').eq(p).css({zIndex:3});
                    } else {
                        $('.slide').eq(cnt==0?n:cnt-1).css({zIndex:3});
                    }
                    $('.slide').eq(cnt).css({zIndex:4}).animate({opacity:0},0).animate({opacity:1},1000); 
                    pageBtnFn(cnt);
                }

                function mainPrevSlideFn(){
                    $('.slide').css({zIndex:1}).animate({opacity:1},0); 
                    $('.slide').eq(cnt).css({zIndex:4});
                    if(p !== null){
                        $('.slide').eq(p).css({zIndex:5}).animate({opacity:1},0).animate({opacity:0},1000);
                    } else {
                        $('.slide').eq(cnt==n?0:cnt+1).css({zIndex:5}).animate({opacity:1},0).animate({opacity:0},1000);
                    }
                   
                    pageBtnFn(cnt);
                }

                //다음 카운트 함수
                function nextCountFn(){
                    cnt++;
                    if(cnt>n){cnt=0;}
                    mainNextSlideFn();
                }
                //이전 카운트 함수
                function prevCountFn(){
                    cnt--; 
                    if(cnt<0){cnt=n;}
                    mainPrevSlideFn();
                }

                $(".s1-arrow-left").on({
                    click: function(){
                        prevCountFn();
                        timerControlFn();
                    }
                });

                $(".s1-arrow-right").on({
                    click: function(){
                        nextCountFn();
                        timerControlFn();
                    }
                });


                $('#section01').swipe({
                    swipeLeft:  function(event){
                        event.preventDefault();
                        if( !$('.slide').is(':animated') ){
                            nextCountFn(); //다음카운트
                        }
                        timerControlFn();
                    },
                    swipeRight: function(event){
                        event.preventDefault();
                        if( !$('.slide').is(':animated') ){
                            prevCountFn(); //이전카운트
                        }
                        timerControlFn();
                    }
                });

                function timerControlFn(){

                    clearInterval(setId);  //버튼 클릭시 타이머 중지
                    clearInterval(setId2); //카운트 타이머 중지
        
                    var cnt2 = 0;
                    setId2 = setInterval(function(){
                        cnt2++;
                        if(cnt2>5){
                            p = null;
                            clearInterval(setId);
                            clearInterval(setId2);
                            nextCountFn(); //다음슬라이드 즉시 실행
                            initTimerFn();  //3초후 다음 슬라이드 실행
                        }
                    },1000);
        
                } 

                function initTimerFn(){
                    setId = setInterval(nextCountFn,4000);
                }

                function pageBtnFn(){ 
                    $('.slider-bar').removeClass('current');
                    $('.slider-bar').eq(cnt).addClass('current');
                }

                $('.slider-bar').each(function(index){
                    $(this).on({
                        click:  function(){
                            p = cnt;
                            cnt=index;    
                            clearInterval(setId); 

                            if (p < index ) {
                                mainNextSlideFn();
                            } else if ( p > index) {
                                mainPrevSlideFn();
                            }
                            timerControlFn();
        
                        }
                    });
                });

            },

            section02Fn: function(){
                var win = $(window);
                var winW = win.innerWidth();
                var cnt = 0;
                var nextBtn = $('.s2-arrow-right');
                var prevBtn = $('.s2-arrow-left');
                var slideWrap = $('.s2-slide-wrap');
                var slide = $('.s2-slide');
                var slideContainer = $('.s2-slide-container').innerWidth();
                var slideW = slideContainer/4
    
                slide.css({width:slideW})
                
                setTimeout(resizeFn, 100);

                function resizeFn(){
                    winW = win.innerWidth();
                    slideContainer = $('.s2-slide-container').innerWidth();
                    slideW = slideContainer/4;
                    slide.css({width:slideW});
                        
                    slideWrap.stop().animate({left:-slideW*(cnt*4)},0);
                    mainSlideFn();

                }

                win.resize(function(){
                        resizeFn();
                });

                function nextSlideFn(){
                    cnt++;
                    mainSlideFn();
                }
                function prevSlideFn(){
                    cnt--;
                    mainSlideFn();
                }
                function mainSlideFn(){
                    slideWrap.stop().animate({ left:-slideW*(cnt*4) }, 500, function(){
                        if(cnt>1){cnt=0;}
                        if(cnt<0){cnt=1;}
                        slideWrap.stop().animate({ left:-slideW*(cnt*4) },0);
                    });
                    pageBtnFn();    
                }
    
                nextBtn.on({
                    click: function(){
                        if( !$('.s2-slide-wrap').is(':animated') ){
                            nextSlideFn();
                        }
                    }
                });
                
                prevBtn.on({
                    click: function(){
                        if( !$('.s2-slide-wrap').is(':animated') ){
                            prevSlideFn();
                        }
                    }
                });
    
                $('#section02').swipe({
                    swipeLeft: function(){
                        if( !slide.is(':animated') ){
                            nextSlideFn();
                        }
                        pageBtnFn();
                    },
                    swipeRight: function(){
                        if( !slide.is(':animated') ){
                            prevSlideFn();
                        }
                        pageBtnFn();
                    }
                });

                function pageBtnFn(){ 
                    if(cnt % 2 == 0 ){cnt=0;}
                    if(cnt<0){cnt=1;}
                    $('.s2-slider-bar').removeClass('current');
                    $('.s2-slider-bar').eq(cnt).addClass('current');
                }
                
                $('.s2-slider-bar').each(function(index){
                    $(this).on({
                        click:  function(){
                            cnt = index;
                            if(cnt>1){cnt=0;}
                            if(cnt<0){cnt=1;}
                            mainSlideFn();
                        }
                    });
                });
            },

            section03Fn:function(){ 
                var cnt = 0;
                var n = $('.s3-slide').length-2;
                var $slide = $('.s3-slide');
                var $nextBtn = $('.s3-arrow-right');
                var $prevBtn = $('.s3-arrow-left');
                var $slideWrap = $('.s3-slide-wrap');
                var $pageBtn = $('.s3-slider-bar');

                  // Resize
                  var winW = $(window).width();
                  var winH = $(window).height();

                  function resizeFn(){
                      winW = $(window).width();
                      winH = $(window).height();
                      $('#section03').css({ height:winH });
                      $slide.css({ width:winW });
                  }

                  setTimeout(resizeFn, 10);

                  $(window).resize(function(){
                      resizeFn();
                  });

                // Slide
                function mainSlideFn(){
                    $slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                        if(cnt>n-1){cnt=0;}
                        if(cnt<0){cnt=n-1;}
                        $slideWrap.stop().animate({left:-(100*cnt)+'%'}, 0);
                    });
        
                    //페이지버튼 함수
                    pageBtnFn(cnt);
                }
        
                function pageBtnFn(z){
                    z==n?z=0:z;
                    z==-1?z=n-1:z;
                    $pageBtn.removeClass('current');
                    $pageBtn.eq(z).addClass('current');
                }
        
                function nextCountFn(){
                    cnt++;
                    mainSlideFn();
                }
        
                function prevCountFn(){
                    cnt--;
                    mainSlideFn();
                }
        
                $pageBtn.each(function(index){
                    $(this).on({
                        click:function(event){
                            event.preventDefault();;
                            cnt = index;
                            mainSlideFn();
                        }
                    });
                });
        
                $nextBtn.on({
                    click:  function(event){
                        event.preventDefault();
                       if(!$slideWrap.is(':animated')){
                            nextCountFn();
                       } 
                    }
                });
        
                $prevBtn.on({
                    click:  function(event){
                        event.preventDefault();
                        if(!$slideWrap.is(':animated')){                    
                            prevCountFn();
                        }
                    }
                });
        
                $('#section03').swipe({
                    swipeLeft: function(){
                        if(!$slideWrap.is('animated')){
                            nextCountFn();
                        }
                    },
                    swipeRight: function(){
                        if(!$slideWrap.is('animated')){
                            prevCountFn();
                        }
                    }
                })

                    $(".s3-arrow-right").on({
                        mouseover: function(){
                            $('.s3-slide-wrap').css('marginLeft','-110%');
                        },

                        mouseleave: function(){
                            $('.s3-slide-wrap').css('marginLeft','-100%');
                        },

                        click: function(){
                            $('.s3-slide-wrap').css('marginLeft','-100%');
                        }
                    });

                    $(".s3-arrow-left").on({
                        mouseover: function(){
                            $('.s3-slide-wrap').css('marginLeft','-90%');
                        },

                        mouseleave: function(){
                            $('.s3-slide-wrap').css('marginLeft','-100%');
                        },

                        click: function(){
                            $('.s3-slide-wrap').css('marginLeft','-100%');
                        }
                    });


            },

            section04Fn:function(){ 
                var win = $(window);
                var winW = win.innerWidth();
                var tabletCnt = 0;
                var mobileCnt = 0;
                var tSlide = $('.s4-tablet-slide');
                var mSlide = $('.s4-mobile-slide');

                /* 태블릿 */
                var tabletSlideWrap = $('.s4-tablet-slide-wrap');
                var tabletSlide = $('.s4-tablet-slide');
                var tabletSlideContainer = $('.s4-tablet-slide-container').innerWidth();
                var tabletSlideW = tabletSlideContainer/2

                /* 모바일 */
                var mobileSlideWrap = $('.s4-mobile-slide-wrap');
                var mobileSlide = $('.s4-mobile-slide');
                var mobileSlideContainer = $('.s4-mobile-slide-container').innerWidth();
                var mobileSlideW = mobileSlideContainer

                /* 타블렛 반응형 슬라이더 */

               tabletSlide.css({width:tabletSlideW})
                
                setTimeout(tabletResizeFn, 100);

                function tabletResizeFn(){
                    winW = win.innerWidth();
                    tabletSlideContainer = $('.s4-tablet-slide-container').innerWidth();
                    tabletSlideW = tabletSlideContainer/2
                    tabletSlide.css({width:tabletSlideW});
                        
                    tabletSlideWrap.stop().animate({left:-tabletSlideW*(tabletCnt*2)},0);
                    tabletMainSlideFn();

                }

                win.resize(function(){
                    tabletResizeFn();
                });

                $('#section04').swipe({
                    swipeLeft: function(){
                        if( !tSlide.is(':animated') ){
                            tabletNextSlideFn();
                        }
                        tabletPageBtnFn();

                        if( !mSlide.is(':animated') ){
                            mobileNextSlideFn();
                        }
                        mobilePageBtnFn();

                    },
                    swipeRight: function(){
                        if( !tSlide.is(':animated') ){
                            tabletPrevSlideFn();
                        }
                        tabletPageBtnFn();

                        if( !mSlide.is(':animated') ){
                            mobilePrevSlideFn();
                        }
                        mobilePageBtnFn();
                    }
                });

                function tabletNextSlideFn(){
                    tabletCnt++;
                    if(tabletCnt > 1)
                    tabletCnt=1;
                    tabletMainSlideFn();
                }
                function tabletPrevSlideFn(){
                    tabletCnt--;
                    if(tabletCnt < 0)
                    tabletCnt=0;
                    tabletMainSlideFn();
                }
                function tabletMainSlideFn(){
                    tabletSlideWrap.stop().animate({ left:-tabletSlideW*(tabletCnt*2) }, 500,);
                    tabletPageBtnFn();    
                }
    
                function tabletPageBtnFn(){ 
                    $('.s4-tablet-slider-bar').removeClass('current');
                    $('.s4-tablet-slider-bar').eq(tabletCnt).addClass('current');
                }
                
                $('.s4-tablet-slider-bar').each(function(index){
                    $(this).on({
                        click:  function(){
                            tabletCnt = index;
                            tabletMainSlideFn();
                        }
                    });
                });

                /* 모바일 반응형 슬라이더 */

                mobileSlide.css({width:mobileSlideW})
                
                setTimeout(mobileResizeFn, 100);

                function mobileResizeFn(){
                    winW = win.innerWidth();
                    mobileSlideContainer = $('.s4-mobile-slide-container').innerWidth();
                    mobileSlideW = mobileSlideContainer
                    mobileSlide.css({width:mobileSlideW});
                        
                    mobileSlideWrap.stop().animate({left:-mobileSlideW*(mobileCnt)},0);
                    mobileMainSlideFn();

                }

                win.resize(function(){
                    mobileResizeFn();
                });

                function mobileNextSlideFn(){
                    mobileCnt++;
                    if(mobileCnt > 3)
                    mobileCnt=3;
                    mobileMainSlideFn();
                }
                function mobilePrevSlideFn(){
                    mobileCnt--;
                    if(mobileCnt < 0)
                    mobileCnt=0;
                    mobileMainSlideFn();
                }
                function mobileMainSlideFn(){
                    mobileSlideWrap.stop().animate({ left:-mobileSlideW*(mobileCnt*1) }, 500,);
                    mobilePageBtnFn();    
                }
    
                function mobilePageBtnFn(){ 
                    $('.s4-mobile-slider-bar').removeClass('current');
                    $('.s4-mobile-slider-bar').eq(mobileCnt).addClass('current');
                }
                
                $('.s4-mobile-slider-bar').each(function(index){
                    $(this).on({
                        click:  function(){
                            mobileCnt = index;
                            mobileMainSlideFn();
                        }
                    });
                });
            },
            

            emailFn:function(){
                var setId=0;

                /* 재입력 초기화 */
                $('#mail').on({
                    focus: function(){
                        $('.success-message').removeClass('addSuccess');
                    }
                });

                /* AJAX 전송 버튼 이벤트 */
                $('.email-btn').on({
                    click:  function(event){  
                       event.preventDefault(); 
                        //초기화
                        $('.error-message').removeClass('addMessage'); /* 이메일 에러 메시지 */
                        $('.error-message2').removeClass('addMessage'); /* 체크박스 에러 메시지 */
                        $('.success-message').removeClass('addSuccess');       
                        var mailVal = $('#mail').val(); //메일 입력 내용 값 영문 숫자 특수문자포함 한글 절대포안됨.         
                        var cnt=0;
    
                        //유효성 검사 정규 표현식 변수 설정
                        var regExpMail = /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([.]?[a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 영숫자포함 @ . 끝글자 2~3
                        var chkBox = document.getElementsByName('checkbox');
                        var chk = false;

                        for(let i = 0; i<chkBox.length; i++){
                            if(chkBox[i].checked) {
                                chk = true;
                            } else {
                                chk = false;
                            }
                        }

                        setId = setInterval(function(){
                                cnt++;
                                if(cnt>=1){
                                    clearInterval(setId);
                                    formSubmitFn(); //폼 전송 에러메시지, 성공메시지, AJAX 함수 전체
                                }
                        },1000);     
    
                                //유효성검사 정규 표현식(RegExp) 
                                //AJAX(비동기 전송방식) 
                                function formSubmitFn(){
                                                                    
                                    if( regExpMail.test( $('#mail').val() ) === false || chk === false ){
    
                                        if (chk === false) {
                                            $('.error-message2').addClass('addMessage');
                                            $('.error-message').removeClass('addMessage');
                                        } else {
                                            $('.error-message2').removeClass('addMessage');
                                        }

                                        //메일 잘못된 값 입력되면
                                        if(  regExpMail.test($('#mail').val()) === false  ){
                                            $('.error-message').addClass('addMessage');
                                            $('.error-message2').removeClass('addMessage');
                                        }
                                        else{
                                            $('.error-message').removeClass('addMessage');
                                        }

                                        return false; 
                                    }

                                    else{
                                      
                                        $.ajax({ 
                                            url:"./logitech.php",
                                            type:"get",
                                            data:{
                                                mail: mailVal,
                                            },
                                            success: function(data){
                                                console.log(data);
                                                
                                                $('.success-message').addClass('addSuccess');
    
                                                $('#mail').val('');
    
                                            },
                                            error: function(){
                                                console.log( 'AJAX 오류!!!' );
                                            }
                                        }); 
    
                                    } 
                                }  
                    }
                }); 
            },
            chatFn:function(){
                $('.chat-btn').on({
                    click: function(){
                        $(this).toggleClass('addChatbtn');
                        $('.chat-menu').toggleClass('addMenu');
                    }
                });

                $('.popUp-btn').on({
                    click:function(){
                        $('.popUp').addClass('addPop');
                        $('.chatPopUp').addClass('addChat');
                    }
                })

                $('.close-chat').on({
                    click:function(){
                        $('.popUp').removeClass('addPop');
                        $('.chatPopUp').removeClass('addChat');
                        $('.chat-btn').removeClass('addChatbtn');
                        $('.chat-menu').removeClass('addMenu');
                    }
                })
            }
        };

    logitech.init();

})(window,document,jQuery);