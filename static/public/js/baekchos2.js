function skinDay() {
    //  var rr = $(".want_day").html();
    //  day_txt = rr.replace(/-/gi, '/');
    //  $(".want_day").html(day_txt);
}

// 팝업
$(function () {
    $('.h_btn').click(function () {
        $('.remittance_pop_h').show();
    });
    $('.w_btn').click(function () {
        $('.remittance_pop_w').show();
    });
    $('.close_btn').click(function () {
        $('.remittance_pop_h, .remittance_pop_w').hide();
    });
});

//복사
function copyToClipboard(elementId) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("복사되었습니다.");
}

<!-- / 축하 메세지 -->
var isUpdate = false;
d = new Date();

$(document).ready(function () {
    $("#cmtWrite").on("click", function () {
        if ($("#cmtName").val().trim() == "") {
            alert("이름을 입력해주세요");
            $("#cmtName").focus();
            return false;
        }
        if ($("#cmtPwd").val().trim() == "") {
            alert("비밀번호를 입력해주세요");
            $("#cmtPwd").focus();
            return false;
        }
        var maxPass = 4;
        if ($("#cmtPwd").val().length < maxPass) {
            alert("비밀번호는 " + maxPass + "글자 이상으로 입력해주세요");
            $("#cmtPwd").focus();
            return false;
        }
        if ($("#cmtMsg").val().trim() == "") {
            alert("메세지를 입력해주세요");
            $("#cmtMsg").focus();
            return false;
        }
        $.post("/Skins/RegisterComment"
            , {
                "invID": $("#cmtInvID").val(),
                "invCode": $("#cmtInvCode").val(),
                "cmtName": $("#cmtName").val(),
                "cmtPwd": $("#cmtPwd").val(),
                "cmtMsg": $("#cmtMsg").val()
            }
            , function (res) {
                if (res.returnCode != "OK") {
                    alert(res.returnCode);
                } else {
                    var tmp = "<div class=\"massage_list\"><p class=\"name\">" + res.GuestName + "</p><div class=\"txt\">" + res.Commentary;
                    tmp += "<p class=\"txt_del\"><a href=\"#\">X</a></p><div class=\"password_input\">";
                    tmp += "<p class=\"password\"><input type=\"password\" placeholder=\"Password\" id=\"cpw_" + res.CommentID + "\" class=\"commentpwd\">";
                    tmp += "<input type=\"hidden\" id=\"cid_" + res.CommentID + "\" name=\"cid_" + res.CommentID + "\" value=\"" + res.CommentID + "\"  class=\"cmtIDs\" /></p>";
                    tmp += "<p class=\"b_talign_c b_mt10\"><span class=\"btn\"><a href=\"#\" onclick=\"delComment(" + res.CommentID + ");return false;\">확인</a></span></p></div></div>";
                    tmp += "<p class=\"time\">" + res.RegisterTime + "</p></div>";
                    $(".massage_list").first().before(tmp);
                    $("#cmtName, #cmtPwd, #cmtMsg").val("");
                    $(".txt_del").first().click(function () {
                        $(this).next(".password_input").slideToggle(200);
                        return false;
                    });
                    isUpdate = true;
                    if ($('#skin_frame', window.parent.document).length > 0) {
                        setTimeout(function () {
                            var frameHeight = $(".skin_wrap").height();
                            $('#skin_frame', window.parent.document).css({height: frameHeight});
                        }, 210);
                    }
                }
            }, "json");
        return false;
    });

    var maxPageSize = 5;
    $(".massage_btn .more").click(function () {

        $.post("/Skins/getMoreComment"
            , {
                "invID": $("#cmtInvID").val(),
                "invCode": $("#cmtInvCode").val(),
                "lastCmtID": $(".cmtIDs").last().val(),
                "pageSize": maxPageSize,
            }
            , function (res) {
                if (res.returnCode != "OK") {
                    alert(res.returnCode);
                } else {
                    for (var i = 0; i < res.comments.length; i++) {
                        var tmp = "<div class=\"massage_list\"><p class=\"name\">" + res.comments[i].GuestName + "</p><div class=\"txt\">" + res.comments[i].Commentary;
                        tmp += "<p class=\"txt_del\"><a href=\"#\">X</a></p><div class=\"password_input\">";
                        tmp += "<p class=\"password\"><input type=\"password\" placeholder=\"Password\" id=\"cpw_" + res.comments[i].CommentID + "\" class=\"commentpwd\">";
                        tmp += "<input type=\"hidden\" id=\"cid_" + res.comments[i].CommentID + "\" name=\"cid_" + res.comments[i].CommentID + "\" value=\"" + res.comments[i].CommentID + "\"  class=\"cmtIDs\" /></p>";
                        tmp += "<p class=\"b_talign_c b_mt10\"><span class=\"btn\"><a href=\"#\" onclick=\"delComment(" + res.comments[i].CommentID + ");return false;\">확인</a></span></p></div></div>";
                        tmp += "<p class=\"time\">" + res.comments[i].RegisterTime + "</p></div>";
                        $(".massage_list").last().after(tmp);
                        $(".txt_del").last().click(function () {
                            $(this).next(".password_input").slideToggle(200);
                            return false;
                        });
                    }
                    //console.debug(i);
                    if (i < maxPageSize) {
                        if ($(".massage_btn .more")) {
                            setOpacity(".massage_btn .more", "0.3");    //$(".massage_btn .more").hide();
                            $(".massage_btn .more").off("click").on("click", function () {
                                return false;
                            });
                        }
                    }
                    if ($('#skin_frame', window.parent.document).length > 0) {
                        setTimeout(function () {
                            var frameHeight = $(".skin_wrap").height();
                            $('#skin_frame', window.parent.document).css({height: frameHeight});
                        }, 210);
                    }
                }
            }, "json");
        return false;
    });

    $(".massage_btn .full").click(function () {
        var f = window.open("/" + $("#invCode").val() + "/GuestBook");
        f.focus();
        return false;
    });


    $("#cmtInvID").val($("#invID").val());
    $("#cmtInvCode").val($("#invCode").val());

    if ($(".visual img").length > 0) $(".visual img").attr("alt", $("#invTitle").val());

    $(".want_day").html($("#evtDate").val());

    $(".input_time").html($("#evtTimeH").val());
    $(".input_minute").html($("#evtTimeM").val());
    $(".input_time_ch").html($("#evtTimeCH").val());
    $(".input_hall").html($("#locName").val());
    $(".input_floor").html($("#locDetail").val());
    $(".input_greeting").html($("#invGreeting").val());

     if ($(".main_pohoto").length > 0) {
        if ($("#invMainImage").length > 0 && $("#invMainImage").val() != "")
            $(".main_pohoto > img").attr("src", $("#invMainImage").val() + "?ipignore=true&" + d.getTime());
    }


    // 청첩장정보
    if ($(".input_husband").length > 0) $(".input_husband").html($("#grmName").val());
    if ($(".input_wife").length > 0) $(".input_wife").html($("#brdName").val());
    if ($("dl.husband").length > 0 && $("#grmMobile").length > 0) {
        $("dl.husband > dd").eq(0).find("a").attr("href", "tel:" + $("#grmMobile").val());
        $("dl.husband > dd").eq(1).find("a").attr("href", "sms:" + $("#grmMobile").val());
    }
    if ($("dl.wife").length > 0 && $("#brdMobile").length > 0) {
        $("dl.wife > dd").eq(0).find("a").attr("href", "tel:" + $("#brdMobile").val());
        $("dl.wife > dd").eq(1).find("a").attr("href", "sms:" + $("#brdMobile").val());
    }
    //hostYN -> 혼주정보있음
    //신랑아빠 grmHostName1
    //신랑이름
    //신부아빠
    //신부엄마
    if ($("#hostYN").length > 0 && $("#hostYN").val() == "Y") {
        if ($("#grmHostName1").length > 0 && $("#grmHostName1").val() != "") {
            $(".input_blue_p").html($("#grmHostRel1").val());
            $(".input_blue_p_n").html($("#grmHostName1").val());

            if ($("#grmHostMobile1").val().trim() != "") {


                $(".input_blue_p_n").next().find("a").eq(0).attr("href", "tel:" + $("#grmHostMobile1").val());
                $(".input_blue_p_n").next().find("a").eq(1).attr("href", "sms:" + $("#grmHostMobile1").val());
                $(".input_blue_p_n").next().show();

                $(".parent_contect .husband > ul").removeClass("btn_contact_off");
            } else {
                $(".parent_contect .husband > ul").addClass("btn_contact_off");
                $(".input_blue_p_n").next().hide(); // 20191024 추가
            }

        } else {
            $(".input_blue_p_n").next().hide();
            $(".input_blue_p").hide();
        }

        if ($("#grmHostName2").length > 0 && $("#grmHostName2").val() != "") {
            $(".input_blue_m").html($("#grmHostRel2").val());
            $(".input_blue_m_n").html($("#grmHostName2").val());

            if ($("#grmHostMobile2").val().trim() != "") {
                $(".input_blue_m_n").next().find("a").eq(0).attr("href", "tel:" + $("#grmHostMobile2").val());
                $(".input_blue_m_n").next().find("a").eq(1).attr("href", "sms:" + $("#grmHostMobile2").val());
                $(".input_blue_m_n").next().show();

                if ($("#grmHostMobile1").val().trim() != "") {

                    if ($("#brdHostMobile2").val().trim() != "") {
                        $(".parent_contect .husband > ul").removeClass("btn_contact_off");
                    } else {
                        $(".parent_contect .husband > ul").addClass("btn_contact_off");
                    }

                    //$(".parent_contect .husband > ul").removeClass("btn_contact_off");
                } else {
                    $(".parent_contect .husband > ul").addClass("btn_contact_off");
                }
            } else {
                $(".parent_contect .husband > ul").addClass("btn_contact_off");
                $(".input_blue_m_n").next().hide(); // 20191024 추가
            }

        } else {
            $(".input_blue_m_n").next().hide();
            $(".input_blue_m").hide();
        }

        if ($("#brdHostName1").length > 0 && $("#brdHostName1").val() != "") {
            $(".input_pink_p").html($("#brdHostRel1").val());
            $(".input_pink_p_n").html($("#brdHostName1").val());

            if ($("#brdHostMobile1").val().trim() != "") {
                $(".input_pink_p_n").next().find("a").eq(0).attr("href", "tel:" + $("#brdHostMobile1").val());
                $(".input_pink_p_n").next().find("a").eq(1).attr("href", "sms:" + $("#brdHostMobile1").val());
                $(".input_pink_p_n").next().show();

                $(".parent_contect .wife > ul").removeClass("btn_contact_off");
            } else {
                $(".parent_contect .wife > ul").addClass("btn_contact_off");
                $(".input_pink_p_n").next().hide(); // 20191024 추가
            }

        } else {
            $(".input_pink_p_n").next().hide();
            $(".input_pink_p").hide();
        }
        if ($("#brdHostName2").length > 0 && $("#brdHostName2").val() != "") {
            $(".input_pink_m").html($("#brdHostRel2").val());
            $(".input_pink_m_n").html($("#brdHostName2").val());

            if ($("#brdHostMobile2").val().trim() != "") {
                $(".input_pink_m_n").next().find("a").eq(0).attr("href", "tel:" + $("#brdHostMobile2").val());
                $(".input_pink_m_n").next().find("a").eq(1).attr("href", "sms:" + $("#brdHostMobile2").val());
                $(".input_pink_m_n").next().show();

                if ($("#brdHostMobile1").val().trim() != "") {

                    if ($("#grmHostMobile2").val().trim() != "") {
                        $(".parent_contect .wife > ul").removeClass("btn_contact_off");
                    } else {
                        $(".parent_contect .wife > ul").addClass("btn_contact_off");
                    }

                    //$(".parent_contect .wife > ul").removeClass("btn_contact_off");
                } else {
                    $(".parent_contect .wife > ul").addClass("btn_contact_off");
                }
            } else {
                $(".parent_contect .wife > ul").addClass("btn_contact_off");
                $(".input_pink_m_n").next().hide(); // 20191024 추가
            }

        } else {
            $(".input_pink_m_n").next().hide();
            $(".input_pink_m").hide();
        }

        $(".parent_contect").show();
    } else {
        if ($("#invSkinCode").val() != "WD004") {
            $(".parent_contect").hide();
        } else {
            $(".parent_contect").children().hide();
        }
    }

    // 돌초대장 정보
    if ($(".input_children").length > 0) $(".input_children").html($("#babName").val());
    if ($(".input_dad").length > 0) $(".input_dad").html($("#dadName").val());
    if ($(".input_mom").length > 0) $(".input_mom").html($("#momName").val());
    if ($("dl.husband").length > 0 && $("#dadMobile").length > 0) {
        $("dl.husband > dd > a").eq(0).attr("href", "tel:" + $("#dadMobile").val());
        $("dl.husband > dd > a").eq(1).attr("href", "sms:" + $("#dadMobile").val());
    }
    if ($("dl.wife").length > 0 && $("#momMobile").length > 0) {
        $("dl.wife > dd > a").eq(0).attr("href", "tel:" + $("#momMobile").val());
        $("dl.wife > dd > a").eq(1).attr("href", "sms:" + $("#momMobile").val());
    }
    if ($(".input_ends").length > 0) {
        if ($("#endTimeH").val() != "") {
            $(".input_time_e").html($("#endTimeH").val());
            $(".input_minute_e").html($("#endTimeM").val());
            $(".input_time_ch_e").html($("#endTimeCH").val());
        } else {
            $(".input_ends").hide();
        }
    }

    // 기타초대장 정보
    if ($(".input_title").length > 0) $(".input_title").html($("#invTitle").val());
    if ($(".input_company").length > 0) $(".input_company").html($("#grpName").val());
    if ($("dl.company_info").length > 0 && $("#grpMobile").length > 0) {
        $("dl.company_info > dd > a").eq(0).attr("href", "tel:" + $("#grpMobile").val());
        $("dl.company_info > dd > a").eq(1).attr("href", "sms:" + $("#grpMobile").val());
    }
    if ($(".input_guide").length > 0) $(".input_guide").html($("#guiName").val());
    if ($(".input_guidebook").length > 0) $(".input_guidebook").html($("#guiNote").val());

    // 갤러리
    if ($("#galleryYN").val() == "Y") {
        if ($("#galType").val() == "S") {
            $("#gallery_type1").show();
            $("#gallery_type2").hide();
        } else {
            $("#gallery_type1").hide();
            $("#gallery_type2").show();
        }
        $("#gallery").show();
    } else {
        $("#gallery").hide();
    }

    // 동영상
    if ($("#videoYN").val() == "Y") {
        if ($("#vidURL").val().trim() != "") {
            if ($("#vidType").val() == "VYTB") {

                var htmlInput = $("#vidURL").val();
                var pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

                if (pattern.test(htmlInput)) {
                    var replacement = '<iframe src="//www.youtube.com/embed/$1" frameborder="0" class="embed-container" allowfullscreen></iframe>';
                    htmlInput = htmlInput.replace(pattern, replacement);
                }

                $(".input_movie").html(htmlInput);
            } else {
                $(".input_movie").html($("#vidURL").val());
            }
            $("#movie").show();
        } else {
            $("#movie").hide();
        }
    } else {
        $("#movie").hide();
    }

    // 행사장
    $(".input_address").html($("#locAddr").val());
    $(".input_etel").html($("#locTel").val());
    $(".icon_tel > a").attr("href", "tel:" + $("#locTel").val())

    var strMapMedia = "";
    if ($("#locMapType").val() == "MGGL") {
        //strMapMedia = "<iframe id=\"incGoogleMap\" src=\"/Invitations/GoogleMap?lat=" + $("#locMapLat").val() + "&lng=" + $("#locMapLng").val() + "\" width=\"750\" height=\"320\" frameborder=\"0\" style=\"border: 0\" allowfullscreen></iframe>";
        strMapMedia = "<iframe id=\"incGoogleMap\" src=\"/Invitations/NaverMap?lat=" + $("#locMapLat").val() + "&lng=" + $("#locMapLng").val() + "\" width=\"750\" height=\"320\" frameborder=\"0\" style=\"border: 0\" allowfullscreen></iframe>";
        //strMapMedia = "<iframe id=\"incGoogleMap\" src=\"/Invitations/KakaoMap?lat=" + $("#locMapLat").val() + "&lng=" + $("#locMapLng").val() + "\" width=\"750\" height=\"320\" frameborder=\"0\" style=\"border: 0\" allowfullscreen></iframe>";
        $("#location").removeClass("h_navi");
    } else {
        strMapMedia = "<img src=\"" + $("#locMapImage").val() + "\" class=\"mapImg\" id=\"PreviewMap\" style=\"border: 1px solid #ccc;\" onerror=\"this.style.display='none';\">";
        $("#location").addClass("h_navi");
    }
    $(".map_wrap").html(strMapMedia);

    if ($("#commentYN").val() == "N") {
        $("#guest_book").hide();
    }

    $(".bi_B").show();

    //event
    // 내비게이션 (0:네이버/1:카카오)
    $("ul.navi>li>a , p.navi2>a").click(function () {
        var ix = $(this).parent().index();
        var lat = $("#locMapLat").val();
        var lng = $("#locMapLng").val();
        var loc = $("#locName").val();
        var navurl = "";

        //var p_lat = parent.document.getElementById("map_lat").value;
        //var p_lng = parent.document.getElementById("map_lng").value;
        var p_holl = parent.document.getElementById("input_hall").value;

        //alert(parent.document.getElementById("map_lat").value);

        if ($(this).parent().attr("class") == "navi2") { //WD008
            ix = 0;
        }

        if (ix == 0) {
            // naver navi
            // 네이버 지도 바로가기

            // 앱으로 이동 - 20201123 찬용 주석
            //navurl = "http://app.map.naver.com/launchApp/?version=11&menu=navigation&elat=" + lat + "&elng=" + lng + "&etitle=" + encodeURIComponent(loc);

            // 웹브라우저 내에서 네이버지도로 이동
            navurl = "http://map.naver.com/index.nhn?enc=utf8&level=2&lng=" + lng + "&lat=" + lat + "&pinTitle=" + encodeURIComponent(loc) + "&pinType=SITE";
            //navurl = "https://map.kakao.com/link/map/"+encodeURIComponent(p_holl)+"," + lat + "," + lng;
            // navurl = "https://map.kakao.com/?urlX="+lat+"&urlY="+lng;

        } else if (ix == 1) {
            // kakao navi
            navurl = "http://kakaonavi-wguide.kakao.com/drive.html?ak=8c7ac8fdd6138eab66a85f46aec3a618&ctype=1&lt=" + lat + "&ln=" + lng + "&dt=" + encodeURIComponent(loc);
        }
        var f = window.open(navurl);

        return false;
    });


    // 교통정보 (0:네이버자동차길찾기/1:네이버대중교통길찾기/2:네이버대중교통길찾기)
    //$("ul.traffic_info>li>a").click(function () {
    $("ul.traffic_info>li>a, ul.traffic_info>li>ul>li>a").click(function () {
        var ix = $(this).parent().index();
        var lat = $("#locMapLat").val();
        var lng = $("#locMapLng").val();
        var loc = $("#locName").val();
        var navurl = "";


        //if ($("ul.traffic_info").children('li').length == 2) {
        //    if ($(this).attr("id") == "car") {
        //        ix = 0;
        //    } else if ($(this).attr("id") == "bus") {
        //        ix = 1;
        //    } else {
        //        ix = ix;
        //    }
        //} else {
        //    ix = $(this).index() - 1;
        //}


        if ($("ul.traffic_info").children('li').length == 2) {
            ix = ix;
        } else if ($("ul.traffic_info li ul").children('li').length == 2) {
            if ($(this).attr("id") == "car") {
                ix = 0;
            } else if ($(this).attr("id") == "bus") {
                ix = 1;
            }
        } else {
            ix = $(this).index() - 1;
        }


        if (ix == 0) {
            // car
            navurl = "https://m.map.naver.com/route.nhn?menu=route&ename=" + encodeURIComponent(loc) + "&ex=" + lng + "&ey=" + lat + "&pathType=0&showMap=true";
            //navurl = "https://map.kakao.com/link/to/" + encodeURIComponent(loc) + "," + lat + "," + lng ;
        } else if (ix == 1) {
            // bus
            navurl = "https://m.map.naver.com/route.nhn?menu=route&ename=" + encodeURIComponent(loc) + "&ex=" + lng + "&ey=" + lat + "&pathType=1&showMap=true";
            //navurl = "https://map.kakao.com/link/to/" + encodeURIComponent(loc) + "," + lat + "," + lng ;
        } else if (ix == 2) {
            // subway
            navurl = "https://m.map.naver.com/route.nhn?menu=route&ename=" + encodeURIComponent(loc) + "&ex=" + lng + "&ey=" + lat + "&pathType=1&showMap=true";
            //navurl = "https://map.kakao.com/link/to/" + encodeURIComponent(loc) + "," + lat + "," + lng ;
        }
        var f = window.open(navurl);

        return false;
    });

    // SNS
    // 카카오

    // 카카오톡 알림 desc 수정 요청으로 변경 김선길님 요청
    // var _desc = $('meta[property="og:description"]').attr('content');

    var _desc = "2021-02-28 일요일 오후 3시 30분";

    var _image = $('meta[property="og:image"]').attr('content');
    var _imgWidth = $('meta[property="og:image:width"]').attr('content');
    var _imgHeight = $('meta[property="og:image:height"]').attr('content');


    //Kakao.init('8c7ac8fdd6138eab66a85f46aec3a618');
    Kakao.init('94a08cfa99972d4a71c99401069b1311');
    // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn', // 버튼 id
        objectType: 'location', // 카카오톡 링크 타입
        content: {
            title: $("#invTitle").val(), // 타이틀
            description: _desc + "\n바른손카드 모바일청첩장", // 상세정보
            imageUrl: _image, // 이미지
            link: {
                mobileWebUrl: 'https://mcard.barunnfamily.com/' + $("#invCode").val(), // 모바일 주소 걍 location.href
                webUrl: 'https://mcard.barunnfamily.com/' + $("#invCode").val()  // 웹 주소 걍 location.href
            },
            imageWidth: parseInt(_imgWidth), // 이미지가로
            imageHeight: parseInt(_imgHeight)// 이미지 세로
        },
        address: $("#locAddr").val() // container 가 location 일때 위치보기 아이콘 이 갈 주소 (ex. 경기 고양시 덕양구 용두로47번안길 47)
    });


    // 나머지
    $("ul.sns_a>li>a").click(function () {
        var ix = $(this).parent().index();
        var txt = $("#invTitle").val();
        var url = 'https://mcard.barunnfamily.com/' + $("#invCode").val();

        if (ix == 0) {
            // facebook
            sendSns("facebook", url, txt);
            return false;
        } else if (ix == 1) {
            // twitter
            sendSns("twitter", url, txt);
            return false;
        }
    });

    $(".galMore").on("click", function () {
        $("li.overCount").removeClass("overCount");
        if ($('#skin_frame', window.parent.document).length > 0) {
            setTimeout(function () {
                var frameHeight = $(".skin_wrap").height();
                $('#skin_frame', window.parent.document).css({height: frameHeight});
            }, 210);
        }
        $(this).hide();
        return false;
    });

    if ("N" == "Y") {
        //송금주소를 제대로 받아왔을때만 보이도록 함
        if ("" != "" && "" != "") {
            $("#MoneyGift").show();
        } else {
            $("#MoneyGift").hide();
        }
    } else if ("N" == "R") {
        //$("#MoneyGift").show();
        $("#MoneyGift").hide();
    } else {
        $("#MoneyGift").hide();
    }

    alert('2222');
    $(".grm_account_bank").html("KB국민");
    $(".brd_account_bank").html("");
    $(".grm_account_num").text("96589120258");
    $(".brd_account_num").text("");

    if ("Y" == "Y" || "N" == "Y") {
        $(".remittance").show();
        $("#remittance").show();
    } else {
        $(".remittance").hide();
        $("#remittance").hide();
    }

    if ("Y" == "Y") {
        $(".btn_bx_1").show();
        $("#btn_bx_1").show();
    } else {
        $(".btn_bx_1").hide();
        $("#btn_bx_1").hide();
    }

    if ("N" == "Y") {
        $(".btn_bx_2").show();
        $("#btn_bx_2").show();
    } else {
        $(".btn_bx_2").hide();
        $("#btn_bx_2").hide();
    }

});

function delComment(cid) {
    if ($("#cpw_" + cid).val() == "") {
        alert("비밀번호를 입력해주십시오");
        $("#cpw_" + cid).focus();
        return false;
    }

    var f = window.confirm("삭제하신 글은 복원이 불가능합니다. 삭제하시겠습니까?");
    if (f) {
        $.post("/Skins/deleteComment"
            , {
                "cmtID": cid,
                "cmtPwd": $("#cpw_" + cid).val()
            }
            , function (res) {
                if (res.returnCode != "OK") {
                    alert(res.returnCode);
                } else {
                    $("#cpw_" + cid).closest(".massage_list").remove();
                    isUpdate = true;
                }
            }, "json");

    }
}

function shareStory() {
    Kakao.Story.open({
        url: 'https://mcard.barunnfamily.com/' + $("#invCode").val(),
        text: '모바일 초대장 연결~! #바른손카드 #모바일초대장 :)'
    });
}

function closeWin() {
    if (isUpdate) opener.location.reload();
    window.close();
}

function go_popup() {

    //스크롤방지
    event.preventDefault();
    $('#popup').bPopup();
};

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-83744488-1', 'auto');
ga('create', 'UA-66454421-8', 'auto', {'name': 'roteschatten'});
ga('send', 'pageview');
ga('roteschatten.send', 'pageview');

//ga('create', 'UA-89515814-1', 'auto', { allowLinker: true });
//ga('require', 'linker');
//ga('linker:autoLink', ['barunsoncard.com', 'barunnfamily.com']);
//ga('send', 'pageview');