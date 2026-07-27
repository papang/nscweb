--
-- PostgreSQL database dump
--

\restrict fmFu2ELpHW2JamEB6xNDfU04x4y7DVPtrcwJejLjACbCqS2xpd7tiuuDxnkGLzW

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
-- Name: p_news_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p_news_cat (
    news_cat_id integer NOT NULL,
    news_cat_name character varying(50)
);


ALTER TABLE public.p_news_cat OWNER TO postgres;

--
-- Data for Name: p_news_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.p_news_cat VALUES (1, 'Teknologi');
INSERT INTO public.p_news_cat VALUES (2, 'Satelit');
INSERT INTO public.p_news_cat VALUES (3, 'Bisnis');


--
-- Name: p_news_cat p_news_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.p_news_cat
    ADD CONSTRAINT p_news_cat_pkey PRIMARY KEY (news_cat_id);


--
-- PostgreSQL database dump complete
--

\unrestrict fmFu2ELpHW2JamEB6xNDfU04x4y7DVPtrcwJejLjACbCqS2xpd7tiuuDxnkGLzW

