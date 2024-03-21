import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from 'lib/api/api_type';
import CustomRadio from "./custom_radio";

import './index.css';

function SignUpPage() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const totalSteps = 4;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email: userData['email'],
      pw: userData['password'],
      confirmPw: userData['confirmPassword'],
      name: userData['name'],
      tel: userData['tel'],
      gender: userData['gender']
  })
}

  const handleNext = (data) => {
    // setUserData({ ...userData, ...data });
    setUserData(prevUserData => ({ ...prevUserData, ...data }));
    if (step < totalSteps) {
    setStep(step + 1);
    }
  };
  const handlePrevious = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = () => {
    // 서버로 userData를 보내어 회원가입 처리
    console.log('회원가입 정보', userData);
    request("/user/join", options)
      .then((data) => {
        console.log("data", data);
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

return (
    <div id='signupWrapper' style={{backgroundImage: `url(${process.env.PUBLIC_URL + 'images/paperBackground.png'})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'}}>
        <h1 className='title'>TO MY DIARY</h1>
            <div>
      {step === 1 && <EmailForm onNext={handleNext} />}
      {step === 2 && <PasswordForm onNext={handleNext} onPrevious={handlePrevious}/>}
      {step === 3 && <PrivacyInfoForm onPrevious={handlePrevious} onSubmit={handleSubmit} onNext={handleNext}/>}
      {/* 나머지 폼 페이지 컴포넌트들 추가 */}
      {step === totalSteps && (
        <div>
          <button className="submit" onClick={handleSubmit}>SUBMIT</button>
        </div>
      )}
    </div>
        </div>
        );
}

// 각 폼 페이지 컴포넌트 정의
const EmailForm = ({ onNext }) => {
    const [email, setEmail] = useState('');
  
    const handleNext = () => {
      onNext({ email });
    };
  
    return (
        <div id='emailWrapper'>
      <div id='email-input'>
        <h3 id='email'>E-mail</h3>
        <div>
        <input className="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='1234@naver.com'/>
        <hr className="horizonLine"></hr>
        </div>
      </div>
      <div><button className="email-next" onClick={handleNext}>Next{'>'}</button></div>
      </div>
    );
  };
  
  const PasswordForm = ({ onNext, onPrevious }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleNext = () => {
      onNext({ password, confirmPassword });
    };
    const handlePrevious = () => {
        onPrevious();
      };
    return (
         <div id='pwWrapper'>
      <div id='pw-input'>
        <h1 id='pw'>Pw</h1>
        <div>
        <input className="pw-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <hr className="horizonLine"></hr>
        </div>
      </div>
      <div id='confirmPw-input'>
        <h1 id='confirmPw' style={{ fontSize: '1.2em'}}>Pw<br/><span style={{ fontSize: '0.5em'}}>confirm</span></h1>
        <div>
        <input className="confirmPw-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <hr className="horizonLine"></hr>
        </div>
      </div>
      <div className='pre-next-button'>
        <button className="pw-pre" onClick={handlePrevious}>{'<'}Pre</button>
      <button className="pw-next" onClick={handleNext}>Next{'>'}</button>
      </div>
      </div>
    );
  };

  const PrivacyInfoForm = ({ onPrevious, onNext }) => {
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [gender, setGender] = useState('');
  
    const handlePrevious = () => {
      onPrevious();
    };
    const handleNext = () => {
      onNext({ name, tel, gender });
    }
    const handleGenderChange = (selectedValue) => {
      setGender(selectedValue);
    };

    return (
         <div id='privacyInfoWrapper'>
      <div id='name-input'>
        <h1 id='name'>Name</h1>
        <div>
        <input className="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='김땡땡'/>
        <hr className="horizonLine"></hr>
        </div>
      </div>
      <div id='tel-input'>
        <h1 id='tel'>Tel.</h1>
        <div>
        <input className="tel-input" value={tel} onChange={(e) => setTel(e.target.value)} placeholder='010-0000-0000'/>
        <hr className="horizonLine"></hr>
        </div>
      </div>
      <div id='gender-input'>
        <h1 id='gender'>Gender</h1>
        <div>
          <CustomRadio className='genderRadio-input' selectedGender={gender} onGenderChange={handleGenderChange}/>
        {/* <input className="gender-input" type="gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder='남자/여자'/>
        <hr className="horizonLine"></hr> */}
        </div>
      </div>
      <div className='pre-next-button'>
        <button className="pw-pre" onClick={handlePrevious}>{'<'}Pre</button>
        <button className="pw-next" onClick={handleNext}>Next{'>'}</button>
      </div>
      </div>
    );
  };
  

export default SignUpPage;