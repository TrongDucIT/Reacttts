import { useState } from "react";
import { loginApi } from "../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [isShowPassword, setIshowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Missing... Email/password is require! ");
            return;
        }
        setLoadingApi(true);
        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
            console.log("check", res)
        }
        setLoadingApi(false);
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Log in</div>
                <div className="text">Email or usename (eve.holt@reqres.in)</div>

                <input type="text"
                    placeholder="Email or usename..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-2">
                    <input type={isShowPassword === true ? "text" : "password"}
                        placeholder="Password...."
                        value={password}
                        onChange={(event) => setpassword(event.target.value)}
                    />
                    <i className={isShowPassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                        onClick={() => setIshowPassword(!isShowPassword)}></i>
                </div>


                <button
                    className={email && password ? "active" : ""}
                    disabled={(email && password) ? false : true}
                    onClick={() => handleLogin()}
                >
                    {loadingApi && <i className="fa-solid fa-sync fa-spin"></i>}
                    &nbsp; Login

                </button>
                <div className="back">
                    <i className="fa-solid fa-rotate-left"></i> Go back
                </div>
            </div>
        </>
    )
}
export default Login;