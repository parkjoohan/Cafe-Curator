<!-- 필수 항목 -->

## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js |
| :white_check_mark: Mobile Web | :black_square_button: Big Data | :black_square_button: Html | :white_check_mark: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :black_square_button: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |

<!-- 필수 항목 -->

## 프로젝트 소개

* 프로젝트명: 카페(디저트) 큐레이션 기반 SNS
* 서비스 특징: 웹/모바일(웹 디자인) 스켈레톤 프로젝트
* 주요 기능
  - 회원 관리
  - 관심사 기반의 점포 추천
  - SNS 기능 (피드, 팔로우/언팔로우, 댓글)
  - 지도를 통한 점포 가독성
* 주요 기술
  - JPA
  - React
  - JWT Authentication
  - REST API
* 참조 리소스
* 배포 환경
  - URL: 
  - 테스트 계정: 

<!-- 자유 양식 -->

## 팀 소개
* 박주한: 팀장, 프론트엔드 개발
* 이승현: 부팀장, 백엔드 개발
* 박소희: 백엔드 개발 
* 서은민: 백엔드 개발
* 정동균: 프론트엔드 개발
* 유병재: 프론트엔드 개발

<!-- 자유 양식 -->

## 프로젝트 상세 설명
* 기획 <br>
  **회원 가입**
    * 자체 회원가입
      * 외부로부터 필요한 데이터 값(이메일)을 입력받는다.
      * 이미 존재한 회원일 경우 메시지(이미 존재하는 회원입니다)반환
      * 존재하지 않은 회원일 경우 (a.)에 데이터값은 인증이 필요하다. 
      * 인증에 성공하면 추가 데이터값(비밀번호, 아이디), 프로필 사진을 입력받는다.
      * 비밀번호는 영문+숫자+특수문자 모두 포함(최소 8자, 최대 15자)해야 한다.
      * 아이디 영문+숫자+특수문자(“_ , -, .”)(최소 4자, 최대 10자)(영문 or 숫자 필수 입력) 여야 한다.
      * 아이디는 중복 불가여야 한다.
      * 프로필 사진을 등록하지 않으면 null이 입력된다. (null일 경우 기본 이미지 제공)
      * 프로필 사진을 제외한 값을 전부 입력하지 않으면 에러를 리턴한다. (프로필 사진을 제외한 컬럼은 모두 Not Null)
    * SSO (OAuth. 네이버, 카카오, 구글 로그인)
      * 회원 가입 후 아이디 입력을 해야한다.
      * 아이디 영문+숫자+특수문자(“_ , -, .”)(최소 4자, 최대 10자)(영문 or 숫자 필수 입력) 여야 한다.
      * 아이디는 중복 불가여야 한다.

  **관심사 선택**
    * 관심사는 최소 0개 최대 3개 선택할 수 있다.

  **회원 프로필 조회 - 로그인된 본인 계정만 조회 가능 (참고: 인스타 프로필 편집)**
    * 회원 정보(아이디, 프로필 사진, 소개, 이메일, 관심사)가 조회된다.

  **회원 프로필 수정 - 로그인된 본인 계정만 수정 가능**
    * 아이디, 프로필 사진, 소개를 수정할 수 있다.
      * 아이디 영문+숫자+특수문자(“_ , -, .”)(최소 4자, 최대 10자)(영문 or 숫자 필수 입력) 여야 한다. (중복 불가)
      * 프로필 사진은 기본 프로필 사진으로도 변경할 수 있다.
      * 아이디는 반드시 입력되어야 한다.
    * 비밀번호 수정
      * 비밀번호는 영문+숫자+특수문자 모두 포함(최소 8자, 최대 15자)

  **회원 페이지**
    * 기본 기능 (모든 방문자가 사용 가능한 기능)
      * 피드 조회 및 상세 보기 가능하다.
      * 게시물 / 팔로워 / 팔로잉 수 확인 가능하다.
      * 팔로워 / 팔로잉 목록 조회할 수 있다.
      * 게시물은 최신순으로 보여진다.
    * 로그인 후 본인 계정의 페이지 방문 시
      * 게시글 CRUD 가능
    * 로그인 후 회원이 타인 계정 방문 시
      * 팔로우 / 언팔로우


* 와이어프레임 <br>
  ![와이어1](/uploads/808232cc248a1f22b7c50fded277ad9a/와이어1.JPG) 
  ![와이어2](/uploads/a168143446bf5ca3a7efdf52f799b072/와이어2.JPG)
  ![와이어3](/uploads/83b9d1a5bd97a7d04a261ff896c121fc/와이어3.JPG)
  ![와이어4](/uploads/ec3125ef96cd73eb2be73cd8889781f3/와이어4.JPG)
  ![와이어5](/uploads/2fafa3282621f0ff47cd99aec5d0e317/와이어5.JPG)
>>>>>>> 69a2a5e5116462d8c49a50ef10b1f18f3e40f595
