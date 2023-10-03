import React, { useEffect, useState } from 'react';

function KakaoCallback() {
  const [authorizationCode, setAuthorizationCode] = useState('');

  useEffect(() => {
    // 콜백 URL에서 인가 코드 추출
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      // 인가 코드를 상태에 저장
      setAuthorizationCode(code);
    }
  }, []);

  return (
    <div>
      <h1>카카오 로그인 콜백 페이지</h1>
      {authorizationCode && (
        <div>
          <p>인가 코드: {authorizationCode}</p>
          {/* 다른 처리 작업도 추가할 수 있습니다. */}
        </div>
      )}
    </div>
  );
}

export default KakaoCallback;