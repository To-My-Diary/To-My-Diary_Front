import './LoginPage.css';
import { useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../components/api_type';
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
    const options = {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   // 다른 헤더도 추가 가능
        // },
        body: JSON.stringify({ email: Id, pw: Pwd}), // JSON 데이터를 문자열로 변환(GET 요청 시에는 필요 X)
        
      };
    async function onLogin()
    {
        try {
            const data = await request("/user/login", options); // 원하는 API 엔드포인트 경로를 전달
            console.log(data); // API 응답 데이터 출력 또는 다른 작업 수행

            navigate("/main"); // 로그인 완료 시, main페이지로 이동
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