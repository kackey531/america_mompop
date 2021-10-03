import React, { useEffect, useState }  from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./d_detail.css";
import store_logo from '../../assets/images/store_logo.png';
import online_logo from '../../assets/images/online_logo.png';
import { MicNone } from "@material-ui/icons";
const Ddetail = (props) => {
    const [deals, setDeals] = useState([]);
    const [other, setOther] = useState([]);
    const [left_time, setTime] = useState([]);
    const [distance, setDistance] = useState(false);
    let history = useHistory();
    useEffect(() => {
        props.setWhere(false);
        if(props.selectedDealId)
            getDealData();
        else
            history.push('/about-us');
      }, []);

    useEffect(()=> {      
        if(other.btype=='offline') { 
            getMyLocation();
        }
    }, [other]);
    
    useEffect(()=> {      
        if(props.selectedProfileId) {
            props.setSelectedDealId(false); 
            history.push('/profile');
        }
    }, [props.selectedProfileId]);

    const calculateDistance = (position) => {
        var lat1 = other.lat;
        var lon1 = other.long;
        var lat2 = position.coords.latitude;
        var lon2 = position.coords.longitude;
        console.log(lat1 + ',' + lon1 + '/' + lat2 + ',' + lon2);
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1)*(Math.PI/180)
        var dLon = (lon2-lon1)*(Math.PI/180) 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        var mile = d / 1.6093;
        mile = mile * 2;
        mile = (mile - mile%2) / 2;
        setDistance(mile);
    };
    const getMyLocation = () => {
        window.navigator.geolocation
        .getCurrentPosition(calculateDistance, console.log);
    };

    const setTimer = (time) => {
        var timer = setTimeout(function(){
            var time_min = (time - (time % 60000))/60000; 
            var temp = time_min % 1440; 
             var day = (time_min - temp) / 1440;
            var min = temp % 60;
            var hour = (temp - min) / 60;
            if(day == 0 && min == 0 && hour == 0){
                setTime('0d 00h 00m');
                clearTimeout(timer);
            } else {
                min = min < 10? '0'+min: min;
                hour = hour < 10? '0'+hour: hour;
                var leftTime = day + 'd ' + hour + 'h ' + min + 'm';
                setTime(leftTime);
                setTimer(time - 60000);
            }             
        }, 60000);
    }
      
    const getDealData = () => {
        axios
        .post(process.env.REACT_APP_BASEURL + "/getinfo/deal", {id:props.selectedDealId})
        .then((response) => { console.log(response.data);
            if(response.data == 'fail'){
                alert("Opps, such a profile doesn't exist.");
            } else {
                setDeals(response.data.deals);
                setOther(response.data.other);
                console.log("Deal Detail Page URL : " + process.env.REACT_APP_BASEURL + "/businessinfo/deal/" + response.data.deals._id);
                var time = response.data.other.time;
                var time_min = (time - (time % 60000))/60000;
                var temp = time_min % 1440;
                var day = (time_min - temp) / 1440;
                var min = temp % 60;
                var hour = (temp - min) / 60;
                if(day == 0 && min == 0 && hour == 0){
                    setTime('0d 00h 00m');
                } else {
                    min = min < 10? '0'+min: min;
                    hour = hour < 10? '0'+hour: hour;
                    var showTime = day + 'd ' + hour + 'h ' + min + 'm';
                    setTime(showTime);
                    setTimer(time - 60000);
                }
            }
        })
        .catch((err) => { 
            console.log('ERROR : ' + err);
            alert('ERROR : ' + err);
         });         
    }

    const navToProfile = (id) => {
        props.setSelectedProfileId(id);
    } 

    const openMap = () => {
        var lat = other.lat;
        var lng = other.long;
        // If it's an iPhone..
        if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
            function iOSversion() {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                // supports iOS 2.0 and later
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            }
            }
            var ver = iOSversion() || [0];
    
            var protocol = 'http://';
            if (ver[0] >= 6) {
            protocol = 'maps://';
            }
            window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';
        }
        else {
            window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=');
        }
    }

    
    const openApp = () => {
        window.location.href=('https://onelink.to/7f52xq');
    }

    const showAddress = () => {
        if(other.btype != 'online'){
            return(
                <div className='col-lg-6 col-md-12 col-sm-12 col-12 d_item'>
                    <div className='d_item_icon'>
                        <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.04688 17.8984C6.36328 18.3906 7.10156 18.3906 7.41797 17.8984C12.5508 10.5156 13.5 9.74219 13.5 7C13.5 3.27344 10.4766 0.25 6.75 0.25C2.98828 0.25 0 3.27344 0 7C0 9.74219 0.914062 10.5156 6.04688 17.8984ZM6.75 9.8125C5.16797 9.8125 3.9375 8.58203 3.9375 7C3.9375 5.45312 5.16797 4.1875 6.75 4.1875C8.29688 4.1875 9.5625 5.45312 9.5625 7C9.5625 8.58203 8.29688 9.8125 6.75 9.8125Z" fill="#D0D0D0"/>
                        </svg>
                    </div>
                    <div className='d_item_detail'>
                        <div className='d_detail_txt1'style={{marginTop: distance>0?'0px':'10px'}}> {other.baddress}  </div>
                        <a onClick={openMap} target="_blank" className='d_detail_txt2'>{distance>0?'Distance:'+distance+' miles away':''} </a>
                    </div>
                </div>
            ) 
        } else {
            return(
            <div className='col-lg-6 col-md-12 col-sm-12 col-12 d_item' style={{paddingTop: '10px', display: other.website?'block':'none'}}>
                <div style={{width: '18px', height: '18px', float: 'left'}}>
                    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M11.8125 5.875C11.3203 2.74609 10.0898 0.53125 8.71875 0.53125C7.3125 0.53125 6.11719 2.74609 5.58984 5.875H11.8125ZM5.34375 9.25C5.34375 10.0586 5.37891 10.7969 5.44922 11.5H11.9531C12.0234 10.7969 12.0586 10.0586 12.0586 9.25C12.0586 8.47656 12.0234 7.73828 11.9531 7H5.44922C5.37891 7.73828 5.34375 8.47656 5.34375 9.25ZM16.7344 5.875C15.75 3.51953 13.7109 1.65625 11.1797 0.917969C12.0586 2.11328 12.6211 3.90625 12.9375 5.875H16.7344ZM6.22266 0.917969C3.69141 1.65625 1.65234 3.51953 0.667969 5.875H4.46484C4.78125 3.90625 5.34375 2.11328 6.22266 0.917969ZM17.1211 7H13.0781C13.1484 7.73828 13.2188 8.51172 13.2188 9.25C13.2188 10.0234 13.1484 10.7617 13.0781 11.5H17.1211C17.2969 10.7969 17.4023 10.0586 17.4023 9.25C17.4023 8.47656 17.2969 7.73828 17.1211 7ZM4.21875 9.25C4.21875 8.51172 4.25391 7.73828 4.32422 7H0.28125C0.105469 7.73828 0 8.47656 0 9.25C0 10.0586 0.105469 10.7969 0.28125 11.5H4.32422C4.25391 10.7617 4.21875 10.0234 4.21875 9.25ZM5.58984 12.625C6.11719 15.7891 7.3125 17.9688 8.71875 17.9688C10.0898 17.9688 11.3203 15.7891 11.8125 12.625H5.58984ZM11.1797 17.6172C13.7109 16.8789 15.75 15.0156 16.7344 12.625H12.9375C12.6562 14.6289 12.0586 16.4219 11.1797 17.6172ZM0.667969 12.625C1.65234 15.0156 3.69141 16.8789 6.22266 17.6172C5.34375 16.4219 4.78125 14.6289 4.46484 12.625H0.667969Z' fill='#D0D0D0'/>
                    </svg>
                </div>
                <div style={{width: '100%',marginLeft: '30px', height: 'auto'}}>
                    <a href={'https://'+other.website} target="_blank" className='bus_mid_link'> {other.website}  </a> 
                </div>
            </div>
            )
        }
    }

  return (
    <>
        <div className="part_block">
            <div className="row other_container">
                <div className='bus_top'>
                    <div className='bus_top_title'>
                        Please, download mobile app for viewing business details and buying deals at your nearby Mom n Pop Shop
                    </div>
                    <button onClick={openApp} className="bus_top_btn">Open App</button>
                </div>
                <div className='d_body'>
                    <div className='bus_mid_header' style={{position: 'relative'}}> 
                        <b style={{float: 'left', fontSize: '18px', lineHeight: '22px', marginRight: '5px'}}>{'< '}</b>
                        <div onClick={() => navToProfile(other.bid)} className='bus_mid_header_title' style={{marginBottom:'20px'}}>{other.bname}</div>
                        {/*<button onClick={() => navToProfile(other.bid)} className="bus_top_btn" style={{marginLeft: '-10px',marginTop: '-10px'}}>To Profile</button>*/}
                        <a href={"mailTo: .?Subject=Please check this Deal detail page. "+process.env.REACT_APP_BASEURL + "/businessinfo/deal/" + deals._id}
                         className='bus_mid_header_icon' style={{position: 'absolute', top: '15px', right: '15px'}}>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5312 5.61719C15.8047 5.34375 15.8047 4.93359 15.5312 4.66016L11.5938 
                                0.941406C11.1836 0.558594 10.5 0.832031 10.5 1.43359V3.40234C6.48047 3.40234 3.28125 
                                4.19531 3.28125 8.13281C3.28125 9.69141 4.23828 11.25 5.30469 12.043C5.63281 12.2891 
                                6.09766 11.9883 5.98828 11.5781C4.86719 7.85938 6.53516 6.90234 10.5 6.90234V8.84375C10.5 
                                9.44531 11.1836 9.71875 11.5938 9.33594L15.5312 5.61719ZM10.5 
                                11.1406V13H1.75V4.25H3.11719C3.19922 4.25 3.30859 4.22266 3.36328 4.16797C3.77344 
                                3.73047 4.23828 3.40234 4.75781 3.12891C5.05859 2.96484 4.94922 2.5 4.62109 
                                2.5H1.3125C0.574219 2.5 0 3.10156 0 3.8125V13.4375C0 14.1758 0.574219 14.75 1.3125 
                                14.75H10.9375C11.6484 14.75 12.25 14.1758 12.25 13.4375V11.0312C12.25 10.7852 12.0039 
                                10.6484 11.7852 10.7031C11.6211 10.7852 11.3203 10.8398 11.1562 10.8398C11.0742 10.8398 
                                10.9375 10.8125 10.8555 10.8125C10.6641 10.7852 10.5 10.9219 10.5 11.1406Z" fill="black"/>
                            </svg>
                        </a>
                    </div>                    
                    <div className='row d_mid_body'>
                        <div className='d_part1'>
                        <img src={other.btype=='online'?online_logo:store_logo} width='65px' height='65px'/>
                        </div>
                        <div className='d_part2'>
                            <div className='row' style={{marginBottom: '7px', padding: '0px 15px'}}>
                                <div onClick={() => navToProfile(other.bid)} style={{fontFamily: 'Montserrat',fontStyle: 'normal',fontWeight: 'bold', fontSize: '14px',lineHeight: '30px', float: 'left',cursor: 'pointer'}}>
                                    {other.bname}
                                </div>
                                <div style={{fontFamily: 'Montserrat',fontStyle: 'normal', fontSize: '14px',lineHeight: '20px', width: '100%', display: other.description?'block':'none'}}>
                                    {other.bdescription}
                                </div>
                            </div>
                            <div className='row' style={{marginBottom: '10px', padding: '0px 15px'}}>
                                <div className='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>
                                    <div className='d_item_icon'>
                                        <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.875 3.875V10.625H16.125V3.875H4.875ZM18.9375 7.25C18.9375 6.33594 19.6758 5.5625 
                                            20.625 5.5625V2.1875C20.625 1.27344 19.8516 0.5 18.9375 0.5H2.0625C1.11328 0.5 0.375 1.27344 
                                            0.375 2.1875V5.5625C1.28906 5.5625 2.0625 6.33594 2.0625 7.25C2.0625 8.19922 1.28906 8.9375 
                                            0.375 8.9375V12.3125C0.375 13.2617 1.11328 14 2.0625 14H18.9375C19.8516 14 20.625 13.2617 20.625 
                                            12.3125V8.9375C19.6758 8.9375 18.9375 8.19922 18.9375 7.25ZM17.25 3.59375V10.9062C17.25 11.3984 
                                            16.8633 11.75 16.4062 11.75H4.59375C4.10156 11.75 3.75 11.3984 3.75 10.9062V3.59375C3.75 3.13672 
                                            4.10156 2.75 4.59375 2.75H16.4062C16.8633 2.75 17.25 3.13672 17.25 3.59375Z" fill="#D0D0D0"/>
                                        </svg>
                                    </div>
                                    <div className='d_item_detail'>
                                        <div className='d_detail_txt1'> {deals.name}  </div>
                                        <div className='d_detail_txt2'> {deals.description} </div>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>
                                    <div className='d_item_icon'>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9.42857" cy="9.42857" r="9.42857" fill="#D0D0D0"/>
                                            <path d="M6.94113 8.51212C5.64156 8.51212 4.58398 7.45455 4.58398 6.15498C4.58398 4.85542 5.64156 
                                            3.79785 6.94113 3.79785C8.2407 3.79785 9.29827 4.85542 9.29827 6.15498C9.29827 7.45455 8.2407 
                                            8.51212 6.94113 8.51212ZM6.94113 5.36927C6.50741 5.36927 6.15541 5.72127 6.15541 6.15498C6.15541 
                                            6.5887 6.50741 6.9407 6.94113 6.9407C7.37484 6.9407 7.72684 6.5887 7.72684 6.15498C7.72684 5.72127 
                                            7.37484 5.36927 6.94113 5.36927Z" fill="#FAFAFA"/>
                                            <path d="M11.655 14.7978C10.3554 14.7978 9.29785 13.7402 9.29785 12.4406C9.29785 11.1411 10.3554 
                                            10.0835 11.655 10.0835C12.9546 10.0835 14.0121 11.1411 14.0121 12.4406C14.0121 13.7402 12.9546 
                                            14.7978 11.655 14.7978ZM11.655 11.6549C11.2229 11.6549 10.8693 12.0085 10.8693 12.4406C10.8693 
                                            12.8728 11.2229 13.2263 11.655 13.2263C12.0871 13.2263 12.4407 12.8728 12.4407 12.4406C12.4407 
                                            12.0085 12.0871 11.6549 11.655 11.6549Z" fill="#FAFAFA"/>
                                            <path d="M5.36963 14.7979C5.19206 14.7979 5.01448 14.7382 4.86677 14.6156C4.53363 14.3375 4.48806 
                                            13.8425 4.7662 13.5094L12.6233 4.08083C12.9031 3.74611 13.3981 3.70526 13.7296 3.98026C14.0628 
                                            4.2584 14.1068 4.7534 13.8286 5.08811L5.97148 14.5166C5.81748 14.7005 5.59434 14.7979 5.36963 
                                            14.7979Z" fill="#FAFAFA"/>
                                        </svg>
                                    </div>
                                    <div className='d_item_detail'>
                                        <div className='d_detail_txt1'> ${deals.originalprice} products for   </div>
                                        <div className='d_detail_txt2'> ${deals.price} </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12 col-12 d_item' style={{display: 'none'}}>
                                    <div className='d_item_icon'>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9.42857" cy="9.42857" r="9.42857" fill="#D0D0D0"/>
                                            <path d="M6.94113 8.51212C5.64156 8.51212 4.58398 7.45455 4.58398 6.15498C4.58398 4.85542 5.64156 3.79785 6.94113 3.79785C8.2407 3.79785 9.29827 4.85542 9.29827 6.15498C9.29827 7.45455 8.2407 8.51212 6.94113 8.51212ZM6.94113 5.36927C6.50741 5.36927 6.15541 5.72127 6.15541 6.15498C6.15541 6.5887 6.50741 6.9407 6.94113 6.9407C7.37484 6.9407 7.72684 6.5887 7.72684 6.15498C7.72684 5.72127 7.37484 5.36927 6.94113 5.36927Z" fill="#FAFAFA"/>
                                            <path d="M11.655 14.7978C10.3554 14.7978 9.29785 13.7402 9.29785 12.4406C9.29785 11.1411 10.3554 10.0835 11.655 10.0835C12.9546 10.0835 14.0121 11.1411 14.0121 12.4406C14.0121 13.7402 12.9546 14.7978 11.655 14.7978ZM11.655 11.6549C11.2229 11.6549 10.8693 12.0085 10.8693 12.4406C10.8693 12.8728 11.2229 13.2263 11.655 13.2263C12.0871 13.2263 12.4407 12.8728 12.4407 12.4406C12.4407 12.0085 12.0871 11.6549 11.655 11.6549Z" fill="#FAFAFA"/>
                                            <path d="M5.36963 14.7979C5.19206 14.7979 5.01448 14.7382 4.86677 14.6156C4.53363 14.3375 4.48806 13.8425 4.7662 13.5094L12.6233 4.08083C12.9031 3.74611 13.3981 3.70526 13.7296 3.98026C14.0628 4.2584 14.1068 4.7534 13.8286 5.08811L5.97148 14.5166C5.81748 14.7005 5.59434 14.7979 5.36963 14.7979Z" fill="#FAFAFA"/>
                                        </svg>
                                    </div>
                                    <div className='d_item_detail'>
                                        <div className='d_detail_txt1'> $500 products for   </div>
                                        <div className='d_detail_txt2'> $300 </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='row' style={{marginBottom: '17px', padding: '0px 15px'}}>
                                <div className='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>
                                    <div className='d_item_icon'>
                                        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.625 16.5625C0.625 17.5117 1.36328 18.25 2.3125 18.25H14.6875C15.6016 18.25 16.375 17.5117 16.375 16.5625V7H0.625V16.5625ZM2.875 9.8125C2.875 9.53125 3.12109 9.25 3.4375 9.25H13.5625C13.8438 9.25 14.125 9.53125 14.125 9.8125V12.0625C14.125 12.3789 13.8438 12.625 13.5625 12.625H3.4375C3.12109 12.625 2.875 12.3789 2.875 12.0625V9.8125ZM14.6875 2.5H13V0.8125C13 0.53125 12.7188 0.25 12.4375 0.25H11.3125C10.9961 0.25 10.75 0.53125 10.75 0.8125V2.5H6.25V0.8125C6.25 0.53125 5.96875 0.25 5.6875 0.25H4.5625C4.24609 0.25 4 0.53125 4 0.8125V2.5H2.3125C1.36328 2.5 0.625 3.27344 0.625 4.1875V5.875H16.375V4.1875C16.375 3.27344 15.6016 2.5 14.6875 2.5Z" fill="#D0D0D0"/>
                                        </svg>
                                    </div>
                                    <div className='d_item_detail'>
                                        <div className='d_detail_txt1'> Purchase Deal By  </div>
                                        <div className='d_detail_txt2'> {other.enddate} </div>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-12 col-12 d_item'>
                                    <div className='d_item_icon'>
                                        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.625 16.5625C0.625 17.5117 1.36328 18.25 2.3125 18.25H14.6875C15.6016 18.25 16.375 17.5117 16.375 16.5625V7H0.625V16.5625ZM2.875 9.8125C2.875 9.53125 3.12109 9.25 3.4375 9.25H13.5625C13.8438 9.25 14.125 9.53125 14.125 9.8125V12.0625C14.125 12.3789 13.8438 12.625 13.5625 12.625H3.4375C3.12109 12.625 2.875 12.3789 2.875 12.0625V9.8125ZM14.6875 2.5H13V0.8125C13 0.53125 12.7188 0.25 12.4375 0.25H11.3125C10.9961 0.25 10.75 0.53125 10.75 0.8125V2.5H6.25V0.8125C6.25 0.53125 5.96875 0.25 5.6875 0.25H4.5625C4.24609 0.25 4 0.53125 4 0.8125V2.5H2.3125C1.36328 2.5 0.625 3.27344 0.625 4.1875V5.875H16.375V4.1875C16.375 3.27344 15.6016 2.5 14.6875 2.5Z" fill="#D0D0D0"/>
                                        </svg>
                                    </div>
                                    <div className='d_item_detail'>
                                        <div className='d_detail_txt1'> Redeem Deal By  </div>
                                        <div className='d_detail_txt2'> {other.expirydate} </div>
                                    </div>
                                </div>
                                {showAddress()}
                            </div>
                        </div>
                    </div>                  
                
                    <div className='d_bottom'>
                        <div className='row' style={{padding: '0px 15px'}}>
                            <div className='col-md-6 col-sm-12' style={{padding: '0px'}}>
                                <div className='d_bottom_part'>
                                    <div style={{width: '50%', height: '61px', float: 'left'}}>
                                        <div className='d_bottom_txt1'>Deal available to buy till:</div>
                                        <div className='d_bottom_txt2'>{left_time}</div>
                                    </div>
                                    <div style={{width: '50%', height: '61px', float: 'left'}}>                                    
                                        <div className='d_bottom_txt3'>${deals.originalprice}.00</div>
                                        <div className='d_bottom_txt4'>${deals.price}.00</div>
                                    </div>
                                    <button onClick={openApp}  className='d_bottom_btn'>Download Mobile App to Buy Deal</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>             
            </div>
        </div>
    </>
  );
};

export default Ddetail;
