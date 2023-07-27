import weatherLogo from '../../icons/구름 낀 날.png'

function Weather() 
{
    return (
        <img src={weatherLogo} alt='날씨 로고' width="40px" style={{marginTop:"10px"}}/>
    )
}

export default Weather;