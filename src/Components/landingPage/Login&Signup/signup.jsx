import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from "./Login.module.css"
import { textAlign } from '@mui/system';
import { ImCross } from "react-icons/im";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 410,
    bgcolor: 'background.paper',
    p: 5,
    height: 700,
    borderRadius: 10,
    display: `flex`,
    flexDirection: `column`,
    paddingBottom: 0,
};
function Signup({handleClose1, handleOpen, open1}) {
    return <>
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open1}
                onClose={handleClose1}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open1}>
                    <Box className={styles.outerBox} sx={style}>
                        <ImCross style={{ marginLeft: "380px", fontSize: "20px", cursor:"pointer" }} onClick={ handleClose1}/>
                        <img src="https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png" alt="logo" style={{ width: '50px', height: "50px", marginLeft:"180px", marginTop:"-10px"}} />
                        <h1 className={styles.welcomwHeading}>Welcome To Pinterest</h1>
                        <p className={styles.signupParaUp}>Find new ideas to try</p>
                        <input type="text" placeholder="Email" className={ styles.inputBox}></input>
                        <input type="text" placeholder="Create a password" className={styles.inputBox}></input>
                        <input type="text" placeholder="Age" className={styles.inputBox}></input>
                        <button className={styles.modalLogin}>
                            <p style={{fontSize:"14px", fontWeight:"bold"}}>Continue</p>
                        </button>
                        <h4 style={{ textAlign: "center", lineHeight: "0px", fontSize: "14px" }}>OR</h4>
                        <button className={styles.modalFacebook}>
                            <p>Login With Facebook</p>
                        </button>
                        <button className={styles.modalgoogle}>
                            <p>Login With Google</p>
                        </button>
                        <p className={styles.modalbottomP}>
                            By continuing, you agree to Pinterest's <span>Terms of <br/>Service </span>Terms of Service and acknowledge you've read our <span> Privacy<br/>  Policy</span>
                        </p>
                        <p className={styles.modalLastP}>Already a member? <span onClick={() => {
                            handleClose1()
                            handleOpen()
                        }}>Log in</span></p>
                        <p className={styles.modalLastP1}>Are you a business? <span>Get started here!</span></p>
                        <div className={styles.signuplastDiv}>
                            <h3>Create a free business account</h3>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    </>
}

export default Signup