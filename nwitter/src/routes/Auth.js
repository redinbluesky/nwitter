import AuthForm from "components/AuthForm";
import { authService, fibaseInstance } from "fbase";
import react, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => { 
    const onSocialClick = async(event) =>{
        const {target:{name}} = event;
        let provider;
        if(name === "google"){
            provider = new fibaseInstance.auth.GoogleAuthProvider();
        }else if(name =="github"){
            provider = new fibaseInstance.auth.GithubAuthProvider();
        }
        
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
    <div>    
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
        </div>
        <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
                Continue with Google <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className="authBtn">
                Continue with Github <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    </div>    
    );
}

export default Auth;