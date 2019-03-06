-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 05, 2019 at 12:01 PM
-- Server version: 5.7.25-0ubuntu0.16.04.2
-- PHP Version: 7.0.33-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nerdtech`
--

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `price` double NOT NULL,
  `shopId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `date` date NOT NULL,
  `dateTo` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `price`, `shopId`, `productId`, `date`, `dateTo`) VALUES
(1, 8, 31, 50, '2019-03-02', NULL),
(2, 8, 31, 50, '2019-03-03', NULL),
(3, 8, 31, 50, '2019-03-04', NULL),
(4, 8, 31, 50, '2019-03-05', NULL),
(5, 8, 31, 50, '2019-03-06', NULL),
(6, 8, 31, 50, '2019-03-07', NULL),
(7, 10, 33, 50, '2019-03-05', NULL),
(8, 10, 33, 50, '2019-03-06', NULL),
(9, 10, 33, 50, '2019-03-07', NULL),
(10, 10, 33, 50, '2019-03-08', NULL),
(11, 3, 28, 41, '2019-03-03', NULL),
(12, 3, 28, 41, '2019-03-04', NULL),
(13, 3, 28, 41, '2019-03-05', NULL),
(14, 3, 28, 41, '2019-03-06', NULL),
(15, 7, 17, 37, '2019-03-04', NULL),
(16, 7, 17, 37, '2019-03-05', NULL),
(17, 7, 17, 37, '2019-03-06', NULL),
(18, 7, 17, 37, '2019-03-07', NULL),
(19, 7, 17, 37, '2019-03-08', NULL),
(20, 7, 17, 37, '2019-03-09', NULL),
(21, 8, 15, 34, '2019-03-03', NULL),
(22, 8, 15, 34, '2019-03-04', NULL),
(23, 8, 15, 34, '2019-03-05', NULL),
(24, 8, 15, 34, '2019-03-06', NULL),
(25, 8, 15, 34, '2019-03-07', NULL),
(26, 8, 15, 34, '2019-03-08', NULL),
(27, 8, 15, 34, '2019-03-09', NULL),
(28, 8, 15, 34, '2019-03-10', NULL),
(29, 8, 15, 34, '2019-03-11', NULL),
(30, 8, 15, 34, '2019-03-12', NULL),
(31, 20, 18, 31, '2019-03-02', NULL),
(32, 20, 18, 31, '2019-03-03', NULL),
(33, 20, 18, 31, '2019-03-04', NULL),
(34, 20, 18, 31, '2019-03-05', NULL),
(35, 20, 18, 31, '2019-03-06', NULL),
(36, 20, 18, 31, '2019-03-07', NULL),
(37, 20, 18, 31, '2019-03-08', NULL),
(38, 20, 18, 31, '2019-03-09', NULL),
(39, 20, 18, 31, '2019-03-10', NULL),
(40, 20, 18, 31, '2019-03-11', NULL),
(41, 20, 18, 31, '2019-03-12', NULL),
(42, 20, 18, 31, '2019-03-13', NULL),
(43, 1.5, 15, 49, '2019-03-02', NULL),
(44, 1.5, 15, 49, '2019-03-03', NULL),
(45, 1.5, 15, 49, '2019-03-04', NULL),
(46, 1.5, 15, 49, '2019-03-05', NULL),
(47, 13, 14, 38, '2019-03-02', NULL),
(48, 13, 14, 38, '2019-03-03', NULL),
(49, 13, 14, 38, '2019-03-04', NULL),
(50, 13, 14, 38, '2019-03-05', NULL),
(51, 3.5, 19, 42, '2019-03-05', NULL),
(52, 3.5, 19, 42, '2019-03-06', NULL),
(53, 3.5, 19, 42, '2019-03-07', NULL),
(54, 3.5, 19, 42, '2019-03-08', NULL),
(55, 3.5, 19, 42, '2019-03-09', NULL),
(56, 3.5, 19, 42, '2019-03-10', NULL),
(57, 3.5, 19, 42, '2019-03-11', NULL),
(58, 3.5, 19, 42, '2019-03-12', NULL),
(59, 3.5, 19, 42, '2019-03-13', NULL),
(60, 3.5, 19, 42, '2019-03-14', NULL),
(61, 3.5, 19, 42, '2019-03-15', NULL),
(62, 3.5, 19, 42, '2019-03-16', NULL),
(63, 3.5, 19, 42, '2019-03-17', NULL),
(64, 3.5, 19, 42, '2019-03-18', NULL),
(65, 3.5, 19, 42, '2019-03-19', NULL),
(66, 3.5, 19, 42, '2019-03-20', NULL),
(67, 3.5, 19, 42, '2019-03-21', NULL),
(68, 3.5, 19, 42, '2019-03-22', NULL),
(69, 3.5, 19, 42, '2019-03-23', NULL),
(70, 3.5, 19, 42, '2019-03-24', NULL),
(71, 3.5, 19, 42, '2019-03-25', NULL),
(72, 3.5, 19, 42, '2019-03-26', NULL),
(73, 3.5, 19, 42, '2019-03-27', NULL),
(74, 3.5, 19, 42, '2019-03-28', NULL),
(75, 25.78, 26, 40, '2019-03-05', NULL),
(76, 25.78, 26, 40, '2019-03-06', NULL),
(77, 25.78, 26, 40, '2019-03-07', NULL),
(78, 25.78, 26, 40, '2019-03-08', NULL),
(79, 25.78, 26, 40, '2019-03-09', NULL),
(80, 25.78, 26, 40, '2019-03-10', NULL),
(81, 25.78, 26, 40, '2019-03-11', NULL),
(82, 25.78, 26, 40, '2019-03-12', NULL),
(83, 25.78, 26, 40, '2019-03-13', NULL),
(84, 25.78, 26, 40, '2019-03-14', NULL),
(85, 25.78, 26, 40, '2019-03-15', NULL),
(86, 25.78, 26, 40, '2019-03-16', NULL),
(87, 25.78, 26, 40, '2019-03-17', NULL),
(88, 25.78, 26, 40, '2019-03-18', NULL),
(89, 25.78, 26, 40, '2019-03-19', NULL),
(90, 25.78, 26, 40, '2019-03-20', NULL),
(91, 25.78, 26, 40, '2019-03-21', NULL),
(92, 25.78, 26, 40, '2019-03-22', NULL),
(93, 25.78, 26, 40, '2019-03-23', NULL),
(94, 25.78, 26, 40, '2019-03-24', NULL),
(95, 25.78, 26, 40, '2019-03-25', NULL),
(96, 25.78, 26, 40, '2019-03-26', NULL),
(97, 25.78, 26, 40, '2019-03-27', NULL),
(98, 25.78, 26, 40, '2019-03-28', NULL),
(99, 25.78, 26, 40, '2019-03-29', NULL),
(100, 25.78, 26, 40, '2019-03-30', NULL),
(101, 25.78, 26, 40, '2019-03-31', NULL),
(102, 25.78, 26, 40, '2019-04-01', NULL),
(103, 25.78, 26, 40, '2019-04-02', NULL),
(104, 25.78, 26, 40, '2019-04-03', NULL),
(105, 23.99, 27, 44, '2019-03-05', NULL),
(106, 23.99, 27, 44, '2019-03-06', NULL),
(107, 23.99, 27, 44, '2019-03-07', NULL),
(108, 2.1, 29, 39, '2019-03-02', NULL),
(109, 2.1, 29, 39, '2019-03-03', NULL),
(110, 2.1, 29, 39, '2019-03-04', NULL),
(111, 2.1, 29, 39, '2019-03-05', NULL),
(112, 2.1, 29, 39, '2019-03-06', NULL),
(113, 2.1, 29, 39, '2019-03-07', NULL),
(114, 2.1, 29, 39, '2019-03-08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `withdrawn` tinyint(1) NOT NULL DEFAULT '0',
  `barcode` varchar(15) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL,
  `volume` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category`, `withdrawn`, `barcode`, `brand`, `volume`) VALUES
(31, 'βότκα1', 'βαρύ ποτό', 'vodka', 0, '1234567', 'βότκα μάρκα', 600),
(32, 'βότκα2', 'βαρύ', 'vodka', 0, '232553525', 'βότκα μάρκα', 500),
(33, 'τεκίλα1', 'ωραίο', 'tequila', 0, '65464754', 'τεκίλα μάρκα', 444),
(34, 'κρασί1', 'πολύ ωραίο', 'wine', 0, '348753648', 'κρασί μάρκα', 250),
(35, 'κρασί2', 'καλό', 'wine', 0, '765883453', 'κρασί μάρκα', 400),
(36, 'κρασί3', 'τέλειο', 'wine', 0, '534856348', 'κρασί μάρκα', 800),
(37, 'τσίπουρο1', 'τέλειο', 'tsipouro', 0, '345346346', 'τσίπουρο μάρκα', 300),
(38, 'ούζο1', 'τέλειο', 'ouzo', 0, '65858568', 'ούζο μάρκα', 800),
(39, 'πορτοκαλάδα1', 'υγιεινό', 'nonalchool', 1, '678467457', 'πορτοκαλάδα μάρκα', 500),
(40, 'ρούμι1', 'τέλειο', 'rum', 0, '6576457345', 'ρούμι μάρκα', 100),
(41, 'μπύρα1', 'καλή', 'beer', 0, '656465774', 'μπύρα μάρκα', 800),
(42, 'μπύρα2', 'τέλεια', 'beer', 0, '54754774', 'μπύρα μάρκα', 330),
(43, 'ουίσκι1', 'καλό', 'whiskey', 0, '07394563', 'ουίσκι μάρκα', 400),
(44, 'κονιάκ1', 'κατάλληλο για κηδείες', 'koniak', 0, '948569695', 'κονιάκ μάρκα', 700),
(45, 'τζιν1', 'καλό', 'gin', 0, '4363465', 'τζιν μάρκα', 400),
(46, 'λικέρ1', 'καταπληκτικό', 'liquer', 0, '34634757', 'λικέρ μάρκα', 400),
(47, 'σαμπάνια1', 'κατάλληλη για Πρωτοχρονιά', 'all', 0, '963470346', 'σαμπάνια μάρκα', 700),
(48, 'σόδα1', 'για χώνεψη', 'beverages', 0, '675754754', 'σόδα μάρκα', 400),
(49, 'πατατάκια1', 'γευστικά', 'snacks', 0, '567547457', 'πατατάκια μάρκα', NULL),
(50, 'κρασί4', 'τέλειο', 'wine', 0, '45734806', 'κρασί μάρκα', 200);

-- --------------------------------------------------------

--
-- Table structure for table `product_tags`
--

CREATE TABLE `product_tags` (
  `productId` int(11) NOT NULL,
  `tag` varchar(200) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_tags`
--

INSERT INTO `product_tags` (`productId`, `tag`) VALUES
(33, 'τεκίλα'),
(33, '50%'),
(35, 'λευκό'),
(35, 'κρασί'),
(36, 'ημίγλυκο'),
(36, 'ροζέ'),
(36, 'κρασί'),
(37, '70%'),
(37, 'παραδοσιακό'),
(34, 'ξηρό'),
(34, 'κόκκινο'),
(34, 'κρασί'),
(32, '60%'),
(32, 'βότκα'),
(31, '50%'),
(31, 'βότκα'),
(38, 'παραδοσιακό'),
(38, '80%'),
(40, '60%'),
(40, 'ρούμι'),
(41, '5%'),
(41, 'ξανθιά'),
(42, '6%'),
(42, 'μαύρη'),
(43, '70%'),
(45, '30%'),
(44, '40%'),
(44, 'παραδοσιακό'),
(46, '25%'),
(47, '40%'),
(39, 'χωρίς ζάχαρη'),
(39, 'χυμός'),
(39, 'πορτοκαλάδα'),
(48, 'χωρίς αλκοόλ'),
(49, 'ρίγανη'),
(50, 'λευκό'),
(50, '12%'),
(50, 'φρουτώδες');

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `lng` double NOT NULL,
  `lat` double NOT NULL,
  `withdrawn` tinyint(1) NOT NULL DEFAULT '0',
  `telephone` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `name`, `address`, `lng`, `lat`, `withdrawn`, `telephone`) VALUES
(14, 'κατάστημα1', 'Ippokratous 30, Athina 106 80, Greece', 23.7361241, 37.9829864, 0, ''),
(15, 'κατάστημα2', 'Mersinis 5, Nea Smirni 171 24, Greece', 23.721574399999998, 37.9404288, 0, '6981145354'),
(16, 'κατάστημα3', 'Leof. Andrea Siggrou 50, Athina 117 42, Greece', 23.7283498, 37.9660135, 0, '2106347435'),
(17, 'κατάστημα4', 'Andrea Papandreou 2, Chania 731 34, Greece', 24.0217156, 35.5140047, 0, '2564575112'),
(18, 'κατάστημα5', 'Tsimiski 15, Thessaloniki 546 24, Greece', 22.9394465, 40.6349102, 0, ''),
(19, 'κατάστημα6', 'Leof. Kifisias 56, Athina 115 26, Greece', 23.7651147, 37.9899361, 0, ''),
(20, 'κατάστημα7', 'Leof. Alimou 7, Alimos 174 55, Greece', 23.7194655, 37.9066426, 0, '6987121521'),
(21, 'κατάστημα8', 'Asklipiou 8, Patra 262 21, Greece', 21.7336509, 38.2467605, 0, ''),
(22, 'κατάστημα9', 'Sidiras Merarchias 8, Nafplio 211 00, Greece', 22.803101, 37.5661106, 0, ''),
(23, 'κατάστημα10', 'Leof. Dodonis 6-8, Ioannina 453 32, Greece', 20.8513108, 39.6614014, 0, '2365478912'),
(24, 'κατάστημα11', 'Koumpari 1, Athina 106 74, Greece', 23.740446, 37.975952, 1, '6984511255'),
(25, 'κατάστημα12', 'Parthenonos 4, Nea Erithrea 146 71, Greece', 23.8107432, 38.0949286, 0, ''),
(26, 'κατάστημα13', 'Skra 2, Pireas 185 33, Greece', 23.6588868, 37.9424328, 0, '6984455544'),
(27, 'κατάστημα14', 'Papagou 90, Zografou 157 72, Greece', 23.7715342, 37.9773456, 0, ''),
(28, 'κατάστημα15', 'Ir. Politechniou 4, Zografou 157 73, Greece', 23.7726032, 37.9784651, 0, ''),
(29, 'κατάστημα16', 'Chlois 8, Zografou 157 72, Greece', 23.7760878, 37.9726228, 0, ''),
(30, 'κατάστημα17', 'Papadiamantopoulou 56, Athina 157 71, Greece', 23.7589885, 37.9801138, 0, '2102554788'),
(31, 'κατάστημα18', 'Kokkinopoulou 45, Zografou 157 73, Greece', 23.7693588, 37.9811381, 0, '6987411224'),
(32, 'κατάστημα19', 'Katechaki 78, Athina 115 25, Greece', 23.7696483, 37.9976077, 0, ''),
(33, 'κατάστημα20', 'Kiprou 45, Ilioupoli 163 46, Greece', 23.7439741, 37.9422168, 0, '2105896445');

-- --------------------------------------------------------

--
-- Table structure for table `shop_tags`
--

CREATE TABLE `shop_tags` (
  `shopId` int(11) NOT NULL,
  `tag` varchar(200) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shop_tags`
--

INSERT INTO `shop_tags` (`shopId`, `tag`) VALUES
(14, 'κάβα'),
(14, 'ποτά'),
(14, 'αλκοόλ'),
(15, 'περίπτερο'),
(16, 'κάβα'),
(17, 'κάβα'),
(18, 'περίπτερο'),
(19, 'ψιλικά'),
(20, 'κάβα'),
(20, 'ποτά'),
(20, 'αλκοόλ'),
(21, 'supermarket'),
(22, 'κάβα'),
(23, 'παραδοσιακό'),
(25, 'ψιλικά'),
(25, 'περίπτερο'),
(24, 'κάβα'),
(24, 'παραδοσιακό'),
(26, 'κάβα'),
(26, 'παραδοσιακό'),
(27, 'ψιλικά'),
(27, 'περίπτερο'),
(27, 'mini market'),
(28, 'κάβα'),
(28, 'ποτά'),
(29, 'κάβα'),
(30, 'περίπτερο'),
(31, 'κάβα'),
(31, 'αλκοόλ'),
(32, 'ψιλικά'),
(33, 'κάβα'),
(33, 'ποτά');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone` varchar(14) DEFAULT NULL,
  `passwordHash` varchar(300) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `birthdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstName`, `lastName`, `email`, `telephone`, `passwordHash`, `admin`, `birthdate`) VALUES
(6, 'admin', 'admin', 'admin', 'admin@admin.com', '1234567891', 'f6fdffe48c908deb0f4c3bd36c032e72', 1, '2019-03-03 00:00:00'),
(7, 'nerd', 'Cult', 'Tech', 'nerd@gmail.com', '6988888888', '25d55ad283aa400af464c76d713c07ad', 0, '2000-01-10 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `price_shop_id_fk` (`shopId`),
  ADD KEY `price_product_id_fk` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `barcode` (`barcode`);

--
-- Indexes for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_tags`
--
ALTER TABLE `shop_tags`
  ADD KEY `shopId` (`shopId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `price_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `price_shop_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shops` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shop_tags`
--
ALTER TABLE `shop_tags`
  ADD CONSTRAINT `shopId` FOREIGN KEY (`shopId`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
