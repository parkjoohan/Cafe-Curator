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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` varchar(13) NOT NULL,
  `email` varchar(30) NOT NULL,
  `join_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `oauth_type` varchar(10) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`user_no`),
  KEY `fk_user_email_auth1_idx` (`email`),
  CONSTRAINT `fk_user_email_auth1` FOREIGN KEY (`email`) REFERENCES `email_auth` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('U0Rcp2RN0zvas','thgml36928@gmail.com','2022-02-17 11:35:37','kql','USER'),('U8xKMrd0T7xSQ','sion010613@gmail.com','2022-02-18 01:07:00','kql','USER'),('U8ZYRXehYBqHU','sem6169@kql.com','2022-02-17 11:16:15','kql','USER'),('UckTKCGlpZHiY','2124542247@kakao.com','2022-02-18 03:56:04','kakao','USER'),('UfDqCdLpQEYth','aff4110@gmail.com','2022-02-18 00:16:19','kql','USER'),('UGsRYwTBKKRlV','2124480003@kakao.com','2022-02-18 01:06:34','kakao','USER'),('Uiu0BWDJaLNlr','sem6169@gmail.com','2022-02-17 10:49:51','google','USER'),('UkbVcggEep20N','sohee960328@gmail.com','2022-02-17 10:44:11','google','USER'),('UnFuadKfAjgus','strawberry01128@gmail.com','2022-02-18 01:07:03','kql','USER'),('UNjnVa9EbDzvn','ny3021@gmail.com','2022-02-17 19:36:45','kql','USER'),('UQM0SiX6witsw','ybj121725@gmail.com','2022-02-17 10:46:21','kql','USER'),('URbFdNJTQjSV7','kingqlab.caffein@gmail.com','2022-02-17 15:12:00','kql','USER'),('UsAzpXuorPc0c','2124111329@kakao.com','2022-02-17 19:41:18','kakao','USER'),('UtQGoxxR3Jx37','joohanpark1513@gmail.com','2022-02-17 10:51:09','kql','USER'),('UXeRlcjkNKauc','jdb4497@nate.com','2022-02-17 17:08:57','kql','USER'),('UyCI5qTZCZrga','wjdco11@naver.com','2022-02-17 23:03:06','kql','USER'),('UYeb4H4PiKntR','2123793782@kakao.com','2022-02-17 15:36:09','kakao','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:49:55
