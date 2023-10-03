import './LoginPage.css';
import { useEffect, useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import axios from "axios";

function LoginPage()
{
    const kakaoURL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=148570826c7770f175f7b4c40a87580e&redirect_uri=http://43.201.112.92:8080/auth/kakao/callback"
    const [Id, setId] = useState('')
    const [Pwd, setPwd] = useState('')
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
        navigate("/main"); // 로그인 완료 시, main페이지로 이동
    }
    //


    //

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
                <div>
                    <text id='id'>id</text>
                    <input className='id-input' type='text' name='id-input' onChange={onIdHandler} value={Id} />
                    <hr className="horizonLine"></hr>
                </div>
                <br/>
                <div>
                    <text id='pwd'>pw</text>
                    <input className='pwd-input' type='password' name='pwd-input' onChange={onPwdHandler} value={Pwd} />
                    <hr className="horizonLine"></hr>
                </div>
                <br/>
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
    const REST_API_KEY = "148570826c7770f175f7b4c40a87580e";
    const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    window.location.href = KAKAO_AUTH_URL;
}

function onGoogleLogin()
{
    alert("구글로그인 이동")
}
function onNaverLogin()
{
    alert("네이버로그인 이동")
}