import Weather from "components/common/Weather";
import ImageCropper from "components/diary/ImageCropper";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { resetDiaryImages, changeEdit, addDiaryImage } from 'store/slices/workSpaceSlice';
import { saveDiaryData } from 'store/slices/dataSlice'
import './index.css';
import imageLogo from 'assets/icons/사진4.png'
import buttonImage from 'assets/icons/완료3 2.png'

//일기 작성 화면
function DiaryEdit(props)
{
    const diaryImages = useSelector(state=>state.workSpace.diaryImages);
    const [croppingImage, setCroppingImage] = useState(null);
    const [imageId, setImageId] = useState(1);
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    let reader = new FileReader();

    useEffect(()=>{
        if(Object.keys(props.diaryData).length !== 0)
        {
            dispatch(resetDiaryImages(props.diaryData.img))
            setContent(props.diaryData.content);
        }
    },[content, props.diaryData, dispatch]);

    return(
        <form encType="multipart/form-data" onSubmit={(event)=>{
            event.preventDefault();

            // Diary create
            if(event.target.body.value.length > 0)
            {
                const data = {
                    userId: "",
                    content: event.target.body.value,
                    emotion: "",
                    img: diaryImages
                }
                dispatch(saveDiaryData(data));
            }

            // reset diaryImages to empty list
            dispatch(resetDiaryImages([]));

            // change to view mode
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
                <textarea name="body" 
                placeholder="Write your diary here..." 
                defaultValue={content}
                style={{height:"15em"}}
                ></textarea>
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

export default DiaryEdit;