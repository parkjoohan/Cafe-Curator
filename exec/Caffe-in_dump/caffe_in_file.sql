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
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `file_no` int NOT NULL AUTO_INCREMENT,
  `file_path` varchar(400) NOT NULL,
  `feed_no` int NOT NULL,
  PRIMARY KEY (`file_no`),
  KEY `fk_file_feed1_idx` (`feed_no`),
  CONSTRAINT `fk_file_feed1` FOREIGN KEY (`feed_no`) REFERENCES `feed` (`feed_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (100,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/95566286-e2a4-4d97-aa87-be7707321083KakaoTalk_20220208_135448819_07.jpg',86),(101,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/0cdcec0b-1867-4251-b887-32fbe32f2e37KakaoTalk_20220208_135448819_08.jpg',86),(102,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/14d551b0-c3ac-4f94-a359-0e5a98bf9727KakaoTalk_20220217_105308652.png',87),(103,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/15fa2d5f-6d32-44b0-80fe-0f3160ac7c47KakaoTalk_20220211_010439906.jpg',88),(105,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/16f8080b-1724-459c-b94d-e0df36489c39%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png',90),(106,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/6891ef17-cf6d-4871-9ce2-a1449277f2f120211210_214344.jpg',91),(107,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/f14b89f2-ec17-4091-9f8f-8cc16efd43b11644727156248.jpg',92),(108,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/8da410f9-71ab-4012-a5b6-2f1cb93427ca%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C1.png',93),(109,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/ba4be476-6974-4d5f-84d3-8e983e3abbbd%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C2.png',93),(110,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/32773d9e-90d8-4cd0-8ff4-ffd302719d8c20211231_182009.jpg',94),(113,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/fe92bdf1-7fb5-4574-a004-20cefa70f50820211024_164313.jpg',97),(114,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/1c1463f9-879f-4e62-a7eb-32eb395406a120220129_152158.jpg',98),(115,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/f8507af3-c11e-445b-a130-0670559a01c7%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png',99),(116,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/1d7817fb-c476-4df3-a26e-30c34e4a83822.png',99),(117,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/4626f2fc-04d3-4338-a8ea-f135917453df3.png',99),(118,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/99bd2ec9-8486-45fc-aaaa-0594296c14124.png',99),(119,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/5dc01a8c-5c6d-43ee-beb3-46de8443c20dKakaoTalk_20220218_003355341.jpg',89),(120,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/7c9905c3-e4d5-460b-b3be-b15c843c3deaKakaoTalk_20220218_004015066.jpg',100),(121,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/e407b1c4-5971-4963-a821-4cc27cf78280KakaoTalk_20220218_004148544.jpg',101),(122,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/73b6a137-957f-4aa2-a97b-7326c6638569KakaoTalk_20220218_004149294.jpg',101),(123,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/e78a394f-7ce4-48a1-a6df-33113a654d56KakaoTalk_20220218_004110141.jpg',101),(124,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/c388bb64-29a4-443a-aaca-0423fc6cdd90KakaoTalk_20220218_004148544.jpg',101),(125,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/3ec2a83d-2ec2-47ea-9998-7b450c01a690KakaoTalk_20220218_004149294.jpg',101),(126,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/3c63828d-4b9d-46b4-8b01-77fa5dfcd579KakaoTalk_20220218_004413543.jpg',102),(127,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/c7dd3b82-16b0-450e-a37b-d0023b3cbd72KakaoTalk_20220218_004413543.jpg',102),(128,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/9a2ed06d-4ac4-401d-9816-8d7d51076e88KakaoTalk_20220218_004641229.jpg',103),(129,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/5d2be381-e6cc-4bb8-8cb7-b91707db344dKakaoTalk_20220218_004812018.jpg',104),(130,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/b76a44f8-e8db-445f-a273-7a19c2054343111.jpg',105),(131,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/a59abb24-969e-449e-8adb-1f46449256a8222.jpg',105),(132,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/7fa022bf-72ee-408b-8649-49d758356d7bKakaoTalk_20220218_005902463.jpg',106),(133,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/23cfa4ec-8ad3-468e-b9bb-1d930bff6bcbKakaoTalk_20220218_004839050.jpg',107),(134,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/ca24ccbf-d1cb-4b2c-bd9d-9f9878990d71KakaoTalk_20220218_005528912.jpg',108),(135,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/1bb468c2-88bf-4cc9-939a-b539e4d27863KakaoTalk_20220218_005417830.jpg',108),(136,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/97ec6065-29d8-4274-9ba6-cbc53a43f8ffKakaoTalk_20220218_005751406.jpg',109),(137,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/ed873b6a-33bf-4a6c-9904-e50786a26dabKakaoTalk_20220218_005611983.jpg',110),(138,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/c7acfc3d-a513-4621-92b9-0383bf43f7e9KakaoTalk_20220218_005015052.jpg',111),(140,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/53c5c321-0719-4059-ba85-9c49b8628305KakaoTalk_20220218_012159868.jpg',112),(141,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/1b3a50f0-683d-4375-8f4e-cd2ff806b98fKakaoTalk_20220218_012248693.jpg',113),(142,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/a4d174b3-5ac3-44cd-8655-6eb06fcb401520220102_123812.jpg',114),(146,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/4c0b3e26-49de-43d0-923a-2f6563fbde6eKakaoTalk_20220218_012851074.jpg',118),(147,'https://caffe-in-file.s3.ap-northeast-2.amazonaws.com/ba6c3902-edff-4d87-95fb-e12bdd51e93fKakaoTalk_20220218_004944262.jpg',119);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
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
