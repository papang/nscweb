--
-- PostgreSQL database dump
--

\restrict 5nZHcjHNyP6JMkn2fPfDPbWnx6NCbUpXTtZ4SWdU69W1lcTbcCtyeOR3f4VP9Ii

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
-- Data for Name: ctn_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ctn_users VALUES ('admin', 'Content Administrator', 'ADM', '$2b$10$AK6L/PJzE3E6g62T/dPMOuEjz1pi33ah9qTntdkKk4C7NTCPPFntG');
INSERT INTO public.ctn_users VALUES ('sales', 'Product Configurator', 'SAL', '$2b$10$sP/XTsuHuceQQ/oaMFCOD.7DLRJWcotpvMvfnSg4yp/PpUVSyvncK');


--
-- Name: ctn_users ctn_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctn_users
    ADD CONSTRAINT ctn_users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

\unrestrict 5nZHcjHNyP6JMkn2fPfDPbWnx6NCbUpXTtZ4SWdU69W1lcTbcCtyeOR3f4VP9Ii

