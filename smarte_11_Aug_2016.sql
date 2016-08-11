-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2016 at 02:46 PM
-- Server version: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smarte`
--

-- --------------------------------------------------------

--
-- Table structure for table `guest_info`
--

CREATE TABLE `guest_info` (
  `guest_id` varchar(16) NOT NULL,
  `guest_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guest_map`
--

CREATE TABLE `guest_map` (
  `guest_id` varchar(16) NOT NULL,
  `zone_id` int(11) NOT NULL,
  `checked_in` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `security_stuff`
--

CREATE TABLE `security_stuff` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `sname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `security_stuff`
--

INSERT INTO `security_stuff` (`id`, `fname`, `sname`) VALUES
(1, 'Colin', 'Hanily'),
(2, 'John', 'Flaherty');

-- --------------------------------------------------------

--
-- Table structure for table `zone_data`
--

CREATE TABLE `zone_data` (
  `zone_code` int(11) NOT NULL,
  `security_id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `guest_id` varchar(16) NOT NULL,
  `noise_level` double NOT NULL,
  `light_level` double NOT NULL,
  `temp` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zone_data`
--

INSERT INTO `zone_data` (`zone_code`, `security_id`, `datetime`, `guest_id`, `noise_level`, `light_level`, `temp`) VALUES
(112, 1, '2016-07-05 15:33:49', '32', 3, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `zone_info`
--

CREATE TABLE `zone_info` (
  `zone_code` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guest_info`
--
ALTER TABLE `guest_info`
  ADD PRIMARY KEY (`guest_id`);

--
-- Indexes for table `guest_map`
--
ALTER TABLE `guest_map`
  ADD PRIMARY KEY (`guest_id`),
  ADD UNIQUE KEY `zone_id` (`zone_id`);

--
-- Indexes for table `security_stuff`
--
ALTER TABLE `security_stuff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zone_data`
--
ALTER TABLE `zone_data`
  ADD PRIMARY KEY (`zone_code`,`datetime`);

--
-- Indexes for table `zone_info`
--
ALTER TABLE `zone_info`
  ADD PRIMARY KEY (`zone_code`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
