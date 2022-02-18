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
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `user_no` varchar(13) NOT NULL,
  `get_user_no` varchar(13) NOT NULL,
  PRIMARY KEY (`user_no`,`get_user_no`),
  KEY `fk_follow_user_detail1_idx` (`user_no`),
  KEY `fk_follow_user_detail2_idx` (`get_user_no`),
  CONSTRAINT `fk_follow_user_detail1` FOREIGN KEY (`user_no`) REFERENCES `user_detail` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `fk_follow_user_detail2` FOREIGN KEY (`get_user_no`) REFERENCES `user_detail` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('U0Rcp2RN0zvas','URbFdNJTQjSV7'),('U0Rcp2RN0zvas','UYeb4H4PiKntR'),('U8ZYRXehYBqHU','UQM0SiX6witsw'),('U8ZYRXehYBqHU','UtQGoxxR3Jx37'),('UGsRYwTBKKRlV','URbFdNJTQjSV7'),('UnFuadKfAjgus','UQM0SiX6witsw'),('UnFuadKfAjgus','UYeb4H4PiKntR'),('UQM0SiX6witsw','U8ZYRXehYBqHU'),('UQM0SiX6witsw','UGsRYwTBKKRlV'),('UQM0SiX6witsw','URbFdNJTQjSV7'),('UQM0SiX6witsw','UtQGoxxR3Jx37'),('URbFdNJTQjSV7','UQM0SiX6witsw'),('URbFdNJTQjSV7','UtQGoxxR3Jx37'),('URbFdNJTQjSV7','UYeb4H4PiKntR'),('UtQGoxxR3Jx37','UQM0SiX6witsw'),('UYeb4H4PiKntR','U0Rcp2RN0zvas'),('UYeb4H4PiKntR','UQM0SiX6witsw'),('UYeb4H4PiKntR','URbFdNJTQjSV7'),('UYeb4H4PiKntR','UtQGoxxR3Jx37');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:49:56
