> ## ~ 01.10
>
> ## React(client)와 Django(server)를 이용한 개인 블로그 제작  [React 공부용]



## 1. react-router를 이용한 component link 구현.



![image-20220110172716919](README.assets/image-20220110172716919-1641804938767.png)



```jsx
//client/src/App.js

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
// react-link 는 bootstrap Nav(자체적인 react link기능) 활용
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

function App() {
  
  ...
  
  return (
    <div className="App">
      <header className="App-header">

        <Router>
        ...
            <Nav>
            	{/* State의 isLogin의 여부에 따라 content 표시 */}
                {
                  isLogin &&
                  <NavDropdown title="Blog" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/Community">개발 Blog</NavDropdown.Item>
                    <NavDropdown.Item href="/Myhamster">병순이 갤러리</NavDropdown.Item>
                    <NavDropdown.Item href="#">자유 게시판(Comming Soon)</NavDropdown.Item>
                  </NavDropdown>
                }
            </Nav>
            
            <Nav>
                {!isLogin && <Nav.Link href="/Login">Login</Nav.Link>}
                {!isLogin && <Nav.Link href="/Signup">Signup</Nav.Link>}
                {isLogin && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            </Nav>
		...
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/Community"><Community/></Route>
            <Route path="/Myhamster"><Hamster/></Route>
            <Route path="/Login"><Login loginCallBack={loginCallBack}/></Route>
            <Route path="/Signup"><Signup/></Route>
            <Route path="/CommunityNew"><CommunityNew/></Route>
            <Route path="/CommunityDetail/:pk" component={CommunityDetail}></Route>
          </Switch>
            
        </Router>
          
      </header>
    </div>
  );
}

export default App;

```





## 2. React-ckeditor를 활용한 게시판 글쓰기, 읽기, 미디어 업로드 구현.



![image-20220110173645297](README.assets/image-20220110173645297-1641804942855.png)

##### client 에서 사진을 업로드하면,



![image-20220110173735673](README.assets/image-20220110173735673-1641804949237.png)

##### media/uploads(hamster) 로 사진이 저장.



```jsx
//client/src/components/CommunityNew.js

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

...

<CKEditor
            ...
    		onChange={(event, editor) => {
              ...
              // 에디터상 미리보기가 server측 상대경로로 저장되기 때문에, replace를 이용해 업로드한 					사진이 client측에서 보이게 함.
              const newData = data.replace(
                "src=\"/media",
                "src=\"http://ffe8-175-202-115-123.ngrok.io/media"
              );
			  ...
            }}
    		...
            config={{
              ckfinder: {
                uploadUrl: "http://ffe8-175-202-115-123.ngrok.io/ckeditor/upload/",
                options: {
                  resourceType: "Images",
                },
              },
            }}
/>
```



## 3. 좋아요 기능 구현.

![image-20220110174539543](README.assets/image-20220110174539543-1641804951758.png)



```python
# server/hamster/views.py
...
@api_view(['POST'])
@permission_classes([AllowAny])
def like_user(request, hamster_pk):
    user_id = request.data['id']
    hamster = get_object_or_404(Hamster, pk=hamster_pk)
    likeUser = hamster.fans.all()
    if likeUser.filter(pk=user_id):
        hamster.fans.remove(user_id)
        liked = False
    else:
        hamster.fans.add(user_id)
        liked = True
    data = {
        'liked' : liked,
        'count' : hamster.fans.count()
    }
    return Response(data)
```



```jsx
//client/src/components/hamster.js

import axios from 'axios';
import jwt_decode from 'jwt-decode'

function Hamster() {
  ...
  const like = () => {
    const token = localStorage.getItem('jwt')
    var user = jwt_decode(token).user_id
    const url =  `http://ffe8-175-202-115-123.ngrok.io/hamster/like/${currentview}/`
    axios.post(url,{id:user},{headers:setToken()})
    .then(function(res){
      setIslike(res.data["liked"])
    })
  }
  ...
  return (
    <div className="Hamster">
      ...
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        ...
        <Modal.Footer style={{display:'flex',justifyContent:'space-between'}}>
          <div>
            {islike && <p style={{cursor:"pointer", marginLeft:"30px"}} onClick={like}>❤</p>}
            {!islike && <p style={{cursor:"pointer", marginLeft:"30px"}} onClick={like}>🤍</p>}
          </div>
          <Button style={{marginRight:"30px"}} variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Hamster;

```





## 느낀점

#### 1. javascript 문법과 유사해 적응하는데 어렵지 않았다.

### 2. 하지만 막상 ngrok터널을 이용해 외부에서 돌려보니 속도측에서 아쉬웠고, 프론트와 백에서의 구현 최적화가 얼마나 중요한지 느꼈다. (지금까진 local에서만 돌려봐서 못느꼈는데  속도가 이렇게 느릴 줄 몰랐다.)

### 3. 리액트 hook을 자유자재로 사용할 수 있는 능력이 생길때까지 열심히 학습하겠다.





> ## 01.10
>
> ## 와이어프레임 제작 (figma)이용.



![image-20220110183334124](README.assets/image-20220110183334124.png)



![image-20220110183401610](README.assets/image-20220110183401610.png)



## 느낀점

### 1. 1학기때 프로젝트 할때는 이렇게 기획단계를 거친 적이 없었던거같다.

### 2. 기획단계를 거치며 프로젝트를 진행하면 해맬 일도 없을것같고, 모두가 명확한 한가지 목표를 두고 업무에 열중할 수 있을 것같다.



> # 01.11 React-hook 공부
>
> nomad-coding 강의를 보며 리액트 훅에 대해 자세히 공부했다.



# 1. useEffect 복습

![image-20220112003846030](README.assets/image-20220112003846030-1641915806247.png)

```jsx
import React from 'react'
import {useEffect, useState} from 'react'

export default function UseEffectPractice() {
  const sayHello = () => console.log("hello");
  const [number,setNumber] = useState(0);
  const [aNumber,setAnumber] = useState(0);

  // componentdidmount
  useEffect(()=>{
    sayHello();
  },[])

  // componentwillupdate(number)
  useEffect(()=>{
    sayHello();
  },[number])

  return (
    <div>
      <div>useeffect</div>
      <button onClick={()=>setNumber(number+1)}>{number}</button>
      <button onClick={()=>setAnumber(aNumber+1)}>{aNumber}</button>
    </div>
  )
}
```

### componentdidmount, componentwillupdate 라이프사이클을 생각하면 쉽게 알 수 있었다.





# 2.useTitle (document의 title 이름을 첫 렌더링 후 3초 후 바꿔봄.)

![image-20220112004053902](README.assets/image-20220112004053902-1641915808419.png)

```jsx
import React from 'react'
import {useEffect, useState} from 'react'

export default function UseTitle() {

  // 1. 키는순간 componentunmount로 useEffect의 updateTitle RUN
  // 2. settimeout으로 componentwillupdate로 useEffect의 updateTitle RUN
  const useTitle = initialTitle => {
    const [title,setTitle] = useState(initialTitle);
    const updateTitle = () => {
      const htmlTitle = document.querySelector("title")
      htmlTitle.innerText = title
    };
    useEffect(()=>{
      updateTitle()
      console.log('useeffect run!')
    }, [title]);
    return setTitle;
  }

  const titleUpdater = useTitle("Loading...")
  setTimeout(()=> titleUpdater("Home"),3000)
  return (
    <div>
      <div>usetitle</div>

    </div>
  )
}
```

### ㄱ. 마찬가지로 첫번째 useEffect는 componentdidmount에 의해 첫 렌더링 시, title을 loading으로 바꾼 후,

### ㄴ. setTimeout함수를 이용해 state를 바꾼 후. componentwillupdate에 의해 updatetitle함수가 실행되고 title이 홈으로 바뀐다.





# 3. useClick(아직은 잘 모르겠다.)

![image-20220112004411365](README.assets/image-20220112004411365.png)

```jsx
import React from 'react'
import {useEffect, useState, useRef} from 'react'


const useClick = (onClick) => {
  console.log('2')
  //3. element 선언.(useRef)
  const element = useRef();

  console.log('3')
  //4. componentdidmount성격으로 useEffect 실행.
  useEffect(()=>{
    console.log('5')
    //15~17 componentdidmount,componentdidupdate때 호출
    if(element.current){
      element.current.addEventListener("click",onClick);
    }
    // componentwillunmount일때 리턴 
    // 아래와 같은 코드를 추가하는 이유는 component가 mount되지 않았을때,
    // eventListner가 배치되게 하고 싶지 않기 위해..
    return ()=>{
      console.log('????????????')
      if (element.current){
      element.current.removeEventListener("click",onClick);
      }
    }
  },[])
  console.log('4')
  return element;
}


export default function UseClick() {
  
  let [x, y] = useState(0)
  useEffect(()=>{
    console.log('when??')
  },[])
  console.log('여기는?')
  // 2. useClick(sayHello)함수 실행
  const sayHello = () => console.log("sayHello")
  const title = useClick(sayHello);
  console.log('title밑은?')
  const potato = useRef();
  setTimeout(()=> potato.current.focus(),3000)
  return (
    <div>
      <div>useClick</div>
      {console.log('div')}
      {/* 1. ref 선언 -> title함수 실행 */}
      <h1 ref = {title}>Hi</h1>
      {console.log('h1')}
      <input placeholder='la' ref={potato} onClick={()=>{y(x+1)}}/>
    </div>
  )
}
```

### componentwillunmount속성에 대해 알고싶었으나, 콘솔로 동작 순서를 찍어봐도 잘 이해가 되지 않았다. 사실 주석 순서도 예측이여서 정확하지 않다.

### 내일 다시 공부할 예정!

