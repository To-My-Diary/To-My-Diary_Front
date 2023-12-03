import './index.css';
import { useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { request } from 'lib/api/api_type';
import { setCookie } from 'lib/api/\bcookie';

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
    const options = {
        method: 'POST',
        body: JSON.stringify({ email: Id, pw: Pwd}),
        
      };
    async function onLogin()
    {
        try {
            const data = await request("/user/login", options); 
            console.log(data);
            setCookie('token', data.result, {path: '/'})
            navigate("/main");
          } catch (error) {
            console.error(error);
          }
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
                    <h4 id='id'>id</h4>
                    <div>
                    <input className='id-input' type='text' name='id-input' onChange={onIdHandler} value={Id} />
                    <hr className="horizonLine"></hr>
                    </div>
                </div>
                <div id = 'pwd-input'>
                    <h4 id='pwd'>pw</h4>
                    <div>
                    <input className='pwd-input' type='password' name='pwd-input' onChange={onPwdHandler} value={Pwd} />
                    <hr className="horizonLine"></hr>
                    </div>
                </div>
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