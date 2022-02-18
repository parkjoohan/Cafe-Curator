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
-- Table structure for table `user_detail`
--

DROP TABLE IF EXISTS `user_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_detail` (
  `user_no` varchar(13) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `pass` varchar(70) DEFAULT NULL,
  `introduction` varchar(100) DEFAULT NULL,
  `picture` varchar(400) DEFAULT NULL,
  `category_list` json DEFAULT NULL,
  `follower_count` int NOT NULL DEFAULT '0',
  `following_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_no`),
  KEY `fk_user_detail_user1_idx` (`user_no`),
  CONSTRAINT `fk_user_detail_user1` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_detail`
--

LOCK TABLES `user_detail` WRITE;
/*!40000 ALTER TABLE `user_detail` DISABLE KEYS */;
INSERT INTO `user_detail` VALUES ('U0Rcp2RN0zvas','thgml','$2a$10$kax6Lt8YghEj7MiaxRVTBuw5aRz0kRuyrqDeOkH9nHRH3crgFEKrm','',NULL,'[\"사진찍기 좋은\", \"케이크\"]',1,2),('U8xKMrd0T7xSQ','mssdora','$2a$10$7w3PduQWGSER5xPNz3SDHeRw.yXptohHDGKAFHioFY7x8gyytacUS','',NULL,'[]',0,0),('U8ZYRXehYBqHU','em_kql','$2a$10$2QjQIVD60zOh3PTU8sEaZ.duEcVtVywwnqDxvGQ3KRbNJlXiH.j1K',NULL,NULL,'[]',1,2),('UckTKCGlpZHiY','U8JZLc92Rw','$2a$10$290mApTFdsm.RtvOUaGpiOI7iucRz9D6/X54gWwNM.ywbCxuzCi7C',NULL,NULL,'[]',0,0),('UfDqCdLpQEYth','오렝지맛','$2a$10$Kk5q98P3SQ6TE/Vo5Vk6ouvkVFq2q11QB/lUdBxsLcSR2Vm0pmBCa','신병받아라','https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/d6c60efc-2eaa-45b0-84a1-d6123be8917f78738_72000_3228.png','[]',0,0),('UGsRYwTBKKRlV','UYIosMxTPi','$2a$10$s2qP1z8HR2RQfQQARmIWKuTmY3NdqxdFSQit/mGVx35NCgoY9OdJq',NULL,NULL,'[]',1,1),('Uiu0BWDJaLNlr','em_google','$2a$10$wo5DRfOIXrdLldgrUDBwZ.8rG1Ygt14df3iM1j2hvGjpX7SCCF2Bm','userId 길이 제한 있네요',NULL,'[\"사진찍기 좋은\", \"아늑한\"]',0,0),('UkbVcggEep20N','hihi','$2a$10$57U8MKtBt0nVbL/ZcfQ/aOgTMdAzxDTFWPuFJMsYpmJL7q7Thdhci','ㅇㄴㅇㄴ',NULL,'[\"사진찍기 좋은\", \"케이크\"]',0,0),('UnFuadKfAjgus','DongKyun','$2a$10$RUTxZkjkZ/KcigdEvqanNubDMt8yJKyGXcKrER7JKtAdB1Cy5ktMO','나는천재다!!!','https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/4295cf75-ae6b-4d8a-a792-961610e41f26%EB%8F%99%EA%B7%A0.jpg','[\"사진찍기 좋은\", \"아늑한\", \"공부하기 좋은\"]',0,2),('UNjnVa9EbDzvn','ddd','$2a$10$77HoHVVnNGMi11y0JXUbbuEi869x6ZwP8VZpRu4O2Pj1JoszLY7lS',NULL,NULL,'[\"커피\", \"공부하기 좋은\", \"차\"]',0,0),('UQM0SiX6witsw','byeongjae','$2a$10$IyEKHoVTiDtNxhguhZdCKuLNtT3nQU2vdl6ZG8gjR3p2IKywA5n9O',NULL,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/7dcbdec8-237c-4603-b438-df8b1f52e94aKakaoTalk_20210719_132638192.jpg','[\"커피\", \"공부하기 좋은\"]',5,4),('URbFdNJTQjSV7','KingQLab','$2a$10$NzZLersmoCJCKlUnE7PFDeV76T5JJb1vSdU97xGfpoPncso4hjGZ2','내가 바로 킹큐랩이다 훗훗','https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/360bd39d-dfeb-4e23-ba6c-fe5ef033a7fejava.png','[\"사진찍기 좋은\", \"힙한\"]',4,3),('UsAzpXuorPc0c','UBRNYGmePH','$2a$10$Z0qXm4U9uCTBnCna.ShJ0OO3OV7e.nNryiM5m6NC8VHnZocbVHhuG',NULL,NULL,'[]',0,0),('UtQGoxxR3Jx37','alex0317','$2a$10$5co2/vz1wvrbBjX1USg7juSqQIRJ7z13sOXT4wQ5GijVuHGHhwKmm','','https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/29b80bba-3801-4f11-9b07-8c122e29afdaKakaoTalk_20220217_133633459.jpg','[\"커피\", \"사진찍기 좋은\", \"아늑한\"]',4,1),('UXeRlcjkNKauc','123','$2a$10$o5Y2Ue43WLU5U9ueTtKGbuX7.RPmv6ANmlhnDGShlfzlIcEAo5oFi',NULL,NULL,'[\"사진찍기 좋은\", \"아늑한\", \"공부하기 좋은\"]',0,0),('UyCI5qTZCZrga','정정채','$2a$10$L7csDEK1M1sUUGO8OfzFWOz7cAHKe4gHsefDfLwyZZMDxllAsSqe2',NULL,NULL,'[\"커피\", \"사진찍기 좋은\", \"테마있는\"]',0,0),('UYeb4H4PiKntR','em_kakao','$2a$10$mJLKUcusUZc9BtspK6kgn.yhUP9BPVKYBFMpBpYWMU8ZSFKSKGQKi','안뇽','https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/680f53b9-863e-4204-956a-9427d5ccbe45KakaoTalk_20220218_004740165.jpg','[\"사진찍기 좋은\", \"케이크\", \"테마있는\"]',3,4);
/*!40000 ALTER TABLE `user_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:49:59
