-- MySQL Workbench Forward Engineering

--  drop database caffe_in;

 create database caffe_in;

use caffe_in;

CREATE TABLE IF NOT EXISTS `feed` (
    `feed_no` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` TEXT NOT NULL,
    `reg_time` DATETIME NULL,
    `cafe_id` INT NOT NULL,
    `user_no` VARCHAR(13) NOT NULL,
    `category_list` JSON NULL,
    `like_count` INT NOT NULL DEFAULT 0
);

CREATE TABLE `email_auth` (
	`email_auth_no`	INT	NOT NULL,
	`code`	VARCHAR(6)	NOT NULL,
	`send_date`	DATETIME	NOT NULL,
	`user_no`	VARCHAR(13)	NOT NULL
);

CREATE TABLE `file` (
	`file_no`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`feed_no`	INT	NOT NULL,
	`file_name`	VARCHAR(50)	NOT NULL,
	`extension`	VARCHAR(7)	NOT NULL
);

CREATE TABLE `comment` (
	`comment_no`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`feed_no`	INT	NOT NULL,
	`comment_group`	INT	NOT NULL,
	`sequence`	INT	NOT NULL,
	`parent_no`	INT	NOT NULL,
	`content`	VARCHAR(500)	NOT NULL,
	`reg_time`	DATETIME	NOT NULL,
	`like_count`	INT	NOT NULL	DEFAULT 0,
	`user_no`	VARCHAR(13)	NOT NULL
);

CREATE TABLE `feed_like` (
	`feed_no`	INT	NOT NULL,
	`user_no`	VARCHAR(13)	NOT NULL
);

CREATE TABLE `bookmark` (
	`feed_no`	INT	NOT NULL,
	`user_no`	VARCHAR(13)	NOT NULL
);

CREATE TABLE `follow` (
	`user_no`	VARCHAR(13)	NOT NULL,
	`get_user_no`	VARCHAR(13)	NOT NULL
);

CREATE TABLE `categories` (
	`category`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `cafe` (
	`cafe_id`	INT	NOT NULL,
	`name`	VARCHAR(15)	NOT NULL
);

CREATE TABLE `category_log` (
	`cafe_id`	INT	NOT NULL,
	`category`	VARCHAR(20)	NOT NULL,
	`feed_no`	INT	NOT NULL
);

CREATE TABLE `comment_like` (
	`comment_no`	INT	NOT NULL,
	`user_no`	VARCHAR(13)	NOT NULL
);

CREATE TABLE `user` (
	`user_no`	VARCHAR(13)	NOT NULL,
	`email`	VARCHAR(30)	NULL,
	`join_date`	DATETIME	NOT NULL,
	`oauth_type`	VARCHAR(10)	NOT NULL,
	`role`	VARCHAR(10)	NOT NULL	DEFAULT 'USER'
);

CREATE TABLE `user_detail` (
	`user_no`	VARCHAR(13)	NOT NULL,
	`id`	VARCHAR(10)	NOT NULL,
	`pass`	VARCHAR(70)	NOT NULL,
	`introduction`	VARCHAR(100)	NULL,
	`picture`	VARCHAR(50)	NULL,
	`refresh_token`	VARCHAR(100)	NULL,
	`category_list`	JSON	NULL
);

CREATE TABLE `feeds` (
	`user_no`	VARCHAR(13)	NOT NULL,
	`feed_list`	JSON	NULL
);

ALTER TABLE `email_auth` ADD CONSTRAINT `PK_EMAIL_AUTH` PRIMARY KEY (
	`email_auth_no`
);

ALTER TABLE `feed_like` ADD CONSTRAINT `PK_FEED_LIKE` PRIMARY KEY (
	`feed_no`,
	`user_no`
);

ALTER TABLE `bookmark` ADD CONSTRAINT `PK_BOOKMARK` PRIMARY KEY (
	`feed_no`,
	`user_no`
);

ALTER TABLE `follow` ADD CONSTRAINT `PK_FOLLOW` PRIMARY KEY (
   `user_no`,
   `get_user_no`
);

ALTER TABLE `categories` ADD CONSTRAINT `PK_CATEGORIES` PRIMARY KEY (
	`category`
);

ALTER TABLE `cafe` ADD CONSTRAINT `PK_CAFE` PRIMARY KEY (
	`cafe_id`
);

ALTER TABLE `category_log` ADD CONSTRAINT `PK_CATEGORY_LOG` PRIMARY KEY (
	`cafe_id`,
	`category`,
	`feed_no`
);

ALTER TABLE `comment_like` ADD CONSTRAINT `PK_COMMENT_LIKE` PRIMARY KEY (
	`comment_no`,
	`user_no`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_no`
);

ALTER TABLE `user_detail` ADD CONSTRAINT `PK_USER_DETAIL` PRIMARY KEY (
	`user_no`
);

ALTER TABLE `feeds` ADD CONSTRAINT `PK_FEEDS` PRIMARY KEY (
	`user_no`
);

ALTER TABLE `feed_like` ADD CONSTRAINT `FK_feed_TO_feed_like_1` FOREIGN KEY (
	`feed_no`
)
REFERENCES `feed` (
	`feed_no`
);

ALTER TABLE `feed_like` ADD CONSTRAINT `FK_user_detail_TO_feed_like_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user_detail` (
	`user_no`
);

ALTER TABLE `bookmark` ADD CONSTRAINT `FK_feed_TO_bookmark_1` FOREIGN KEY (
	`feed_no`
)
REFERENCES `feed` (
	`feed_no`
);

ALTER TABLE `bookmark` ADD CONSTRAINT `FK_user_detail_TO_bookmark_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user_detail` (
	`user_no`
);

ALTER TABLE `follow` ADD CONSTRAINT `FK_user_TO_follow_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `follow` ADD CONSTRAINT `FK_user_TO_follow_2` FOREIGN KEY (
	`get_user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `category_log` ADD CONSTRAINT `FK_cafe_TO_category_log_1` FOREIGN KEY (
	`cafe_id`
)
REFERENCES `cafe` (
	`cafe_id`
);

ALTER TABLE `category_log` ADD CONSTRAINT `FK_categories_TO_category_log_1` FOREIGN KEY (
	`category`
)
REFERENCES `categories` (
	`category`
);

ALTER TABLE `category_log` ADD CONSTRAINT `FK_feed_TO_category_log_1` FOREIGN KEY (
	`feed_no`
)
REFERENCES `feed` (
	`feed_no`
);

ALTER TABLE `comment_like` ADD CONSTRAINT `FK_comment_TO_comment_like_1` FOREIGN KEY (
	`comment_no`
)
REFERENCES `comment` (
	`comment_no`
);

ALTER TABLE `comment_like` ADD CONSTRAINT `FK_user_detail_TO_comment_like_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user_detail` (
	`user_no`
);

ALTER TABLE `user_detail` ADD CONSTRAINT `FK_user_TO_user_detail_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `feeds` ADD CONSTRAINT `FK_user_TO_feeds_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

