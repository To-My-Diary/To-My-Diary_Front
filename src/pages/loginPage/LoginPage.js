import './LoginPage.css';
import { useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function LoginPage()
{
    // const [input, setInput] = useState({id: '', pwd: ''})
    const [Id, setId] = useState('')
    const [Pwd, setPwd] = useState('')
    // const [res, setRes] = useState('')
    const navigate = useNavigate();
    const onIdHandler = (event) => {
        setId(event.target.value)
    }
    const onPwdHandler = (event) => {
        setPwd(event.target.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    function onLogin()
    {
    // axios
    //   .post("/login", {
    //     id: 'ispr2216',//Id,
    //     pwd: 'abc1234'//Pwd,
    //   })
    // //   .then((res) => {
    // //     if (res.data.token) {
    // //       setRes(res.data.token);
    // //       navigate("/");
    // //     }
    // //   })
    //   .then((res) => {
    //     if (res.data) {
    //         console.log(res.data)
    //         setRes(res.data);
             navigate("/main"); // 로그인 완료 시, main페이지로 이동
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "error");
    //   });
        // alert("로그인 완료");


    }
    return (
        <div id='loginWrapper' style={{backgroundImage: `url(${process.env.PUBLIC_URL + 'images/paperBackground.png'})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',}}>
            <h1 className='title'>TO MY DIARY</h1>
            <h1>
            <img src= {process.env.PUBLIC_URL + 'images/imageLogo.png'} alt='imageLogo' />
            {/* 공백 태그 */}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img src= {process.env.PUBLIC_URL + 'images/diaryLogo.png'} alt='diaryLogo' />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img src= {process.env.PUBLIC_URL + 'images/checkLogo.png'} alt='checkLogo' />
            </h1>
            <form className='login-input' onSubmit={onSubmitHandler}>
                <p>
                    <text id='id'>id</text>
                    <input className='id-input' type='text' name='id-input' onChange={onIdHandler} value={Id} />
                    <hr className="horizonLine"></hr>
                </p>
                <p>
                    <text id='pwd'>pw</text>
                    <input className='pwd-input' type='password' name='pwd-input' onChange={onPwdHandler} value={Pwd} />
                    <hr className="horizonLine"></hr>
                </p>
            </form>
            <button className='loginButton' type='submit' onClick={onLogin}>
            <RiLoginCircleLine size={30} />
            </button>
            {/* <p /> */}
            <br />
            <div className='loginType'>
            <button className='kakaoLogin' type='button' onClick={onKakaoLogin}>
            <img src= {process.env.PUBLIC_URL + 'images/kakaoLogin.png'} alt='kakao' width={45}/>
            </button>
            &nbsp;
            <button className='googleLogin' type='button' onClick={onGoogleLogin}>
            <img src= {process.env.PUBLIC_URL + 'images/googleLogin.png'} alt='google' width={40}/>
            </button>
            &nbsp;
            <button className='naverLogin' type='button' onClick={onNaverLogin}>
            <img src= {process.env.PUBLIC_URL + 'images/naverLogin.png'} alt='naver' width={40}/>
            </button>
            </div>
        </div>
    );
}
export default LoginPage;

function onKakaoLogin()
{
    window.open("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=148570826c7770f175f7b4c40a87580e&redirect_uri=http://172.17.0.4:8080/auth/kakao/callback")
}
function onGoogleLogin()
{
    alert("구글로그인 이동")
}
function onNaverLogin()
{
    alert("네이버로그인 이동")
}