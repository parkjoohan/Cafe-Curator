# 01/10

- 담당 컨설턴트님과 팀 미팅 진행
- ERD 초안 작성 시작 https://www.erdcloud.com/d/BqyD4bNpayfsJ7ijs
  - 피드 + 키워드 + 카페 테이블 설계 문제
  - 좋아요 테이블 카테고리(피드 or 댓글) 구별 문제

# 01/11

### 실습 코치님 & 컨설턴트님 피드백으로 ERD 수정

![image](https://user-images.githubusercontent.com/50658153/148956161-beeb2ace-17d4-4fc8-952b-771e4be202ba.png)

- 좋아요 테이블 분리(피드, 댓글)
- 키워드 로그 테이블 추가
- 캐시
  - 해당 카페에 대해 최초 요청 시 키워드 count가 캐시에 없다면 DB에서 log 데이터 받아옴  
    받아온 데이터로 서버에서 연산(sorting) 후 캐시에 결과 저장
  - 다음 요청은 캐시에 결과(count 정보)가 있으면 바로 사용
  - 중간에 데이터가 update 되면? DB log + 캐시 갱신 모두 수행함

</br>

> ## ✏️ JPA 학습

1학기 MyBatis 활용 코드를 JPA로 바꿔보는 중

JPA Entity는 반드시 파라미터 없는 기본 생성자가 있어야 하고, 이는 public 또는 protected  
https://wbluke.tistory.com/6

DB에서 데이터는 받아오는데 내용이 보이지 않았음  
Maven을 통해 추가한 lombok이 STS에 설치되지 않아서 annotation이 적용되지 않음(getter, setter 등)  
lombok IDEs에 STS 경로 지정해서 해결 했지만 향후 프로젝트는 IntelliJ 사용 예정..

#

참고

JPA Pagination을 이용한 무한 스크롤 구현기  
https://wbluke.tistory.com/18?category=349262

# 01/12

“좋아요 카운트 풀스캔 문제” → “log 또는 count 컬럼”  
좋아요, 댓글 테이블에 카운트 컬럼 추가하는 방향으로 결정

![image](https://user-images.githubusercontent.com/50658153/149251114-81e39d2c-1122-4d19-bd7c-467666127c74.png)

</br>

> ## ✏️ JPA 학습

1차 기능 구현 - 게시물 관련 기능을 담당할 것 같아서 1학기에 진행한 HappyHouse 프로젝트의 게시판 API를 MyBatis → JPA 코드로 변경해 보며 연습함

| ![image](https://user-images.githubusercontent.com/50658153/149266289-8e273cbe-1a7f-48e6-ae1c-43652949802b.png) | ![image](https://user-images.githubusercontent.com/50658153/149266323-91995188-d64b-4683-bcd6-578980a5da2e.png) |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |

## Entity

JPA Entity는 반드시 파라미터 없는 기본 생성자가 있어야 하고, 이는 public 또는 protected

### @Id

해당 멤버가 Entity의 PK임을 의미  
보통 MySQL DB는 PK를 bigint 타입으로, 엔티티(Entity)에서는 Long 타입으로 선언

### @GenerateValue(strategy=GenerationType.XXX)

PK 생성 전략을 설정하는 어노테이션

- AUTO : 데이터베이스 방언에 따라 자동 지정(기본값)
- IDENTIFY : 데이터베이스에 위임(MySQL)
  - AUTO_INCREMENT
- SEQUENCE : 데이터베이스 시퀀스 오브젝트 사용(Oracle)
  - @SequenceGenerator
- TABLE : 키 생성용 테이블 사용
  - @TableGenerator

### @Table

별도의 이름을 가진 데이터베이스 테이블과 매칭  
@Entity로 선언된 클래스의 이름은 실제 테이블명과 일치하는 것을 매핑함
기본적으로 클래스명(Camel Case)을 테이블명(Snake Case)으로 매핑, 클래스명과 테이블 명이 다르면 @Table(name=”XXX”) 형식으로 지정

### @Column

기본적으로 멤버 변수명과 일치하는 DB 컬럼을 매핑, 다르다면 @Column(name=”XXX”)

## Repository

MyBatis의 Mapper 역할  
엔티티(Entity) 클래스와 레파지토리(Repository) 인터페이스는 같은 패키지에 위치해야 함

[https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/package-summary.html](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/package-summary.html)

![image](https://user-images.githubusercontent.com/50658153/149265578-65d583cb-5930-47b1-8833-89dd37d1f695.png)
[https://codify.tistory.com/103](https://codify.tistory.com/103)

### JpaRepository<T: Entity의 타입 클래스, ID : PK의 타입>

ID는 기본형의 경우 wrapper 클래스 지정

### 기본 메소드 외에 추가적인 메소드를 지정하는 방법

- Query Method
  - QueryMethod에 포함할 수 있는 키워드
  - [https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)
  ```java
  public List<Notice> findByUseridOrderByRegtime(String userid);
  ```
- @Query
  - JPQL(Java Persistence Query Language)
