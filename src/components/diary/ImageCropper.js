import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import buttonImage from '../../icons/완료3 2.png'

function ImageCropper(props) {
  const cropperRef = useRef(null);

  const cropImage = (event) => {
    event.preventDefault();
    if (typeof cropperRef.current.cropper.getCroppedCanvas() === 'undefined') {
        console.log("failed");
      return;
    }

    const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL();

    props.addCroppedImage(croppedImage);
    // 이제 'croppedImage'를 업로드하거나 사용할 수 있습니다.
    
  };

  return (
    <div>
        {props.src && (
        <Cropper
          ref={cropperRef}
          src={props.src}
          style={{ height: 200, width: '90%', margin:"0 auto"}}
          aspectRatio={1}
          guides={true}
        />
         )}
         <p>
            <label htmlFor="confirm">
                <img src={buttonImage} alt="" width="40px"/>
            </label>
            <input id="confirm" type="button" onClick={cropImage} hidden/>
        </p>
    </div>
  );
}

export default ImageCropper;