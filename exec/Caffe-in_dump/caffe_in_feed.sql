-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: i6c104.p.ssafy.io    Database: caffe_in
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `feed_no` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `reg_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cafe_id` int DEFAULT NULL,
  `cafe_name` varchar(30) DEFAULT NULL,
  `category_list` json DEFAULT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  `comment_count` int NOT NULL DEFAULT '0',
  `user_no` varchar(13) NOT NULL,
  PRIMARY KEY (`feed_no`),
  KEY `fk_feed_user_detail1_idx` (`user_no`),
  CONSTRAINT `fk_feed_user_detail1` FOREIGN KEY (`user_no`) REFERENCES `user_detail` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (86,'두베카페 완전 경치도 좋고 무엇보다 커피류가 짱 맛있습니다!! 꼭 와부세요~~','2022-02-17 10:47:41',16,'두베카페','[\"커피\", \"사진찍기 좋은\", \"공부하기 좋은\"]',5,0,'UQM0SiX6witsw'),(87,'커피 맛집에 뷰 맛집입니다!!!','2022-02-17 10:54:47',34,'페어링하우스','[\"커피\", \"사진찍기 좋은\"]',5,13,'UtQGoxxR3Jx37'),(88,'레이어드에서 스콘 먹으면서 포팅 매뉴얼 작성 중..^^','2022-02-17 16:28:31',28,'레이어드 연남점','[\"사진찍기 좋은\"]',3,3,'URbFdNJTQjSV7'),(89,'커피 사진 찍으러 다시 가야지..','2022-02-17 18:27:01',35,'피읖카페','[\"커피\", \"아늑한\"]',1,6,'URbFdNJTQjSV7'),(90,'아인슈페너 맛집입니다!!','2022-02-17 18:43:05',36,'카페길','[\"커피\", \"사진찍기 좋은\", \"공부하기 좋은\"]',3,10,'UtQGoxxR3Jx37'),(91,'곰돌이 케이크 맛집','2022-02-17 23:54:45',37,'하이웨이스트 익선점','[\"사진찍기 좋은\", \"케이크\"]',2,1,'U0Rcp2RN0zvas'),(92,'','2022-02-17 23:58:48',38,'에이비카페','[\"사진찍기 좋은\"]',1,2,'U0Rcp2RN0zvas'),(93,'','2022-02-18 00:04:50',39,'그레이우드커피','[\"커피\", \"사진찍기 좋은\", \"케이크\"]',1,0,'UtQGoxxR3Jx37'),(94,'','2022-02-18 00:30:20',40,'카페노티드 강남카카오점','[]',0,0,'U0Rcp2RN0zvas'),(97,'','2022-02-18 00:33:57',NULL,NULL,'[\"사진찍기 좋은\", \"아늑한\"]',0,0,'U0Rcp2RN0zvas'),(98,'','2022-02-18 00:36:56',42,'디저트뷰','[\"케이크\"]',0,0,'U0Rcp2RN0zvas'),(99,'성수동 핫플 연무장 다녀왔습니다! 뷰 맛집입니다!!!','2022-02-18 00:38:21',43,'루프탑카페 연무장','[\"커피\", \"사진찍기 좋은\", \"힙한\"]',1,2,'UtQGoxxR3Jx37'),(100,'스타벅스 토피넛라떼 다들 좋아하시죠? ㅋㅋ \n토피넛라떼가 짱입니다.\n크크루삥뽕','2022-02-18 00:52:30',44,'스타벅스 전북대점','[\"커피\", \"케이크\"]',0,0,'UQM0SiX6witsw'),(101,'여긴 공사장같이 생겼는데 사람 짱많아요.\n그리고 커피하고 케이크는 잘 모르겠는데 공사장 같은 분위기라 뭔가 신기해요~~^^','2022-02-18 00:53:30',45,'올드브릭','[\"사진찍기 좋은\", \"테마있는\"]',2,0,'UQM0SiX6witsw'),(102,'내가 스타벅스가면 토피넛라떼하고 자몽허니블러드밖에 안먹는데\n스타벅스는 자몽허니블러드가 그래도 가장 맛있는거같다;;\n사이즈는 무조건 벤티 ㅋ','2022-02-18 00:54:32',46,'스타벅스 전주효자DT','[\"커피\", \"케이크\", \"공부하기 좋은\"]',1,0,'UQM0SiX6witsw'),(103,'커피니는 그냥 사람 기다리는 용도로 가는듯 ㅇㅈ?ㅇㅈ?ㅇㅈ?','2022-02-18 00:55:09',47,'커피니 전주효자점','[\"아늑한\"]',1,0,'UQM0SiX6witsw'),(104,'여긴 너무 좁은거같다. 근데 투썸이라서 아이스박스 먹으러 간다 ㅋㅋ','2022-02-18 00:56:10',48,'투썸플레이스 강남역중앙점','[\"케이크\", \"공부하기 좋은\"]',3,3,'UQM0SiX6witsw'),(105,'외도엔 카페가 하나밖에 없어요.\n파노라마커피숍 꼭 가보세용','2022-02-18 00:56:31',NULL,NULL,'[\"사진찍기 좋은\", \"케이크\", \"테마있는\"]',0,0,'UfDqCdLpQEYth'),(106,'분위기 있어요~~ 왜 커피 사진은 안찍었을까요','2022-02-18 01:05:06',49,'가배도 삼청점','[\"아늑한\"]',0,0,'UYeb4H4PiKntR'),(107,'이름 까먹어서 로드뷰로 찾아온 카페^^.. 첨성대 멋있쥬?','2022-02-18 01:09:43',50,'제이커피 경주첨성대점','[\"커피\"]',0,0,'UYeb4H4PiKntR'),(108,'무지개 케이크 냠냠','2022-02-18 01:11:43',51,'필로소피아','[\"사진찍기 좋은\", \"케이크\"]',0,0,'UYeb4H4PiKntR'),(109,'루프탑 있어요~~ 이름 생각나면 수정할게요 ㅠㅠ','2022-02-18 01:13:56',NULL,NULL,'[\"사진찍기 좋은\"]',0,0,'UYeb4H4PiKntR'),(110,'사진 찍기 좋아서 또 갔습니다!','2022-02-18 01:15:05',51,'필로소피아','[\"사진찍기 좋은\"]',1,0,'UYeb4H4PiKntR'),(111,'크리스마스에는 예쁜 트리도 있어용','2022-02-18 01:17:07',52,'데이오프나이트','[\"케이크\"]',0,0,'UYeb4H4PiKntR'),(112,'힙해요 힙!!','2022-02-18 01:32:22',53,'간식','[\"힙한\"]',1,0,'UYeb4H4PiKntR'),(113,'가게가 너무 귀여워요 ㅠㅠ','2022-02-18 01:36:35',54,'데일리오아시스 광주동명점','[\"테마있는\"]',0,1,'UYeb4H4PiKntR'),(114,'','2022-02-18 02:30:35',55,'더베이커스가든 화도본점','[\"사진찍기 좋은\"]',0,0,'U0Rcp2RN0zvas'),(118,'지하 분위기 대박!','2022-02-18 05:31:26',38,'에이비카페','[\"사진찍기 좋은\", \"케이크\"]',1,2,'URbFdNJTQjSV7'),(119,'할리스에서 이게 무슨음료수더라?','2022-02-18 08:32:15',59,'할리스 전북대덕진광장점','[\"커피\", \"아늑한\", \"힙한\"]',2,0,'UGsRYwTBKKRlV');
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:50:00
