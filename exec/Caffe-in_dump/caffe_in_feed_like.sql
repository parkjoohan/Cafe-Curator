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
-- Table structure for table `feed_like`
--

DROP TABLE IF EXISTS `feed_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_like` (
  `feed_no` int NOT NULL,
  `user_no` varchar(13) NOT NULL,
  PRIMARY KEY (`feed_no`,`user_no`),
  KEY `fk_feed_like_user_detail1_idx` (`user_no`),
  CONSTRAINT `fk_feed_like_user_detail1` FOREIGN KEY (`user_no`) REFERENCES `user_detail` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FK_feed_TO_feed_like_1` FOREIGN KEY (`feed_no`) REFERENCES `feed` (`feed_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_like`
--

LOCK TABLES `feed_like` WRITE;
/*!40000 ALTER TABLE `feed_like` DISABLE KEYS */;
INSERT INTO `feed_like` VALUES (119,'UGsRYwTBKKRlV'),(87,'Uiu0BWDJaLNlr'),(86,'UkbVcggEep20N'),(104,'UnFuadKfAjgus'),(86,'UQM0SiX6witsw'),(87,'UQM0SiX6witsw'),(88,'UQM0SiX6witsw'),(89,'UQM0SiX6witsw'),(90,'UQM0SiX6witsw'),(93,'UQM0SiX6witsw'),(101,'UQM0SiX6witsw'),(102,'UQM0SiX6witsw'),(103,'UQM0SiX6witsw'),(104,'UQM0SiX6witsw'),(118,'UQM0SiX6witsw'),(119,'UQM0SiX6witsw'),(88,'URbFdNJTQjSV7'),(90,'URbFdNJTQjSV7'),(91,'URbFdNJTQjSV7'),(101,'URbFdNJTQjSV7'),(110,'URbFdNJTQjSV7'),(112,'URbFdNJTQjSV7'),(87,'UtQGoxxR3Jx37'),(90,'UtQGoxxR3Jx37'),(86,'UXeRlcjkNKauc'),(86,'UyCI5qTZCZrga'),(87,'UyCI5qTZCZrga'),(88,'UyCI5qTZCZrga'),(86,'UYeb4H4PiKntR'),(87,'UYeb4H4PiKntR'),(91,'UYeb4H4PiKntR'),(92,'UYeb4H4PiKntR'),(99,'UYeb4H4PiKntR'),(104,'UYeb4H4PiKntR');
/*!40000 ALTER TABLE `feed_like` ENABLE KEYS */;
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
