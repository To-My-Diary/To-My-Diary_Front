// Base64 데이터를 디코딩하고 Blob 객체로 변환
export function base64ToBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

// Blob 객체 생성
//fvar blob = base64ToBlob(dataURL.split(',')[1], 'image/png');

// Blob 객체를 사용하여 이미지 파일 생성
//var imgFile = new File([blob], 'image.png', { type: 'image/png' });

// 생성된 이미지 파일을 콘솔에 출력
//console.log('이미지 파일:', imgFile);

// 만약 파일을 다운로드하고 싶다면 다음과 같이 가능
// var downloadLink = document.createElement('a');
// downloadLink.href = URL.createObjectURL(blob);
// downloadLink.download = 'image.png';
// downloadLink.click();
