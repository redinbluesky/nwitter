import { authService, dbService } from "fbase";
import react, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    }
    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets")
                        .where("creatorId", "==", userObj.uid)
                        .orderBy("createdAt").get();
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    const onSubmit = async (event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({displayName:newDisplayName,});
            refreshUser();
        }
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" onChange={onChange} placeholder="Display Name" autoFocus className="formInput" value={newDisplayName}/>
                <input type="submit" value ="Update Profile" className="formBtn" style={{ marginTop: 10,}}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
};