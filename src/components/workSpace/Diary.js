import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeEdit, addDiaryImage } from './workSpaceSlice';
import Weather from "./Weather";
import ImageCropper from "./ImageCropper";
import './Diary.css';
import diaryLogo from '../../icons/일기 작성.png'
import imageLogo from '../../icons/사진4.png'
import buttonImage from '../../icons/완료3 2.png'

// 일기 보기 화면
function DiaryView()
{
    return (
        <>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY DIARY</h3>
        <img src={diaryLogo} id="diaryImg" alt="일기 작성"/>
        </>
    )
}

//일기 작성 화면
function DiaryEdit(props)
{
    const diaryImages = useSelector(state=>state.workSpace.diaryImages);
    const [croppingImage, setCroppingImage] = useState(null);
    const [imageId, setImageId] = useState(1);
    const dispatch = useDispatch();
    let reader = new FileReader();

    return(
        <form encType="multipart/form-data" onSubmit={(event)=>{
            event.preventDefault();
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            {croppingImage ? <ImageCropper src={croppingImage} addCroppedImage={(image)=>{
                dispatch(addDiaryImage(<img className="diaryImages" 
                    src={image}  key={imageId} height="100" alt=""></img>));
                setImageId(imageId+1);
                setCroppingImage(null);
                }}/> :
                <>
                <div className="images">
                    { diaryImages }
                    <label htmlFor="chooseFile" style={{display:"inline-block", padding:"50px"}}>
                        <img className="imageLogo" src={imageLogo} alt="사진4" width="45px"/>
                    </label>
                </div>
                <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={(event)=>{
                    event.preventDefault();
                    const file = event.target.files[0];

                    if(file) 
                    {
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                            setCroppingImage(reader.result);
                            event.target.value='';
                        }
                    };
                    //이미지 추가 시 배경화면 크기 조절
                    props.setStyle({minHeight: "100vh"});
                }}></input>
                <textarea name="body" placeholder="Write your diary here..."></textarea>
                <p>
                    <label htmlFor="write">
                        <img src={buttonImage} alt="" width="40px"/>
                    </label>
                    <input id="write" type="submit" hidden/>
                </p>
                </>
            }
        </form>
    )
}


function Diary()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const [diaryStyle, setDiaryStyle] = useState(null);

    return (
        <div className={`${edit?"diaryEdit":"diaryView"}`}
        style={diaryStyle}
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            {edit?<DiaryEdit setStyle={setDiaryStyle}/>:<DiaryView/>}
        </div>
    )
}

export default Diary;