import "./grid.css"
import React, { useCallback, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import Login from "./Login&Signup/Login";
import Signup from "./Login&Signup/signup";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { Footer } from "../footer";
import { grey } from "@mui/material/colors";

export function Landing() {
    
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [heading, setHeading] = useState("chai time snacks idea")
    const [color, setColor] = useState("teal")
    const [bounce, setBounce] = useState(true)
    const [auth, isAuth] = useState(false)
    const [scrolls, setScrolls] = useState(false)
    
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const arrayOfHeadings = [ "home decor idea", "outfit idea", "DIY idea","chai time snacks idea"]
    const arrayOfColors = ["rgb(230,0,35)", "green", "purple", "teal"]

    let i = 0;
    React.useEffect(() => {
            const interval = setInterval(() => {
                setHeading(arrayOfHeadings[i])
                setColor(arrayOfColors[i])
                i++
                if (i >= arrayOfHeadings.length) {
                    i=0
                }
                
            }, 5730);

            return () => {
            clearInterval(interval);
            };
        },[i]);

    React.useEffect(() => {
        const grids = document.querySelectorAll('.grid');
        const headings = document.querySelectorAll('.heading .wrapper .text')

        function enterScreen(index) {
        const grid = grids[index]; 
        const heading = headings[index];
        const gridColumns = grid.querySelectorAll('.column');

        grid.classList.add('active');

        gridColumns.forEach( element => {
        element.classList.remove('animate-before', 'animate-after');

        })

        heading.classList.remove('animate-before', 'animate-after');
        }

        function exitScreen(index, exitDelay){
        const grid = grids[index]; 
        const heading = headings[index];
        const gridColumns = grid.querySelectorAll('.column');

        
        gridColumns.forEach( element => {
            element.classList.add('animate-after');

        })

        heading.classList.add('animate-after');
        
        setTimeout(()=>{
            grid.classList.remove('active');
            
        },exitDelay)
        }

        function setupAnimationCycle({ timePerScreen, exitDelay }){
        //Delay time plus end animation time for all columns
        const cycleTime = timePerScreen + exitDelay;

        let nextIndex = 0;

        function nextCicle(){
            const currentIndex = nextIndex;

            enterScreen(currentIndex);


            setTimeout(()=> exitScreen(currentIndex, exitDelay), timePerScreen);

            nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
        }

        nextCicle();

        setInterval(nextCicle, cycleTime);

        }


        setupAnimationCycle({
        timePerScreen: 3000,
        exitDelay: 400 * 7,
        })
    },[])
            

    function scrollToTop() {
         scroll.scrollToBottom();
    }

    window.onscroll = () => {
        if (window.scrollY > 200) {
            setBounce(false)
        }
        else {
            setBounce(true)
        }
    };

    const [y, setY] = useState(window.scrollY);

    
    const handleNavigation = useCallback(e => {
        const window = e.currentTarget;
        if (y > window.scrollY) {
            console.log("scrolling up");
            setScrolls(false)

        } else if (y < window.scrollY) {
            console.log("scrolling down");
            setScrolls(true)
        }
        setY(window.scrollY);
        }, [y]);

    React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
        window.removeEventListener("scroll", handleNavigation);
    };
    }, [handleNavigation]);


    // window.onscroll = () => {
    //     if (scrolls) {
    //         console.log("scrolling")
    //         scroll.scrollToBottom()
    //     }
    //     else {
    //         scroll.scrollToTop()
    //     }
    // };




    return (
        <>
            
            {handleOpen && <Login handleClose={handleClose} handleOpen={handleOpen} open={open} handleOpen1={handleOpen1} isAuth={ isAuth}/>}
            {handleOpen1 && <Signup handleOpen1={handleOpen1} open1={open1} handleClose1={handleClose1} handleOpen={handleOpen} isAuth={ isAuth}/>}
            
            {bounce ? <button className="bounce" style={{ background: color }}  onClick={() => scroll.scrollToBottom()} >
                <IoIosArrowDown/>
            </button>:<button className="bounceUp" style={{background:color}} onClick={() =>scroll.scrollToTop()}>
                <IoIosArrowUp/>
            </button>
            
            }
           

          
            <header>
                
                <div style={{display:"flex"}}>
                    <img src="https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png" alt="logo" style={{ width: '50px', height: "50px" }} />
                    <h3 >Pinterest</h3>
               </div>
                
                <nav className="landingNav">
                    <ul>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Business</a>
                        </li>
                        <li>
                            <a>Blogs</a>
                        </li>
                    </ul>
                    
                       <div className="buttons">
                            <button className="login" onClick={() => { handleOpen() }} >Log in</button>
                            <button className="signup" onClick={() => { handleOpen1() }}>Sign Up</button>
                        </div>
                    
                </nav>
            </header>

            <div className="heading">
                <span className="text"> Get your next</span>
                <div className="wrapper">
                    <div className="offset">
                        <h3 className="text animate-before" style={{color:color, lineHeight:"60px"}}>{heading}</h3>
                    </div>
                </div>
            </div>
            <div className="landingCarauselButton">
                <div style={{ backgroundColor: color === "rgb(230,0,35)" ? "rgb(230,0,35)" : "rgb(202,196,196)" }} onClick={() => {}}></div>
                <div style={{backgroundColor:color === "green" ? "green": "rgb(202,196,196)"}}></div>
                <div style={{backgroundColor:color === "purple" ? "purple": "rgb(202,196,196)"}}></div>
                <div style={{backgroundColor:color === "teal" ? "teal": "rgb(202,196,196)"}}></div>
            </div>
            
            <div className="grid" >
                <div className="column">
                        <div className="item ">
                            <img src="http://cdn.cnn.com/cnnnext/dam/assets/140430115517-06-comfort-foods.jpg" alt="diy"/>
                        </div>
                        <div className="item">
                            <img src="https://www.mostfamouslist.com/wp-content/uploads/2016/05/Spaghetti.jpeg" alt="diy"/>
                        </div>
                        <div className="item">
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/instant-oatmeal-cranberries-1614955162.jpg?crop=0.526xw:1.00xh;0.169xw,0&resize=640:*" alt="foods"/>
                        </div>
                        <div className="item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ79MLcHHdTJr738F5In32ECo6RkSeRRP5-H1GN1o2pFnNdxJ30P3QCXZoSV3j_VCxrKt0&usqp=CAU" alt="foods"/>
                        </div>
                        <div className="item">
                            <img src="https://img.buzzfeed.com/buzzfeed-static/static/2019-08/12/16/campaign_images/2c06c5a12b0d/26-foods-you-should-learn-to-cook-in-your-twenties-2-1244-1565628477-0_dblbig.jpg?resize=1200:*" alt="foods"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.670xw:1.00xh;0.173xw,0&resize=480:*" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://eposnow-marketing.s3.eu-west-1.amazonaws.com/public/Uploads/restaurant-goals.jpeg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://post.healthline.com/wp-content/uploads/2020/09/indian-diet-weight-loss-732x549-thumbnail.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://post.healthline.com/wp-content/uploads/2020/09/indian-diet-weight-loss-732x549-thumbnail.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://images.everydayhealth.com/images/go-green-for-better-health-00-1440x810.jpg" alt="imagess"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://post.healthline.com/wp-content/uploads/2020/09/indian-diet-weight-loss-732x549-thumbnail.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/3/20/0/CCDRP106_French-Toast-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1358438846013.jpeg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2019-12-06-at-11-47-29-am-1575650859.png?crop=0.707xw:0.891xh;0.0561xw,0.0586xh&resize=640:*" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://thumbs.dreamstime.com/z/pilaf-traditional-delicious-dish-fried-cooked-meat-lot-rise-carrot-onion-garlic-raisins-top-view-closeup-52343916.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5693211_mXi4fSrUAct4J72czx1GvlrkgN15Fv-86NUB8aHa8x9F4Ffkb3dc38CIcTuk&usqp=CAU" alt="imagess"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://img.buzzfeed.com/buzzfeed-static/static/2014-06/23/15/campaign_images/webdr07/26-traditional-indian-foods-that-will-change-your-1-7312-1403550756-15_big.jpg?resize=1200:*" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201708/dish-story_647_081417052301.jpg?size=1200:675" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://media-cdn.tripadvisor.com/media/photo-s/06/1e/bc/28/dosa-hut.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://media-cdn.tripadvisor.com/media/photo-s/1d/b7/76/39/classic-masala-dosa.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://foodyoushouldtry.com/wp-content/uploads/2017/11/Gulab-Jamun-1024x860.jpg" alt="imagess"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://omindiancuisine.ca/wp-content/uploads/2018/02/om_cuisine_4.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://breathedreamgo.com/wp-content/uploads/2020/03/SS-biryani.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://asiamarvels.com/wp-content/uploads/2016/09/26-Traditional-Indian-Foods-That-Will-Change-Your-Life-Forever-25.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://www.stilhauskitchens-1.co.uk/wp-content/uploads/9-thali-lunch-zoomed-The-Dhabba.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://globalspaonline.com/wp-content/uploads/2021/07/10-of-The-Healthiest-Indian-Foods-To-Say-Yes-To-Image-1.jpg" alt="imagess"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://topteenrecipes.com/wp-content/uploads/2021/05/Webp.net-compress-image-13-735x735.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://static.parade.com/wp-content/uploads/2021/05/Semiya-Upma-Recipe-e1622646713756.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://st2.depositphotos.com/5653638/11433/i/950/depositphotos_114333764-stock-photo-sambar-vada-idli-with-sambar.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://www.amritsruae.com/blog/wp-content/uploads/2020/04/tandoori-chiken.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="http://3.bp.blogspot.com/-DnNTZUcQOWw/VZVzBVz1VdI/AAAAAAAABTE/rJOk2hFcazY/s400/very-high-calorie-indian-foods-list.jpg" alt="imagess"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="item">
                            <img src="https://assets.vogue.in/photos/5ef5d0d19aeed766057e7ccb/2:3/w_1715,h_2573,c_limit/pakoda%20recipe%20onion%20pakoda%20fritters%20easy%20recioes.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://static.toiimg.com/photo/59217136.cms" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://i.pinimg.com/736x/8b/65/29/8b65295b2c9297d8ff786af95d10e7d0.jpg" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://cdn.urbanpiper.com/media/bizmedia/l/2020/01/10/RASGULLA.JPG" alt="imagess"/>
                        </div>
                        <div className="item">
                            <img src="https://i1.wp.com/mytastycurry.com/wp-content/uploads/2018/11/Potato-veggie-sooji-snack.jpg?resize=600%2C848" alt="imagess"/>
                        </div>
                    </div>
            <Footer/>
            </div>
        </>
    )
}