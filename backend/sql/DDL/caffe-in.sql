-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema caffe_in
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema caffe_in
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `caffe_in` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `caffe_in` ;

-- -----------------------------------------------------
-- Table `caffe_in`.`email_auth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`email_auth` (
  `email` VARCHAR(30) NOT NULL,
  `code` VARCHAR(6) NOT NULL,
  `state` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`user` (
  `user_no` VARCHAR(13) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `join_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `oauth_type` VARCHAR(10) NOT NULL,
  `role` VARCHAR(10) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`user_no`),
  INDEX `fk_user_email_auth1_idx` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_user_email_auth1`
    FOREIGN KEY (`email`)
    REFERENCES `caffe_in`.`email_auth` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`user_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`user_detail` (
  `user_no` VARCHAR(13) NOT NULL,
  `user_id` VARCHAR(10) NOT NULL,
  `pass` VARCHAR(70) NULL DEFAULT NULL,
  `introduction` VARCHAR(100) NULL DEFAULT NULL,
  `picture` VARCHAR(400) NULL DEFAULT NULL,
  `category_list` JSON NULL DEFAULT NULL,
  `follower_count` INT NOT NULL DEFAULT '0',
  `following_count` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_no`),
  INDEX `fk_user_detail_user1_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_user_detail_user1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user` (`user_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`feed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`feed` (
  `feed_no` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `reg_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cafe_name` VARCHAR(30) NULL DEFAULT NULL,
  `category_list` JSON NULL DEFAULT NULL,
  `like_count` INT NOT NULL DEFAULT '0',
  `comment_count` INT NOT NULL DEFAULT '0',
  `user_no` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`feed_no`),
  INDEX `fk_feed_user_detail1_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_feed_user_detail1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`bookmark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`bookmark` (
  `feed_no` INT NOT NULL,
  `user_no` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`feed_no`, `user_no`),
  INDEX `fk_bookmark_user_detail1_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_bookmark_user_detail1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_feed_TO_bookmark_1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `caffe_in`.`feed` (`feed_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`cafe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`cafe` (
  `cafe_id` INT NOT NULL AUTO_INCREMENT,
  `cafe_name` VARCHAR(20) NOT NULL,
  `cafe_address` VARCHAR(45) NOT NULL,
  `cafe_lat` VARCHAR(20) NOT NULL,
  `cafe_lng` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`cafe_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`categories` (
  `category` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`category`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`category_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`category_log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `cafe_id` INT NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`log_id`),
  INDEX `FK_categories_TO_category_log_1` (`category` ASC) VISIBLE,
  INDEX `FK_feed_TO_category_log_1` (`feed_no` ASC) VISIBLE,
  INDEX `FK_cafe_TO_category_log_1` (`cafe_id` ASC) VISIBLE,
  CONSTRAINT `FK_cafe_TO_category_log_1`
    FOREIGN KEY (`cafe_id`)
    REFERENCES `caffe_in`.`cafe` (`cafe_id`)
    ON DELETE RESTRICT,
  CONSTRAINT `FK_categories_TO_category_log_1`
    FOREIGN KEY (`category`)
    REFERENCES `caffe_in`.`categories` (`category`),
  CONSTRAINT `FK_feed_TO_category_log_1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `caffe_in`.`feed` (`feed_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`comment` (
  `comment_no` INT NOT NULL AUTO_INCREMENT,
  `comment_group` INT NOT NULL DEFAULT '0',
  `sequence` INT NOT NULL DEFAULT '0',
  `content` VARCHAR(500) NOT NULL,
  `reg_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `like_count` INT NOT NULL DEFAULT '0',
  `feed_no` INT NOT NULL,
  `user_no` VARCHAR(13) NOT NULL,
  `parent_no` INT NULL DEFAULT NULL,
  `comment_count` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_no`),
  INDEX `fk_comment_feed1_idx` (`feed_no` ASC) VISIBLE,
  INDEX `fk_comment_user_detail1_idx` (`user_no` ASC) VISIBLE,
  INDEX `fk_comment_comment1_idx` (`parent_no` ASC) VISIBLE,
  CONSTRAINT `fk_comment_comment1`
    FOREIGN KEY (`parent_no`)
    REFERENCES `caffe_in`.`comment` (`comment_no`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_comment_feed1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `caffe_in`.`feed` (`feed_no`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user_detail1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`comment_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`comment_like` (
  `comment_no` INT NOT NULL,
  `user_no` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`comment_no`, `user_no`),
  INDEX `fk_comment_like_user_detail1_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_comment_like_user_detail1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_comment_TO_comment_like_1`
    FOREIGN KEY (`comment_no`)
    REFERENCES `caffe_in`.`comment` (`comment_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`feed_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`feed_like` (
  `feed_no` INT NOT NULL,
  `user_no` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`feed_no`, `user_no`),
  INDEX `fk_feed_like_user_detail1_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_feed_like_user_detail1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_feed_TO_feed_like_1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `caffe_in`.`feed` (`feed_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`feeds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`feeds` (
  `user_no` VARCHAR(13) NOT NULL,
  `feed_list` JSON NULL DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  CONSTRAINT `FK_user_TO_feeds_1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user` (`user_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`file` (
  `file_no` INT NOT NULL AUTO_INCREMENT,
  `file_path` VARCHAR(400) NOT NULL,
  `feed_no` INT NOT NULL,
  PRIMARY KEY (`file_no`),
  INDEX `fk_file_feed1_idx` (`feed_no` ASC) VISIBLE,
  CONSTRAINT `fk_file_feed1`
    FOREIGN KEY (`feed_no`)
    REFERENCES `caffe_in`.`feed` (`feed_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `caffe_in`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caffe_in`.`follow` (
  `user_no` VARCHAR(13) NOT NULL,
  `get_user_no` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`user_no`, `get_user_no`),
  INDEX `fk_follow_user_detail1_idx` (`user_no` ASC) VISIBLE,
  INDEX `fk_follow_user_detail2_idx` (`get_user_no` ASC) VISIBLE,
  CONSTRAINT `fk_follow_user_detail1`
    FOREIGN KEY (`user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_follow_user_detail2`
    FOREIGN KEY (`get_user_no`)
    REFERENCES `caffe_in`.`user_detail` (`user_no`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
