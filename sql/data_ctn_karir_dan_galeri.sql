--
-- PostgreSQL database dump
--

\restrict o098GKrLXfgWbcidHnjePQvLC6fv0vEajRAxGimnoj66v9BHaLsQxVgdriTBtbK

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
-- Name: ctn_gallery gal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_gallery ALTER COLUMN gal_id SET DEFAULT nextval('public.gal_id_seq'::regclass);


--
-- Name: ctn_job_career job_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_job_career ALTER COLUMN job_id SET DEFAULT nextval('public.job_id_seq'::regclass);


--
-- Data for Name: ctn_gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ctn_gallery VALUES (1, 1, 'Instalasi Antena NSC di Area Pegunungan', 'video', '/starlink_gunung.mp4', '/thumb_instalasi_gunung.png', '2026-07-27 16:34:44.787547+07', NULL, NULL, NULL);
INSERT INTO public.ctn_gallery VALUES (3, 3, 'Instalasi Antena NSC di Area Pegunungan', 'video', '/starlink_gunung.mp4', '/thumb_instalasi_gunung.png', '2026-07-27 16:39:03.985757+07', NULL, '2026-07-28 12:13:21.926+07', '');
INSERT INTO public.ctn_gallery VALUES (5, 2, 'test dff', 'image', NULL, NULL, '2026-07-28 13:02:36.963171+07', '', '2026-07-28 13:02:36.808+07', NULL);
INSERT INTO public.ctn_gallery VALUES (6, 2, 'sdfs', 'image', NULL, NULL, '2026-07-28 13:09:53.229743+07', '', '2026-07-28 13:09:53.024+07', NULL);
INSERT INTO public.ctn_gallery VALUES (7, 3, 'ini adalah galeri baru', 'image', '/upload/2c84ce1bd45b971963bb9b2e8043fd59be28296c.jpg', NULL, '2026-07-28 13:11:15.168343+07', '', '2026-07-28 13:11:15.061+07', NULL);


--
-- Data for Name: ctn_job_career; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ctn_job_career VALUES (1, 'Account Executive sd', 'Full-time', 1, 'Surabaya edit', 'Jadi tugasnya begini yg lebih panjang
', '{"Pengalaman minimal 3 tahun dalam B2B Sales, lebih disukai di industri IT/Telco.","Mampu menyusun proposal penawaran teknis dan komersial.","Memiliki jaringan koneksi yang luas di industri pertambangan, maritim, atau logistik.","Berorientasi pada target dan mampu bekerja dengan supervisi minimum."}', 'admin', '2026-07-27 21:15:47.490328+07', NULL, '2026-07-28 11:43:14.27+07', 0);
INSERT INTO public.ctn_job_career VALUES (5, 'Engineer', 'Full-time', 1, 'Jakarta', 'montoring server dsfsdfsf', '{"mengerti linux"}', NULL, '2026-07-28 11:39:12.773947+07', NULL, '2026-07-28 11:45:43.246+07', 0);
INSERT INTO public.ctn_job_career VALUES (6, 'Account Executive sd', 'Full-time', 1, 'Surabaya edit', 'apa aja', '{howto}', NULL, '2026-07-28 11:42:01.774134+07', NULL, '2026-07-28 11:43:02.093+07', 0);


--
-- Data for Name: p_group_gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.p_group_gallery VALUES (1, 'Instalasi', '', 1);
INSERT INTO public.p_group_gallery VALUES (2, 'Event', '', 2);
INSERT INTO public.p_group_gallery VALUES (3, 'Produk', '', 3);
INSERT INTO public.p_group_gallery VALUES (4, 'Testimoni', '', 4);
INSERT INTO public.p_group_gallery VALUES (5, 'Layanan', '', 5);


--
-- Data for Name: p_job_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.p_job_type VALUES (1, 'Technical', '');
INSERT INTO public.p_job_type VALUES (3, 'Operations', '');
INSERT INTO public.p_job_type VALUES (2, 'Sales', '');


--
-- Name: gal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gal_id_seq', 7, true);


--
-- Name: job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_id_seq', 7, true);


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
-- PostgreSQL database dump complete
--

\unrestrict o098GKrLXfgWbcidHnjePQvLC6fv0vEajRAxGimnoj66v9BHaLsQxVgdriTBtbK

