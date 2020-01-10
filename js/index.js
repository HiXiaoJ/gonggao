function imgLoad(callback){
    var img = new Image()
    img.src = './images/2020.jpg'
    img.draggable = false
    img.className = 'notice'

    img.onload = function(){
        callback && callback(img)
    }
}
function setHtml(callback){
    imgLoad(function(img){
        var d = $('<div class="dio">\n' +
            '    <style>\n' +
            '        body, html{\n' +
            '            height: 100%;\n' +
            '            margin: 0;\n' +
            '            padding: 0;\n' +
            '        }\n' +
            '        .dio{\n' +
            '            display: none;\n' +
            '            height: 100%;\n' +
            '        }\n' +
            '        .dio::after{\n' +
            '            content:\'\';\n' +
            '            position: fixed;\n' +
            '            top: 0;\n' +
            '            right: 0;\n' +
            '            bottom: 0;\n' +
            '            left: 0;\n' +
            '            z-index: 99;\n' +
            '            background: rgba(0,0,0,.5)\n' +
            '        }\n' +
            '        .mask_2020 {\n' +
            '            display: table;\n' +
            '            width: 90%;\n' +
            '            height: 100%;\n' +
            '            margin: 0 auto;\n' +
            '        }\n' +
            '        .dio >.mask_2020> .dio-inblock .cvmask>img{\n' +
            '            max-width: 100%;\n' +
            '            vertical-align: middle;\n' +
            '        }\n' +
            '        .dio > .mask_2020 .dio-inblock{\n' +
            '            display: table-cell;\n' +
            '            vertical-align: middle;\n' +
            '            text-align: center;\n' +
            '            position: relative;\n' +
            '            z-index: 100;\n' +
            '        }\n' +
            '        .dio .cancel{\n' +
            '            position: absolute;\n' +
            '            width: 40px;\n' +
            '            height: 40px;\n' +
            '            cursor: pointer;\n' +
            '            right: 0;\n' +
            '            top: 0;\n' +
            '\n' +
            '        }\n' +
            '        .cvmask{\n' +
            '            display: inline-block;\n' +
            '            position: relative;\n' +
            '        }\n' +
            '        .notice::selection{background-color: transparent;}\n' +
            '    </style>\n' +
            '    <div class="mask_2020">\n' +
            '        <div class="dio-inblock">\n' +
            '            <div class="cvmask">\n' +
            '                <div class="cancel"></div>\n' +
            '            </div>\n' +
            '\n' +
            '        </div>\n' +
            '    </div>\n' +
            '\n' +
            '\n' +
            '</div>')


        $(img).insertBefore($(d).find('.dio-inblock .cvmask .cancel'))
        $('body').append($(d))
        callback && callback()
    })
}
function ssetCookie(c_name,value,expireseconds){
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireseconds * 1000);
    document.cookie=c_name+ "=" +escape(value)+
        ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
}
function ggetCookie(userName){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(userName+ "=");
        if (c_start!=-1){
            c_start=c_start + userName.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1){
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
function setWidth(){
    let w = $('.notice').width()
    $('.cancel').css({
        width: 60 * ( w / 801) + 'px',
        height: 60   * ( w / 801) + 'px',
    })
}
function init (callback){
    if(typeof(jQuery) == "undefined"){
        var s = document.createElement('script')
        s.type = "text/javascript";
        s.src = '//cdn.bootcss.com/jquery/3.4.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(s)
        s.onload = function(){
            callback && callback()
        }
    }else{
        callback && callback()
    }
}
function hasshowfe(){
    var showPopUp = ggetCookie('2020-festival')
    if(!showPopUp){
        init(function(){
            setHtml(function(){
                $('.dio').show(300, function(){
                    setWidth()
                })
                $(function(){
                    $('.cancel').on('click', function(){
                        $(".dio").hide(300,function(){
                            $('.dio').remove()
                            ssetCookie('2020-festival', 'hide',3600)
                        })
                    })
                    $(window).on('resize', function(){
                        setWidth()
                    })
                })
            })

        })
    }
}

hasshowfe()
