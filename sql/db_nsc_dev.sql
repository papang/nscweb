--
-- PostgreSQL database dump
--

\restrict myRyo3JmaxAY7WQ0jIxqsQ5ifKJaJDcQ4Fqsh2sMtO1lIYS3QSq1NTECWdaBupE

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
-- Name: appreq_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appreq_session (
    req_id bigint NOT NULL,
    email character varying(100),
    req_hash character varying(500),
    is_verified integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.appreq_session OWNER TO postgres;

--
-- Name: ctn_gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ctn_gallery (
    gal_id integer NOT NULL,
    group_id integer DEFAULT 0 NOT NULL,
    gal_title character varying(255),
    gal_type character varying(20),
    src_url character varying(255),
    thumbnail_url character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by character varying(50),
    updated_at timestamp with time zone,
    updated_by character varying(50)
);


ALTER TABLE public.ctn_gallery OWNER TO postgres;

--
-- Name: ctn_job_career; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ctn_job_career (
    job_id integer NOT NULL,
    job_title character varying(100),
    job_cat character varying(20),
    job_type_id integer,
    location character varying(50),
    job_desc text,
    qualifications character varying(500)[],
    created_by character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by character varying(50),
    updated_at timestamp with time zone,
    ispublished integer DEFAULT 0
);


ALTER TABLE public.ctn_job_career OWNER TO postgres;

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
-- Name: ctn_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ctn_users (
    user_id character varying(32) NOT NULL,
    user_name character varying(50),
    role_id character varying(3),
    hash_pass character varying(100)
);


ALTER TABLE public.ctn_users OWNER TO postgres;

--
-- Name: gal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.gal_id_seq OWNER TO postgres;

--
-- Name: gal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gal_id_seq OWNED BY public.ctn_gallery.gal_id;


--
-- Name: job_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.job_id_seq OWNER TO postgres;

--
-- Name: job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_id_seq OWNED BY public.ctn_job_career.job_id;


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
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id bigint NOT NULL,
    user_id bigint NOT NULL,
    session_id character varying(255),
    order_status_id integer DEFAULT 1,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public.orders.order_id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    order_item_id bigint NOT NULL,
    user_id integer,
    session_id character varying(200),
    sku_id integer,
    ref_sku_id integer,
    sku_code character varying(32),
    sku_name character varying(50),
    sales_price numeric(12,2),
    sku_notes character varying(100),
    order_status_id integer DEFAULT 1,
    created_by character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying(50),
    updated_at timestamp with time zone
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.order_item_id_seq OWNER TO postgres;

--
-- Name: order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_items.order_item_id;


--
-- Name: order_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_product (
    order_id bigint,
    user_id bigint NOT NULL,
    session_id character varying(255),
    order_status_id integer DEFAULT 1,
    sku_id bigint NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_product OWNER TO postgres;

--
-- Name: p_charge_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_charge_type (
    charge_type_code character varying(4) NOT NULL,
    charge_type_name character varying(50)
);


ALTER TABLE public.p_charge_type OWNER TO postgres;

--
-- Name: p_group_gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_group_gallery (
    group_id integer NOT NULL,
    group_name character varying(50) NOT NULL,
    group_desc character varying(100),
    ord_num integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.p_group_gallery OWNER TO postgres;

--
-- Name: p_job_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_job_type (
    type_id integer NOT NULL,
    type_name character varying(50) NOT NULL,
    type_desc character varying(100)
);


ALTER TABLE public.p_job_type OWNER TO postgres;

--
-- Name: p_news_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_news_cat (
    news_cat_id integer NOT NULL,
    news_cat_name character varying(50)
);


ALTER TABLE public.p_news_cat OWNER TO postgres;

--
-- Name: p_service_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_service_cat (
    service_cat_id integer DEFAULT 0 NOT NULL,
    cat_name character varying(20) NOT NULL,
    cat_desc character varying(50),
    ord_num integer DEFAULT 0
);


ALTER TABLE public.p_service_cat OWNER TO postgres;

--
-- Name: p_service_hierarchy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_service_hierarchy (
    hier_code character varying(4) NOT NULL,
    hier_level integer,
    hier_parent_code character varying(4),
    hier_name character varying(50)
);


ALTER TABLE public.p_service_hierarchy OWNER TO postgres;

--
-- Name: product_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_cat (
    product_cat_id integer NOT NULL,
    category_name character varying(50) NOT NULL,
    category_desc character varying(255),
    ord_num integer
);


ALTER TABLE public.product_cat OWNER TO postgres;

--
-- Name: product_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_cat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.product_cat_id_seq OWNER TO postgres;

--
-- Name: product_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_cat_id_seq OWNED BY public.product_cat.product_cat_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(50) NOT NULL,
    product_icon text,
    product_image character varying(255),
    product_desc character varying(255),
    features character varying(255),
    segment_desc character varying(255),
    specification character varying(255)[],
    product_unit character varying(50),
    product_status integer,
    product_code character varying(100),
    product_price numeric(12,2),
    product_cat_id integer,
    is_active integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.products.product_id;


--
-- Name: product_sku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_sku (
    sku_id bigint NOT NULL,
    product_id integer,
    prodstream_code character varying(8),
    prodtype_code character varying(8),
    spec_mir_up character varying(50),
    spec_mir_down character varying(50),
    unit_price numeric(12,2),
    sku_name character varying(255)
);


ALTER TABLE public.product_sku OWNER TO postgres;

--
-- Name: product_stream; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_stream (
    prodstream_code character varying(8) NOT NULL,
    prodstream_name character varying(50) NOT NULL
);


ALTER TABLE public.product_stream OWNER TO postgres;

--
-- Name: product_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_type (
    prodtype_code character varying(8) NOT NULL,
    prodtype_name character varying(50) NOT NULL
);


ALTER TABLE public.product_type OWNER TO postgres;

--
-- Name: req_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.req_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.req_id_seq OWNER TO postgres;

--
-- Name: req_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.req_id_seq OWNED BY public.appreq_session.req_id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    service_id integer NOT NULL,
    service_code character varying(32),
    service_name character varying(50),
    unit_price numeric(12,2),
    charge_type_code character varying(4),
    service_cat_id integer,
    hier_code character varying(4),
    service_icon text,
    service_img character varying(100),
    service_desc text,
    isactive integer DEFAULT 1,
    ord_num integer DEFAULT 0,
    spec_attributes jsonb,
    service_parent_id integer,
    sales_price numeric(12,2) DEFAULT 0
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.service_id_seq OWNER TO postgres;

--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.services.service_id;


--
-- Name: sku_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sku_id_seq
    START WITH 260000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.sku_id_seq OWNER TO postgres;

--
-- Name: sku_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sku_id_seq OWNED BY public.product_sku.sku_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    phone_no character varying(20),
    isverified integer DEFAULT 0,
    company_name character varying(200),
    job_title character varying(100),
    profession character varying(100)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: appreq_session req_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appreq_session ALTER COLUMN req_id SET DEFAULT nextval('public.req_id_seq'::regclass);


--
-- Name: ctn_gallery gal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_gallery ALTER COLUMN gal_id SET DEFAULT nextval('public.gal_id_seq'::regclass);


--
-- Name: ctn_job_career job_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_job_career ALTER COLUMN job_id SET DEFAULT nextval('public.job_id_seq'::regclass);


--
-- Name: ctn_news news_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_news ALTER COLUMN news_id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: order_items order_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN order_item_id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: product_cat product_cat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_cat ALTER COLUMN product_cat_id SET DEFAULT nextval('public.product_cat_id_seq'::regclass);


--
-- Name: product_sku sku_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku ALTER COLUMN sku_id SET DEFAULT nextval('public.sku_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: services service_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN service_id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: appreq_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appreq_session (req_id, email, req_hash, is_verified, created_at) FROM stdin;
\.


--
-- Data for Name: ctn_gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ctn_gallery (gal_id, group_id, gal_title, gal_type, src_url, thumbnail_url, created_at, created_by, updated_at, updated_by) FROM stdin;
1	1	Instalasi Antena NSC di Area Pegunungan	video	/starlink_gunung.mp4	/thumb_instalasi_gunung.png	2026-07-27 16:34:44.787547+07	\N	\N	\N
3	3	Instalasi Antena NSC di Area Pegunungan	video	/starlink_gunung.mp4	/thumb_instalasi_gunung.png	2026-07-27 16:39:03.985757+07	\N	2026-07-28 12:13:21.926+07	
5	2	test dff	image	\N	\N	2026-07-28 13:02:36.963171+07		2026-07-28 13:02:36.808+07	\N
6	2	sdfs	image	\N	\N	2026-07-28 13:09:53.229743+07		2026-07-28 13:09:53.024+07	\N
7	3	ini adalah galeri baru	image	/upload/2c84ce1bd45b971963bb9b2e8043fd59be28296c.jpg	\N	2026-07-28 13:11:15.168343+07		2026-07-28 13:11:15.061+07	\N
\.


--
-- Data for Name: ctn_job_career; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ctn_job_career (job_id, job_title, job_cat, job_type_id, location, job_desc, qualifications, created_by, created_at, updated_by, updated_at, ispublished) FROM stdin;
1	Account Executive sd	Full-time	1	Surabaya edit	Jadi tugasnya begini yg lebih panjang\n	{"Pengalaman minimal 3 tahun dalam B2B Sales, lebih disukai di industri IT/Telco.","Mampu menyusun proposal penawaran teknis dan komersial.","Memiliki jaringan koneksi yang luas di industri pertambangan, maritim, atau logistik.","Berorientasi pada target dan mampu bekerja dengan supervisi minimum."}	admin	2026-07-27 21:15:47.490328+07	\N	2026-07-28 11:43:14.27+07	0
5	Engineer	Full-time	1	Jakarta	montoring server dsfsdfsf	{"mengerti linux"}	\N	2026-07-28 11:39:12.773947+07	\N	2026-07-28 11:45:43.246+07	0
6	Account Executive sd	Full-time	1	Surabaya edit	apa aja	{howto}	\N	2026-07-28 11:42:01.774134+07	\N	2026-07-28 11:43:02.093+07	0
\.


--
-- Data for Name: ctn_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ctn_news (news_id, news_cat_id, news_title, news_img, author_by, news_content, ispublished, created_by, created_at, updated_by, updated_at, stat_visit, tags, src_inex, src_news, src_url, isheadline) FROM stdin;
3	2	Cara Optimalkan Latensi Internet Satelit untuk Gaming	/particle8.webp	Syal Pratama	Bermain game kompetitif menggunakan koneksi satelit dulu dianggap tidak mungkin karena masalah latensi (ping) yang tinggi. Namun, dengan hadirnya konstelasi satelit LEO dari Akastar, pengalaman gaming kini menjadi jauh lebih mulus.\nUntuk mendapatkan performa maksimal, pastikan antena atau parabola Anda berada di area terbuka tanpa halangan pohon atau bangunan. Gangguan fisik (obstruction) sekecil apapun dapat menyebabkan packet loss yang berujung pada 'lag spike' saat bermain game.\nSelain itu, gunakan router dengan fitur Quality of Service (QoS) untuk memprioritaskan traffic game di atas unduhan atau streaming. Menghubungkan PC atau konsol langsung ke router menggunakan kabel LAN (Ethernet) juga sangat disarankan untuk kestabilan ekstra.	1	\N	2026-06-22 00:00:00+07	\N	2026-07-27 17:43:14.622+07	2	\N	IN	\N	\N	0
4	3	Rekap Workshop Digitalisasi Desa Bersama NSC	/particle9.webp	Humas NSC	Sebagai bagian dari program CSR perusahaan, NSC sukses menggelar workshop 'Desa Go Digital' yang dihadiri oleh puluhan kepala desa dari berbagai provinsi. Acara ini bertujuan mengedukasi perangkat desa mengenai pemanfaatan internet satelit untuk pelayanan publik.\nSelama workshop, peserta diajarkan cara mengurus administrasi desa secara online, mempromosikan produk UMKM lokal ke pasar global, hingga menyiapkan infrastruktur internet tahan bencana sebagai jalur komunikasi darurat.\nAntusiasme yang tinggi membuktikan bahwa masyarakat pedesaan sangat siap menyambut era digital asalkan didukung dengan infrastruktur konektivitas yang handal dan terjangkau.	1	\N	2026-06-21 00:00:00+07	\N	2026-07-27 17:43:14.622+07	26	\N	IN	\N	\N	0
40	0	BRIN: Satelit NEO-1 Kantongi TKDN 65 Persen, Siap Meluncur Januari 2027	/news/news_kompas.jpg	\N	Badan Riset dan Inovasi Nasional (BRIN) mengungkapkan satelit Nusantara Earth Observation-1 (NEO-1) yang dijadwalkan meluncur pada Januari 2027 memiliki tingkat komponen dalam negeri (TKDN) sekitar 65 persen.	1	admin	2026-07-25 19:31:44.035426+07	\N	2026-07-25 19:31:43.936+07	0	\N	EX	Kompas.com	https://nasional.kompas.com/read/2026/07/08/18085691/brin-satelit-neo-1-kantongi-tkdn-65-persen-siap-meluncur-januari-2027	0
7	2	Jangkauan Satelit LEO di Papua	/kemah.webp	Humas NSC	Menghadirkan konektivitas di wilayah Indonesia Timur, khususnya di area pegunungan Papua, selalu menjadi tantangan logistik yang luar biasa berat bagi penyedia internet fiber optik konvensional.\nNamun, dengan pendekatan konstelasi satelit LEO (Low Earth Orbit), Akastar kini mampu menyediakan akses internet broadband kecepatan tinggi yang stabil langsung ke desa-desa, fasilitas kesehatan, dan sekolah terpencil tanpa perlu membangun menara atau menarik kabel ribuan kilometer.\nInisiatif ini terbukti berhasil meningkatkan taraf edukasi anak-anak daerah serta mempermudah petugas medis dalam mengakses rekam medis elektronik terpusat dengan cepat dan aman.	1	\N	2026-05-15 00:00:00+07	\N	2026-07-27 17:43:14.622+07	0	\N	IN	\N	\N	0
41	0	Starlink: Membuka Pintu Konektivitas Global	/news/news_linkedin.jpg	\N	Starlink membawa revolusi dalam dunia digital dengan memberikan akses cepat dan luas ke wilayah yang sebelumnya sulit dijangkau. Dengan teknologi yang terus berkembang, Starlink memberikan koneksi yang lebih baik untuk masa depan yang lebih terhubung. \nTeknologi Starlink menghadirkan banyak keunggulan yang menjadikannya solusi ideal, baik untuk kebutuhan pribadi maupun bisnis. Berikut merupakan berbagai keunggulan utama dari layanan Starlink.	1	admin	2026-07-25 19:33:10.713625+07	\N	2026-07-25 19:33:10.597+07	0	\N	EX	LinkedIn	https://www.linkedin.com/posts/starlink-menunjung-revolusi-konektivitas-ugcPost-7283443136628998144-YsRQ/	0
42	0	Indonesia launches N5 satellite to boost internet in remote areas	/news/news_techinasia.webp	\N	Indonesia has launched the Nusantara Lima (N5) satellite to boost internet coverage across the country, especially in remote and underserved areas. \nThe satellite, owned by PT Satelit Nusantara Lima, a subsidiary of PT Pasifik Satelit Nusantara, was developed with partners including Boeing Satellite Systems, Hughes Network Systems, and SpaceX.	1	admin	2026-07-25 19:34:14.062627+07	\N	2026-07-25 19:34:13.957+07	0	\N	EX	TechInAsia	https://www.techinasia.com/news/indonesia-launches-n5-satellite-to-boost-internet-in-remote-areas	0
43	0	Indonesia Siapkan Satelit LEO, Tak Cuma Andalkan Starlink	/news/news_detikinet.jpeg	\N	Pemerintah mengungkap operator satelit nasional tengah memproses pengembangan satelit Low Earth Orbit (LEO). Saat ini, proses pengajuan orbit dan frekuensi satelit tersebut telah diajukan ke International Telecommunication Union (ITU) sebagai bagian dari tahapan sebelum satelit dapat diluncurkan.	1	admin	2026-07-25 19:40:56.909951+07	\N	2026-07-25 19:40:56.746+07	0	\N	EX	Detik.com	https://inet.detik.com/law-and-policy/d-8565860/indonesia-siapkan-satelit-leo-tak-cuma-andalkan-starlink	0
1	1	Teknologi Beamforming: Masa Depan Internet Tanpa Lag di Indonesia	/particle9.webp	Syal Pratama	Pernahkah Anda membayangkan koneksi internet satelit yang memiliki kecepatan setara fiber optik dengan latensi yang sangat rendah? Jawabannya terletak pada teknologi Beamforming. Sebagai inovasi terbaru dalam industri komunikasi satelit LEO (Low Earth Orbit), beamforming memungkinkan transmisi sinyal yang lebih fokus dan efisien.\nBerbeda dengan antena tradisional yang memancarkan sinyal ke segala arah, beamforming menggunakan algoritma canggih untuk mengarahkan energi sinyal tepat ke perangkat pengguna. Hal ini meminimalisir gangguan (interference) dan memastikan bandwidth maksimal tersalurkan tanpa hambatan fisik seperti cuaca ekstrem.\nNusantara Star Connect (NSC) telah mulai mengimplementasikan teknologi ini pada perangkat Starlink Enterprise mereka, memberikan pengalaman gaming dan video conference yang mulus bahkan di wilayah terpencil di Indonesia.	1	\N	2026-06-21 20:58:36.561645+07	Syal Pratama	2026-07-27 17:43:14.622+07	25	\N	IN	\N	\N	0
6	1	Update Firmware Antena NSC V2	/beam.webp	Dev Team NSC	Nusantara Star Connect baru saja meluncurkan pembaruan sistem operasi (firmware) versi 2.0 untuk seluruh antena pengguna secara Over-The-Air (OTA). Update ini akan diunduh dan dipasang secara otomatis pada jam non-sibuk.\nPembaruan ini membawa algoritma pelacakan satelit LEO yang lebih presisi, yang diklaim mampu meningkatkan kecepatan penguncian sinyal awal (signal lock) hingga 30% lebih cepat ketika perangkat dinyalakan atau setelah terjadi pemadaman listrik.\nSelain itu, patch keamanan terbaru juga disertakan untuk menutup celah kerentanan, memastikan komunikasi jaringan korporasi Anda tetap aman dari intervensi pihak luar.	1	\N	2026-05-18 00:00:00+07	\N	2026-07-27 17:43:14.622+07	6	\N	IN	\N	\N	0
5	2	Cara Optimalkan Latensi Satelit	/game.webp	Tim Teknis NSC	Latensi atau ping sangat krusial bagi koneksi internet satelit, terutama jika Anda menggunakan layanan kami untuk kebutuhan real-time seperti video conference, VoIP, atau operasional mesin jarak jauh.\nLangkah pertama yang paling penting adalah memastikan instalasi antena (dish) berada di tempat yang 100% bebas hambatan (clear view of the sky). Halangan sekecil daun atau tiang listrik dapat menyebabkan koneksi terputus sepersekian detik dan meningkatkan latensi.\nKami juga sangat merekomendasikan penggunaan koneksi kabel LAN (Ethernet) dari router NSC ke perangkat kerja Anda daripada menggunakan Wi-Fi, karena hal ini dapat secara drastis mengurangi potensi interferensi gelombang radio di sekitar Anda.	1	\N	2026-05-20 00:00:00+07	\N	2026-07-27 17:43:14.622+07	13	\N	IN	\N	\N	0
17	2	NSC Luncurkan Satelit LEO Terbaru di Orbit Indonesia	/particle7.webp	Tim Redaksi NSC	Nusantara Star Connect (NSC) secara resmi mengumumkan peluncuran satelit Low Earth Orbit (LEO) terbarunya yang difokuskan untuk mengkover wilayah timur Indonesia. Langkah ini diambil guna mengatasi tantangan blank spot yang masih sering terjadi di area kepulauan.\nDengan mengorbit di ketinggian kurang dari 1.000 km, satelit ini menawarkan latensi yang jauh lebih rendah dibandingkan satelit geostasioner (GEO) tradisional, memungkinkan komunikasi real-time tanpa jeda yang berarti untuk pengguna korporat maupun residensial.\nDirektur Utama NSC menyatakan bahwa fasilitas ini akan mulai beroperasi penuh pada kuartal ketiga tahun ini, membuka peluang baru bagi sektor pendidikan, kesehatan, dan ekonomi digital di pelosok negeri yang selama ini belum terjangkau fiber optik.	1	admin	2026-07-23 19:18:11.815531+07	Tim Redaksi NSC	2026-07-27 17:43:14.642+07	8	\N	IN	\N	\N	1
44	1	TEs	/upload/fb78341d97426fc034076f1a4fcb22cb3198a372.jpg	sdfsdf	asfd sdfdsf	1	sdfsdf	2026-07-27 20:27:42.084866+07	\N	2026-07-27 20:27:41.97+07	0	\N	IN	\N	\N	0
\.


--
-- Data for Name: ctn_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ctn_users (user_id, user_name, role_id, hash_pass) FROM stdin;
admin	Content Administrator	ADM	$2b$10$AK6L/PJzE3E6g62T/dPMOuEjz1pi33ah9qTntdkKk4C7NTCPPFntG
sales	Product Configurator	SAL	$2b$10$sP/XTsuHuceQQ/oaMFCOD.7DLRJWcotpvMvfnSg4yp/PpUVSyvncK
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (order_item_id, user_id, session_id, sku_id, ref_sku_id, sku_code, sku_name, sales_price, sku_notes, order_status_id, created_by, created_at, updated_by, updated_at) FROM stdin;
23	34	0	54	54		Akastar Net Broadband	13527000.00	\N	2	\N	2026-07-03 10:57:13.44675+07	\N	\N
24	34	0	70	54	UT	UT Flat High Performance	48000000.00	\N	2	\N	2026-07-03 10:57:13.449207+07	\N	\N
25	34	0	35	35		Akastar Link Lite 33 Mbps	16412000.00	\N	2	\N	2026-07-03 11:41:12.389782+07	\N	\N
26	34	0	59	35	UT	UT Flat High Performance	48000000.00	\N	2	\N	2026-07-03 11:41:12.396227+07	\N	\N
27	34	0	44	44		Akastar Link Broadband	13354000.00	\N	2	\N	2026-07-03 12:24:03.495675+07	\N	\N
28	34	0	64	44	UT	UT Flat High Performance	48000000.00	\N	2	\N	2026-07-03 12:24:03.498236+07	\N	\N
41	34	0	40	40		Akastar Link Lite 33 Mbps	14824000.00	\N	4	\N	2026-07-03 16:26:11.31889+07	\N	\N
42	34	0	62	40	UT	UT Flat High Performance	48000000.00	\N	4	\N	2026-07-03 16:26:11.324907+07	\N	\N
43	34	0	44	44		Akastar Link Broadband	13354000.00	\N	4	\N	2026-07-03 16:26:52.522467+07	\N	\N
44	34	0	64	44	UT	UT Flat High Performance	48000000.00	\N	4	\N	2026-07-03 16:26:52.528238+07	\N	\N
45	34	0	39	39		Akastar Link Broadband	14832000.00	\N	4	\N	2026-07-03 16:59:15.958463+07	\N	2026-07-03 16:59:21.079853+07
46	34	0	61	39	UT	UT Flat High Performance	48000000.00	\N	4	\N	2026-07-03 16:59:15.964961+07	\N	2026-07-03 16:59:21.079853+07
47	34	0	35	35		Akastar Link Lite 33 Mbps	16412000.00	\N	2	\N	2026-07-03 17:04:22.20338+07	\N	2026-07-03 17:04:27.447232+07
48	34	0	59	35	UT	UT Flat High Performance	48000000.00	\N	2	\N	2026-07-03 17:04:22.207931+07	\N	2026-07-03 17:04:27.447232+07
49	34	0	35	35		Akastar Link Lite 33 Mbps	16412000.00	\N	2	\N	2026-07-03 17:14:29.198054+07	\N	2026-07-03 17:14:55.293065+07
50	34	0	59	35	UT	UT Flat High Performance	48000000.00	\N	2	\N	2026-07-03 17:14:29.207046+07	\N	2026-07-03 17:14:55.293065+07
51	34	0	52	52		Akastar Net Dedicated 11 Mbps	15228000.00	\N	2	\N	2026-07-03 17:14:47.719374+07	\N	2026-07-03 17:14:55.293065+07
52	34	0	69	52	UT	UT Flat High Performance	48000000.00	\N	2	\N	2026-07-03 17:14:47.818005+07	\N	2026-07-03 17:14:55.293065+07
\.


--
-- Data for Name: order_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_product (order_id, user_id, session_id, order_status_id, sku_id, update_at) FROM stdin;
\N	34	0	2	260001	2026-06-22 20:04:48.860337+07
\N	34	0	2	260010	2026-06-22 20:04:53.348374+07
\N	34	0	2	260002	2026-06-29 21:33:07.354318+07
\N	34	0	2	260098	2026-06-29 21:33:07.357551+07
\N	34	0	2	260020	2026-06-29 21:33:21.309543+07
\N	34	0	2	260099	2026-06-29 21:33:21.316506+07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, session_id, order_status_id, update_at) FROM stdin;
\.


--
-- Data for Name: p_charge_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p_charge_type (charge_type_code, charge_type_name) FROM stdin;
MRC	Monthly Recurring Charge
OTC	One Time Charge
\.


--
-- Data for Name: p_group_gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p_group_gallery (group_id, group_name, group_desc, ord_num) FROM stdin;
1	Instalasi		1
2	Event		2
3	Produk		3
4	Testimoni		4
5	Layanan		5
\.


--
-- Data for Name: p_job_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p_job_type (type_id, type_name, type_desc) FROM stdin;
1	Technical	
3	Operations	
2	Sales	
\.


--
-- Data for Name: p_news_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p_news_cat (news_cat_id, news_cat_name) FROM stdin;
1	Teknologi
2	Satelit
3	Bisnis
\.


--
-- Data for Name: p_service_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p_service_cat (service_cat_id, cat_name, cat_desc, ord_num) FROM stdin;
1	Connectivity	Connectivity	2
2	Bundling	Bundling	4
3	SOC	SOC	5
5	Secure	Secure	3
4	FTTH	FTTH	6
6	kategori lain kkk	kategori lain	8
\.


--
-- Data for Name: p_service_hierarchy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p_service_hierarchy (hier_code, hier_level, hier_parent_code, hier_name) FROM stdin;
SERV	1	\N	Services
TERI	2	SERV	Territory
BWCL	3	TERI	Bandwidth Class
LINE	4	BWCL	Product Line
CPE	4	BWCL	Hardware CPE
\.


--
-- Data for Name: product_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_cat (product_cat_id, category_name, category_desc, ord_num) FROM stdin;
1	Connectivity	Connectivity	2
2	Bundling	Bundling	4
3	SOC	SOC	5
4	FTTH	FTTH	6
5	Secure	Secure	3
\.


--
-- Data for Name: product_sku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_sku (sku_id, product_id, prodstream_code, prodtype_code, spec_mir_up, spec_mir_down, unit_price, sku_name) FROM stdin;
260001	1	MARITIM	DEDC	1,0 Mbps	10 Mbps	16381012.95	Akastar Link Dedicated 11 Mbps
260002	1	MARITIM	DEDC	2,0 Mbps	20 Mbps	28934168.75	Akastar Link Dedicated 20 Mbps
260003	1	MARITIM	LITE	3,0 Mbps	30 Mbps	16411243.30	Akastar Link Lite 33 Mbps
260004	1	MARITIM	LITE	5,0 Mbps	50 Mbps	24800167.41	Akastar Link Lite 55 Mbps
260007	1	LAND	DEDC	1,0 Mbps	10 Mbps	14795614.30	Akastar Link Dedicated 11 Mbps
260008	1	LAND	DEDC	2,0 Mbps	20 Mbps	26477657.17	Akastar Link Dedicated 20 Mbps
260009	1	LAND	LITE	3,0 Mbps	30 Mbps	14823746.85	Akastar Link Lite 30 Mbps
260010	1	LAND	LITE	5,0 Mbps	50 Mbps	22630530.47	Akastar Link Lite 55 Mbps
260013	2	MARITIM	DEDC	1,0 Mbps	10 Mbps	16813155.80	Akastar Net Dedicated 11 Mbps
260014	2	MARITIM	DEDC	2,0 Mbps	20 Mbps	29798454.46	Akastar Net Dedicated 22 Mbps
260015	2	MARITIM	LITE	3,0 Mbps	30 Mbps	16735350.45	Akastar Net Lite 33 Mbps
260016	2	MARITIM	LITE	5,0 Mbps	50 Mbps	25340345.98	Akastar Net Lite 55 Mbps
260019	2	LAND	DEDC	1,0 Mbps	10 Mbps	15227757.16	Akastar Net Dedicated 11 Mbps
260020	2	LAND	DEDC	2,0 Mbps	20 Mbps	27341942.88	Akastar Net Dedicated 22 Mbps
260021	2	LAND	LITE	3,0 Mbps	30 Mbps	15147854.00	Akastar Net Lite 33 Mbps
260022	2	LAND	LITE	5,0 Mbps	50 Mbps	23170709.04	Akastar Net Lite 55 Mbps
260098	1	HWOTC	ANT	\N	\N	500.00	UT (Antenna Flat High Performance) for Akastar Link
260099	2	HWOTC	ANT	\N	\N	500.00	UT (Antenna Flat High Performance) for Akastar Net
260005	1	MARITIM	BROA	10,0 Mbps	100 Mbps	14831707.14	Akastar Link Broadband
260006	1	MARITIM	IPTV	2,0 Mbps	20 Mbps	31639785.71	Akastar Link IPTV
260011	1	LAND	BROA	10,0 Mbps	100 Mbps	13353820.93	Akastar Link Broadband
260012	1	LAND	IPTV	2,0 Mbps	20 Mbps	28995520.71	Akastar Link IPTV
260017	2	MARITIM	BROA	10,0 Mbps	100 Mbps	15004564.29	Akastar Net Broadband
260018	2	MARITIM	IPTV	2,0 Mbps	20 Mbps	32504071.43	Akastar Net IPTV
260023	2	LAND	BROA	10,0 Mbps	100 Mbps	13526678.07	Akastar Net Broadband
260024	2	LAND	IPTV	2,0 Mbps	20 Mbps	29859806.43	Akastar Net IPTV
\.


--
-- Data for Name: product_stream; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_stream (prodstream_code, prodstream_name) FROM stdin;
MARITIM	MRC Maritim
LAND	MRC Land
HWOTC	Perangkat
\.


--
-- Data for Name: product_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_type (prodtype_code, prodtype_name) FROM stdin;
DEDC	Dedicated
LITE	Lite
BROA	Broadband
IPTV	IPTV
ANT	Antenna
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, product_name, product_icon, product_image, product_desc, features, segment_desc, specification, product_unit, product_status, product_code, product_price, product_cat_id, is_active) FROM stdin;
4	IPTV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-check-icon lucide-monitor-check"><path d="m9 10 2 2 4-4"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>	/streaming.webp	Paket bundling terintegrasi yang menggabungkan konektivitas internet satelit LEO dengan platform hiburan TV interaktif untuk meningkatkan kesejahteraan karyawan atau pelanggan di lapangan.	Akses ke 60+ channel lokal dan premium internasional, dan optimasi bandwidth lokal.	Kapal maritim (Kapal Transport/Kargo/Tanker), mess karyawan pertambangan, dan Hotel/resor pulau terpencil.	{"Headend kompresi video HD/4K","Set-Top Box (STB) IPTV Android","Sistem manajemen konten terpusat"}	\N	\N	iptv	1200000.00	2	1
1	Akastar Link (Layer 2)	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-satellite-icon lucide-satellite"><path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"/><path d="M16.5 7.5 19 5"/><path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"/><path d="M9 21a6 6 0 0 0-6-6"/><path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"/></svg>	/darurat.webp	Solusi interkoneksi privat berbasis satelit LEO (Starlink Enterprise) yang bertindak sebagai virtual leased line aman untuk menghubungkan remote site langsung ke Data Center/HQ tanpa terekspos internet publik.	Isolasi trafik end-to-end, transparansi protokol jaringan, kompatibel penuh dengan arsitektur SD-WAN korporat, dan dukungan VLAN Stacking (QinQ).	Sektor finansial/perbankan, instansi militer, kantor pemerintahan, dan Industri sensitif data.	{"L2VPN Encapsulation","Latensi ultra-rendah <40ms","Bandwidth terkelola & SLA ketersediaan jaringan hingga 99%"}	\N	\N	connectivity-l2	5500000.00	1	1
3	Akastar Secure	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>	/hero3.webp	Proteksi tambahan berlapis pada jaringan internet satelit Akastar untuk menangkal serangan siber dari lapisan luar hingga dalam.	Gateway Network Detection, Edge Network Detection, End Point Detection Response (EDR) / Next Generation Anti Virus (AV) berbasis cloud & On Premise, enkripsi trafik ujung-ke-ujung, content filtering, dan sistem pencegahan intrusi (IPS).	Perusahaan skala Enterprise, retail di area terpencil yang memproses transaksi digital, dan infrastruktur kritikal.	{"Cloud-based security gateway","Monitoring keamanan siber proaktif","Enkripsi AES-256 & pelaporan ancaman mingguan otomatis"}	\N	\N	secure	2200000.00	5	1
5	Akastar Bundling Solution: Private LTE	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-wifi-icon lucide-house-wifi"><path d="M9.5 13.866a4 4 0 0 1 5 .01"/><path d="M12 17h.01"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 10.754a8 8 0 0 1 10 0"/></svg>	/image2.webp	Penyediaan jaringan seluler privat mandiri (4G/5G) lokal di area terpencil yang dihubungkan ke jaringan pusat via backhaul satelit Akastar.	Sinyal seluler lokal yang andal, kartu SIM lokal khusus korporasi, panggilan suara (VoLTE), dan transfer data lokal tanpa kuota internet.	Area konsesi pertambangan besar, kilang minyak pedalaman, dan kompleks perkebunan multinasional.	{"Infrastruktur eNodeB/gNodeB Femtocell kompak","Core Network lokal \\\\& interkoneksi backhaul satelit terenkripsi","Sistem manajemen konten terpusat"}	\N	\N	private-lte	12500000.00	2	1
7	IoT - Vessel Management	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-satellite-dish-icon lucide-satellite-dish"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>	/kapal.webp	Solusi pelacakan, pemantauan aset, dan efisiensi manajemen operasional kapal laut secara real-time via konektivitas satelit.	Pelacakan posisi kapal (Vessel Tracking), monitoring konsumsi bahan bakar (fuel level sensor), telemetri mesin kapal, dan alarm darurat siber.	Perusahaan logistik laut, kapal tanker minyak/gas, Industri perikanan komersial, dan kapal tunda (tugboat).	{"Integrasi GPS presisi tinggi","Sensor ultrasonik / aliran bahan bakar (Flow Meter)","Transmisi data terjadwal otomatis & dashboard maritim khusus"}	\N	\N	iot-vessel	6800000.00	2	1
8	IoT Environment	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>	/konstruksi.webp	Solusi otomatisasi pemantauan parameter lingkungan hidup di sekitar wilayah operasional industri untuk pemenuhan regulasi dan pencegahan bencana.	Sensor kualitas udara (Particulate Matter), deteksi dini kebakaran hutan (wildfire early detection), dan alarm polusi otomatis.	Industri manufaktur hulu, pembangkit listrik (PLTU/PLTA), dan area konservasi kehutanan.	{"Sensor emisi gas & tingkat kedalaman air","Integrasi platform pelaporan lingkungan hidup","Operasi mandiri berbasis tenaga surya (solar panel powered)"}	\N	\N	iot-environment	5200000.00	2	1
10	Akastar Home: Area Bekasi (FTTH)	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-wifi-icon lucide-house-wifi"><path d="M9.5 13.866a4 4 0 0 1 5 .01"/><path d="M12 17h.01"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 10.754a8 8 0 0 1 10 0"/></svg>	/residential.webp	Layanan internet broadband berbasis kabel serat optik (FTTH) berkecepatan tinggi dan stabil untuk memenuhi kebutuhan digital rumah tangga, profesional, keluarga, dan pekerja Remote / WFH yang berdomisili di Area Bekasi.	Koneksi internet rumah berkecepatan tinggi, jaringan stabil berbasis fiber optik penuh tanpa terpengaruh cuaca, dan harga langganan bulanan kompetitif.	Segmen konsumen residensial, keluarga, dan pekerja Remote / WFH yang berdomisili di Area Bekasi.	{"Infrastruktur jaringan kabel FTTH murni","Bandwidth internet unlimited tanpa FUP ketat","Modem Wi-Fi rumah terbundel standar"}	\N	\N	home-ftth	450000.00	4	1
2	Akastar Net (Layer 3)	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>	/hero4.webp	Layanan akses internet publik premium berkecepatan tinggi berbasis satelit LEO untuk operasional bisnis di wilayah blankspot.	Opsi IP Publik Statis, optimalisasi jalur routing internasional murni, instalasi plug-and-play, dan dashboard monitoring penggunaan bandwidth.	Mess perkebunan, site konstruksi baru, wilayah rural, dan kantor cabang pembantu di pelosok daerah.	{"IPv4/IPv6 Public Routing","Broadband download up to 220 Mbps, upload up to 25 Mbps","Interkoneksi langsung ke global internet backbone"}	\N	\N	connectivity-l3	3500000.00	1	1
6	IoT - Agriculture	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu-icon lucide-cpu"><path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>	/NSC-mini.webp	Ekosistem pertanian pintar berbasis IoT dengan transmisi data data sensor real-time via jaringan satelit LEO untuk optimalisasi hasil panen di area rural.	Sensor kelembapan tanah & cuaca mikro, otomatisasi sistem irigasi, dashboard analisis kesuburan, dan notifikasi anomali via aplikasi.	Perusahaan perkebunan kelapa sawit, karet, tebu, dan pertanian skala industri (agribisnis).	{"Protokol sensor nirkabel (LoRaWAN/MQTT)","Perangkat bersertifikasi IP67 (tahan cuaca)","Visualisasi data berbasis cloud & integrasi API"}	\N	\N	iot-agriculture	4500000.00	2	1
9	Security Operation Center	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>	/padang.webp	Layanan Security Operation Center (SOC) terkelola untuk memantau, mendeteksi, dan memitigasi ancaman siber pada seluruh infrastruktur jaringan bisnis secara real-time 24/7.	Monitoring keamanan siber 24/7/365, deteksi ancaman, manajemen insiden kilat, dan tim ahli siber (Cybersecurity Analyst) tersertifikasi.	Kantor pusat korporasi, entitas perbankan, penyedia layanan publik, dan operasional industri strategis (B2B/B2G).	{"Arsitektur SIEM (Security Information and Event Management)","Koordinasi respons insiden siber cepat","Pelaporan kepatuhan regulasi data & sistem mitigasi otomatis"}	\N	\N	soc	15000000.00	3	1
11	UT (Antenna Flat High Performance)	\N	\N	Antenna Flat High Performance	\N	\N	\N	\N	\N	otc	0.00	\N	0
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (service_id, service_code, service_name, unit_price, charge_type_code, service_cat_id, hier_code, service_icon, service_img, service_desc, isactive, ord_num, spec_attributes, service_parent_id, sales_price) FROM stdin;
37		Akastar Link Dedicated 11 Mbps	16381012.95	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "1,0 Mbps", "mir_down": "10 Mbps"}	18	16382000.00
49		Akastar Net Broadband	15004564.29	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "100 Mbps"}	25	15005000.00
50		Akastar Net Lite 33 Mbps	15147854.00	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "3,0 Mbps", "mir_down": "30 Mbps"}	26	15148000.00
52		Akastar Net Dedicated 11 Mbps	15227757.16	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "1,0 Mbps", "mir_down": "10 Mbps"}	27	15228000.00
53		Akastar Net Dedicated 22 Mbps	27341942.88	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "2,0 Mbps", "mir_down": "20 Mbps"}	27	27342000.00
54		Akastar Net Broadband	13526678.07	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "100 Mbps"}	28	13527000.00
4	iptv	IPTV	\N	\N	2	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-check-icon lucide-monitor-check"><path d="m9 10 2 2 4-4"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>	/streaming.webp	Paket bundling terintegrasi yang menggabungkan konektivitas internet satelit LEO dengan platform hiburan TV interaktif untuk meningkatkan kesejahteraan karyawan atau pelanggan di lapangan.	1	4	{"specs": ["Headend kompresi video HD/4K", "Set-Top Box (STB) IPTV Android", "Sistem manajemen konten terpusat"], "feature": "Akses ke 60+ channel lokal dan premium internasional, dan optimasi bandwidth lokal.", "segment": "Kapal maritim (Kapal Transport/Kargo/Tanker), mess karyawan pertambangan, dan Hotel/resor pulau terpencil.", "channels": {"Anak": ["Nick Jr", "Kids TV", "Cbeebies", "Dreamworks"], "Olahraga": ["Olahraga mengikuti lisensi haksiar"], "TV Nasional": ["Trans TV", "RCTI", "Indosiar", "MNCTV", "SCTV", "ANTV", "Metro TV", "Trans 7"], "Film Asia & Barat": ["HBO (Group)", "AXN", "Cinemachi", "Zee Bioskop", "Hits Movies", "One"]}}	\N	\N
2	connectivity-l3	Akastar Net (Layer 3)	\N	\N	1	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>	/hero4.webp	Layanan akses internet publik premium berkecepatan tinggi berbasis satelit LEO untuk operasional bisnis di wilayah blankspot.	1	2	{"specs": ["IPv4/IPv6 Public Routing", "Broadband download up to 220 Mbps, upload up to 25 Mbps", "Interkoneksi langsung ke global internet backbone"], "feature": "Opsi IP Publik Statis, optimalisasi jalur routing internasional murni, instalasi plug-and-play, dan dashboard monitoring penggunaan bandwidth.", "segment": "Mess perkebunan, site konstruksi baru, wilayah rural, dan kantor cabang pembantu di pelosok daerah."}	\N	\N
11	M	L2 Maritim	\N	\N	1	TERI	\N	\N	\N	1	0	\N	1	\N
51		Akastar Net Lite 55 Mbps	23170709.04	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "5,0 Mbps", "mir_down": "50 Mbps"}	26	23171000.00
5	private-lte	Akastar Bundling Solution: Private LTE	\N	\N	2	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-wifi-icon lucide-house-wifi"><path d="M9.5 13.866a4 4 0 0 1 5 .01"/><path d="M12 17h.01"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 10.754a8 8 0 0 1 10 0"/></svg>	/image2.webp	Penyediaan jaringan seluler privat mandiri (4G/5G) lokal di area terpencil yang dihubungkan ke jaringan pusat via backhaul satelit Akastar.	1	6	{"specs": ["Infrastruktur eNodeB/gNodeB Femtocell kompak", "Core Network lokal \\\\& interkoneksi backhaul satelit terenkripsi", "Sistem manajemen konten terpusat"], "feature": "Sinyal seluler lokal yang andal, kartu SIM lokal khusus korporasi, panggilan suara (VoLTE), dan transfer data lokal tanpa kuota internet.", "segment": "Area konsesi pertambangan besar, kilang minyak pedalaman, dan kompleks perkebunan multinasional."}	\N	\N
35		Akastar Link Lite 33 Mbps	16411243.30	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "3,0 Mbps", "mir_down": "30 Mbps"}	17	16412000.00
39		Akastar Link Broadband	14831707.14	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "100 Mbps"}	19	14832000.00
55		IPTV Bundling Akastar Link	31639785.71	MRC	2	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "10 Mbps"}	15	31640000.00
58		IPTV Bundling Akastar Net	29859806.43	MRC	2	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "10 Mbps"}	16	29860000.00
56		IPTV Bundling Akastar Net	32504071.43	MRC	2	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "10 Mbps"}	15	32505000.00
57		IPTV Bundling Akastar Link	28995520.71	MRC	2	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "10 Mbps"}	16	28996000.00
38		Akastar Link Dedicated 22 Mbps	28934168.75	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "2,0 Mbps", "mir_down": "20 Mbps"}	18	28935000.00
3	secure	Akastar Secure	\N	\N	5	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>	/hero3.webp	Proteksi tambahan berlapis pada jaringan internet satelit Akastar untuk menangkal serangan siber dari lapisan luar hingga dalam.	1	3	{"specs": ["Cloud-based security gateway", "Monitoring keamanan siber proaktif", "Enkripsi AES-256 & pelaporan ancaman mingguan otomatis"], "feature": "Gateway Network Detection, Edge Network Detection, End Point Detection Response (EDR) / Next Generation Anti Virus (AV) berbasis cloud & On Premise, enkripsi trafik ujung-ke-ujung, content filtering, dan sistem pencegahan intrusi (IPS).", "segment": "Perusahaan skala Enterprise, retail di area terpencil yang memproses transaksi digital, dan infrastruktur kritikal."}	\N	\N
12	L	L2 Land	\N	\N	1	TERI	\N	\N	\N	1	0	\N	1	\N
13	M	L3 Maritim	\N	\N	1	TERI	\N	\N	\N	1	0	\N	2	\N
14	L	L3 Land	\N	\N	1	TERI	\N	\N	\N	1	0	\N	2	\N
15	iptvm	IPTV Maritim	\N	\N	2	TERI	\N	\N	\N	1	0	\N	4	\N
16	iptvl	IPTV Land	\N	\N	2	TERI	\N	\N	\N	1	0	\N	4	\N
17	l2m-lite	Lite	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	11	\N
18	l2m-dedi	Dedicated	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	11	\N
19	l2m-broad	Broadband	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	11	\N
20	l2l-lite	Lite	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	12	\N
21	l2l-dedi	Dedicated	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	12	\N
22	l2l-broad	Broadband	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	12	\N
23	l3m-lite	Lite	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	13	\N
24	l3m-dedi	Dedicated	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	13	\N
25	l3m-broad	Broadband	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	13	\N
26	l3l-lite	Lite	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	14	\N
27	l3l-dedi	Dedicated	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	14	\N
28	l3l-broad	Broadband	\N	\N	1	BWCL	\N	\N	\N	1	0	\N	14	\N
10	home-ftth	Akastar Home: Area Bekasi (FTTH)	\N	\N	4	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-wifi-icon lucide-house-wifi"><path d="M9.5 13.866a4 4 0 0 1 5 .01"/><path d="M12 17h.01"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 10.754a8 8 0 0 1 10 0"/></svg>	/residential.webp	Layanan internet broadband berbasis kabel serat optik (FTTH) berkecepatan tinggi dan stabil untuk memenuhi kebutuhan digital rumah tangga, profesional, keluarga, dan pekerja Remote / WFH yang berdomisili di Area Bekasi.	1	10	{"specs": ["Infrastruktur jaringan kabel FTTH murni", "Bandwidth internet unlimited tanpa FUP ketat", "Modem Wi-Fi rumah terbundel standar"], "feature": "Koneksi internet rumah berkecepatan tinggi, jaringan stabil berbasis fiber optik penuh tanpa terpengaruh cuaca, dan harga langganan bulanan kompetitif.", "segment": "Segmen konsumen residensial, keluarga, dan pekerja Remote / WFH yang berdomisili di Area Bekasi."}	\N	\N
1	connectivity-l2	Akastar Link (Layer 2)	\N	\N	1	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-satellite-icon lucide-satellite"><path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"/><path d="M16.5 7.5 19 5"/><path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"/><path d="M9 21a6 6 0 0 0-6-6"/><path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"/></svg>	/darurat.webp	Solusi interkoneksi privat berbasis satelit LEO (Starlink Enterprise) yang bertindak sebagai virtual leased line aman untuk menghubungkan remote site langsung ke Data Center/HQ tanpa terekspos internet publik.	1	1	{"specs": ["L2VPN Encapsulation", "Latensi ultra-rendah <40ms", "Bandwidth terkelola & SLA ketersediaan jaringan hingga 99%"], "feature": "Isolasi trafik end-to-end, transparansi protokol jaringan, kompatibel penuh dengan arsitektur SD-WAN korporat, dan dukungan VLAN Stacking (QinQ).", "segment": "Sektor finansial/perbankan, instansi militer, kantor pemerintahan, dan Industri sensitif data."}	\N	\N
9	soc	Security Operation Center	\N	\N	3	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>	/padang.webp	Layanan Security Operation Center (SOC) terkelola untuk memantau, mendeteksi, dan memitigasi ancaman siber pada seluruh infrastruktur jaringan bisnis secara real-time 24/7.	1	5	{"specs": ["Arsitektur SIEM (Security Information and Event Management)", "Koordinasi respons insiden siber cepat", "Pelaporan kepatuhan regulasi data & sistem mitigasi otomatis"], "feature": "Monitoring keamanan siber 24/7/365, deteksi ancaman, manajemen insiden kilat, dan tim ahli siber (Cybersecurity Analyst) tersertifikasi.", "segment": "Kantor pusat korporasi, entitas perbankan, penyedia layanan publik, dan operasional industri strategis (B2B/B2G)."}	\N	\N
8	iot-environment	IoT Environment	\N	\N	2	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>	/konstruksi.webp	Solusi otomatisasi pemantauan parameter lingkungan hidup di sekitar wilayah operasional industri untuk pemenuhan regulasi dan pencegahan bencana.	1	7	{"specs": ["Sensor emisi gas & tingkat kedalaman air", "Integrasi platform pelaporan lingkungan hidup", "Operasi mandiri berbasis tenaga surya (solar panel powered)"], "feature": "Sensor kualitas udara (Particulate Matter), deteksi dini kebakaran hutan (wildfire early detection), dan alarm polusi otomatis.", "segment": "Industri manufaktur hulu, pembangkit listrik (PLTU/PLTA), dan area konservasi kehutanan."}	\N	\N
36		Akastar Link Lite 55 Mbps	24800167.41	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "5,0 Mbps", "mir_down": "50 Mbps"}	17	24801000.00
7	iot-vessel	IoT - Vessel Management	\N	\N	2	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-satellite-dish-icon lucide-satellite-dish"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>	/kapal.webp	Solusi pelacakan, pemantauan aset, dan efisiensi manajemen operasional kapal laut secara real-time via konektivitas satelit.	1	8	{"specs": ["Integrasi GPS presisi tinggi", "Sensor ultrasonik / aliran bahan bakar (Flow Meter)", "Transmisi data terjadwal otomatis & dashboard maritim khusus"], "feature": "Pelacakan posisi kapal (Vessel Tracking), monitoring konsumsi bahan bakar (fuel level sensor), telemetri mesin kapal, dan alarm darurat siber.", "segment": "Perusahaan logistik laut, kapal tanker minyak/gas, Industri perikanan komersial, dan kapal tunda (tugboat)."}	\N	\N
6	iot-agriculture	IoT - Agriculture	\N	\N	2	SERV	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu-icon lucide-cpu"><path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>	/NSC-mini.webp	Ekosistem pertanian pintar berbasis IoT dengan transmisi data data sensor real-time via jaringan satelit LEO untuk optimalisasi hasil panen di area rural.	1	8	{"specs": ["Protokol sensor nirkabel (LoRaWAN/MQTT)", "Perangkat bersertifikasi IP67 (tahan cuaca)", "Visualisasi data berbasis cloud & integrasi API"], "feature": "Sensor kelembapan tanah & cuaca mikro, otomatisasi sistem irigasi, dashboard analisis kesuburan, dan notifikasi anomali via aplikasi.", "segment": "Perusahaan perkebunan kelapa sawit, karet, tebu, dan pertanian skala industri (agribisnis)."}	\N	\N
59	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	17	48000000.00
60	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	18	48000000.00
61	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	19	48000000.00
62	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	20	48000000.00
63	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	21	48000000.00
64	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	22	48000000.00
65	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	23	48000000.00
66	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	24	48000000.00
67	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	25	48000000.00
68	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	26	48000000.00
69	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	27	48000000.00
70	UT	UT Flat High Performance	48000000.00	OTC	1	CPE	\N	\N	\N	1	0	{"mir_up": "", "mir_down": ""}	28	48000000.00
40		Akastar Link Lite 33 Mbps	14823746.85	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "3,0 Mbps", "mir_down": "30 Mbps"}	20	14824000.00
41		Akastar Link Lite 55 Mbps	22630530.47	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "5,0 Mbps", "mir_down": "50 Mbps"}	20	22631000.00
42		Akastar Link Dedicated 11 Mbps	14795614.30	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "1,0 Mbps", "mir_down": "10 Mbps"}	21	14796000.00
43		Akastar Link Dedicated 22 Mbps	26477657.17	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "2,0 Mbps", "mir_down": "20 Mbps"}	21	26478000.00
44		Akastar Link Broadband	13353820.93	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "10 Mbps", "mir_down": "100 Mbps"}	22	13354000.00
45		Akastar Net Lite 33 Mbps	16735350.45	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "3,0 Mbps", "mir_down": "30 Mbps"}	23	16736000.00
46		Akastar Net Lite 55 Mbps	25340345.98	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "5,0 Mbps", "mir_down": "50 Mbps"}	23	25341000.00
47		Akastar Net Dedicated 11 Mbps	16813155.80	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "1,0 Mbps", "mir_down": "10 Mbps"}	24	16814000.00
48		Akastar Net Dedicated 22 Mbps	29798454.46	MRC	1	LINE	\N	\N	\N	1	0	{"mir_up": "2,0 Mbps", "mir_down": "20 Mbps"}	24	29799000.00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, created_at, phone_no, isverified, company_name, job_title, profession) FROM stdin;
27	Yohanes Papang	yohanes.papang@gmail.com	$2b$10$Xc5XeVw46kP/5kRc6uG8ruz0o/Tv6xVmx/lcE1SwXmLyQB6EFA6ru	2026-06-17 19:47:05.026966	08242349	1	\N	\N	\N
34	Papang2	yohanes.papang2@gmail.com	$2b$10$ugVkGsSyo58Kncw8KdgCyuAJhkDvprhLnoWczqg.NspIj7aVKDfWe	2026-06-19 05:48:51.777986	7238434	1	\N	\N	\N
36	Gabriella	litegizmo@gmail.com	$2b$10$eZR5I64JqvLEXh6Sf4IAPu9xSnmOwt9G9NPTuKiohVk5EM5mosf32	2026-06-29 22:31:40.68599	02349340	0	Testing	Tesitng	test
38	Yohanes Papang R	papang@vidici.id	$2b$10$nxtps4CZT1Y2.nscHLOx8ugkeKItoxwc/7tgpxiXshMwmO76PlMwe	2026-07-02 08:53:19.653179	08128934	0			dev
\.


--
-- Name: gal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gal_id_seq', 7, true);


--
-- Name: job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_id_seq', 7, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 44, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_item_id_seq', 52, true);


--
-- Name: product_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_cat_id_seq', 5, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 11, true);


--
-- Name: req_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.req_id_seq', 1, false);


--
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.service_id_seq', 70, true);


--
-- Name: sku_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sku_id_seq', 260024, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 38, true);


--
-- Name: appreq_session appreq_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appreq_session
    ADD CONSTRAINT appreq_session_pkey PRIMARY KEY (req_id);


--
-- Name: ctn_gallery ctn_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_gallery
    ADD CONSTRAINT ctn_gallery_pkey PRIMARY KEY (gal_id);


--
-- Name: ctn_job_career ctn_job_career_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_job_career
    ADD CONSTRAINT ctn_job_career_pkey PRIMARY KEY (job_id);


--
-- Name: ctn_news ctn_news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_news
    ADD CONSTRAINT ctn_news_pkey PRIMARY KEY (news_id);


--
-- Name: ctn_users ctn_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_users
    ADD CONSTRAINT ctn_users_pkey PRIMARY KEY (user_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: p_charge_type p_charge_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_charge_type
    ADD CONSTRAINT p_charge_type_pkey PRIMARY KEY (charge_type_code);


--
-- Name: p_group_gallery p_group_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_group_gallery
    ADD CONSTRAINT p_group_gallery_pkey PRIMARY KEY (group_id);


--
-- Name: p_job_type p_job_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_job_type
    ADD CONSTRAINT p_job_type_pkey PRIMARY KEY (type_id);


--
-- Name: p_news_cat p_news_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_news_cat
    ADD CONSTRAINT p_news_cat_pkey PRIMARY KEY (news_cat_id);


--
-- Name: product_cat product_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_cat
    ADD CONSTRAINT product_cat_pkey PRIMARY KEY (product_cat_id);


--
-- Name: product_sku product_sku_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku
    ADD CONSTRAINT product_sku_pkey PRIMARY KEY (sku_id);


--
-- Name: product_stream product_stream_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_stream
    ADD CONSTRAINT product_stream_pkey PRIMARY KEY (prodstream_code);


--
-- Name: product_type product_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_type
    ADD CONSTRAINT product_type_pkey PRIMARY KEY (prodtype_code);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: p_service_cat service_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_service_cat
    ADD CONSTRAINT service_cat_pkey PRIMARY KEY (service_cat_id);


--
-- Name: p_service_hierarchy service_hierarchy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_service_hierarchy
    ADD CONSTRAINT service_hierarchy_pkey PRIMARY KEY (hier_code);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

\unrestrict myRyo3JmaxAY7WQ0jIxqsQ5ifKJaJDcQ4Fqsh2sMtO1lIYS3QSq1NTECWdaBupE

