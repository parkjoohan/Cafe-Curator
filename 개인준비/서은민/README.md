# 01/10

- 담당 컨설턴트님과 팀 미팅 진행

- ERD 초안 작성 시작 https://www.erdcloud.com/d/BqyD4bNpayfsJ7ijs

  - 피드 + 키워드 + 카페 테이블 설계 문제
  - 좋아요 테이블 카테고리(피드 or 댓글) 구별 문제

</br>

# 01/11

### 실습 코치님 & 컨설턴트님 피드백으로 ERD 수정

![image](https://user-images.githubusercontent.com/50658153/148956161-beeb2ace-17d4-4fc8-952b-771e4be202ba.png)

댓글-피드, 파일-피드 질문(back)

</br>

### JPA 학습

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
