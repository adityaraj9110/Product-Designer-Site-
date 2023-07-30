const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var t1 = gsap.timeline();

    t1.from("#nav",{
        y:'-10',
        opacity: 0,
        duration:2,
        ease: Expo.easeInOut

    })
    .to(".boundingelem",{
        y:"0",
        ease:Expo.easeInOut,
        delay:-.4,
        duration:1.5,
        stagger:0.2
        
    })
    .from("#heroFooter",{
        y:-10,
        opacity:0,
        delay:-.4,
        duration:1,
        ease: Expo.easeInOut

    })
}

// mouse/circle follower :-
// jab mouse emove ho to hum log skew kar paye aur maximum skew and minimum skew  
// define kr paye, jab mouse move ho to scale ki value badhe, aur jab mouse 
// chlna bnd bnd ho jaye to scale hta lo yani 1 krdo original position: 


//  kisi bhi value ko ek range me set krne ko clamp kehte hai:
//  usko clamp kehte hai ---> ye feature hme gsap khud  provide krti hai;
//  gsap.utils.clamp(min value,max value,value which needs to be converted in range)
// gsap.utils.clamp(100,200,25)  ans is 100
// gsap.utils.clamp(100,200,150)  ans is 150
// gsap.utils.clamp(100,200,201)  ans is 200

// hme scale krna hai but bhut jada scale bhi nhi krna hai
// so hm 0.8 to 1 to 1.2 yhi tk scale krenege
// jb x direction me mouse move hoga tb scaleX reduce krenge
// jb y direction me mouse move hoga tb scaleX increase krenge taki ek oval shap mile


var timeout;
function circleFollower(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;
    
    // prev value 
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",(dets)=>{
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8,1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8,1.2, dets.clientY - yprev);
        
        

        xprev = dets.clientX;
        yprev = dets.clientY;
        

        // jb mouse ruke aur 100ms tk user mouse ko move na kre tb scale 1 1 ho jayega
        // but if user started moving the mouse within 100ms then this setTimeout get cleared 
        // this is exactly like debouncing

        circleMouseFollower(xscale,yscale);
        
        timeout = setTimeout(()=>{
            document.querySelector(".miniCircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        },100)

    })
    

      
}



function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(det){
        document.querySelector(".miniCircle").style.transform = `translate(${det.clientX}px,${det.clientY}px) scale(${xscale},${yscale})`
    })
}

// Image follower steps:-
// teeno element ko select karo ,uske bad teeno par ek mousemove lgao,
// jab mousemove ho to ye pata karo ki mouse kaha par hai ,jiska matlab hai
// mouse ki x and y position pata karo, ab mouse ki x and y position ke bdle 
// us image ko show karo and us image ko move karo, move karte time rotate kro,
// and jaise jaise mouse tez chale waise waise rotation bhi tej ho jaye

document.querySelectorAll(".elem").forEach((e,i)=>{
    var prevRotate = 0;
    var diffRotate = 0;


    e.addEventListener("mouseleave",(dets)=>{
        gsap.to(e.querySelector("img"),{
            opacity: 0,
            ease:Power3,
        })
        gsap.to(e.querySelector("h1"),{
            opacity: 0.7,
            ease: Power3,
            duration:0.6,
            marginLeft: "0px"
        })
        
    })

    e.addEventListener("mousemove",(dets)=>{
        var diff = dets.clientY - e.getBoundingClientRect().top;
        diffRotate = dets.clientX - prevRotate;
        prevRotate = dets.clientX;

        

        gsap.to(e.querySelector("img"),{
            opacity: 1,
            ease:Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffRotate*0.5)
        })

        gsap.to(e.querySelector("h1"),{
            opacity: 0.4,
            ease: Power3,
            duration:0.6,
            marginLeft: "30px"
        })
        
    })
})



circleMouseFollower();
firstPageAnim(); 
circleFollower();