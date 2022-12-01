// import { Observable } from 'rxjs';

// const { Observable } = require("rxjs/Observable");
import { Observable } from 'rxjs';

const Observable  = Observable;
const btn1 = docume0t.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const responseDataContainer = document.querySelector(
  '.response-data-container'
);
let onResponse1, onResponse2, onResponse3;

const apiRequest1 = new Promise((resolve, reject) => {
  console.log(Observable)
  onResponse1 = () => {
    resolve({
      msg: '[apiRequest1 에 대한 응답 데이터]',
      brokenKey: '복잡한 알고리즘으로 ',
    });
  };
});
const apiRequest2 = new Promise((resolve, reject) => {
  onResponse2 = () => {
    resolve({
      msg: '[apiRequest2 에 대한 응답 데이터]',
      brokenKey: '만들어졌다고 ',
    });
  };
});
const apiRequest3 = new Promise((resolve, reject) => {
  onResponse3 = () => {
    resolve({ msg: '[apiRequest3 에 대한 응답 데이터]', brokenKey: '가정' });
  };
});

btn1.addEventListener('click', () => {
  btn1.disabled = true;
  onResponse1();
  alert('apiRequest1 에 대한 response가 왔습니다');
});
btn2.addEventListener('click', () => {
  btn2.disabled = true;
  onResponse2();
  alert('apiRequest2 에 대한 response가 왔습니다');
});
btn3.addEventListener('click', () => {
  btn3.disabled = true;
  onResponse3();
  alert('apiRequest3 에 대한 response가 왔습니다');
});

/* ---------------------------- 추가된 코드 ---------------------------- */
let sendUserInfo;
const getUserInfoBtn = document.querySelector('.get-user-info-btn');

// 역시나 click 이벤트지만 api 요청에 대한 응답트리거로 가정
getUserInfoBtn.addEventListener('click', () => {
  getUserInfoBtn.disabled = true;

  sendUserInfo();

  alert('getUserInfo 처리 완료.');
});

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// _getPassword = 서버에 있는 코드고 그냥 문자 연결이지만 복잡한 알고리즘을 거쳐 리턴해준다고 가정.
let _getPassword = (brokenKey1, brokenKey2, brokenKey3) => {
  return brokenKey1 + brokenKey2 + brokenKey3;
};
// _getUsers = 서버에 있는 코드라고 가정
let _getUsers = () => {
  return [
    {
      name: '기남이',
      age: 34,
      password: '복잡한 알고리즘으로 만들어졌다고 가정',
    },
    {
      name: '동주',
      age: 32,
      password: '아무튼 복잡한 연산 결과',
    },
  ];
};
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

/**
 * Observable.combineLatest([])
 *           .switchMap(([])=>{})
 *           .map(()=>{})
 *           .subscribe(()=>{ })
 */
Observable.combineLatest([apiRequest1, apiRequest2, apiRequest3])
  .switchMap(([responseData1, responseData2, responseData3]) => {
    console.log('API1, API2, API3 응답 완료');
    getUserInfoBtn.disabled = false;
    getUserInfoBtn.style.color = 'red';
    console.log('getUserInfo 실행');

    return (function (data1, data2, data3) {
      // getUserInfo API 라고 가정
      // 아래 코드들은 서버에서 돌아가는 로직으로 상상
      let users = _getUsers();
      // apiRequest1,2,3 에서 받은 값으로만 password 만들 수 있다고 가정
      let password = _getPassword(
        data1.brokenKey,
        data2.brokenKey,
        data3.brokenKey
      );
      // data1,2,3 에 있는 정보로 만든 password 와 일치하는 유저 찾기
      let user = users.find((user) => user.password === password);

      return new Promise((resolve, reject) => {
        sendUserInfo = () => {
          resolve(
            // password가 일치하는 유저정보와 resData123값으로 userInfo를 만들어 return 해준다.
            {
              ...user,
              resData123: [data1.msg, data2.msg, data3.msg],
            }
          );
        };
      });
    })(responseData1, responseData2, responseData3); // getUserInfo 요청시 필요한 params
  })
  .map((userInfo) => {
    console.log('getUserInfo 처리 완료');
    console.log('map 실행 전 userInfo');
    console.log(userInfo);
    return {
      name: userInfo.name,
      // userInfo에 있는 age는 34이이지만 20으로 수정할 필요가 있었다고 가정
      // (map을 써야하는 상황을 만들기 위해 대충 정한것)
      age: 20,
      resData123: userInfo.resData123,
    };
  })
  .subscribe((modifiedUserInfo) => {
    console.log('실제 subscribe해서 받은 userInfo');
    console.log(modifiedUserInfo);
    responseDataContainer.innerHTML = JSON.stringify(modifiedUserInfo);
  });

  
