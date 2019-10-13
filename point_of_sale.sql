-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Okt 2019 pada 10.50
-- Versi server: 10.1.35-MariaDB
-- Versi PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `point_of_sale`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'seefood'),
(3, 'drink'),
(4, 'fast food'),
(5, 'food'),
(8, 'mie'),
(9, 'milk');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `idRecent` varchar(100) NOT NULL,
  `buyer` varchar(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orders` text NOT NULL,
  `amount` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`idRecent`, `buyer`, `date`, `orders`, `amount`) VALUES
('007d1a81-5b0d-4170-858c-c81a60e5c3ef', 'badrun', '2019-10-10 18:12:49', 'Soto,Nasi', 38500),
('0132a18f-6ad9-4ae9-a297-133a259bdff6', 'badrun', '2019-10-10 08:53:55', 'Nasi,Rendang Original', 77000),
('14a4e33e-6db8-4fec-b7ed-20c67d3a031a', 'badrun', '2019-10-10 18:12:43', 'Soto,Nasi', 38500),
('15e63fa8-f7a3-4ee9-a78e-94a320a87e64', 'badrun', '2019-10-12 07:47:27', 'Rendang Original,Soto', 71500),
('1ca62ae7-605a-47f5-bacf-ad98661bbc59', 'badrun', '2019-10-12 08:09:05', 'Rendang Original,Nasi', 77000),
('27f4c963-d357-4434-9ba5-4156c31c2307', 'badrun', '2019-10-10 08:33:19', 'Nasi,Soto', 38500),
('2b938b74-5260-47f9-8011-04f2ecd8f902', 'baru', '2019-10-11 20:57:49', 'Rendang Original,Nasi', 77000),
('3d9ea047-8b31-4736-ac28-9a3ab6f82dba', 'badrun', '2019-10-10 16:17:10', 'Nasi,Soto', 38500),
('3f2e06d1-947b-404a-a0cd-012d54d55a86', 'badrun', '2019-10-10 14:20:54', 'Rendang Original,Soto', 71500),
('595a5e1f-cfe6-4840-8131-a0f0bc194a7c', 'badrun', '2019-10-10 08:53:16', 'Nasi,Rendang Original', 77000),
('59eb5912-7712-4f34-b104-1db61b6a79e6', 'badrun', '2019-07-10 00:00:00', 'Rendang Original,Soto', 291500),
('6453a028-aa5e-425d-bbfc-d94a4c070f5c', 'baru', '2019-10-11 16:12:30', 'Rendang Original,Nasi', 77000),
('a5a74e5a-876b-4738-8814-d9d464decbee', 'baru', '2019-10-11 09:05:10', 'Soto,Nasi', 38500),
('bc301e05-14ad-4956-b921-df358764fda5', 'badrun', '2019-10-08 16:30:57', 'Rendang Original,Nasi,Soto,Tumpeng', 128500),
('c14ce8d6-5d2c-453b-af11-1c0634d95941', 'badrun', '2019-10-01 08:34:31', 'Rendang Original,Soto', 71500),
('d550f6ae-e0fe-4132-9cad-4d148cd3dd66', 'baru', '2019-10-11 21:03:20', 'Rendang Original,Tumpeng', 1100000),
('da7a33d1-b25b-47c7-b08a-a9ce2c63f941', 'badrun', '2019-10-09 17:02:56', 'Rendang Original,Soto', 190000),
('daebbf29-a0d5-40e7-94cb-a26f799e1c8d', 'badrun', '2019-10-10 08:38:28', 'Rendang Original,Soto', 291500),
('deb25fec-d4d4-4aef-9965-7e4d32a61dc2', 'badrun', '2019-09-22 16:50:34', 'Soto,Nasi', 170000),
('dec97635-073c-479a-8b17-a004c067a0b2', 'badrun', '2019-10-12 10:14:01', 'Rendang Original,Nasi,Soto', 93500),
('e02f49ff-627e-4b32-aaf8-99b9c18255b2', 'badrun', '2018-10-10 08:53:48', 'Nasi,Rendang Original', 70000),
('ea4a6e70-1043-4aa3-a5a8-428eaece8c45', 'baru', '2019-10-11 16:24:01', 'Rendang Original,Nasi,Soto,Tumpeng', 544500);

-- --------------------------------------------------------

--
-- Struktur dari tabel `id_level`
--

CREATE TABLE `id_level` (
  `id` int(11) NOT NULL,
  `level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` varchar(100) NOT NULL,
  `name` varchar(155) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(155) NOT NULL,
  `id_category` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `id_category`, `price`, `quantity`, `added`, `updated`) VALUES
('5a948d15-4739-4b26-8ec8-a51015a34f4a', 'Rendang Original', 'Original rendang sapi', '7f4f91a0-9701-4194-8f36-6bfd9c7343d8.jpeg', 5, 50000, 3, '2019-10-07 15:40:27', '0000-00-00'),
('a2bdc82b-b80e-418d-b620-e88d0645baee', 'Nasi', 'nasi goreng ', '94df1b9e-c8f4-499a-840a-4091db03e958.jpeg', 5, 20000, 111, '2019-10-05 04:00:35', '2019-10-05'),
('be94153a-fd74-4957-b2db-7d8eeee92f1e', 'Soto', 'Soto ayam bumbu kuning', '145d837a-fddb-40d1-acfb-96f5b74bb715.jpeg', 5, 15000, 23, '2019-09-27 08:53:06', '2019-10-06'),
('e600b9ef-3bc5-4297-99d8-5933b9c17908', 'Tumpeng', 'Nasi Tumpeng', '234f0190-8673-4edd-8b39-5b11f08d23e8.jpeg', 5, 50000, 104, '2019-10-08 15:22:16', '0000-00-00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `id_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `id_level`) VALUES
('1d45d897-5b93-4f40-a0c4-646a0e4727f2', 'a', 'iwan@gmail.com', '$2a$10$IQlLZtbsqkFg6lfs9bqz0O2fJOrDKFmhYTlw37o8EJXAZn43SMzP6', 0),
('4b980f40-ba4e-48db-ac5d-60c1bba55361', 'asbahsb', '088216252557', '$2a$10$j5QpPQEOycnpo3Yd.gWpy.jbLc6967F18EDmCyjGzY3f/CV.Gs/NG', 1),
('9abf73b6-1da0-4c8e-bb75-34f893df4887', 'Admin nurul', 'pandu@gmail.com', '123', 2),
('e0b764c1-5342-429c-a1d2-7feed5eb9fec', 'badrun', 'badrun@gmail.com', '$2a$10$gWiiNjcsE1bNB81DmUYWUOeZ7mkWbnHdhaq0BGhQYAcVRb7o5dBry', 1),
('e9bd8f06-2d70-44c5-9d40-0c7797b7e5dd', 'baru', 'baru@gmail.com', '$2a$10$FUa0QSXD4HI58URC0jFE..9AEmWQWebRaeriL1x76N3..i.csoP0C', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`idRecent`);

--
-- Indeks untuk tabel `id_level`
--
ALTER TABLE `id_level`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `id_level`
--
ALTER TABLE `id_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
