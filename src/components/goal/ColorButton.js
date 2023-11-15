import React, { useState } from 'react';
import { CirclePicker, CompactPicker, TwitterPicker} from 'react-color';
import { BsFillCircleFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { changeColor } from '../../store/slices/workSpaceSlice';

function IconColorPicker() {
    const dispatch = useDispatch();
  const [iconColor, setIconColor] = useState('#000'); // 초기 아이콘 색상
  const [isColorPickerOpen, setColorPickerOpen] = useState(false); // 모달 열림 상태

  const handleColorChange = (color) => {
    setIconColor(color.hex); // 선택한 색상으로 아이콘 색상 업데이트
    dispatch(changeColor(color.hex));
    setColorPickerOpen(false); // 모달을 닫음
  };

  return (
    <div>
      <div
        className="icon"
        style={{ color: iconColor }}
        onClick={() => setColorPickerOpen(true)} // 아이콘 클릭 시 모달을 엽니다.
      >
        <BsFillCircleFill size={27}/>
      </div>
      <Modal
        isOpen={isColorPickerOpen}
        onRequestClose={() => setColorPickerOpen(false)} // 모달을 닫을 때 모달 상태를 변경합니다.
        contentLabel="색상 선택기" // 모달에 대한 레이블
        ariaHideApp={false} // 스타일이 적용되어야 합니다.
        style={{
            content: {
              width: '240px', // 350
              height: '260px',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '5%',
            },
          }}
      >
        {/* 색상 선택기 */}
        <CirclePicker onChange={handleColorChange} />
      </Modal>
    </div>
  );
}

export default IconColorPicker;