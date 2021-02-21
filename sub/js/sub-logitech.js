;(function(window,document,$,undefined){

    let t=0;
    let logitech = {
        init:function(){
            this.headerFn();
            this.emailFn();
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
            
            $(".main-btn").on({
                mouseenter:function(){
                    $(".sub").stop().slideUp(0);
                    $(this).next().stop().slideDown(500, "swing");

                },

                focusin:function(){
                    $(".sub").stop().slideUp(0);
                    $(this).next().stop().slideDown(500, "swing");
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
                    $(".border").removeClass("addMainbtn");
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
            }        
        };

    logitech.init();

})(window,document,jQuery);