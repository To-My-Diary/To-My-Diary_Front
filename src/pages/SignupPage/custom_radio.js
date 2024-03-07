import React, { useState } from 'react';
// import './'

function CustomRadio({ selectedGender, onGenderChange }) {
  const genders = [
    {text: '남자', value: 0},
    {text: '여자', value: 1},
  ]
  const onChangeRadio = (e) => {
    const selectedValue = Number(e.target.value);
    onGenderChange(selectedValue);
  };
  
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

// import React from 'react';

// function CustomRadio({ value, label, onSelect, selectedValue }) {
//   const handleRadioChange = () => {
//     onSelect(value);
//   };

//   return (
//     <div>
//       <input
//         type="radio"
//         value={value}
//         checked={value === selectedValue}
//         onChange={handleRadioChange}
//       />
//       <label>{label}</label>
//     </div>
//   );
// }

// export default CustomRadio;