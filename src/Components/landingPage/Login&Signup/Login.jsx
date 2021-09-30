import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from "./Login.module.css"
import { textAlign } from '@mui/system';
import { ImCross } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 410,
    bgcolor: 'background.paper',
    p: 4,
    height: 580,
    borderRadius: 10,
    display: `flex`,
    flexDirection:`column`
};
function Login({handleClose, open, handleOpen1}) {

    return <>
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={styles.outerBox} sx={style}>
                        <ImCross style={{ marginLeft: "380px", fontSize: "20px", cursor:"pointer" }} onClick={ handleClose}/>
                        <img src="https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png" alt="logo" style={{ width: '50px', height: "50px", marginLeft:"180px", marginTop:"-10px"}} />
                        <h1 className={styles.welcomwHeading}>Welcome To Pinterest</h1>
                        <input type="text" placeholder="Email" className={ styles.inputBox}></input>
                        <input type="text" placeholder="Password" className={styles.inputBox}></input>
                        <p className={styles.modalP}>Forgot Your Password?</p>
                        <button className={styles.modalLogin}>
                            <p style={{fontSize:"14px", fontWeight:"bold"}}>Log in</p>
                        </button>
                        <h4 style={{ textAlign: "center", lineHeight: "0px", fontSize: "14px" }}>OR</h4>
                        <button className={styles.modalFacebook}>
                            <p>Login with <span><FaFacebook/></span></p>
                        </button>
                        <button className={styles.modalgoogle}>
                            <p>Login With Google</p>
                        </button>
                        <p className={styles.modalbottomP}>
                            By continuing, you agree to Pinterest's <span>Terms of <br/>Service </span>Terms of Service and acknowledge you've read our <span> Privacy<br/>  Policy</span>
                        </p>
                        <div className={styles.modalhr}></div>
                        <p className={styles.modalLastP}>Not on Pinterest yet? <span onClick={() => {
                            handleClose()
                            handleOpen1()
                        }}>Sign up</span></p>
                        <p className={styles.modalLastP1}>Are you a business? <span>Get started here!</span></p>
                    </Box>
                </Fade>
            </Modal>
        </div>
    </>
}

export default Login