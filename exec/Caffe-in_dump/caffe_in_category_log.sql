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
-- Table structure for table `category_log`
--

DROP TABLE IF EXISTS `category_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `cafe_id` int NOT NULL,
  `category` varchar(20) NOT NULL,
  `feed_no` int NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `FK_categories_TO_category_log_1` (`category`),
  KEY `FK_feed_TO_category_log_1` (`feed_no`),
  KEY `FK_cafe_TO_category_log_1` (`cafe_id`),
  CONSTRAINT `FK_cafe_TO_category_log_1` FOREIGN KEY (`cafe_id`) REFERENCES `cafe` (`cafe_id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_categories_TO_category_log_1` FOREIGN KEY (`category`) REFERENCES `categories` (`category`),
  CONSTRAINT `FK_feed_TO_category_log_1` FOREIGN KEY (`feed_no`) REFERENCES `feed` (`feed_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_log`
--

LOCK TABLES `category_log` WRITE;
/*!40000 ALTER TABLE `category_log` DISABLE KEYS */;
INSERT INTO `category_log` VALUES (134,16,'커피',86),(135,16,'사진찍기 좋은',86),(136,16,'공부하기 좋은',86),(137,34,'커피',87),(138,34,'사진찍기 좋은',87),(140,28,'사진찍기 좋은',88),(143,36,'커피',90),(144,36,'사진찍기 좋은',90),(145,36,'공부하기 좋은',90),(146,37,'사진찍기 좋은',91),(147,37,'케이크',91),(148,38,'사진찍기 좋은',92),(149,39,'커피',93),(150,39,'사진찍기 좋은',93),(151,39,'케이크',93),(155,42,'케이크',98),(156,43,'커피',99),(157,43,'사진찍기 좋은',99),(158,43,'힙한',99),(159,35,'커피',89),(160,35,'아늑한',89),(161,44,'커피',100),(162,44,'케이크',100),(163,45,'사진찍기 좋은',101),(164,45,'테마있는',101),(165,46,'커피',102),(166,46,'케이크',102),(167,46,'공부하기 좋은',102),(168,47,'아늑한',103),(169,48,'케이크',104),(170,48,'공부하기 좋은',104),(171,49,'아늑한',106),(172,50,'커피',107),(173,51,'사진찍기 좋은',108),(174,51,'케이크',108),(175,51,'사진찍기 좋은',110),(176,52,'케이크',111),(177,53,'힙한',112),(178,54,'테마있는',113),(179,55,'사진찍기 좋은',114),(186,38,'사진찍기 좋은',118),(187,38,'케이크',118),(190,59,'커피',119),(191,59,'아늑한',119),(192,59,'힙한',119);
/*!40000 ALTER TABLE `category_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:49:57
