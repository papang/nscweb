--
-- PostgreSQL database dump
--

\restrict MkHSH1Tb63YspSQm6PKuxyP0K5BKyo4gVkv6PSCcaY7xtgkIIQqiharUAl9ixay

-- Dumped from database version 15.18
-- Dumped by pg_dump version 15.18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ctn_news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ctn_news (
    news_id integer NOT NULL,
    news_cat_id integer DEFAULT 0 NOT NULL,
    news_title character varying(100),
    news_img character varying(100),
    author_by character varying(100),
    news_content text,
    ispublished integer DEFAULT 1 NOT NULL,
    created_by character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying(50),
    updated_at timestamp with time zone,
    stat_visit integer DEFAULT 0,
    tags character varying(100)[],
    src_inex character varying(2) DEFAULT 'IN'::character varying,
    src_news character varying(20),
    src_url character varying(255),
    isheadline integer DEFAULT 0
);


ALTER TABLE public.ctn_news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.ctn_news.news_id;


--
-- Name: ctn_news news_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_news ALTER COLUMN news_id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Data for Name: ctn_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ctn_news VALUES (3, 2, 'Cara Optimalkan Latensi Internet Satelit untuk Gaming', '/particle8.webp', 'Syal Pratama', 'Bermain game kompetitif menggunakan koneksi satelit dulu dianggap tidak mungkin karena masalah latensi (ping) yang tinggi. Namun, dengan hadirnya konstelasi satelit LEO dari Akastar, pengalaman gaming kini menjadi jauh lebih mulus.
Untuk mendapatkan performa maksimal, pastikan antena atau parabola Anda berada di area terbuka tanpa halangan pohon atau bangunan. Gangguan fisik (obstruction) sekecil apapun dapat menyebabkan packet loss yang berujung pada ''lag spike'' saat bermain game.
Selain itu, gunakan router dengan fitur Quality of Service (QoS) untuk memprioritaskan traffic game di atas unduhan atau streaming. Menghubungkan PC atau konsol langsung ke router menggunakan kabel LAN (Ethernet) juga sangat disarankan untuk kestabilan ekstra.', 1, NULL, '2026-06-22 00:00:00+07', NULL, '2026-07-27 17:43:14.622+07', 2, NULL, 'IN', NULL, NULL, 0);
INSERT INTO public.ctn_news VALUES (4, 3, 'Rekap Workshop Digitalisasi Desa Bersama NSC', '/particle9.webp', 'Humas NSC', 'Sebagai bagian dari program CSR perusahaan, NSC sukses menggelar workshop ''Desa Go Digital'' yang dihadiri oleh puluhan kepala desa dari berbagai provinsi. Acara ini bertujuan mengedukasi perangkat desa mengenai pemanfaatan internet satelit untuk pelayanan publik.
Selama workshop, peserta diajarkan cara mengurus administrasi desa secara online, mempromosikan produk UMKM lokal ke pasar global, hingga menyiapkan infrastruktur internet tahan bencana sebagai jalur komunikasi darurat.
Antusiasme yang tinggi membuktikan bahwa masyarakat pedesaan sangat siap menyambut era digital asalkan didukung dengan infrastruktur konektivitas yang handal dan terjangkau.', 1, NULL, '2026-06-21 00:00:00+07', NULL, '2026-07-27 17:43:14.622+07', 26, NULL, 'IN', NULL, NULL, 0);
INSERT INTO public.ctn_news VALUES (40, 0, 'BRIN: Satelit NEO-1 Kantongi TKDN 65 Persen, Siap Meluncur Januari 2027', '/news/news_kompas.jpg', NULL, 'Badan Riset dan Inovasi Nasional (BRIN) mengungkapkan satelit Nusantara Earth Observation-1 (NEO-1) yang dijadwalkan meluncur pada Januari 2027 memiliki tingkat komponen dalam negeri (TKDN) sekitar 65 persen.', 1, 'admin', '2026-07-25 19:31:44.035426+07', NULL, '2026-07-25 19:31:43.936+07', 0, NULL, 'EX', 'Kompas.com', 'https://nasional.kompas.com/read/2026/07/08/18085691/brin-satelit-neo-1-kantongi-tkdn-65-persen-siap-meluncur-januari-2027', 0);
INSERT INTO public.ctn_news VALUES (7, 2, 'Jangkauan Satelit LEO di Papua', '/kemah.webp', 'Humas NSC', 'Menghadirkan konektivitas di wilayah Indonesia Timur, khususnya di area pegunungan Papua, selalu menjadi tantangan logistik yang luar biasa berat bagi penyedia internet fiber optik konvensional.
Namun, dengan pendekatan konstelasi satelit LEO (Low Earth Orbit), Akastar kini mampu menyediakan akses internet broadband kecepatan tinggi yang stabil langsung ke desa-desa, fasilitas kesehatan, dan sekolah terpencil tanpa perlu membangun menara atau menarik kabel ribuan kilometer.
Inisiatif ini terbukti berhasil meningkatkan taraf edukasi anak-anak daerah serta mempermudah petugas medis dalam mengakses rekam medis elektronik terpusat dengan cepat dan aman.', 1, NULL, '2026-05-15 00:00:00+07', NULL, '2026-07-27 17:43:14.622+07', 0, NULL, 'IN', NULL, NULL, 0);
INSERT INTO public.ctn_news VALUES (41, 0, 'Starlink: Membuka Pintu Konektivitas Global', '/news/news_linkedin.jpg', NULL, 'Starlink membawa revolusi dalam dunia digital dengan memberikan akses cepat dan luas ke wilayah yang sebelumnya sulit dijangkau. Dengan teknologi yang terus berkembang, Starlink memberikan koneksi yang lebih baik untuk masa depan yang lebih terhubung. 
Teknologi Starlink menghadirkan banyak keunggulan yang menjadikannya solusi ideal, baik untuk kebutuhan pribadi maupun bisnis. Berikut merupakan berbagai keunggulan utama dari layanan Starlink.', 1, 'admin', '2026-07-25 19:33:10.713625+07', NULL, '2026-07-25 19:33:10.597+07', 0, NULL, 'EX', 'LinkedIn', 'https://www.linkedin.com/posts/starlink-menunjung-revolusi-konektivitas-ugcPost-7283443136628998144-YsRQ/', 0);
INSERT INTO public.ctn_news VALUES (42, 0, 'Indonesia launches N5 satellite to boost internet in remote areas', '/news/news_techinasia.webp', NULL, 'Indonesia has launched the Nusantara Lima (N5) satellite to boost internet coverage across the country, especially in remote and underserved areas. 
The satellite, owned by PT Satelit Nusantara Lima, a subsidiary of PT Pasifik Satelit Nusantara, was developed with partners including Boeing Satellite Systems, Hughes Network Systems, and SpaceX.', 1, 'admin', '2026-07-25 19:34:14.062627+07', NULL, '2026-07-25 19:34:13.957+07', 0, NULL, 'EX', 'TechInAsia', 'https://www.techinasia.com/news/indonesia-launches-n5-satellite-to-boost-internet-in-remote-areas', 0);
INSERT INTO public.ctn_news VALUES (43, 0, 'Indonesia Siapkan Satelit LEO, Tak Cuma Andalkan Starlink', '/news/news_detikinet.jpeg', NULL, 'Pemerintah mengungkap operator satelit nasional tengah memproses pengembangan satelit Low Earth Orbit (LEO). Saat ini, proses pengajuan orbit dan frekuensi satelit tersebut telah diajukan ke International Telecommunication Union (ITU) sebagai bagian dari tahapan sebelum satelit dapat diluncurkan.', 1, 'admin', '2026-07-25 19:40:56.909951+07', NULL, '2026-07-25 19:40:56.746+07', 0, NULL, 'EX', 'Detik.com', 'https://inet.detik.com/law-and-policy/d-8565860/indonesia-siapkan-satelit-leo-tak-cuma-andalkan-starlink', 0);
INSERT INTO public.ctn_news VALUES (1, 1, 'Teknologi Beamforming: Masa Depan Internet Tanpa Lag di Indonesia', '/particle9.webp', 'Syal Pratama', 'Pernahkah Anda membayangkan koneksi internet satelit yang memiliki kecepatan setara fiber optik dengan latensi yang sangat rendah? Jawabannya terletak pada teknologi Beamforming. Sebagai inovasi terbaru dalam industri komunikasi satelit LEO (Low Earth Orbit), beamforming memungkinkan transmisi sinyal yang lebih fokus dan efisien.
Berbeda dengan antena tradisional yang memancarkan sinyal ke segala arah, beamforming menggunakan algoritma canggih untuk mengarahkan energi sinyal tepat ke perangkat pengguna. Hal ini meminimalisir gangguan (interference) dan memastikan bandwidth maksimal tersalurkan tanpa hambatan fisik seperti cuaca ekstrem.
Nusantara Star Connect (NSC) telah mulai mengimplementasikan teknologi ini pada perangkat Starlink Enterprise mereka, memberikan pengalaman gaming dan video conference yang mulus bahkan di wilayah terpencil di Indonesia.', 1, NULL, '2026-06-21 20:58:36.561645+07', 'Syal Pratama', '2026-07-27 17:43:14.622+07', 25, NULL, 'IN', NULL, NULL, 0);
INSERT INTO public.ctn_news VALUES (6, 1, 'Update Firmware Antena NSC V2', '/beam.webp', 'Dev Team NSC', 'Nusantara Star Connect baru saja meluncurkan pembaruan sistem operasi (firmware) versi 2.0 untuk seluruh antena pengguna secara Over-The-Air (OTA). Update ini akan diunduh dan dipasang secara otomatis pada jam non-sibuk.
Pembaruan ini membawa algoritma pelacakan satelit LEO yang lebih presisi, yang diklaim mampu meningkatkan kecepatan penguncian sinyal awal (signal lock) hingga 30% lebih cepat ketika perangkat dinyalakan atau setelah terjadi pemadaman listrik.
Selain itu, patch keamanan terbaru juga disertakan untuk menutup celah kerentanan, memastikan komunikasi jaringan korporasi Anda tetap aman dari intervensi pihak luar.', 1, NULL, '2026-05-18 00:00:00+07', NULL, '2026-07-27 17:43:14.622+07', 6, NULL, 'IN', NULL, NULL, 0);
INSERT INTO public.ctn_news VALUES (5, 2, 'Cara Optimalkan Latensi Satelit', '/game.webp', 'Tim Teknis NSC', 'Latensi atau ping sangat krusial bagi koneksi internet satelit, terutama jika Anda menggunakan layanan kami untuk kebutuhan real-time seperti video conference, VoIP, atau operasional mesin jarak jauh.
Langkah pertama yang paling penting adalah memastikan instalasi antena (dish) berada di tempat yang 100% bebas hambatan (clear view of the sky). Halangan sekecil daun atau tiang listrik dapat menyebabkan koneksi terputus sepersekian detik dan meningkatkan latensi.
Kami juga sangat merekomendasikan penggunaan koneksi kabel LAN (Ethernet) dari router NSC ke perangkat kerja Anda daripada menggunakan Wi-Fi, karena hal ini dapat secara drastis mengurangi potensi interferensi gelombang radio di sekitar Anda.', 1, NULL, '2026-05-20 00:00:00+07', NULL, '2026-07-27 17:43:14.622+07', 13, NULL, 'IN', NULL, NULL, 0);
INSERT INTO public.ctn_news VALUES (17, 2, 'NSC Luncurkan Satelit LEO Terbaru di Orbit Indonesia', '/particle7.webp', 'Tim Redaksi NSC', 'Nusantara Star Connect (NSC) secara resmi mengumumkan peluncuran satelit Low Earth Orbit (LEO) terbarunya yang difokuskan untuk mengkover wilayah timur Indonesia. Langkah ini diambil guna mengatasi tantangan blank spot yang masih sering terjadi di area kepulauan.
Dengan mengorbit di ketinggian kurang dari 1.000 km, satelit ini menawarkan latensi yang jauh lebih rendah dibandingkan satelit geostasioner (GEO) tradisional, memungkinkan komunikasi real-time tanpa jeda yang berarti untuk pengguna korporat maupun residensial.
Direktur Utama NSC menyatakan bahwa fasilitas ini akan mulai beroperasi penuh pada kuartal ketiga tahun ini, membuka peluang baru bagi sektor pendidikan, kesehatan, dan ekonomi digital di pelosok negeri yang selama ini belum terjangkau fiber optik.', 1, 'admin', '2026-07-23 19:18:11.815531+07', 'Tim Redaksi NSC', '2026-07-27 17:43:14.642+07', 8, NULL, 'IN', NULL, NULL, 1);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 43, true);


--
-- Name: ctn_news ctn_news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_news
    ADD CONSTRAINT ctn_news_pkey PRIMARY KEY (news_id);


--
-- PostgreSQL database dump complete
--

\unrestrict MkHSH1Tb63YspSQm6PKuxyP0K5BKyo4gVkv6PSCcaY7xtgkIIQqiharUAl9ixay

