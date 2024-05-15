-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 28, 2023 alle 11:37
-- Versione del server: 10.4.22-MariaDB
-- Versione PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4_hotel`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `codPrenotazione` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `codStanza` int(11) NOT NULL,
  `inizioSoggiorno` varchar(10) NOT NULL,
  `fineSoggiorno` varchar(10) NOT NULL,
  `pagato` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prenotazioni`
--

INSERT INTO `prenotazioni` (`codPrenotazione`, `email`, `codStanza`, `inizioSoggiorno`, `fineSoggiorno`, `pagato`) VALUES
(1, 'mario.rossi@gmail.com', 10, '2023-06-06', '2023-06-08', 1),
(2, 'giovanni.bianchi@gmail.com', 4, '2023-06-06', '2023-06-08', 0),
(3, 'sara.verdi@libero.it', 6, '2023-06-06', '2023-06-08', 1),
(4, 'elvira.giallo@gmail.it', 13, '2023-06-10', '2023-06-18', 0),
(5, 'marco.blu@gmail.it', 12, '2023-06-10', '2023-06-18', 0),
(6, 'iris.viola@gmail.it', 10, '2023-06-10', '2023-06-18', 1),
(7, 'vanessa.giallo@gmail.it', 9, '2023-06-10', '2023-06-18', 1),
(8, 'erik.verdi@gmail.it', 8, '2023-06-10', '2023-06-18', 0),
(9, 'giovanna.verdi@gmail.it', 7, '2023-06-13', '2023-06-18', 0),
(10, 'leopoldo.rossi@gmail.it', 6, '2023-06-13', '2023-06-18', 0),
(11, 'patrizia.nero@gmail.it', 5, '2023-06-13', '2023-06-16', 1),
(12, 'leone.arancione@gmail.it', 4, '2023-06-13', '2023-06-16', 0),
(13, 'renato.ciano@gmail.it', 1, '2023-06-13', '2023-06-16', 0),
(14, 'piera.verdone@gmail.it', 3, '2023-06-12', '2023-06-16', 0),
(15, 'eleonora.verdone@gmail.it', 14, '2023-06-11', '2023-06-15', 1),
(16, 'giorgio.giallino@gmail.it', 15, '2023-06-14', '2023-06-15', 1),
(17, 'elena.magenta@gmail.it', 2, '2023-06-13', '2023-06-15', 1),
(18, 'francesco.magenta@libero.it', 11, '2023-06-12', '2023-06-17', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `stanze`
--

CREATE TABLE `stanze` (
  `codStanza` int(11) NOT NULL,
  `tv` tinyint(1) NOT NULL DEFAULT 0,
  `balcone` tinyint(1) NOT NULL DEFAULT 0,
  `vistaMare` tinyint(1) NOT NULL DEFAULT 0,
  `matrimoniale` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `stanze`
--

INSERT INTO `stanze` (`codStanza`, `tv`, `balcone`, `vistaMare`, `matrimoniale`) VALUES
(1, 1, 0, 0, 1),
(2, 0, 1, 1, 1),
(3, 1, 1, 0, 1),
(4, 1, 0, 0, 0),
(5, 1, 0, 0, 0),
(6, 0, 1, 1, 1),
(7, 1, 0, 0, 0),
(8, 1, 0, 0, 1),
(9, 1, 0, 0, 0),
(10, 0, 1, 1, 1),
(11, 1, 1, 1, 1),
(12, 1, 1, 1, 1),
(13, 1, 0, 0, 0),
(14, 1, 0, 0, 1),
(15, 1, 0, 0, 1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`codPrenotazione`);

--
-- Indici per le tabelle `stanze`
--
ALTER TABLE `stanze`
  ADD PRIMARY KEY (`codStanza`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `codPrenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `stanze`
--
ALTER TABLE `stanze`
  MODIFY `codStanza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
