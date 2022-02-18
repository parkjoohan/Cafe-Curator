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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `comment_group` int NOT NULL DEFAULT '0',
  `sequence` int NOT NULL DEFAULT '0',
  `content` varchar(500) NOT NULL,
  `reg_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `like_count` int NOT NULL DEFAULT '0',
  `feed_no` int NOT NULL,
  `user_no` varchar(13) NOT NULL,
  `parent_no` int DEFAULT NULL,
  `comment_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_no`),
  KEY `fk_comment_feed1_idx` (`feed_no`),
  KEY `fk_comment_user_detail1_idx` (`user_no`),
  KEY `fk_comment_comment1_idx` (`parent_no`),
  CONSTRAINT `fk_comment_comment1` FOREIGN KEY (`parent_no`) REFERENCES `comment` (`comment_no`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_feed1` FOREIGN KEY (`feed_no`) REFERENCES `feed` (`feed_no`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user_detail1` FOREIGN KEY (`user_no`) REFERENCES `user_detail` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (336,5,0,'1','2022-02-17 07:50:48',0,87,'UtQGoxxR3Jx37',NULL,2),(338,6,0,'2','2022-02-17 07:51:05',0,87,'UtQGoxxR3Jx37',NULL,2),(339,7,0,'3','2022-02-17 07:51:07',0,87,'UtQGoxxR3Jx37',NULL,1),(340,5,1,'1-1','2022-02-17 07:51:12',1,87,'UtQGoxxR3Jx37',336,0),(341,5,2,'1-22','2022-02-17 07:51:17',0,87,'UtQGoxxR3Jx37',336,0),(342,6,1,'2-1','2022-02-17 07:51:28',0,87,'UtQGoxxR3Jx37',338,0),(343,6,2,'2-2','2022-02-17 07:51:33',0,87,'UtQGoxxR3Jx37',338,0),(344,8,0,'5','2022-02-17 08:43:48',0,87,'UtQGoxxR3Jx37',NULL,0),(345,9,0,'5','2022-02-17 08:44:13',0,87,'UtQGoxxR3Jx37',NULL,0),(346,7,1,'안녕','2022-02-17 09:00:17',0,87,'UtQGoxxR3Jx37',339,0),(347,1,0,'빵맛집인가요??','2022-02-17 09:10:14',0,88,'UtQGoxxR3Jx37',NULL,0),(348,2,0,'방문해보겠습니다!','2022-02-17 09:24:43',1,88,'UtQGoxxR3Jx37',NULL,0),(355,1,0,'swagger로 댓글 달기','2022-02-17 10:06:56',0,89,'UYeb4H4PiKntR',NULL,0),(361,2,0,'8081로 보내보자','2022-02-17 10:21:56',0,89,'URbFdNJTQjSV7',NULL,0),(377,1,0,'댓글','2022-02-17 10:39:52',0,90,'UtQGoxxR3Jx37',NULL,1),(378,2,0,'댓글','2022-02-17 10:40:07',0,90,'UtQGoxxR3Jx37',NULL,0),(379,3,0,'댓글댓글','2022-02-17 10:40:14',0,90,'UtQGoxxR3Jx37',NULL,0),(380,4,0,'댓글댓글대댓글','2022-02-17 10:40:20',0,90,'UtQGoxxR3Jx37',NULL,1),(381,4,1,'이거이거','2022-02-17 10:40:40',0,90,'UtQGoxxR3Jx37',380,0),(382,3,0,'8081 꺼졌지','2022-02-17 11:20:50',0,89,'URbFdNJTQjSV7',NULL,1),(383,4,0,'피읖카페 이름 재밌네요 ㅎ','2022-02-17 12:48:57',0,89,'UQM0SiX6witsw',NULL,1),(384,3,1,'ㅎㅇㅎㅇ','2022-02-17 12:49:05',1,89,'UQM0SiX6witsw',382,0),(385,4,1,'그러게요','2022-02-17 13:39:44',0,89,'U0Rcp2RN0zvas',383,0),(386,5,0,'얼마나 길게 써지나얼마나 길게 써지나얼마나 길게 써지나얼마나 길게 써지나얼마나 길게 써지나','2022-02-17 14:20:08',0,90,'UtQGoxxR3Jx37',NULL,0),(388,1,0,'우왕 귀여워요','2022-02-17 15:01:45',0,91,'UYeb4H4PiKntR',NULL,0),(389,1,0,'분위기 너무 좋았음~~~~~~~','2022-02-17 15:02:06',0,92,'UYeb4H4PiKntR',NULL,0),(390,3,0,'여기 스콘 맛있어!!','2022-02-17 15:51:45',0,88,'U0Rcp2RN0zvas',NULL,0),(391,1,0,'오호 연무장','2022-02-17 15:52:25',0,99,'UYeb4H4PiKntR',NULL,1),(392,1,1,'성수동 멀어요 다른 카페도 올려주세요~~','2022-02-17 15:53:02',0,99,'U0Rcp2RN0zvas',391,0),(393,1,0,'투썸 케이크 존맛..!','2022-02-17 15:59:04',0,104,'U0Rcp2RN0zvas',NULL,0),(394,2,0,'ㅋㅋㅋㅋ','2022-02-17 16:05:40',0,104,'UYeb4H4PiKntR',NULL,0),(395,1,0,'나 여기 대구점 가봤어ㅋㅋㅋ','2022-02-17 17:01:39',0,113,'U0Rcp2RN0zvas',NULL,0),(397,3,0,'헐 ㅠㅠ 남친짤ㅠㅠ half 해버렸다...','2022-02-17 19:07:27',0,104,'UnFuadKfAjgus',NULL,0),(398,2,0,'멋있네요!','2022-02-17 19:48:31',0,92,'URbFdNJTQjSV7',NULL,0),(399,1,0,'우와 저도 얼마전에 갔어요!!','2022-02-17 21:33:25',1,118,'UYeb4H4PiKntR',NULL,1),(400,1,1,'대박!','2022-02-17 21:34:15',0,118,'URbFdNJTQjSV7',399,0),(401,1,1,'안녕하새우','2022-02-17 22:51:16',1,90,'UQM0SiX6witsw',377,0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:49:58
