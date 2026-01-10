-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 10. 14:26
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `bbsbackend`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `admins`
--

INSERT INTO `admins` (`id`, `user`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin@mail.com', '$2y$12$W9dLc1OVYQVBkVHBO81S/ObF.V5.w.SmcDxTHYlck8UmHKySCsS7O', '2026-01-09 12:31:03', '2026-01-09 21:59:42');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `loyal` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `customers`
--

INSERT INTO `customers` (`id`, `created_at`, `updated_at`, `user`, `password`, `name`, `phone`, `loyal`) VALUES
(1, '2024-01-11 23:00:00', '2026-01-09 21:57:57', 'kiss.anna@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kiss Anna', 2147483647, 1),
(2, '2024-02-02 23:00:00', '2026-01-09 21:57:57', 'szabo.balazs@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Szabó Balázs', 2147483647, 0),
(3, '2024-02-17 23:00:00', '2026-01-09 21:57:57', 'toth.julia@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Tóth Júlia', 2147483647, 1),
(4, '2024-02-29 23:00:00', '2026-01-09 21:57:57', 'nagy.zsolt@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Nagy Zsolt', 2147483647, 0),
(5, '2024-03-14 23:00:00', '2026-01-09 21:57:57', 'kovacs.petra@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kovács Petra', 2147483647, 1),
(6, '2024-03-21 23:00:00', '2026-01-09 21:57:57', 'horvath.lili@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Horváth Lili', 2147483647, 1),
(7, '2024-04-04 22:00:00', '2026-01-09 21:57:57', 'farkas.gergo@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Farkas Gergő', 2147483647, 0),
(8, '2024-04-11 22:00:00', '2026-01-09 21:57:57', 'molnar.eva@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Molnár Éva', 2147483647, 1),
(9, '2024-04-19 22:00:00', '2026-01-09 21:57:57', 'balogh.tamas@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Balogh Tamás', 2147483647, 0),
(10, '2024-04-27 22:00:00', '2026-01-09 21:57:57', 'varga.dorina@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Varga Dorina', 2147483647, 1),
(11, '2024-05-01 22:00:00', '2026-01-09 21:57:57', 'kiss.mariann@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kiss Mariann', 2147483647, 1),
(12, '2024-05-05 22:00:00', '2026-01-09 21:57:57', 'szilagyi.zita@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Szilágyi Zita', 2147483647, 0),
(13, '2024-05-09 22:00:00', '2026-01-09 21:57:57', 'varga.tamas@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Varga Tamás', 2147483647, 0),
(14, '2024-05-13 22:00:00', '2026-01-09 21:57:57', 'kovacs.zsofi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kovács Zsófi', 2147483647, 1),
(15, '2024-05-17 22:00:00', '2026-01-09 21:57:57', 'toth.andrea@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Tóth Andrea', 2147483647, 1),
(16, '2024-05-21 22:00:00', '2026-01-09 21:57:57', 'horvath.noemi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Horváth Noémi', 2147483647, 0),
(17, '2024-05-25 22:00:00', '2026-01-09 21:57:57', 'farkas.bea@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Farkas Bea', 2147483647, 1),
(18, '2024-05-29 22:00:00', '2026-01-09 21:57:57', 'molnar.vivi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Molnár Vivi', 2147483647, 1),
(19, '2024-06-02 22:00:00', '2026-01-09 21:57:57', 'balogh.anna@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Balogh Anna', 2147483647, 0),
(20, '2024-06-06 22:00:00', '2026-01-09 21:57:57', 'varga.szandra@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Varga Szandra', 2147483647, 1),
(21, '2024-06-10 22:00:00', '2026-01-09 21:57:57', 'kiss.eszter@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kiss Eszter', 2147483647, 1),
(22, '2024-06-14 22:00:00', '2026-01-09 21:57:57', 'szabo.klaudia@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Szabó Klaudia', 2147483647, 0),
(23, '2024-06-18 22:00:00', '2026-01-09 21:57:57', 'toth.bea@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Tóth Bea', 2147483647, 1),
(24, '2024-06-22 22:00:00', '2026-01-09 21:57:57', 'nagy.david@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Nagy Dávid', 2147483647, 0),
(25, '2024-06-26 22:00:00', '2026-01-09 21:57:57', 'kovacs.luca@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kovács Luca', 2147483647, 1),
(26, '2024-06-30 22:00:00', '2026-01-09 21:57:57', 'horvath.gergo@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Horváth Gergő', 2147483647, 0),
(27, '2024-07-04 22:00:00', '2026-01-09 21:57:57', 'farkas.noemi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Farkas Noémi', 2147483647, 1),
(28, '2024-07-08 22:00:00', '2026-01-09 21:57:57', 'molnar.peter@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Molnár Péter', 2147483647, 0),
(29, '2024-07-12 22:00:00', '2026-01-09 21:57:57', 'balogh.edina@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Balogh Edina', 2147483647, 1),
(30, '2024-07-16 22:00:00', '2026-01-09 21:57:57', 'varga.lili@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Varga Lili', 2147483647, 1),
(31, '2024-07-20 22:00:00', '2026-01-09 21:57:57', 'kiss.viktoria@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kiss Viktória', 2147483647, 0),
(32, '2024-07-24 22:00:00', '2026-01-09 21:57:57', 'szabo.dora@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Szabó Dóra', 2147483647, 1),
(33, '2024-07-28 22:00:00', '2026-01-09 21:57:57', 'toth.gergely@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Tóth Gergely', 2147483647, 0),
(34, '2024-08-01 22:00:00', '2026-01-09 21:57:57', 'nagy.klaudia@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Nagy Klaudia', 2147483647, 1),
(35, '2024-08-05 22:00:00', '2026-01-09 21:57:57', 'kovacs.edina@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kovács Edina', 2147483647, 1),
(36, '2024-08-09 22:00:00', '2026-01-09 21:57:57', 'horvath.peter@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Horváth Péter', 2147483647, 0),
(37, '2024-08-13 22:00:00', '2026-01-09 21:57:57', 'farkas.andrea@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Farkas Andrea', 2147483647, 1),
(38, '2024-08-17 22:00:00', '2026-01-09 21:57:57', 'molnar.lili@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Molnár Lili', 2147483647, 1),
(39, '2024-08-21 22:00:00', '2026-01-09 21:57:57', 'balogh.timea@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Balogh Tímea', 2147483647, 0),
(40, '2024-08-25 22:00:00', '2026-01-09 21:57:57', 'varga.petra@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Varga Petra', 2147483647, 1),
(41, '2024-08-29 22:00:00', '2026-01-09 21:57:57', 'kiss.noemi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kiss Noémi', 2147483647, 1),
(42, '2024-09-02 22:00:00', '2026-01-09 21:57:57', 'szabo.vivien@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Szabó Vivien', 2147483647, 0),
(43, '2024-09-06 22:00:00', '2026-01-09 21:57:57', 'toth.lilla@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Tóth Lilla', 2147483647, 1),
(44, '2024-09-10 22:00:00', '2026-01-09 21:57:57', 'nagy.zita@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Nagy Zita', 2147483647, 0),
(45, '2024-09-14 22:00:00', '2026-01-09 21:57:57', 'kovacs.tamas@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Kovács Tamás', 2147483647, 1),
(46, '2024-09-18 22:00:00', '2026-01-09 21:57:57', 'horvath.anna@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Horváth Anna', 2147483647, 1),
(47, '2024-09-22 22:00:00', '2026-01-09 21:57:57', 'farkas.vivien@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Farkas Vivien', 2147483647, 0),
(48, '2024-09-26 22:00:00', '2026-01-09 21:57:57', 'molnar.noemi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Molnár Noémi', 2147483647, 1),
(49, '2024-08-21 22:00:00', '2026-01-09 21:57:57', 'balogh.timi@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Balogh Tímea', 2147483647, 0),
(50, '2024-08-25 22:00:00', '2026-01-09 21:57:57', 'varga.petra@example.com', '$2y$12$LHh9g4iwFcs3ILQms0bUXOn69wLpHUJAUDVt91IhtnWXd7pEDiuiG', 'Varga Petra', 2147483647, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_07_093243_create_personal_access_tokens_table', 1),
(5, '2025_11_11_101859_create_customers_table', 1),
(6, '2025_11_11_101934_create_treatments_table', 1),
(7, '2025_11_11_101942_create_services_table', 1),
(8, '2025_11_11_102147_create_service_treatment_links_table', 1),
(9, '2026_01_08_111635_create_admins_table', 1),
(10, '2026_01_09_223140_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\Customer', 1, 'customer-token', 'de2a21b09ceedb25d814f2245e54d6eaea6954568835ca84c7543ebf685a6432', '[\"*\"]', NULL, NULL, '2026-01-10 10:21:36', '2026-01-10 10:21:36'),
(3, 'App\\Models\\Customer', 1, 'customer-token', 'dcb3fa13553eca23b1774946bded8ec2571478be2ef021eaf864e4a77b232c7f', '[\"*\"]', NULL, NULL, '2026-01-10 10:21:38', '2026-01-10 10:21:38'),
(4, 'App\\Models\\Customer', 1, 'customer-token', '63b095ef5492d77c5b6047ceda8ef81f22432a4b072dad2564013d49e16d69f9', '[\"*\"]', NULL, NULL, '2026-01-10 10:21:52', '2026-01-10 10:21:52'),
(5, 'App\\Models\\Customer', 1, 'customer-token', '3270bd4124063d26f68ea3ba3971b351ddd945e33b710842821792cdab1486dc', '[\"*\"]', NULL, NULL, '2026-01-10 10:22:07', '2026-01-10 10:22:07'),
(6, 'App\\Models\\Admin', 1, 'admin-token', 'ae14495af2386d107b0dc1c5602897be18fe32fc5cea7429849f1ffb4da34c4b', '[\"*\"]', NULL, NULL, '2026-01-10 10:23:53', '2026-01-10 10:23:53'),
(8, 'App\\Models\\Customer', 1, 'customer-token', '1038ef31d32ccb56eaadc6db725e6342107984315cf55412b0c3127fb4a0e547', '[\"*\"]', NULL, NULL, '2026-01-10 11:10:46', '2026-01-10 11:10:46'),
(9, 'App\\Models\\Customer', 1, 'customer-token', '1489e88bf4ca47bfb0ec0dcf56b0439896621c52480f669a01e79630df5f7997', '[\"*\"]', NULL, NULL, '2026-01-10 11:21:17', '2026-01-10 11:21:17'),
(10, 'App\\Models\\Customer', 1, 'customer-token', 'fa50bde3d732dcc737e0e99301f219f2f8ce278372b1029883a179cd136a7991', '[\"*\"]', NULL, NULL, '2026-01-10 11:21:47', '2026-01-10 11:21:47'),
(11, 'App\\Models\\Customer', 1, 'customer-token', '6acdaad49cb51f4eb3c472a7e78d20e50cbe50e0a7dff93f38494fb191c86a46', '[\"*\"]', NULL, NULL, '2026-01-10 11:21:54', '2026-01-10 11:21:54'),
(12, 'App\\Models\\Customer', 1, 'customer-token', 'f22f2deba3eabfe17bbf28ba7296141ff1a71937c4f25aaa2df8e8b4735de071', '[\"*\"]', NULL, NULL, '2026-01-10 11:21:55', '2026-01-10 11:21:55'),
(13, 'App\\Models\\Customer', 1, 'customer-token', '352f490938d7cf183b539480f664b4792188c36925c350777a8d235f94083b8f', '[\"*\"]', NULL, NULL, '2026-01-10 11:22:35', '2026-01-10 11:22:35'),
(14, 'App\\Models\\Customer', 1, 'customer-token', '99634bbe72220d229ba9fdf4036cc0f7ad32d6ce34bc604cddddb10718bae7c4', '[\"*\"]', NULL, NULL, '2026-01-10 11:22:44', '2026-01-10 11:22:44'),
(15, 'App\\Models\\Customer', 1, 'customer-token', '5c7ffef120ac0ea8cd10fcf794c8b24f3709858186f858b13d9fa08583e353b8', '[\"*\"]', NULL, NULL, '2026-01-10 11:24:05', '2026-01-10 11:24:05'),
(17, 'App\\Models\\Customer', 1, 'customer-token', 'daf28b077f0a9334acabbcf9e8f5d9b1bdc9bc20d9c4d12da81b7105282aad85', '[\"*\"]', NULL, NULL, '2026-01-10 11:28:43', '2026-01-10 11:28:43'),
(18, 'App\\Models\\Admin', 1, 'admin-token', '5b3b9ac91a92c6817486797523aa9f7c5a54f1745be6f0d62987dd9a3396f113', '[\"*\"]', NULL, NULL, '2026-01-10 11:29:11', '2026-01-10 11:29:11'),
(21, 'App\\Models\\Customer', 1, 'customer-token', '204a80fc784fd21f24aaab083ceca59c100b3d3f5b0d7e8541727a56183a2369', '[\"*\"]', NULL, NULL, '2026-01-10 12:06:48', '2026-01-10 12:06:48');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `services`
--

INSERT INTO `services` (`id`, `name`, `price`) VALUES
(1, 'Francia manikűr', 6100),
(2, 'Gépi/Orosz manikűr', 5100),
(3, 'Géllakkozás', 3500),
(4, 'Japán manikűr', 8500),
(5, 'Géllakk + Gépi manikűr', 8500),
(6, 'Géllakk körömerősítéssel + Gépi manikűr', 9700),
(7, 'Színtelen géllakk + Gépi manikűr', 8300),
(8, 'Géllakk', 6000),
(9, 'Lakkozás', 4200),
(10, 'Minta', 500),
(11, 'Ombre/Francia/Sellőpor', 170),
(12, 'Díszítőkő', 35),
(13, 'Műköröm építés – S', 9500),
(14, 'Műköröm építés – M', 11000),
(15, 'Műköröm építés – L', 14000),
(16, 'Műköröm építés – Extrém', 17000),
(17, 'Pótlás', 2700),
(18, 'Töltés – S', 8800),
(19, 'Töltés – M', 9800),
(20, 'Töltés – L', 12000),
(21, 'Töltés – Extrém', 12000),
(22, 'Csiszolás / Új forma / Leszedés', 5500),
(23, 'Paraffinos kézápolás', 6200),
(24, 'Spa kézmasszázs', 2700),
(25, 'Kombinált pedikűr', 12700),
(26, 'Gyógypedikűr', 18000),
(27, 'Mini/Esztétikai pedikűr', 7800),
(28, 'Tyúkszem eltávolítás', 3500),
(29, 'Benőtt köröm kezelés', 8500),
(30, 'Lápiszolás', 4100),
(31, 'Szemölcs kezelés', 6700),
(32, 'Unibrace körömszabályozás', 10000),
(33, 'Sarok kezelés', 5200),
(34, 'Sarok kezelés – 3 alkalom', 12200),
(35, 'Paraffinos lábápolás', 8700),
(36, 'Talpmasszázs', 8200),
(37, 'Géllakkozás láb', 6500),
(38, 'Lakkozás láb', 5800),
(39, 'Lakk leoldás', 2500),
(40, 'Díszítőkő – láb', 100),
(41, 'Glitter/Chrome/Sellő – láb', 170),
(42, 'Nyomda/Matrica/Festés – láb', 200),
(43, 'Körömpótlás – láb', 5000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `service_treatment_links`
--

CREATE TABLE `service_treatment_links` (
  `treatment_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `piece` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `service_treatment_links`
--

INSERT INTO `service_treatment_links` (`treatment_id`, `service_id`, `piece`) VALUES
(1, 5, 1),
(21, 5, 1),
(41, 5, 1),
(61, 5, 1),
(81, 5, 1),
(101, 5, 1),
(121, 5, 1),
(141, 5, 1),
(161, 5, 1),
(181, 5, 1),
(2, 5, 1),
(2, 9, 2),
(22, 5, 1),
(22, 9, 2),
(42, 5, 1),
(42, 9, 2),
(62, 5, 1),
(62, 9, 2),
(82, 5, 1),
(82, 9, 2),
(102, 5, 1),
(102, 9, 2),
(122, 5, 1),
(122, 9, 2),
(142, 5, 1),
(142, 9, 2),
(162, 5, 1),
(162, 9, 2),
(182, 5, 1),
(182, 9, 2),
(3, 5, 1),
(3, 9, 4),
(3, 8, 6),
(23, 5, 1),
(23, 9, 4),
(23, 8, 6),
(43, 5, 1),
(43, 9, 4),
(43, 8, 6),
(63, 5, 1),
(63, 9, 4),
(63, 8, 6),
(83, 5, 1),
(83, 9, 4),
(83, 8, 6),
(103, 5, 1),
(103, 9, 4),
(103, 8, 6),
(123, 5, 1),
(123, 9, 4),
(123, 8, 6),
(143, 5, 1),
(143, 9, 4),
(143, 8, 6),
(163, 5, 1),
(163, 9, 4),
(163, 8, 6),
(183, 5, 1),
(183, 9, 4),
(183, 8, 6),
(4, 1, 1),
(24, 1, 1),
(44, 1, 1),
(64, 1, 1),
(84, 1, 1),
(104, 1, 1),
(124, 1, 1),
(144, 1, 1),
(164, 1, 1),
(184, 1, 1),
(5, 2, 1),
(5, 9, 4),
(25, 2, 1),
(25, 9, 4),
(45, 2, 1),
(45, 9, 4),
(65, 2, 1),
(65, 9, 4),
(85, 2, 1),
(85, 9, 4),
(105, 2, 1),
(105, 9, 4),
(125, 2, 1),
(125, 9, 4),
(145, 2, 1),
(145, 9, 4),
(165, 2, 1),
(165, 9, 4),
(185, 2, 1),
(185, 9, 4),
(6, 3, 1),
(6, 10, 1),
(26, 3, 1),
(26, 10, 1),
(46, 3, 1),
(46, 10, 1),
(66, 3, 1),
(66, 10, 1),
(86, 3, 1),
(86, 10, 1),
(106, 3, 1),
(106, 10, 1),
(126, 3, 1),
(126, 10, 1),
(146, 3, 1),
(146, 10, 1),
(166, 3, 1),
(166, 10, 1),
(186, 3, 1),
(186, 10, 1),
(7, 4, 1),
(7, 9, 6),
(7, 8, 10),
(27, 4, 1),
(27, 9, 6),
(27, 8, 10),
(47, 4, 1),
(47, 9, 6),
(47, 8, 10),
(67, 4, 1),
(67, 9, 6),
(67, 8, 10),
(87, 4, 1),
(87, 9, 6),
(87, 8, 10),
(107, 4, 1),
(107, 9, 6),
(107, 8, 10),
(127, 4, 1),
(127, 9, 6),
(127, 8, 10),
(147, 4, 1),
(147, 9, 6),
(147, 8, 10),
(167, 4, 1),
(167, 9, 6),
(167, 8, 10),
(187, 4, 1),
(187, 9, 6),
(187, 8, 10),
(8, 6, 1),
(8, 7, 1),
(28, 6, 1),
(28, 7, 1),
(48, 6, 1),
(48, 7, 1),
(68, 6, 1),
(68, 7, 1),
(88, 6, 1),
(88, 7, 1),
(108, 6, 1),
(108, 7, 1),
(128, 6, 1),
(128, 7, 1),
(148, 6, 1),
(148, 7, 1),
(168, 6, 1),
(168, 7, 1),
(188, 6, 1),
(188, 7, 1),
(9, 7, 1),
(29, 7, 1),
(49, 7, 1),
(69, 7, 1),
(89, 7, 1),
(109, 7, 1),
(129, 7, 1),
(149, 7, 1),
(169, 7, 1),
(189, 7, 1),
(10, 15, 1),
(10, 13, 1),
(30, 15, 1),
(30, 13, 1),
(50, 15, 1),
(50, 13, 1),
(70, 15, 1),
(70, 13, 1),
(90, 15, 1),
(90, 13, 1),
(110, 15, 1),
(110, 13, 1),
(130, 15, 1),
(130, 13, 1),
(150, 15, 1),
(150, 13, 1),
(170, 15, 1),
(170, 13, 1),
(190, 15, 1),
(190, 13, 1),
(11, 14, 2),
(31, 14, 2),
(51, 14, 2),
(71, 14, 2),
(91, 14, 2),
(111, 14, 2),
(131, 14, 2),
(151, 14, 2),
(171, 14, 2),
(191, 14, 2),
(12, 16, 1),
(12, 14, 1),
(32, 16, 1),
(32, 14, 1),
(52, 16, 1),
(52, 14, 1),
(72, 16, 1),
(72, 14, 1),
(92, 16, 1),
(92, 14, 1),
(112, 16, 1),
(112, 14, 1),
(132, 16, 1),
(132, 14, 1),
(152, 16, 1),
(152, 14, 1),
(172, 16, 1),
(172, 14, 1),
(192, 16, 1),
(192, 14, 1),
(13, 17, 2),
(33, 17, 2),
(53, 17, 2),
(73, 17, 2),
(93, 17, 2),
(113, 17, 2),
(133, 17, 2),
(153, 17, 2),
(173, 17, 2),
(193, 17, 2),
(14, 18, 1),
(34, 18, 1),
(54, 18, 1),
(74, 18, 1),
(94, 18, 1),
(114, 18, 1),
(134, 18, 1),
(154, 18, 1),
(174, 18, 1),
(194, 18, 1),
(15, 19, 2),
(35, 19, 2),
(55, 19, 2),
(75, 19, 2),
(95, 19, 2),
(115, 19, 2),
(135, 19, 2),
(155, 19, 2),
(175, 19, 2),
(195, 19, 2),
(16, 5, 1),
(16, 20, 1),
(36, 5, 1),
(36, 20, 1),
(56, 5, 1),
(56, 20, 1),
(76, 5, 1),
(76, 20, 1),
(96, 5, 1),
(96, 20, 1),
(116, 5, 1),
(116, 20, 1),
(136, 5, 1),
(136, 20, 1),
(156, 5, 1),
(156, 20, 1),
(176, 5, 1),
(176, 20, 1),
(196, 5, 1),
(196, 20, 1),
(17, 5, 1),
(17, 6, 1),
(37, 5, 1),
(37, 6, 1),
(57, 5, 1),
(57, 6, 1),
(77, 5, 1),
(77, 6, 1),
(97, 5, 1),
(97, 6, 1),
(117, 5, 1),
(117, 6, 1),
(137, 5, 1),
(137, 6, 1),
(157, 5, 1),
(157, 6, 1),
(177, 5, 1),
(177, 6, 1),
(197, 5, 1),
(197, 6, 1),
(18, 6, 1),
(18, 19, 2),
(38, 6, 1),
(38, 19, 2),
(58, 6, 1),
(58, 19, 2),
(78, 6, 1),
(78, 19, 2),
(98, 6, 1),
(98, 19, 2),
(118, 6, 1),
(118, 19, 2),
(138, 6, 1),
(138, 19, 2),
(158, 6, 1),
(158, 19, 2),
(178, 6, 1),
(178, 19, 2),
(198, 6, 1),
(198, 19, 2),
(19, 1, 1),
(19, 5, 1),
(39, 1, 1),
(39, 5, 1),
(59, 1, 1),
(59, 5, 1),
(79, 1, 1),
(79, 5, 1),
(99, 1, 1),
(99, 5, 1),
(119, 1, 1),
(119, 5, 1),
(139, 1, 1),
(139, 5, 1),
(159, 1, 1),
(159, 5, 1),
(179, 1, 1),
(179, 5, 1),
(199, 1, 1),
(199, 5, 1),
(20, 5, 1),
(20, 12, 4),
(20, 11, 4),
(40, 5, 1),
(40, 12, 4),
(40, 11, 4),
(60, 5, 1),
(60, 12, 4),
(60, 11, 4),
(80, 5, 1),
(80, 12, 4),
(80, 11, 4),
(100, 5, 1),
(100, 12, 4),
(100, 11, 4),
(120, 5, 1),
(120, 12, 4),
(120, 11, 4),
(140, 5, 1),
(140, 12, 4),
(140, 11, 4),
(160, 5, 1),
(160, 12, 4),
(160, 11, 4),
(180, 5, 1),
(180, 12, 4),
(180, 11, 4),
(200, 5, 1),
(200, 12, 4),
(200, 11, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `treatments`
--

CREATE TABLE `treatments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `realprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `treatments`
--

INSERT INTO `treatments` (`id`, `created_at`, `updated_at`, `customer_id`, `description`, `realprice`) VALUES
(1, '2024-01-04 23:00:00', '2024-01-04 23:00:00', 1, 'Géllakk kéz', 6000),
(2, '2024-01-05 23:00:00', '2024-01-05 23:00:00', 2, 'Géllakk kéz + minta (2 db)', 7000),
(3, '2024-01-06 23:00:00', '2024-01-06 23:00:00', 3, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(4, '2024-01-07 23:00:00', '2024-01-07 23:00:00', 4, 'Műköröm építés S egyszínű', 9500),
(5, '2024-01-08 23:00:00', '2024-01-08 23:00:00', 5, 'Műköröm építés M + minta (4 db)', 13000),
(6, '2024-01-09 23:00:00', '2024-01-09 23:00:00', 6, 'Műköröm építés L + Ombre', 14170),
(7, '2024-01-10 23:00:00', '2024-01-10 23:00:00', 7, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(8, '2024-01-11 23:00:00', '2024-01-11 23:00:00', 8, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(9, '2024-01-12 23:00:00', '2024-01-12 23:00:00', 9, 'Pedikűr gyógypedikűr', 18000),
(10, '2024-01-13 23:00:00', '2024-01-13 23:00:00', 10, 'Benőtt köröm kezelés + körömpótlás', 13500),
(11, '2024-01-14 23:00:00', '2024-01-14 23:00:00', 11, 'Tyúkszem eltávolítás (2 db)', 7000),
(12, '2024-01-15 23:00:00', '2024-01-15 23:00:00', 12, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(13, '2024-01-16 23:00:00', '2024-01-16 23:00:00', 13, 'Szemölcs kezelés (2 db)', 13400),
(14, '2024-01-17 23:00:00', '2024-01-17 23:00:00', 14, 'Unibrace körömszabályozás (1 db)', 10000),
(15, '2024-01-18 23:00:00', '2024-01-18 23:00:00', 15, 'Sarok kezelés (2 sarok)', 10400),
(16, '2024-01-19 23:00:00', '2024-01-19 23:00:00', 16, 'Géllakk kéz + lakk leoldás', 8500),
(17, '2024-01-20 23:00:00', '2024-01-20 23:00:00', 17, 'Géllakk kéz + géllakk láb', 12500),
(18, '2024-01-21 23:00:00', '2024-01-21 23:00:00', 18, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(19, '2024-01-22 23:00:00', '2024-01-22 23:00:00', 19, 'Műköröm építés S + géllakk kéz', 15500),
(20, '2024-01-23 23:00:00', '2024-01-23 23:00:00', 20, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(21, '2024-02-04 23:00:00', '2024-02-04 23:00:00', 21, 'Géllakk kéz', 6000),
(22, '2024-02-05 23:00:00', '2024-02-05 23:00:00', 22, 'Géllakk kéz + minta (2 db)', 7000),
(23, '2024-02-06 23:00:00', '2024-02-06 23:00:00', 23, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(24, '2024-02-07 23:00:00', '2024-02-07 23:00:00', 24, 'Műköröm építés S egyszínű', 9500),
(25, '2024-02-08 23:00:00', '2024-02-08 23:00:00', 25, 'Műköröm építés M + minta (4 db)', 13000),
(26, '2024-02-09 23:00:00', '2024-02-09 23:00:00', 26, 'Műköröm építés L + Ombre', 14170),
(27, '2024-02-10 23:00:00', '2024-02-10 23:00:00', 27, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(28, '2024-02-11 23:00:00', '2024-02-11 23:00:00', 28, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(29, '2024-02-12 23:00:00', '2024-02-12 23:00:00', 29, 'Pedikűr gyógypedikűr', 18000),
(30, '2024-02-13 23:00:00', '2024-02-13 23:00:00', 30, 'Benőtt köröm kezelés + körömpótlás', 13500),
(31, '2024-02-14 23:00:00', '2024-02-14 23:00:00', 31, 'Tyúkszem eltávolítás (2 db)', 7000),
(32, '2024-02-15 23:00:00', '2024-02-15 23:00:00', 32, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(33, '2024-02-16 23:00:00', '2024-02-16 23:00:00', 33, 'Szemölcs kezelés (2 db)', 13400),
(34, '2024-02-17 23:00:00', '2024-02-17 23:00:00', 34, 'Unibrace körömszabályozás (1 db)', 10000),
(35, '2024-02-18 23:00:00', '2024-02-18 23:00:00', 35, 'Sarok kezelés (2 sarok)', 10400),
(36, '2024-02-19 23:00:00', '2024-02-19 23:00:00', 36, 'Géllakk kéz + lakk leoldás', 8500),
(37, '2024-02-20 23:00:00', '2024-02-20 23:00:00', 37, 'Géllakk kéz + géllakk láb', 12500),
(38, '2024-02-21 23:00:00', '2024-02-21 23:00:00', 38, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(39, '2024-02-22 23:00:00', '2024-02-22 23:00:00', 39, 'Műköröm építés S + géllakk kéz', 15500),
(40, '2024-02-23 23:00:00', '2024-02-23 23:00:00', 40, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(41, '2024-03-04 23:00:00', '2024-03-04 23:00:00', 41, 'Géllakk kéz', 6000),
(42, '2024-03-05 23:00:00', '2024-03-05 23:00:00', 42, 'Géllakk kéz + minta (2 db)', 7000),
(43, '2024-03-06 23:00:00', '2024-03-06 23:00:00', 43, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(44, '2024-03-07 23:00:00', '2024-03-07 23:00:00', 44, 'Műköröm építés S egyszínű', 9500),
(45, '2024-03-08 23:00:00', '2024-03-08 23:00:00', 45, 'Műköröm építés M + minta (4 db)', 13000),
(46, '2024-03-09 23:00:00', '2024-03-09 23:00:00', 46, 'Műköröm építés L + Ombre', 14170),
(47, '2024-03-10 23:00:00', '2024-03-10 23:00:00', 47, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(48, '2024-03-11 23:00:00', '2024-03-11 23:00:00', 48, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(49, '2024-03-12 23:00:00', '2024-03-12 23:00:00', 49, 'Pedikűr gyógypedikűr', 18000),
(50, '2024-03-13 23:00:00', '2024-03-13 23:00:00', 50, 'Benőtt köröm kezelés + körömpótlás', 13500),
(51, '2024-03-14 23:00:00', '2024-03-14 23:00:00', 1, 'Tyúkszem eltávolítás (2 db)', 7000),
(52, '2024-03-15 23:00:00', '2024-03-15 23:00:00', 2, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(53, '2024-03-16 23:00:00', '2024-03-16 23:00:00', 3, 'Szemölcs kezelés (2 db)', 13400),
(54, '2024-03-17 23:00:00', '2024-03-17 23:00:00', 4, 'Unibrace körömszabályozás (1 db)', 10000),
(55, '2024-03-18 23:00:00', '2024-03-18 23:00:00', 5, 'Sarok kezelés (2 sarok)', 10400),
(56, '2024-03-19 23:00:00', '2024-03-19 23:00:00', 6, 'Géllakk kéz + lakk leoldás', 8500),
(57, '2024-03-20 23:00:00', '2024-03-20 23:00:00', 7, 'Géllakk kéz + géllakk láb', 12500),
(58, '2024-03-21 23:00:00', '2024-03-21 23:00:00', 8, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(59, '2024-03-22 23:00:00', '2024-03-22 23:00:00', 9, 'Műköröm építés S + géllakk kéz', 15500),
(60, '2024-03-23 23:00:00', '2024-03-23 23:00:00', 10, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(61, '2024-04-04 22:00:00', '2024-04-04 22:00:00', 11, 'Géllakk kéz', 6000),
(62, '2024-04-05 22:00:00', '2024-04-05 22:00:00', 12, 'Géllakk kéz + minta (2 db)', 7000),
(63, '2024-04-06 22:00:00', '2024-04-06 22:00:00', 13, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(64, '2024-04-07 22:00:00', '2024-04-07 22:00:00', 14, 'Műköröm építés S egyszínű', 9500),
(65, '2024-04-08 22:00:00', '2024-04-08 22:00:00', 15, 'Műköröm építés M + minta (4 db)', 13000),
(66, '2024-04-09 22:00:00', '2024-04-09 22:00:00', 16, 'Műköröm építés L + Ombre', 14170),
(67, '2024-04-10 22:00:00', '2024-04-10 22:00:00', 17, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(68, '2024-04-11 22:00:00', '2024-04-11 22:00:00', 18, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(69, '2024-04-12 22:00:00', '2024-04-12 22:00:00', 19, 'Pedikűr gyógypedikűr', 18000),
(70, '2024-04-13 22:00:00', '2024-04-13 22:00:00', 20, 'Benőtt köröm kezelés + körömpótlás', 13500),
(71, '2024-04-14 22:00:00', '2024-04-14 22:00:00', 21, 'Tyúkszem eltávolítás (2 db)', 7000),
(72, '2024-04-15 22:00:00', '2024-04-15 22:00:00', 22, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(73, '2024-04-16 22:00:00', '2024-04-16 22:00:00', 23, 'Szemölcs kezelés (2 db)', 13400),
(74, '2024-04-17 22:00:00', '2024-04-17 22:00:00', 24, 'Unibrace körömszabályozás (1 db)', 10000),
(75, '2024-04-18 22:00:00', '2024-04-18 22:00:00', 25, 'Sarok kezelés (2 sarok)', 10400),
(76, '2024-04-19 22:00:00', '2024-04-19 22:00:00', 26, 'Géllakk kéz + lakk leoldás', 8500),
(77, '2024-04-20 22:00:00', '2024-04-20 22:00:00', 27, 'Géllakk kéz + géllakk láb', 12500),
(78, '2024-04-21 22:00:00', '2024-04-21 22:00:00', 28, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(79, '2024-04-22 22:00:00', '2024-04-22 22:00:00', 29, 'Műköröm építés S + géllakk kéz', 15500),
(80, '2024-04-23 22:00:00', '2024-04-23 22:00:00', 30, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(81, '2024-05-04 22:00:00', '2024-05-04 22:00:00', 31, 'Géllakk kéz', 6000),
(82, '2024-05-05 22:00:00', '2024-05-05 22:00:00', 32, 'Géllakk kéz + minta (2 db)', 7000),
(83, '2024-05-06 22:00:00', '2024-05-06 22:00:00', 33, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(84, '2024-05-07 22:00:00', '2024-05-07 22:00:00', 34, 'Műköröm építés S egyszínű', 9500),
(85, '2024-05-08 22:00:00', '2024-05-08 22:00:00', 35, 'Műköröm építés M + minta (4 db)', 13000),
(86, '2024-05-09 22:00:00', '2024-05-09 22:00:00', 36, 'Műköröm építés L + Ombre', 14170),
(87, '2024-05-10 22:00:00', '2024-05-10 22:00:00', 37, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(88, '2024-05-11 22:00:00', '2024-05-11 22:00:00', 38, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(89, '2024-05-12 22:00:00', '2024-05-12 22:00:00', 39, 'Pedikűr gyógypedikűr', 18000),
(90, '2024-05-13 22:00:00', '2024-05-13 22:00:00', 40, 'Benőtt köröm kezelés + körömpótlás', 13500),
(91, '2024-05-14 22:00:00', '2024-05-14 22:00:00', 41, 'Tyúkszem eltávolítás (2 db)', 7000),
(92, '2024-05-15 22:00:00', '2024-05-15 22:00:00', 42, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(93, '2024-05-16 22:00:00', '2024-05-16 22:00:00', 43, 'Szemölcs kezelés (2 db)', 13400),
(94, '2024-05-17 22:00:00', '2024-05-17 22:00:00', 44, 'Unibrace körömszabályozás (1 db)', 10000),
(95, '2024-05-18 22:00:00', '2024-05-18 22:00:00', 45, 'Sarok kezelés (2 sarok)', 10400),
(96, '2024-05-19 22:00:00', '2024-05-19 22:00:00', 46, 'Géllakk kéz + lakk leoldás', 8500),
(97, '2024-05-20 22:00:00', '2024-05-20 22:00:00', 47, 'Géllakk kéz + géllakk láb', 12500),
(98, '2024-05-21 22:00:00', '2024-05-21 22:00:00', 48, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(99, '2024-05-22 22:00:00', '2024-05-22 22:00:00', 49, 'Műköröm építés S + géllakk kéz', 15500),
(100, '2024-05-23 22:00:00', '2024-05-23 22:00:00', 50, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(101, '2024-06-04 22:00:00', '2024-06-04 22:00:00', 1, 'Géllakk kéz', 6000),
(102, '2024-06-05 22:00:00', '2024-06-05 22:00:00', 2, 'Géllakk kéz + minta (2 db)', 7000),
(103, '2024-06-06 22:00:00', '2024-06-06 22:00:00', 3, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(104, '2024-06-07 22:00:00', '2024-06-07 22:00:00', 4, 'Műköröm építés S egyszínű', 9500),
(105, '2024-06-08 22:00:00', '2024-06-08 22:00:00', 5, 'Műköröm építés M + minta (4 db)', 13000),
(106, '2024-06-09 22:00:00', '2024-06-09 22:00:00', 6, 'Műköröm építés L + Ombre', 14170),
(107, '2024-06-10 22:00:00', '2024-06-10 22:00:00', 7, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(108, '2024-06-11 22:00:00', '2024-06-11 22:00:00', 8, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(109, '2024-06-12 22:00:00', '2024-06-12 22:00:00', 9, 'Pedikűr gyógypedikűr', 18000),
(110, '2024-06-13 22:00:00', '2024-06-13 22:00:00', 10, 'Benőtt köröm kezelés + körömpótlás', 13500),
(111, '2024-06-14 22:00:00', '2024-06-14 22:00:00', 11, 'Tyúkszem eltávolítás (2 db)', 7000),
(112, '2024-06-15 22:00:00', '2024-06-15 22:00:00', 12, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(113, '2024-06-16 22:00:00', '2024-06-16 22:00:00', 13, 'Szemölcs kezelés (2 db)', 13400),
(114, '2024-06-17 22:00:00', '2024-06-17 22:00:00', 14, 'Unibrace körömszabályozás (1 db)', 10000),
(115, '2024-06-18 22:00:00', '2024-06-18 22:00:00', 15, 'Sarok kezelés (2 sarok)', 10400),
(116, '2024-06-19 22:00:00', '2024-06-19 22:00:00', 16, 'Géllakk kéz + lakk leoldás', 8500),
(117, '2024-06-20 22:00:00', '2024-06-20 22:00:00', 17, 'Géllakk kéz + géllakk láb', 12500),
(118, '2024-06-21 22:00:00', '2024-06-21 22:00:00', 18, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(119, '2024-06-22 22:00:00', '2024-06-22 22:00:00', 19, 'Műköröm építés S + géllakk kéz', 15500),
(120, '2024-06-23 22:00:00', '2024-06-23 22:00:00', 20, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(121, '2024-09-04 22:00:00', '2024-09-04 22:00:00', 21, 'Géllakk kéz', 6000),
(122, '2024-09-05 22:00:00', '2024-09-05 22:00:00', 22, 'Géllakk kéz + minta (2 db)', 7000),
(123, '2024-09-06 22:00:00', '2024-09-06 22:00:00', 23, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(124, '2024-09-07 22:00:00', '2024-09-07 22:00:00', 24, 'Műköröm építés S egyszínű', 9500),
(125, '2024-09-08 22:00:00', '2024-09-08 22:00:00', 25, 'Műköröm építés M + minta (4 db)', 13000),
(126, '2024-09-09 22:00:00', '2024-09-09 22:00:00', 26, 'Műköröm építés L + Ombre', 14170),
(127, '2024-09-10 22:00:00', '2024-09-10 22:00:00', 27, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(128, '2024-09-11 22:00:00', '2024-09-11 22:00:00', 28, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(129, '2024-09-12 22:00:00', '2024-09-12 22:00:00', 29, 'Pedikűr gyógypedikűr', 18000),
(130, '2024-09-13 22:00:00', '2024-09-13 22:00:00', 30, 'Benőtt köröm kezelés + körömpótlás', 13500),
(131, '2024-09-14 22:00:00', '2024-09-14 22:00:00', 31, 'Tyúkszem eltávolítás (2 db)', 7000),
(132, '2024-09-15 22:00:00', '2024-09-15 22:00:00', 32, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(133, '2024-09-16 22:00:00', '2024-09-16 22:00:00', 33, 'Szemölcs kezelés (2 db)', 13400),
(134, '2024-09-17 22:00:00', '2024-09-17 22:00:00', 34, 'Unibrace körömszabályozás (1 db)', 10000),
(135, '2024-09-18 22:00:00', '2024-09-18 22:00:00', 35, 'Sarok kezelés (2 sarok)', 10400),
(136, '2024-09-19 22:00:00', '2024-09-19 22:00:00', 36, 'Géllakk kéz + lakk leoldás', 8500),
(137, '2024-09-20 22:00:00', '2024-09-20 22:00:00', 37, 'Géllakk kéz + géllakk láb', 12500),
(138, '2024-09-21 22:00:00', '2024-09-21 22:00:00', 38, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(139, '2024-09-22 22:00:00', '2024-09-22 22:00:00', 39, 'Műköröm építés S + géllakk kéz', 15500),
(140, '2024-09-23 22:00:00', '2024-09-23 22:00:00', 40, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(141, '2024-11-04 23:00:00', '2024-11-04 23:00:00', 41, 'Géllakk kéz', 6000),
(142, '2024-11-05 23:00:00', '2024-11-05 23:00:00', 42, 'Géllakk kéz + minta (2 db)', 7000),
(143, '2024-11-06 23:00:00', '2024-11-06 23:00:00', 43, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(144, '2024-11-07 23:00:00', '2024-11-07 23:00:00', 44, 'Műköröm építés S egyszínű', 9500),
(145, '2024-11-08 23:00:00', '2024-11-08 23:00:00', 45, 'Műköröm építés M + minta (4 db)', 13000),
(146, '2024-11-09 23:00:00', '2024-11-09 23:00:00', 46, 'Műköröm építés L + Ombre', 14170),
(147, '2024-11-10 23:00:00', '2024-11-10 23:00:00', 47, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(148, '2024-11-11 23:00:00', '2024-11-11 23:00:00', 48, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(149, '2024-11-12 23:00:00', '2024-11-12 23:00:00', 49, 'Pedikűr gyógypedikűr', 18000),
(150, '2024-11-13 23:00:00', '2024-11-13 23:00:00', 50, 'Benőtt köröm kezelés + körömpótlás', 13500),
(151, '2024-11-14 23:00:00', '2024-11-14 23:00:00', 1, 'Tyúkszem eltávolítás (2 db)', 7000),
(152, '2024-11-15 23:00:00', '2024-11-15 23:00:00', 2, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(153, '2024-11-16 23:00:00', '2024-11-16 23:00:00', 3, 'Szemölcs kezelés (2 db)', 13400),
(154, '2024-11-17 23:00:00', '2024-11-17 23:00:00', 4, 'Unibrace körömszabályozás (1 db)', 10000),
(155, '2024-11-18 23:00:00', '2024-11-18 23:00:00', 5, 'Sarok kezelés (2 sarok)', 10400),
(156, '2024-11-19 23:00:00', '2024-11-19 23:00:00', 6, 'Géllakk kéz + lakk leoldás', 8500),
(157, '2024-11-20 23:00:00', '2024-11-20 23:00:00', 7, 'Géllakk kéz + géllakk láb', 12500),
(158, '2024-11-21 23:00:00', '2024-11-21 23:00:00', 8, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(159, '2024-11-22 23:00:00', '2024-11-22 23:00:00', 9, 'Műköröm építés S + géllakk kéz', 15500),
(160, '2024-11-23 23:00:00', '2024-11-23 23:00:00', 10, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(161, '2025-03-04 23:00:00', '2025-03-04 23:00:00', 11, 'Géllakk kéz', 6000),
(162, '2025-03-05 23:00:00', '2025-03-05 23:00:00', 12, 'Géllakk kéz + minta (2 db)', 7000),
(163, '2025-03-06 23:00:00', '2025-03-06 23:00:00', 13, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(164, '2025-03-07 23:00:00', '2025-03-07 23:00:00', 14, 'Műköröm építés S egyszínű', 9500),
(165, '2025-03-08 23:00:00', '2025-03-08 23:00:00', 15, 'Műköröm építés M + minta (4 db)', 13000),
(166, '2025-03-09 23:00:00', '2025-03-09 23:00:00', 16, 'Műköröm építés L + Ombre', 14170),
(167, '2025-03-10 23:00:00', '2025-03-10 23:00:00', 17, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(168, '2025-03-11 23:00:00', '2025-03-11 23:00:00', 18, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(169, '2025-03-12 23:00:00', '2025-03-12 23:00:00', 19, 'Pedikűr gyógypedikűr', 18000),
(170, '2025-03-13 23:00:00', '2025-03-13 23:00:00', 20, 'Benőtt köröm kezelés + körömpótlás', 13500),
(171, '2025-03-14 23:00:00', '2025-03-14 23:00:00', 21, 'Tyúkszem eltávolítás (2 db)', 7000),
(172, '2025-03-15 23:00:00', '2025-03-15 23:00:00', 22, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(173, '2025-03-16 23:00:00', '2025-03-16 23:00:00', 23, 'Szemölcs kezelés (2 db)', 13400),
(174, '2025-03-17 23:00:00', '2025-03-17 23:00:00', 24, 'Unibrace körömszabályozás (1 db)', 10000),
(175, '2025-03-18 23:00:00', '2025-03-18 23:00:00', 25, 'Sarok kezelés (2 sarok)', 10400),
(176, '2025-03-19 23:00:00', '2025-03-19 23:00:00', 26, 'Géllakk kéz + lakk leoldás', 8500),
(177, '2025-03-20 23:00:00', '2025-03-20 23:00:00', 27, 'Géllakk kéz + géllakk láb', 12500),
(178, '2025-03-21 23:00:00', '2025-03-21 23:00:00', 28, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(179, '2025-03-22 23:00:00', '2025-03-22 23:00:00', 29, 'Műköröm építés S + géllakk kéz', 15500),
(180, '2025-03-23 23:00:00', '2025-03-23 23:00:00', 30, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480),
(181, '2025-06-04 22:00:00', '2025-06-04 22:00:00', 31, 'Géllakk kéz', 6000),
(182, '2025-06-05 22:00:00', '2025-06-05 22:00:00', 32, 'Géllakk kéz + minta (2 db)', 7000),
(183, '2025-06-06 22:00:00', '2025-06-06 22:00:00', 33, 'Géllakk kéz + minta (4 db) + díszítőkő (6 db)', 8210),
(184, '2025-06-07 22:00:00', '2025-06-07 22:00:00', 34, 'Műköröm építés S egyszínű', 9500),
(185, '2025-06-08 22:00:00', '2025-06-08 22:00:00', 35, 'Műköröm építés M + minta (4 db)', 13000),
(186, '2025-06-09 22:00:00', '2025-06-09 22:00:00', 36, 'Műköröm építés L + Ombre', 14170),
(187, '2025-06-10 22:00:00', '2025-06-10 22:00:00', 37, 'Műköröm építés Extrém + minta (6 db) + díszítőkő (10 db)', 20350),
(188, '2025-06-11 22:00:00', '2025-06-11 22:00:00', 38, 'Géllakk láb + pedikűr gyógypedikűr', 24500),
(189, '2025-06-12 22:00:00', '2025-06-12 22:00:00', 39, 'Pedikűr gyógypedikűr', 18000),
(190, '2025-06-13 22:00:00', '2025-06-13 22:00:00', 40, 'Benőtt köröm kezelés + körömpótlás', 13500),
(191, '2025-06-14 22:00:00', '2025-06-14 22:00:00', 41, 'Tyúkszem eltávolítás (2 db)', 7000),
(192, '2025-06-15 22:00:00', '2025-06-15 22:00:00', 42, 'Lápiszolás (1 db) + tyúkszem (1 db)', 7600),
(193, '2025-06-16 22:00:00', '2025-06-16 22:00:00', 43, 'Szemölcs kezelés (2 db)', 13400),
(194, '2025-06-17 22:00:00', '2025-06-17 22:00:00', 44, 'Unibrace körömszabályozás (1 db)', 10000),
(195, '2025-06-18 22:00:00', '2025-06-18 22:00:00', 45, 'Sarok kezelés (2 sarok)', 10400),
(196, '2025-06-19 22:00:00', '2025-06-19 22:00:00', 46, 'Géllakk kéz + lakk leoldás', 8500),
(197, '2025-06-20 22:00:00', '2025-06-20 22:00:00', 47, 'Géllakk kéz + géllakk láb', 12500),
(198, '2025-06-21 22:00:00', '2025-06-21 22:00:00', 48, 'Géllakk láb + sarok kezelés (2 sarok)', 16900),
(199, '2025-06-22 22:00:00', '2025-06-22 22:00:00', 49, 'Műköröm építés S + géllakk kéz', 15500),
(200, '2025-06-23 22:00:00', '2025-06-23 22:00:00', 50, 'Géllakk kéz + nyomda (4 db) + glitter (4 db)', 7480);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- A tábla indexei `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `service_treatment_links`
--
ALTER TABLE `service_treatment_links`
  ADD KEY `service_treatment_links_treatment_id_foreign` (`treatment_id`),
  ADD KEY `service_treatment_links_service_id_foreign` (`service_id`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `treatments_customer_id_foreign` (`customer_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT a táblához `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `service_treatment_links`
--
ALTER TABLE `service_treatment_links`
  ADD CONSTRAINT `service_treatment_links_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `service_treatment_links_treatment_id_foreign` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`);

--
-- Megkötések a táblához `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `treatments_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
