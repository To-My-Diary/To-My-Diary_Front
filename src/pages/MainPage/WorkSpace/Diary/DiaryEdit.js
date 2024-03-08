import Weather from "components/common/Weather";
import ImageCropper from "components/diary/ImageCropper";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { resetDiaryImages, changeEdit, addDiaryImage } from 'store/slices/workSpaceSlice';
import { saveDiaryData } from 'store/slices/dataSlice'
import './index.css';
import imageLogo from 'assets/icons/사진4.png'
import buttonImage from 'assets/icons/완료3 2.png'
import { postDiary, modifyDiary } from "lib/api/PostApi";
import { base64ToBlob } from 'components/diary/base64ToBlob';

//일기 작성 화면
function DiaryEdit({diaryData, setStyle})
{
    const diaryImages = useSelector(state=>state.workSpace.diaryImages);
    const [imageList, setImageList] = useState([])
    const [croppingImage, setCroppingImage] = useState(null);
    const [imageId, setImageId] = useState(1);
    const [content, setContent] = useState("");
    const [modify, setModify] = useState(false);
    const dispatch = useDispatch();
    const date = useSelector(state=>state.workSpace.date);
    let reader = new FileReader();
    
    const onSubmitHandler = () => {
        if(modify){
            modifyDiary(diaryData.diaryId, content, imageList);
        } else {
            postDiary(content, imageList, date);
        }
    }

    useEffect(()=>{
        if(diaryData.content != null)
        {
            if(diaryData.img) {
                dispatch(resetDiaryImages([<img className="diaryImages" 
                    src={diaryData.img}  key={imageId} height="100" alt=""></img>]));
                setImageId(imageId+1);
            }

            setContent(diaryData.content);
            setModify(true);
        }
    },[diaryData, dispatch]);

    return(
        <form encType="multipart/form-data" onSubmit={(event)=>{
            event.preventDefault();
            onSubmitHandler();
            // reset diaryImages to empty list
            dispatch(resetDiaryImages([]));
            // change to view mode
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            {croppingImage ? <ImageCropper src={croppingImage} addCroppedImage={(image)=>{
                dispatch(resetDiaryImages([<img className="diaryImages" 
                    src={image}  key={imageId} height="100" alt=""></img>]));
                setImageId(imageId+1);
                setCroppingImage(null);
                let blob = base64ToBlob(image.split(',')[1], 'image/png');
                let imgFile = new File([blob], 'image.png', { type: 'image/png' });
                let list = [];
                list.push(imgFile);
                setImageList(list);
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
                    setStyle({minHeight: "100vh"});
                }}></input>
                <textarea name="body" 
                    placeholder="Write your diary here..." 
                    defaultValue={content}
                    style={{height:"15em"}}
                    onChange={(event)=>{
                        setContent(event.target.value);
                    }}
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