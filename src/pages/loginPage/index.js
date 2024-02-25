import './index.css';
import { useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { request } from 'lib/api/api_type';
import { setCookie } from 'lib/api/cookie';
import { useDispatch } from 'react-redux';
import { saveId } from 'store/slices/workSpaceSlice';
import { Button } from 'bootstrap';

function LoginPage()
{
    const kakaoURL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=148570826c7770f175f7b4c40a87580e&redirect_uri=http://43.201.112.92:8080/auth/kakao/callback"
    const [Id, setId] = useState('')
    const [Pwd, setPwd] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onIdHandler = (event) => {
        setId(event.target.value)
        localStorage.setItem('userId', event.target.value);
    }
    const onPwdHandler = (event) => {
        setPwd(event.target.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    const onSignupHandler = (event) => {
        event.preventDefault();
        navigate("/signup");
    }
    const options = {
        method: 'POST',
        body: JSON.stringify({ email: Id, pw: Pwd}),
        
      };
      function onLogin() {
        request("/user/login", options)
          .then((data) => {
            console.log("data", data);
            setCookie('token', data.result, { path: '/' });
            navigate("/main");
          })
          .catch((error) => alert(error.message));
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
                <div id='id-input'>
                    <h1 id='id'>id</h1>
                    <div>
                    <input className='id-input' type='email' name='id-input' onChange={onIdHandler} value={Id} />
                    <hr className="horizonLine"></hr>
                    </div>
                </div>
                <div id = 'pwd-input'>
                    <h1 id='pwd'>pw</h1>
                    <div>
                    <input className='pwd-input' type='password' name='pwd-input' onChange={onPwdHandler} value={Pwd} />
                    <hr className="horizonLine"></hr>
                    </div>
                </div>
            </form>
            <button className='loginButton' type='submit' onClick={onLogin}>
            <RiLoginCircleLine size={30} />
            </button>
            <button className='signupButton' onClick={onSignupHandler}>
                <h3>Sign Up</h3>
            </button>
            {/* <div className='loginType'>
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
            </div> */}
        </div>
    );
}
export default LoginPage;

function onKakaoLogin()
{
    window.open("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=148570826c7770f175f7b4c40a87580e&redirect_uri=http://localhost:3000/auth/kakao/callback")
}
function onGoogleLogin()
{
    alert("구글로그인 이동")
}
function onNaverLogin()
{
    alert("네이버로그인 이동")
}