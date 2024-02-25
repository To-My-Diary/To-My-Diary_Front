import React, { useState } from 'react';
// import './'

function CustomRadio() {
  const genders = [
    {text: '남자', value: 0},
    {text: '여자', value: 1},
  ]
  const [selectedGender, setSelectedGender] = useState(null);
  const onChangeRadio = (e) => {
    setSelectedGender(Number(e.target.value));
  }
  
  return (
    <div className='radioWrapper' style={{ marginRight: '14px'}}>
      {
        genders.map((gender, idx) => (
          <label key={idx} style={{ marginRight: '7px'}}>
            <input
              className='genders'
              type='radio'
              name='genders'
              value={gender.value}
              onChange={onChangeRadio}
              checked={idx === selectedGender}
            />
            <span className='gender'
              style={{
                border: idx === selectedGender ? '1px solid #FFEA61D2' : '1px solid lightgray',
                backgroundColor: idx === selectedGender ? '#FFEA61D2' : 'lightgray'
              }}
            >
              {gender.text}
            </span>
          </label>
        ))
      }
    </div>
  );
}

export default CustomRadio;