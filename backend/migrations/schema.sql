# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: nerdtech
# Generation Time: 2019-01-18 22:07:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table favorite_products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorite_products`;

CREATE TABLE `favorite_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table favorite_shops
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorite_shops`;

CREATE TABLE `favorite_shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favorite_shops_shop_id_fk` (`shop_id`),
  KEY `favorite_shops_user_id_fk` (`user_id`),
  CONSTRAINT `favorite_shops_shop_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `favorite_shops_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table prices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `prices`;

CREATE TABLE `prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `shop_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `dateFrom` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateTo` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `price_shop_id_fk` (`shop_id`),
  KEY `price_product_id_fk` (`product_id`),
  CONSTRAINT `price_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `price_shop_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table product_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_tags`;

CREATE TABLE `product_tags` (
  `product_id` int(11) NOT NULL,
  `tag` varchar(200) NOT NULL DEFAULT '',
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `withdrawn` tinyint(1) NOT NULL DEFAULT '0',
  `barcode` varchar(15) NOT NULL,
  `brand` varchar(200) NOT NULL,
  `volume` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `barcode` (`barcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table shop_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shop_tags`;

CREATE TABLE `shop_tags` (
  `shop_id` int(11) NOT NULL,
  `tag` varchar(200) NOT NULL DEFAULT '',
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table shops
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shops`;

CREATE TABLE `shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `lng` double NOT NULL,
  `lat` double NOT NULL,
  `withdrawn` tinyint(1) NOT NULL DEFAULT '0',
  `telephone` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone` varchar(14) DEFAULT NULL,
  `password_hash` varchar(300) NOT NULL,
  `birthdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
