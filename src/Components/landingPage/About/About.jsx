import { useState } from "react";
import styles from "./About.module.css"
import AboutModal from "./Aboutmodal";
import { Link } from "react-router-dom";

export function About() {
    
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return (
        <>
            {
                handleOpen && <AboutModal open={open} handleClose={handleClose} handleOpen={handleOpen}/>
            }
            <div className={styles.aboutNavbar}>
                <div className={styles.aboutNavbardiv1}>
                    <img src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt="about pinterest" />
                    <div style={{marginTop:"5px", fontWeight:"100", cursor:"pointer"}}><h3>About Pinterest</h3></div>
                </div>
                <div className={styles.aboutNavbardiv2}>
                    <p style={{color:"#000"}}>What is Pinterest?</p>
                    <p>Discover</p>
                    <p>Save</p>
                    <p>Sign Up!</p>
                    <p>Careers</p>
                </div>
            </div>
            <div className={styles.aboutUpperdiv}>
                <div className={styles.aboutUpperdivdiv1}>
                     <h2>
                    WELCOME TO VISUAL DISCOVERY
                    </h2>
                    <h1>
                        When it comes to a<br/> great idea, you know<br/> it when you see it
                    </h1>
                    <Link to="/">
                        <button>
                            Join Pinterest
                        </button>
                    </Link>
                    
                </div>
               
            </div>
            <div className={ styles.aboutmeddilediv}>
                <div className={ styles.aboutmeddilediv1}>
                    <h2 >What's new at Pinterest</h2>
                    <div className={ styles.aboutmeddilediv2}>
                        <div className={styles.aboutmeddilediv3} onClick={handleOpen}>
                            <img src="https://about.pinterest.com/sites/about/files/spark_02.jpg" alt="aboutImages" />
                            <p className={styles.aboutmeddilediv3p1}>The Pinterest spark</p>
                            <p className={styles.aboutmeddilediv3p2}>Watch them go from first date to new</p>
                        </div>
                        <div className={ styles.aboutmeddilediv3}>
                            <img src="https://about.pinterest.com/sites/about/files/meet-lens-small.jpg" alt="aboutImages" />
                            <p className={styles.aboutmeddilediv3p1}>Meet Lens</p>
                            <p className={styles.aboutmeddilediv3p2}>Point. Tap. Discover ideas!</p>
                        </div>
                        <div className={ styles.aboutmeddilediv3}>
                            <img src="	https://about.pinterest.com/sites/about/files/web-buy-it-portal-tile2x.jpg" alt="aboutImages" />
                            <p className={styles.aboutmeddilediv3p1}>Shopping with Pinterest</p>
                            <p className={styles.aboutmeddilediv3p2}>Another way to bring ideas to life</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerDiv}>
                <div className={styles.footerDivdiv}>
                    <div className={styles.footerDivdiv1}>
                        <img src="https://about.pinterest.com/sites/all/themes/custom/pinterest/images/pinterest-footer-logo.png?e60023" alt="pinterest" />
                        <select>
                            <option value="0">English</option>
                            <option value="1">Czech</option>
                            <option value="2">English UK</option>
                            <option value="3">Spanish</option>
                            <option value="4">French</option>
                            <option value="5">Dutch</option>
                            <option value="6">Swiss</option>
                            <option value="7">Hindi</option>
                        </select>
                        <p>© Pinterest 2021</p>
                    </div>
                    <div className={styles.footerDivdiv2}>
                        <h3>About us</h3>
                        <p>What's Pinterest</p>
                        <p>Our Pinterest Page</p>
                        <p>Engineering blog</p>
                        <p>Brand guidlines</p>
                        <p>Careers</p>
                        <p>Help centers</p>
                        <p>Pinterest Labs</p>
                    </div>
                    <div className={styles.footerDivdiv2}>
                        <h3>Our Policies</h3>
                        <p>Copyright and Trademarks</p>
                        <p>Personalized ads</p>
                        <p>Terma and services</p>
                        <p>Privacy and cookies</p>
                        <h3 style={{marginTop:"10px"}}>More Info</h3>
                        <p>For buisiness</p>
                        <p>for developers</p>
                        <p>for press</p>
                        <p>for investors</p>
                    </div>
                </div>
            </div>
        </>
    )
}