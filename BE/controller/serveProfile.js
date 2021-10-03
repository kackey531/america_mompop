
function topNavigation(email, btype){
    var html;
    if(email){        
        html = "<div class='logout-header'>"+
                "<nav class='header-menu col-xl-11 mx-auto d-flex align-content-center justify-content-between navbar navbar-expand-xl navbar-light'>"+
                    "<a href='https://localhost:3005' class='navbar-brand' href='#/'>"+
                        "<img src='http://192.168.107.42:4000/image/main_logo.svg' alt=''/>"+
                    "</a>"+
                    "<button onclick='document.getElementById("+'"modal1"'+").style.display="+'"block"'+";' aria-controls='basic-navbar-nav' type='button' aria-label='Toggle navigation' class='text-white navbar-toggler collapsed'>"+
                        "<span class='navbar-toggler-icon'/>"+
                    "</button>"+
                    "<div class='navbar-collapse collapse' id='basic-navbar-nav'>"+
                        "<div class='mr-auto navbar-nav'>"+
                            "<a href='https://localhost:3005/#/business-home' class='header-menu__item d-flex align-items-center p-0  nav-link' role='button'>"+
                                "Business Home" + 
                            "</a>"+
                        "</div>"+
                    "</div>"+
                    "<div class='header-menu__item header-dropdown dropdown nav-item'>"+
                        "<a class='dropdown-toggle nav-link' role='button' onclick='showLogOut()'>"+
                            "<div class='d-flex align-items-center menu-user'>"+
                                "<img src='http://192.168.107.42:4000/image/v.png' width='20px' height='20px' style='margin-left: -5px; margin-top: 3px;'/>"+
                                "<span class='menu-user__name'>"+email+"</span>"+
                                "<figure class='rounded-circle overflow-hidden m-0 menu-user__image bg-white'>"+
                                    "<img class='thumbnail-image img-fluid w-100 h-100' src='http://192.168.107.42:4000/image/"+ (btype=='online'?'online_logo.png':'store_logo.png') +"' alt='user pic'/>"+
                                "</figure>"+
                            "</div>"+
                        "</a>"+
                        "<div aria-labelledby='basic-nav-dropdown' class='dropdown-menu' style='margin: 0px;' id='logOut' onmouseleave='hideLogOut()'>"+
                           "<a  href='https://localhost:3005/#/logout' class='dropdown-item'>"+
                                " Log Out"+
                            "</a>"+
                       " </div>"+
                    "</div>"+
                "</nav>"+
            "</div>";
            html += "<div style='width: 100%; height: 100%; background-color: rgba(0,0,0,0.3); display: none; position: fixed; z-index: 10; top: 0px; left: 0px;' id='modal1' onclick='document.getElementById("+'"modal"'+").style.display="+'"none"'+";'>"+
                        '<div class="MuiPaper-root MuiDrawer-paper MuiDrawer-paperAnchorRight MuiPaper-elevation16"'+ 
                            'style="transform: none; transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms; z-index: 10;'+
                            'width: 350px; height: 100%; position: fixed; right: 0px; background-color: white;" onclick="this.style.display='+"'none'" + '">'+
                        ' <div role="presentation">'+
                                '<ul style="padding: 0px; margin-top: 20px;">'+
                                    '<li class="MuiListItem-root d-flex justify-content-center align-items-center" style="content-align: center;"> '+
                                        "<img src='http://192.168.107.42:4000/image/v.png' width='20px' height='20px' style='margin-left: -5px; margin-top: 3px;'/>"+
                                        "<span class='menu-user__name'>"+email+"</span>"+
                                        "<figure class='rounded-circle overflow-hidden m-0 menu-user__image bg-white'>"+
                                            "<img class='thumbnail-image img-fluid w-100 h-100' src='http://192.168.107.42:4000/image/"+ (btype=='online'?'online_logo.png':'store_logo.png') +"' alt='user pic'/>"+
                                        "</figure>"+
                                    '</li>'+
                                    '<hr class="MuiDivider-root">'+
                                    '<div style="text-align: center;">'+
                                        "<a  href='https://localhost:3005/#/logout' class='dropdown-item'>"+
                                            " Log Out"+
                                        "</a>"+
                                    '</div>'+
                                '</ul>'+
                            "</div>"+
                        "</div>"+
                    "</div>";
    } else {
        html = "<div class='logout-header'>"+
                    "<nav class='header-menu col-xl-11 mx-auto d-flex align-content-center justify-content-between navbar navbar-expand-xl navbar-light'>"+
                        "<a class='navbar-brand' href='https://localhost:3005' data-nsfw-filter-status='swf'>"+
                            "<img src='http://192.168.107.42:4000/image/main_logo.svg' style='visibility: visible;'>"+
                        "</a>"+
                        "<button onclick='document.getElementById("+'"modal"'+").style.display="+'"block"'+";' aria-controls='basic-navbar-nav' type='button' aria-label='Toggle navigation' class='text-white navbar-toggler collapsed'>"+
                            "<span class='navbar-toggler-icon' data-nsfw-filter-status='swf'></span>"+
                        "</button>"+
                        "<div class='navbar-collapse collapse' id='basic-navbar-nav'>"+
                            "<div class='mr-auto row navbar-nav'>"+
                                "<div class='col-1'></div>"+
                                "<a href='https://localhost:3005/#/about-us' class='header-menu__item d-flex  p-0  col-2 nav-link' role='button'"+
                                " style='margin-left: -20px;' data-nsfw-filter-status='swf'>About Us</a>"+
                                "<a href='https://localhost:3005/#/free-business-invitation' class='header-menu__item d-flex  p-0  col-5 nav-link' role='button'"+
                                "style='margin-left: -60px;' data-nsfw-filter-status='swf'>Add Your Business &amp; Deals For"+
                                        "<span class='ml-2' data-nsfw-filter-status='swf'> FREE</span>"+
                                "</a>"+
                                "<a href='https://localhost:3005/#/login' class='header-menu__item d-flex  p-0  col-3 nav-link' role='button'"+
                                " data-nsfw-filter-status='swf'><i class='icon-user-active mr-2'></i>Business Login</a>"+
                            "</div>"+
                        " </div>"+
                    "</nav>"+
                "</div>";
            html += "<div style='width: 100%; height: 100%; background-color: rgba(0,0,0,0.3); display: none; position: fixed; z-index: 10; top: 0px; left: 0px;' id='modal' onclick='document.getElementById("+'"modal"'+").style.display="+'"none"'+";'>"+
                        '<div class="MuiPaper-root MuiDrawer-paper MuiDrawer-paperAnchorRight MuiPaper-elevation16"'+ 
                            'style="transform: none; transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms; z-index: 10;'+
                            'width: 350px; height: 100%; position: fixed; right: 0px; background-color: white;" onclick="this.style.display='+"'none'" + '">'+
                        ' <div role="presentation">'+
                                '<ul style="padding: 0px; margin-top: 20px;">'+
                                    '<li class="MuiListItem-root d-flex justify-content-center align-items-center" style="content-align: center;"> '+
                                        '<svg style="width: 15px; height: 15px; margin-right: 5px;" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14 fa-3x"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" class=""></path></svg>'+
                                        "<a href='https://localhost:3005/#/login' style='color: black;'>Business Login</a>"+
                                    '</li>'+
                                    '<hr class="MuiDivider-root">'+
                                    '<div style="text-align: center;">'+
                                    "<a href='https://localhost:3005/#/about-us' style='color: black;'>About Us</a>"+
                                    '</div>'+
                                    '<hr class="MuiDivider-root">'+
                                    '<div style="text-align: center;">'+
                                        "<a href='https://localhost:3005/#/free-business-invitation' style='color: black;'>Add Your Business &amp; Deals For FREE</a>"+
                                ' </div>'+
                                '</ul>'+
                            "</div>"+
                        "</div>"+
                    "</div>";
    }
    return html;
}
exports.serveProfile = (res, items, post) => {
    var base_url = 'http://localhost:4000';
    var html = "<!DOCTYPE html>"+
    "<html lang='en'>"+
        "<head>"+
            "<title> Business Profile </title>"+
            "<link rel='icon' href='http://192.168.107.42:4000/image/momnp.png'>"+
                "<meta name='viewport' content='width=device-width, initial-scale=1'>"+
                    "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />"+
                    "<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />"+
                    "<link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' rel='stylesheet'>"+
                        " <link rel='stylesheet' href='http://192.168.107.42:4000/css/custom.css' />"+
                        "<link rel='stylesheet' href='http://192.168.107.42:4000/css/bootstrap/css/bootstrap.css' />"+
                        " </head>"+
                    "<script>"+
        "const calculateDistance = (position) => {"+
        "var lat1 ="+ items.lat +";"+
                        "var lon1 =" + items.long + ";"+
                        " var lat2 = position.coords.latitude;"+
                        "var lon2 = position.coords.longitude;"+
                        "console.log(lat1 + ',' + lon1 + '/' + lat2 + ',' + lon2);"+
                        "var R = 6371;/*Radius of the Earth*/"+
                        "var dLat = (lat2-lat1)*(Math.PI/180);"+
                        "var dLon = (lon2-lon1)*(Math.PI/180);" +
                        "var a = "+
                        "Math.sin(dLat/2) * Math.sin(dLat/2) +"+
                        "Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * "+
                        " Math.sin(dLon/2) * Math.sin(dLon/2);" +

                        " var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); "+
                        " var d = R * c; /* Distance in km*/"+
                        " var mile = d / 1.6093;"+
                        " mile = mile - mile%1 ;"+

                        " if(mile){document.getElementById('distance').innerHTML = 'Distance : ' + mile + ' miles away';}"+
                        " else document.getElementById('margin').style.marginTop = '10px';"+
        " };"+
        "const errorHandler = (err) => {"+
            "console.log(err);"+
                        "document.getElementById('margin').style.marginTop = '10px';"+
        "};"+
                        "(function () {"+      
            " window.navigator.geolocation"+
                        ".getCurrentPosition(calculateDistance, errorHandler);"+
            "}());"+
                        "  </script>   " +
                    " <script>" +
                        "function openMap () {"+
                "var lat = "+ items.lat + ";"+
                        "var lng = "+ items.long+";"+
                        "if ((navigator.platform.indexOf('iPhone') !== -1) || (navigator.platform.indexOf('iPod') !== -1)) {"+
                    "function iOSversion() {"+
                " if (/iP(hone|od|ad)/.test(navigator.platform)) {"+
                    " var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);"+
                        "return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];"+
                    "}"+
                    "}"+
                        "var ver = iOSversion() || [0];"+

                        "var protocol = 'http://';"+
                    "if (ver[0] >= 6) {"+
                    "protocol = 'maps://';"+
                    "}"+
                        "window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';"+
            " }"+
                        "else {"+
                    "window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=');"+
            " }"+
        " }"+
                        "</script>"+
                    "<script>"+
                        " function openApp() {window.location.href = 'https://onelink.to/7f52xq'} "+
                        "</script>"   +
                    "<script>" +
                        "function sharePage() {"+
        " if (navigator.share) {"+
         "  navigator.share({"+
            " title: 'Share this Deal Detail page',"+
                        " url: 'https://text.momnpophub.com/businessinfo/profile/" + items._id + items.newName+"'"+
          " }).then(() => {"+
            " console.log('Thanks for sharing!');"+
            " console.log('https://text.momnpophub.com/businessinfo/profile/" + items._id + items.newName+"');"+
          " })"+
                        " .catch(console.error);"+
        " } else {"+
            "console.log('sharing failed');"+
        " }"+
    " } "+
                        "</script>" +
                        "<script>"+
                            "function showLogOut(){ document.getElementById('logOut').style.display = 'block'}"+
                            "function hideLogOut() { document.getElementById('logOut').style.display = 'none' }"+
                        "</script>"+
                        "<script>"+
                        "function navToDealPost(id, name, email){"+
                            "var form = document.createElement('form');"+
                           " document.body.appendChild(form);"+
                           " form.target = '_self';"+
                            "form.method = 'post';"+
                           " form.action = '"+ base_url + "/businessinfo/deal/' + id + name ;"+
                            
                           " var input = document.createElement('input');"+
                            "input.type = 'hidden';"+
                            "input.name = 'email';"+
                           " input.value = email;"+
                            "form.appendChild(input);"+
                            "input = document.createElement('input');"+
                            "input.type = 'hidden';"+
                            "input.name = 'id';"+
                            "input.value = id;"+
                            "form.appendChild(input);"+
                            
                           " form.submit();"+
                            "document.body.removeChild(form);"+
                        "}"+

                        "function navToDealGet(id, name){"+
                            "window.location.href = '"+base_url+ "/businessinfo/deal/' + id + name;"+
                        "}"+
                        "</script>"+
                    "<body>"+
                        "<div class='row main-container'>";
                html += topNavigation(items.email, items.btype);
                html += "<div class='part_block'>"+
                    "<div class='other_container'>"+
                        "<div class='bus_top'>"+
                            "<div class='bus_top_title'>"+
                                "Please, download mobile app for viewing business details and buying deals at your nearby Mom n Pop Shop"+
                                "</div>"+
                            "<button onclick='openApp()' class='bus_top_btn'>Open App</button>"+
                            "</div>"+
                        "<div class='bus_mid'>"+
                            "<div class='bus_mid_header'>"+
                                "<b class='bus_mid_header_title'>Profile</b>"+
                                "<a onclick='sharePage()'"+
                            "class='bus_mid_header_icon'>"+
                                "<svg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'>"+
                                    "<path d='M15.5312 5.61719C15.8047 5.34375 15.8047 4.93359 15.5312 4.66016L11.5938" +
                                   " 0.941406C11.1836 0.558594 10.5 0.832031 10.5 1.43359V3.40234C6.48047 3.40234 3.28125 "+
                                   " 4.19531 3.28125 8.13281C3.28125 9.69141 4.23828 11.25 5.30469 12.043C5.63281 12.2891 "+
                                    "6.09766 11.9883 5.98828 11.5781C4.86719 7.85938 6.53516 6.90234 10.5 6.90234V8.84375C10.5 "+
                                   " 9.44531 11.1836 9.71875 11.5938 9.33594L15.5312 5.61719ZM10.5 "+
                                    "11.1406V13H1.75V4.25H3.11719C3.19922 4.25 3.30859 4.22266 3.36328 4.16797C3.77344 "+
                                  "  3.73047 4.23828 3.40234 4.75781 3.12891C5.05859 2.96484 4.94922 2.5 4.62109 "+
                                   " 2.5H1.3125C0.574219 2.5 0 3.10156 0 3.8125V13.4375C0 14.1758 0.574219 14.75 1.3125 "+
                                   " 14.75H10.9375C11.6484 14.75 12.25 14.1758 12.25 13.4375V11.0312C12.25 10.7852 12.0039 "+
                                   " 10.6484 11.7852 10.7031C11.6211 10.7852 11.3203 10.8398 11.1562 10.8398C11.0742 10.8398 "+
                                   " 10.9375 10.8125 10.8555 10.8125C10.6641 10.7852 10.5 10.9219 10.5 11.1406Z' fill='black' />"+
                                    " </svg>"+
                                " </a>"+
                            " </div>"+
                        "<div class='bus_mid_body'>"+
                            "<div class='bus_mid_item1'>"+
                                "<img src='http://192.168.107.42:4000/image/";
    if(items.btype === 'online')
                                html += "online_logo.png";
                                else
                                html += "store_logo.png";
    html += "' width='84px' height='65px' style='margin-top: 9px; float: left; margin-right: 19px;'/>"+
                                "</div>"+
                            "<div class='bus_mid_item2'>"+
                                "<p style='margin-top: 0px; margin-bottom: 0px;'>";
                                    html += items.bname;
                                    html += "</p>"+
                                "<div class='row' style='position: relative; padding: 0px 15px;'>"+
                                    "<div class='bus_mid_data1'>"+
                                        "<svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>"+
                                            "<path d='M16.4062 0.78125L13.1562 0.03125C12.8125 -0.0625 12.4375 0.125 12.2812 0.46875L10.7812 "+
                       " 3.96875C10.6562 4.28125 10.75 4.625 11 4.84375L12.9062 6.40625C11.7812 8.78125 9.8125 10.7812 "+
                        "7.375 11.9375L5.8125 10.0312C5.59375 9.78125 5.25 9.6875 4.9375 9.8125L1.4375 11.3125C1.09375 "+
                        "11.4688 0.9375 11.8438 1 12.1875L1.75 15.4375C1.84375 15.7812 2.125 16 2.5 16C10.5 16 17 9.53125 "+
                        "17 1.5C17 1.15625 16.75 0.875 16.4062 0.78125Z' fill='#D0D0D0' />"+
                                            "</svg>"+
                                        "<b style='margin-left: 10px; font-weight: normal;'>";
                                            html += items.phonenumber;
                                            html += "</b>"+
                                        "</div>"+
                                    "<div class='bus_mid_data2'>"+
                                        "<div style='width: 18px; height: 18px; float: left;'>"+
                                            "<svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>"+
                                                "<path d='M11.8125 5.875C11.3203 2.74609 10.0898 0.53125 8.71875 0.53125C7.3125 0.53125 6.11719 2.74609 5.58984 5.875H11.8125ZM5.34375 9.25C5.34375 10.0586 5.37891 10.7969 5.44922 11.5H11.9531C12.0234 10.7969 12.0586 10.0586 12.0586 9.25C12.0586 8.47656 12.0234 7.73828 11.9531 7H5.44922C5.37891 7.73828 5.34375 8.47656 5.34375 9.25ZM16.7344 5.875C15.75 3.51953 13.7109 1.65625 11.1797 0.917969C12.0586 2.11328 12.6211 3.90625 12.9375 5.875H16.7344ZM6.22266 0.917969C3.69141 1.65625 1.65234 3.51953 0.667969 5.875H4.46484C4.78125 3.90625 5.34375 2.11328 6.22266 0.917969ZM17.1211 7H13.0781C13.1484 7.73828 13.2188 8.51172 13.2188 9.25C13.2188 10.0234 13.1484 10.7617 13.0781 11.5H17.1211C17.2969 10.7969 17.4023 10.0586 17.4023 9.25C17.4023 8.47656 17.2969 7.73828 17.1211 7ZM4.21875 9.25C4.21875 8.51172 4.25391 7.73828 4.32422 7H0.28125C0.105469 7.73828 0 8.47656 0 9.25C0 10.0586 0.105469 10.7969 0.28125 11.5H4.32422C4.25391 10.7617 4.21875 10.0234 4.21875 9.25ZM5.58984 12.625C6.11719 15.7891 7.3125 17.9688 8.71875 17.9688C10.0898 17.9688 11.3203 15.7891 11.8125 12.625H5.58984ZM11.1797 17.6172C13.7109 16.8789 15.75 15.0156 16.7344 12.625H12.9375C12.6562 14.6289 12.0586 16.4219 11.1797 17.6172ZM0.667969 12.625C1.65234 15.0156 3.69141 16.8789 6.22266 17.6172C5.34375 16.4219 4.78125 14.6289 4.46484 12.625H0.667969Z' fill='#D0D0D0' />"+
                                                "</svg>"+
                                            "</div>"+
                                        " <div style='width: 100%; margin-left: 30px; height: auto;'>"+
                                            "<a href='https://"+items.website+"' class='bus_mid_link'>";
                                                html += items.website;
                                                html += "</a> </div></div>";
                                    if (items.btype == 'offline') {
                                        html += "<div class='bus_mid_data3'>" +
                                        "<div style='max-width: 365px; height: auto; position: relative;'>" +
                                        "<div style='width: 14px; height: 19px; float: left;'>" +
                                        " <svg width='14' height='19' viewBox='0 0 14 19' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
                                        "<path d='M6.04688 17.8984C6.36328 18.3906 7.10156 18.3906 7.41797 17.8984C12.5508 10.5156 " +
                                        "13.5 9.74219 13.5 7C13.5 3.27344 10.4766 0.25 6.75 0.25C2.98828 0.25 0 3.27344 0 7C0 9.74219 " +
                                        "0.914062 10.5156 6.04688 17.8984ZM6.75 9.8125C5.16797 9.8125 3.9375 8.58203 3.9375 7C3.9375 " +
                                        " 5.45312 5.16797 4.1875 6.75 4.1875C8.29688 4.1875 9.5625 5.45312 9.5625 7C9.5625 8.58203 " +
                                        " 8.29688 9.8125 6.75 9.8125Z' fill='#D0D0D0'/>" +
                                        "</svg>" +
                                        " </div>" +
                                        " <div style='width: 100%; margin-left: 30px; height: auto;'>" +
                                        "<b style='font-weight: normal;' id='margin'>";
                                    html += items.baddress;
                                    html += "</b> <p style='margin-top: -10px;'><a onclick='openMap()' class='bus_mid_link2' id='distance'>";

                                        html += "</a></p></div></div></div>";
    }
                    html += "</div></div></div>"+
        "<div class='bus_mid_bottom' style='display:"+(items.description?' block':'none')+"'>"+
        "<div class='bus_mid_bottom_title'> About the business </div>"+
        "<div class='bus_mid_bottom_content' style='text-wrap: break-word; text-indent: 10px;'>";
            html += items.description;
            html += "</div></div></div><div class='bus_bottom'><div class='bus_bottom_header'> ";
                html += items.deals.length;
                html += " deals </div> <div class='bus_bottom_body'><div class='row'>";

                    for(var i = 0; i < items.deals.length; i++){
                        html += "<a onclick='"+(post?'navToDealPost("'+items.deals[i]._id+'","'+items.deals[i].newName+'","'+items.email+'")': 'navToDealGet("'+items.deals[i]._id+'","'+items.deals[i].newName+'")') + "'" +
                        " class='col-lg-3 col-md-4 col-sm-6 col-12 bus_detail_item'>" +
                        "<div class='bus_detail_item_icon'>" +
                        "<img src='http://192.168.107.42:4000/image/percent.png' width='65px' height='65px'/>" +
                        "</div>" +
                        "<div class='bus_detail_item_detail'>" +
                        "<div class='bus_detail_txt1'>";
                    html += items.deals[i].name;
                    html += "</div> <div class='bus_detail_txt2'> ";
                        html += items.deals[i].description;
                        html += " </div> <div class='bus_detail_txt3'><b> $"+ items.deals[i].originalprice + " </b> products for <b> $" + items.deals[i].price + "</b></div></div></a>";
    }

    html += "</div>"+
"</div>" +
    "</div>" +
    "</div>" +
    "</div>";
html += "<footer class='col-xl-11 mx-auto'>" +
    "<ul class='list-unstyled d-flex justify-content-center flex-wrap'>" +
    "<li class='social-icon'><a href='https://www.facebook.com/momnpophub'" +
    " class='social-icon__link d-block fb' target='_blank' rel='noopener noreferrer'" +
    "data-nsfw-filter-status='swf'></a></li>" +
    "<li class='social-icon'><a href='https://www.instagram.com/momnpophub/'" +
    "class='social-icon__link d-block instagram' target='_blank' rel='noopener noreferrer'" +
    "data-nsfw-filter-status='swf'></a></li>" +
    "<li class='social-icon'><a href='https://www.linkedin.com/company/momnpophub/'" +
    "class='social-icon__link d-block linkedin' target='_blank' rel='noopener noreferrer'" +
    "data-nsfw-filter-status='swf'></a></li>" +
    "<li class='social-icon'><a href='https://twitter.com/momnpophub'" +
    "class='social-icon__link d-block twitter' target='_blank' rel='noopener noreferrer'" +
    "data-nsfw-filter-status='swf'></a></li>" +
    " <li class='social-icon'><a" +
    "href='https://open.spotify.com/show/0qE4P5dlLXVzmoNunAWMC2?si=h930NSMYTPCoOS-PHO2Gqg'" +
    " class='social-icon__link d-block spotify' target='_blank' rel='noopener noreferrer'" +
    " data-nsfw-filter-status='swf'></a></li>" +
    "<li class='social-icon'><a href='https://play.google.com/store/apps/details?id=com.momnpophub'" +
    " class='social-icon__link d-block google-play' target='_blank' rel='noopener noreferrer'" +
    " data-nsfw-filter-status='swf'></a></li>" +
    " <li class='social-icon'><a href='https://www.youtube.com/channel/UCJPIGMXPga0AM_1OrvQU55Q/'" +
    "class='social-icon__link d-block youtube' target='_blank' rel='noopener noreferrer'" +
    "data-nsfw-filter-status='swf'></a></li>" +
    "<li class='social-icon'><a href='https://apps.apple.com/us/app/mom-n-pop-hub/id1494101666'" +
    "class='social-icon__link d-block apple' target='_blank' rel='noopener noreferrer'" +
    "data-nsfw-filter-status='swf'></a></li>" +
    " </ul>" +
    " <ul class='footer-menu d-flex justify-content-between list-unstyled flex-wrap position-relative'>" +
    "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
    " href='#/about-us' data-nsfw-filter-status='swf'>About Us</a></li>" +
    "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
    " href='#/free-business-invitation' data-nsfw-filter-status='swf'>Add Your Business &amp; Deals" +
    "For <span data-nsfw-filter-status='swf'>FREE</span></a></li>" +
    "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
    "href='#/customer-business-app' data-nsfw-filter-status='swf'>Customer &amp; Business App</a>" +
    " </li>" +
    "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
    " href='#/term' data-nsfw-filter-status='swf'>Terms &amp; Conditions</a></li>" +
    "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
    " href='#/privacy' data-nsfw-filter-status='swf'>Privacy Policy</a></li>" +
    " </ul><span class='text-center mx-auto d-block mb-4' data-nsfw-filter-status='swf'>© 2021 Mom&amp;Pop. All" +
    " rights reserved.</span>" +
    "  </footer>" +
    " </body>" +
    "</html>";
res.send(html);
}

exports.serveDeal = (res, deal, post) => {
    var base_url = 'http://localhost:4000';
    var html = "<!DOCTYPE html>" +
        "<html lang='en'>" +
        "<head>" +
        "<title> Deal Details </title>" +
        "<link rel='icon' href='http://192.168.107.42:4000/image/momnp.png'>" +
        "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
        "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />" +
        "<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />" +
        "<link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' rel='stylesheet'>" +
        " <link rel='stylesheet' href='http://192.168.107.42:4000/css/custom.css' />" +
        "<link rel='stylesheet' href='http://192.168.107.42:4000/css/bootstrap/css/bootstrap.css' />" +
        " </head>" +
        "<script> function navigateToProfile() { window.location.href='http://localhost:4000/businessinfo/profile/" + deal.bid + deal.newName + "'}</script>" +
        "<script>" +
        " function openApp() { window.location.href='https://onelink.to/7f52xq'} " +
        " </script>" +
        "<script>" +
        "const calculateDistance = (position) => {" +
        "var lat1 =" + deal.lat + ";" +
        "var lon1 =" + deal.long + ";" +
        " var lat2 = position.coords.latitude;" +
        "var lon2 = position.coords.longitude;" +
        "console.log(lat1 + ',' + lon1 + '/' + lat2 + ',' + lon2);" +
        "var R = 6371;/*Radius of the Earth*/" +
        "var dLat = (lat2-lat1)*(Math.PI/180);" +
        "var dLon = (lon2-lon1)*(Math.PI/180);" +
        "var a = " +
        "Math.sin(dLat/2) * Math.sin(dLat/2) +" +
        "Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * " +
        " Math.sin(dLon/2) * Math.sin(dLon/2);" +

        " var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); " +
        " var d = R * c; /* Distance in km*/" +
        " var mile = d / 1.6093;" +
        " mile = mile - mile%1 ;" +

        " if(mile){ document.getElementById('distance').innerHTML = 'Distance : ' + mile + ' miles away';}" +
        " else document.getElementById('margin').style.marginTop = '10px';" +
        " };" +
        "const errorHandler = (err) => {" +
        "console.log(err);" +
        "document.getElementById('margin').style.marginTop = '10px';" +
        "};" +
        "(function () {" +
        " window.navigator.geolocation" +
        ".getCurrentPosition(calculateDistance, errorHandler);" +
        "}());" +
        "  </script>   " +
        "<script>" +
        "function setLeftTime(time) {" +
        " var time_min = (time - (time % 60000))/60000; " +
        "var temp = time_min % 1440; " +
        " var day = (time_min - temp) / 1440;" +
        "var min = temp % 60;" +
        "var hour = (temp - min) / 60;" +
        "if(day == 0 && min == 0 && hour == 0){" +
        "document.getElementById('leftTime').innerHTML = '0d 00h 00m';" +
        "} else {" +
        "min = min < 10? '0'+min: min;" +
        "hour = hour < 10? '0'+hour: hour;" +
        "var leftTime = day + 'd ' + hour + 'h ' + min + 'm';" +
        "document.getElementById('leftTime').innerHTML = leftTime;" +
        "setTimer(time - 60000);" +
        "}" +
        "}" +
        "function setTimer(time) {" +
        "var timer = setTimeout(function(){" +
        " var time_min = (time - (time % 60000))/60000; " +
        "var temp = time_min % 1440; " +
        " var day = (time_min - temp) / 1440;" +
        "var min = temp % 60;" +
        "var hour = (temp - min) / 60;" +
        "if(day == 0 && min == 0 && hour == 0){" +
        "document.getElementById('leftTime').innerHTML = '0d 00h 00m';" +
        "clearTimeout(timer);" +
        "} else {" +
        "min = min < 10? '0'+min: min;" +
        "hour = hour < 10? '0'+hour: hour;" +
        "var leftTime = day + 'd ' + hour + 'h ' + min + 'm';" +
        "document.getElementById('leftTime').innerHTML = leftTime;" +
        "setTimer(time - 60000);" +
        "}" +
        "}, 60000); " +
        "}" +
        "</script>" +
        " <script>" +
        "function openMap () {" +
        " var lat = " + deal.lat + ";" +
        "  var lng = " + deal.long + ";" +
        " if ((navigator.platform.indexOf('iPhone') !== -1) || (navigator.platform.indexOf('iPod') !== -1)) {" +
        " function iOSversion() {" +
        " if (/iP(hone|od|ad)/.test(navigator.platform)) {" +
        "var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);" +
        "return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];" +
        " }" +
        " }" +
        " var ver = iOSversion() || [0];" +

        " var protocol = 'http://';" +
        "  if (ver[0] >= 6) {" +
        " protocol = 'maps://';" +
        " }" +
        " window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';" +
        " }" +
        " else {" +
        "  window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=');" +
        " }" +
        " }" +
        "</script>" +
        "<script>" +
        "function sharePage() {" +
        " if (navigator.share) {" +
        "  navigator.share({" +
        " title: 'Share this Deal Detail page'," +
        " url: 'https://test.momnpophub.com/businessinfo/deal/" + deal._id + deal.newName + "'" +
        " }).then(() => {" +
        " console.log('Thanks for sharing!');" +
        " })" +
        " .catch(console.error);" +
        " } else {" +
        "console.log('sharing failed');" +
        " }" +
        " } " +
        "</script>" +
        "<script>"+
            "function showLogOut(){ document.getElementById('logOut').style.display = 'block'}"+
            "function hideLogOut() { document.getElementById('logOut').style.display = 'none' }"+
        "</script>"+
        "<script>"+
        "function navToProfilePost(id, name, email){"+
            "var form = document.createElement('form');"+
           " document.body.appendChild(form);"+
           " form.target = '_self';"+
            "form.method = 'post';"+
           " form.action = '"+ base_url + "/businessinfo/profile/' + id + name ;"+
            
           " var input = document.createElement('input');"+
            "input.type = 'hidden';"+
            "input.name = 'email';"+
           " input.value = email;"+
            "form.appendChild(input);"+
            "input = document.createElement('input');"+
            "input.type = 'hidden';"+
            "input.name = 'id';"+
            "input.value = id;"+
            "form.appendChild(input);"+
            
           " form.submit();"+
            "document.body.removeChild(form);"+
        "}"+

        "function navToProfileGet(id, name){"+
            "window.location.href = '"+base_url+ "/businessinfo/profile/' + id + name;"+
        "}"+
        "</script>"+
        "<body onload='setLeftTime(" + deal.time + ")'>" +
        "<div class='row main-container'>";
    html += topNavigation(deal.email, deal.btype);
    html += "<div class='part_block'>" +
        "<div class='other_container'>" +
        "<div class='bus_top'>" +
        "<div class='bus_top_title'>" +
        "Please, download mobile app for viewing business details and buying deals at your nearby Mom n Pop Shop" +
        "</div>" +
        "<button  onclick='openApp()' class='bus_top_btn'>Open App</button>" +
        "</div>" +
        "<div class='d_body'>" +
        "<div class='bus_mid_header' style='position: relative'>" +
        "<a onclick='"+(post?'navToProfilePost("'+deal.bid+'","'+deal.newName+'","'+deal.email+'")': 'navToProfileGet("'+deal.bid+'","'+deal.newName+'")') + "' class='linked_bname' style='margin-bottom: 20px;'>" + deal.bname + "</a>" +
        "<b style=' font-size: 16px; line-height:22px; margin-left:5px; font-family: Montserrat;'>></b>" +
        "<b style=' font-size: 16px; line-height:22px; margin-left:5px; font-family: Montserrat;'>" + deal.name + "</b>" +
        "<a onclick='sharePage()'" +
        " class='bus_mid_header_icon' style='position:absolute; top: 15px; right: 15px;'>" +
        "<svg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
        "<path d='M15.5312 5.61719C15.8047 5.34375 15.8047 4.93359 15.5312 4.66016L11.5938" +
        " 0.941406C11.1836 0.558594 10.5 0.832031 10.5 1.43359V3.40234C6.48047 3.40234 3.28125 " +
        " 4.19531 3.28125 8.13281C3.28125 9.69141 4.23828 11.25 5.30469 12.043C5.63281 12.2891 " +
        "6.09766 11.9883 5.98828 11.5781C4.86719 7.85938 6.53516 6.90234 10.5 6.90234V8.84375C10.5 " +
        " 9.44531 11.1836 9.71875 11.5938 9.33594L15.5312 5.61719ZM10.5 " +
        "11.1406V13H1.75V4.25H3.11719C3.19922 4.25 3.30859 4.22266 3.36328 4.16797C3.77344 " +
        "  3.73047 4.23828 3.40234 4.75781 3.12891C5.05859 2.96484 4.94922 2.5 4.62109 " +
        " 2.5H1.3125C0.574219 2.5 0 3.10156 0 3.8125V13.4375C0 14.1758 0.574219 14.75 1.3125 " +
        " 14.75H10.9375C11.6484 14.75 12.25 14.1758 12.25 13.4375V11.0312C12.25 10.7852 12.0039 " +
        " 10.6484 11.7852 10.7031C11.6211 10.7852 11.3203 10.8398 11.1562 10.8398C11.0742 10.8398 " +
        " 10.9375 10.8125 10.8555 10.8125C10.6641 10.7852 10.5 10.9219 10.5 11.1406Z' fill='black'/>" +
        " </svg>" +
        "</a>" +
        "</div>" +
        "<div class='row d_mid_body'>" +
        "<div class='d_part1'>" +
        "<img src='http://192.168.107.42:4000/image/" + (deal.btype == 'online' ? 'online_logo.png' : 'store_logo.png') + "' width='65px' height='65px' />" +
        "</div>" +
        "<div class='d_part2'>" +
        "<div class='row' style='margin-bottom: 7px; padding: 0px 30px;'>" +
        "<a style='font-family: Montserrat; color: black; font-style: normal; font-weight: bold; font-size: 14px; line-height: 30px; float: left;'>";
    html += deal.bname;
    html += "</a> <div style='font-family: Montserrat; font-style: normal; font-size: 14px; line-height: 20px; width: 100%; display:" + (deal.bdescription ? 'block' : 'none') + "'>";
    html += deal.bdescription + "</div></div>";
    html += "<div class='row' style='margin-bottom: 10px; padding: 0px 15px;'>" +
        "<div class='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>" +
        "<div class='d_item_icon'>" +
        "<svg width='21' height='14' viewBox='0 0 21 14' fill='none'" +
        " xmlns='http://www.w3.org/2000/svg'>" +
        "<path " +
        "d='M4.875 3.875V10.625H16.125V3.875H4.875ZM18.9375 7.25C18.9375 6.33594 19.6758 5.5625 " +
        "20.625 5.5625V2.1875C20.625 1.27344 19.8516 0.5 18.9375 0.5H2.0625C1.11328 0.5 0.375 1.27344 " +
        "0.375 2.1875V5.5625C1.28906 5.5625 2.0625 6.33594 2.0625 7.25C2.0625 8.19922 1.28906 8.9375 " +
        "0.375 8.9375V12.3125C0.375 13.2617 1.11328 14 2.0625 14H18.9375C19.8516 14 20.625 13.2617 20.625 " +
        "12.3125V8.9375C19.6758 8.9375 18.9375 8.19922 18.9375 7.25ZM17.25 3.59375V10.9062C17.25 11.3984 " +
        "16.8633 11.75 16.4062 11.75H4.59375C4.10156 11.75 3.75 11.3984 3.75 10.9062V3.59375C3.75 3.13672" +
        "4.10156 2.75 4.59375 2.75H16.4062C16.8633 2.75 17.25 3.13672 17.25 3.59375Z'" +
        "fill='#D0D0D0' />" +
        "</svg>" +
        "</div>" +
        "<div class='d_item_detail'>" +
        " <div class='d_detail_txt1'>" + deal.name + "</div>" +
        "<div class='d_detail_txt2'> " + deal.description + " </div>" +
        "</div>" +
        " </div>" +
        "<div class='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>" +
        " <div class='d_item_icon'>" +
        "<svg width='19' height='19' viewBox='0 0 19 19' fill='none'" +
        "xmlns='http://www.w3.org/2000/svg'>" +
        "<circle cx='9.42857' cy='9.42857' r='9.42857' fill='#D0D0D0' />" +
        "<path d='M6.94113 8.51212C5.64156 8.51212 4.58398 7.45455 4.58398 6.15498C4.58398 4.85542 5.64156 " +
        "3.79785 6.94113 3.79785C8.2407 3.79785 9.29827 4.85542 9.29827 6.15498C9.29827 7.45455 8.2407 " +
        "8.51212 6.94113 8.51212ZM6.94113 5.36927C6.50741 5.36927 6.15541 5.72127 6.15541 6.15498C6.15541 " +
        "6.5887 6.50741 6.9407 6.94113 6.9407C7.37484 6.9407 7.72684 6.5887 7.72684 6.15498C7.72684 5.72127 " +
        "7.37484 5.36927 6.94113 5.36927Z' fill='#FAFAFA' />" +
        "<path d='M11.655 14.7978C10.3554 14.7978 9.29785 13.7402 9.29785 12.4406C9.29785 11.1411 10.3554 " +
        " 10.0835 11.655 10.0835C12.9546 10.0835 14.0121 11.1411 14.0121 12.4406C14.0121 13.7402 12.9546 " +
        " 14.7978 11.655 14.7978ZM11.655 11.6549C11.2229 11.6549 10.8693 12.0085 10.8693 12.4406C10.8693 " +
        "12.8728 11.2229 13.2263 11.655 13.2263C12.0871 13.2263 12.4407 12.8728 12.4407 12.4406C12.4407 " +
        " 12.0085 12.0871 11.6549 11.655 11.6549Z' fill='#FAFAFA' />" +
        "<path d='M5.36963 14.7979C5.19206 14.7979 5.01448 14.7382 4.86677 14.6156C4.53363 14.3375 4.48806 " +
        " 13.8425 4.7662 13.5094L12.6233 4.08083C12.9031 3.74611 13.3981 3.70526 13.7296 3.98026C14.0628 " +
        "4.2584 14.1068 4.7534 13.8286 5.08811L5.97148 14.5166C5.81748 14.7005 5.59434 14.7979 5.36963 " +
        "14.7979Z' fill='#FAFAFA' />" +
        " </svg>" +
        "</div>" +
        " <div class='d_item_detail'>" +
        "<div class='d_detail_txt1'> $" + deal.originalprice + " for </div>" +
        "<div class='d_detail_txt2'> $" + deal.price + "</div>" +
        "</div>" +
        "</div>" +
        "<div class='col-lg-6 col-md-6 col-sm-12 col-12 d_item' style='display: none'>" +
        "<div class='d_item_icon'>" +
        "<svg width='19' height='19' viewBox='0 0 19 19' fill='none'" +
        "xmlns='http://www.w3.org/2000/svg'>" +
        "<circle cx='9.42857' cy='9.42857' r='9.42857' fill='#D0D0D0' />" +
        " <path" +
        "d='M6.94113 8.51212C5.64156 8.51212 4.58398 7.45455 4.58398 6.15498C4.58398 4.85542 5.64156 3.79785 6.94113 3.79785C8.2407 3.79785 9.29827 4.85542 9.29827 6.15498C9.29827 7.45455 8.2407 8.51212 6.94113 8.51212ZM6.94113 5.36927C6.50741 5.36927 6.15541 5.72127 6.15541 6.15498C6.15541 6.5887 6.50741 6.9407 6.94113 6.9407C7.37484 6.9407 7.72684 6.5887 7.72684 6.15498C7.72684 5.72127 7.37484 5.36927 6.94113 5.36927Z'" +
        "fill='#FAFAFA' />" +
        "<path" +
        "d='M11.655 14.7978C10.3554 14.7978 9.29785 13.7402 9.29785 12.4406C9.29785 11.1411 10.3554 10.0835 11.655 10.0835C12.9546 10.0835 14.0121 11.1411 14.0121 12.4406C14.0121 13.7402 12.9546 14.7978 11.655 14.7978ZM11.655 11.6549C11.2229 11.6549 10.8693 12.0085 10.8693 12.4406C10.8693 12.8728 11.2229 13.2263 11.655 13.2263C12.0871 13.2263 12.4407 12.8728 12.4407 12.4406C12.4407 12.0085 12.0871 11.6549 11.655 11.6549Z'" +
        " fill='#FAFAFA' />" +
        "<path" +
        " d='M5.36963 14.7979C5.19206 14.7979 5.01448 14.7382 4.86677 14.6156C4.53363 14.3375 4.48806 13.8425 4.7662 13.5094L12.6233 4.08083C12.9031 3.74611 13.3981 3.70526 13.7296 3.98026C14.0628 4.2584 14.1068 4.7534 13.8286 5.08811L5.97148 14.5166C5.81748 14.7005 5.59434 14.7979 5.36963 14.7979Z'" +
        "fill='#FAFAFA' />" +
        "</svg>" +
        "</div>" +
        "<div class='d_item_detail'>" +
        "<div class='d_detail_txt1'> $" + deal.originalprice + " for </div>" +
        "<div class='d_detail_txt2'> $" + deal.price + "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +

        "<div class='row' style='margin-bottom: 17px; padding: 0px 15px;'>" +
        "<div class='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>" +
        "<div class='d_item_icon'>" +
        "<svg width='17' height='19' viewBox='0 0 17 19' fill='none'" +
        " xmlns='http://www.w3.org/2000/svg'>" +
        " <path" +
        " d='M0.625 16.5625C0.625 17.5117 1.36328 18.25 2.3125 18.25H14.6875C15.6016 18.25 16.375 17.5117 16.375 16.5625V7H0.625V16.5625ZM2.875 9.8125C2.875 9.53125 3.12109 9.25 3.4375 9.25H13.5625C13.8438 9.25 14.125 9.53125 14.125 9.8125V12.0625C14.125 12.3789 13.8438 12.625 13.5625 12.625H3.4375C3.12109 12.625 2.875 12.3789 2.875 12.0625V9.8125ZM14.6875 2.5H13V0.8125C13 0.53125 12.7188 0.25 12.4375 0.25H11.3125C10.9961 0.25 10.75 0.53125 10.75 0.8125V2.5H6.25V0.8125C6.25 0.53125 5.96875 0.25 5.6875 0.25H4.5625C4.24609 0.25 4 0.53125 4 0.8125V2.5H2.3125C1.36328 2.5 0.625 3.27344 0.625 4.1875V5.875H16.375V4.1875C16.375 3.27344 15.6016 2.5 14.6875 2.5Z'" +
        " fill='#D0D0D0' />" +
        " </svg>" +
        " </div>" +
        " <div class='d_item_detail'>" +
        "<div class='d_detail_txt1'> Pucharse Deal By </div>" +
        "<div class='d_detail_txt2'>" + deal.enddate1 + "</div>" +
        " </div>" +
        "</div>" +
        "<div class='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>" +
        "<div class='d_item_icon'>" +
        "<svg width='17' height='19' viewBox='0 0 17 19' fill='none'" +
        " xmlns='http://www.w3.org/2000/svg'>" +
        "<path" +
        " d='M0.625 16.5625C0.625 17.5117 1.36328 18.25 2.3125 18.25H14.6875C15.6016 18.25 16.375 17.5117 16.375 16.5625V7H0.625V16.5625ZM2.875 9.8125C2.875 9.53125 3.12109 9.25 3.4375 9.25H13.5625C13.8438 9.25 14.125 9.53125 14.125 9.8125V12.0625C14.125 12.3789 13.8438 12.625 13.5625 12.625H3.4375C3.12109 12.625 2.875 12.3789 2.875 12.0625V9.8125ZM14.6875 2.5H13V0.8125C13 0.53125 12.7188 0.25 12.4375 0.25H11.3125C10.9961 0.25 10.75 0.53125 10.75 0.8125V2.5H6.25V0.8125C6.25 0.53125 5.96875 0.25 5.6875 0.25H4.5625C4.24609 0.25 4 0.53125 4 0.8125V2.5H2.3125C1.36328 2.5 0.625 3.27344 0.625 4.1875V5.875H16.375V4.1875C16.375 3.27344 15.6016 2.5 14.6875 2.5Z'" +
        " fill='#D0D0D0' />" +
        " </svg>" +
        "</div>" +
        "<div class='d_item_detail'>" +
        "<div class='d_detail_txt1'> Redeem Deal By </div>" +
        "<div class='d_detail_txt2'>" + deal.expirydate1 + "</div>" +
        "</div>" +
        " </div>";
    if (deal.btype == 'offline') {
        html += "<div class='col-lg-6 col-md-12 col-sm-12 col-12 d_item'>" +
            "<div class='d_item_icon'>" +
            " <svg width='14' height='19' viewBox='0 0 14 19' fill='none'" +
            " xmlns='http://www.w3.org/2000/svg'>" +
            "<path " +
            "d='M6.04688 17.8984C6.36328 18.3906 7.10156 18.3906 7.41797 17.8984C12.5508 10.5156 13.5 9.74219 13.5 7C13.5 3.27344 10.4766 0.25 6.75 0.25C2.98828 0.25 0 3.27344 0 7C0 9.74219 0.914062 10.5156 6.04688 17.8984ZM6.75 9.8125C5.16797 9.8125 3.9375 8.58203 3.9375 7C3.9375 5.45312 5.16797 4.1875 6.75 4.1875C8.29688 4.1875 9.5625 5.45312 9.5625 7C9.5625 8.58203 8.29688 9.8125 6.75 9.8125Z'" +
            "fill='#D0D0D0' />" +
            " </svg>" +
            "</div>" +
            "<div class='d_item_detail'>" +
            "<div class='d_detail_txt1' id='margin'>" + deal.baddress + "</div>" +
            "<a onclick='openMap()' target='_blank' class='d_detail_txt2' id='distance'></a>" +
            " </div>" +
            "</div>";
    } else {
        html += "<div class='col-lg-6 col-md-12 col-sm-12 col-12 d_item' style='padding-top: 10px; display:" + (deal.website ? 'block' : 'none') + ";'>" +
            "<div style='width: 18px; height: 18px; float: left;'>" +
            "<svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
            "<path d='M11.8125 5.875C11.3203 2.74609 10.0898 0.53125 8.71875 0.53125C7.3125 0.53125 6.11719 2.74609 5.58984 5.875H11.8125ZM5.34375 9.25C5.34375 10.0586 5.37891 10.7969 5.44922 11.5H11.9531C12.0234 10.7969 12.0586 10.0586 12.0586 9.25C12.0586 8.47656 12.0234 7.73828 11.9531 7H5.44922C5.37891 7.73828 5.34375 8.47656 5.34375 9.25ZM16.7344 5.875C15.75 3.51953 13.7109 1.65625 11.1797 0.917969C12.0586 2.11328 12.6211 3.90625 12.9375 5.875H16.7344ZM6.22266 0.917969C3.69141 1.65625 1.65234 3.51953 0.667969 5.875H4.46484C4.78125 3.90625 5.34375 2.11328 6.22266 0.917969ZM17.1211 7H13.0781C13.1484 7.73828 13.2188 8.51172 13.2188 9.25C13.2188 10.0234 13.1484 10.7617 13.0781 11.5H17.1211C17.2969 10.7969 17.4023 10.0586 17.4023 9.25C17.4023 8.47656 17.2969 7.73828 17.1211 7ZM4.21875 9.25C4.21875 8.51172 4.25391 7.73828 4.32422 7H0.28125C0.105469 7.73828 0 8.47656 0 9.25C0 10.0586 0.105469 10.7969 0.28125 11.5H4.32422C4.25391 10.7617 4.21875 10.0234 4.21875 9.25ZM5.58984 12.625C6.11719 15.7891 7.3125 17.9688 8.71875 17.9688C10.0898 17.9688 11.3203 15.7891 11.8125 12.625H5.58984ZM11.1797 17.6172C13.7109 16.8789 15.75 15.0156 16.7344 12.625H12.9375C12.6562 14.6289 12.0586 16.4219 11.1797 17.6172ZM0.667969 12.625C1.65234 15.0156 3.69141 16.8789 6.22266 17.6172C5.34375 16.4219 4.78125 14.6289 4.46484 12.625H0.667969Z' fill='#D0D0D0'/>" +
            "</svg>" +
            "</div>" +
            " <div style='width: 100%; margin-left: 30px; height: auto;'>" +
            "<a href='https://" + deal.website + "' class='bus_mid_link'>" + deal.website + "</a> " +
            "</div>" +
            "</div>";
    }
    html += "</div>" +
        "</div>" +
        "</div>" +

        "<div class='d_bottom'>" +
        "<div class='row' style='padding: 0px 15px'>" +
        "<div class='col-md-6 col-sm-12' style='padding: 0px'>" +
        " <div class='d_bottom_part'>" +
        "<div style='width: 50%; height: 61px; float: left;'>" +
        "<div class='d_bottom_txt1'>Deal available to buy till:</div>" +
        "<div class='d_bottom_txt2' id='leftTime'></div>" +
        "</div>" +
        "<div style='width: 50%; height: 61px; float: left;'>" +
        "<div class='d_bottom_txt3'> $" + deal.originalprice + "</div>" +
        " <div class='d_bottom_txt4'> $" + deal.price + "</div>" +
        "</div>" +
        "<button onclick='openApp()' class='d_bottom_btn'>Download Mobile App to Buy Deal</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    html += "<footer class='col-xl-11 mx-auto'>" +
        "<ul class='list-unstyled d-flex justify-content-center flex-wrap'>" +
        "<li class='social-icon'><a href='https://www.facebook.com/momnpophub'" +
        " class='social-icon__link d-block fb' target='_blank' rel='noopener noreferrer'" +
        "data-nsfw-filter-status='swf'></a></li>" +
        "<li class='social-icon'><a href='https://www.instagram.com/momnpophub/'" +
        "class='social-icon__link d-block instagram' target='_blank' rel='noopener noreferrer'" +
        "data-nsfw-filter-status='swf'></a></li>" +
        "<li class='social-icon'><a href='https://www.linkedin.com/company/momnpophub/'" +
        "class='social-icon__link d-block linkedin' target='_blank' rel='noopener noreferrer'" +
        "data-nsfw-filter-status='swf'></a></li>" +
        "<li class='social-icon'><a href='https://twitter.com/momnpophub'" +
        "class='social-icon__link d-block twitter' target='_blank' rel='noopener noreferrer'" +
        "data-nsfw-filter-status='swf'></a></li>" +
        " <li class='social-icon'><a" +
        "href='https://open.spotify.com/show/0qE4P5dlLXVzmoNunAWMC2?si=h930NSMYTPCoOS-PHO2Gqg'" +
        " class='social-icon__link d-block spotify' target='_blank' rel='noopener noreferrer'" +
        " data-nsfw-filter-status='swf'></a></li>" +
        "<li class='social-icon'><a href='https://play.google.com/store/apps/details?id=com.momnpophub'" +
        " class='social-icon__link d-block google-play' target='_blank' rel='noopener noreferrer'" +
        " data-nsfw-filter-status='swf'></a></li>" +
        " <li class='social-icon'><a href='https://www.youtube.com/channel/UCJPIGMXPga0AM_1OrvQU55Q/'" +
        "class='social-icon__link d-block youtube' target='_blank' rel='noopener noreferrer'" +
        "data-nsfw-filter-status='swf'></a></li>" +
        "<li class='social-icon'><a href='https://apps.apple.com/us/app/mom-n-pop-hub/id1494101666'" +
        "class='social-icon__link d-block apple' target='_blank' rel='noopener noreferrer'" +
        "data-nsfw-filter-status='swf'></a></li>" +
        " </ul>" +
        " <ul class='footer-menu d-flex justify-content-between list-unstyled flex-wrap position-relative'>" +
        "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
        " href='#/about-us' data-nsfw-filter-status='swf'>About Us</a></li>" +
        "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
        " href='#/free-business-invitation' data-nsfw-filter-status='swf'>Add Your Business &amp; Deals" +
        "For <span data-nsfw-filter-status='swf'>FREE</span></a></li>" +
        "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
        "href='#/customer-business-app' data-nsfw-filter-status='swf'>Customer &amp; Business App</a>" +
        " </li>" +
        "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
        " href='#/term' data-nsfw-filter-status='swf'>Terms &amp; Conditions</a></li>" +
        "<li class='footer-menu__item text-center'><a class='footer-menu__item__link text-decoration-none'" +
        " href='#/privacy' data-nsfw-filter-status='swf'>Privacy Policy</a></li>" +
        " </ul><span class='text-center mx-auto d-block mb-4' data-nsfw-filter-status='swf'>© 2021 Mom&amp;Pop. All" +
        " rights reserved.</span>" +
        "  </footer>" +
        " </body>" +
        "</html>";
    res.send(html);
}
