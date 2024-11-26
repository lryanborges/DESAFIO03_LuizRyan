--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 14.5 (Debian 14.5-2.pgdg110+2)

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: cars_status_enum; Type: TYPE; Schema: public; Owner: compass_car
--

CREATE TYPE public.cars_status_enum AS ENUM (
    'ativo',
    'inativo',
    'excluído'
);


ALTER TYPE public.cars_status_enum OWNER TO compass_car;

--
-- Name: orders_status_enum; Type: TYPE; Schema: public; Owner: compass_car
--

CREATE TYPE public.orders_status_enum AS ENUM (
    'aberto',
    'aprovado',
    'cancelado'
);


ALTER TYPE public.orders_status_enum OWNER TO compass_car;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: compass_car
--

CREATE TABLE public.cars (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "licensePlate" character varying NOT NULL,
    brand character varying NOT NULL,
    model character varying NOT NULL,
    km double precision,
    year integer NOT NULL,
    price double precision NOT NULL,
    status public.cars_status_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cars OWNER TO compass_car;

--
-- Name: cars_items; Type: TABLE; Schema: public; Owner: compass_car
--

CREATE TABLE public.cars_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "carId" uuid
);


ALTER TABLE public.cars_items OWNER TO compass_car;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: compass_car
--

CREATE TABLE public.clients (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "birthDate" timestamp without time zone NOT NULL,
    cpf character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "excludedAt" timestamp without time zone
);


ALTER TABLE public.clients OWNER TO compass_car;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: compass_car
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO compass_car;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: compass_car
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO compass_car;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: compass_car
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: compass_car
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status public.orders_status_enum DEFAULT 'aberto'::public.orders_status_enum NOT NULL,
    cep character varying,
    city character varying,
    uf character varying,
    "totalValue" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "concludedAt" timestamp without time zone,
    "excludedAt" timestamp without time zone,
    "clientId" uuid,
    "carId" uuid
);


ALTER TABLE public.orders OWNER TO compass_car;

--
-- Name: users; Type: TABLE; Schema: public; Owner: compass_car
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "excludedAt" timestamp without time zone
);


ALTER TABLE public.users OWNER TO compass_car;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: compass_car
--

COPY public.cars (id, "licensePlate", brand, model, km, year, price, status, "createdAt") FROM stdin;
f6eaf30f-cc26-4341-89cf-6573420a7a61	ABD1234	Volkswagem	Tiguan	15000	2018	25000.99	ativo	2024-11-04 20:11:29.695
\.


--
-- Data for Name: cars_items; Type: TABLE DATA; Schema: public; Owner: compass_car
--

COPY public.cars_items (id, name, "createdAt", "carId") FROM stdin;
ccf223b6-1dc9-4fb5-9c15-f97b6fa6fc66	GPS	2024-11-04 20:11:29.703	f6eaf30f-cc26-4341-89cf-6573420a7a61
b74cee30-53ed-4d3b-a11b-83d7a16f4d5b	Air Conditioning	2024-11-04 20:11:29.703	f6eaf30f-cc26-4341-89cf-6573420a7a61
58a1651e-771b-4b4d-ac13-ccc24a7020a3	Sunroof	2024-11-04 20:11:29.703	f6eaf30f-cc26-4341-89cf-6573420a7a61
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: compass_car
--

COPY public.clients (id, name, "birthDate", cpf, email, phone, "createdAt", "excludedAt") FROM stdin;
5f9d4c3a-92e4-48dd-9d6b-8061eecbbdf2	Carlos Pereira	1988-03-15 00:00:00	42491659069	carlos.pereira@example.com	+5511976543210	2024-11-04 20:07:48.943002	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: compass_car
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1730721629041	Initial1730721629041
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: compass_car
--

COPY public.orders (id, status, cep, city, uf, "totalValue", "createdAt", "concludedAt", "excludedAt", "clientId", "carId") FROM stdin;
d005bad0-8c08-4340-95dd-5fdbdf8a3c85	aberto	\N	\N	\N	0.00	2024-11-04 20:13:29.21728	\N	\N	5f9d4c3a-92e4-48dd-9d6b-8061eecbbdf2	f6eaf30f-cc26-4341-89cf-6573420a7a61
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: compass_car
--

COPY public.users (id, name, email, password, "createdAt", "excludedAt") FROM stdin;
5421c183-4dd2-4d28-9cfa-c181cdf66e91	Administrador	admin@example.com	$argon2id$v=19$m=65536,t=3,p=4$iQZdglK+RDjOodqN4a0lZw$WJGX7BLoeAsFnJPiI1/HF46lgZARgMfhcUR6yYaT5zY	2024-11-04 20:11:24.519774	\N
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: compass_car
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: cars_items PK_caef0361acc2d4c01e4cc48aa12; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.cars_items
    ADD CONSTRAINT "PK_caef0361acc2d4c01e4cc48aa12" PRIMARY KEY (id);


--
-- Name: clients PK_f1ab7cf3a5714dbc6bb4e1c28a4; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY (id);


--
-- Name: cars PK_fc218aa84e79b477d55322271b6; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY (id);


--
-- Name: orders REL_85e28015ae789392a28f75883a; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "REL_85e28015ae789392a28f75883a" UNIQUE ("carId");


--
-- Name: clients UQ_4245ac34add1ceeb505efc98777; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE (cpf);


--
-- Name: clients UQ_b48860677afe62cd96e12659482; Type: CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE (email);


--
-- Name: orders FK_1457f286d91f271313fded23e53; Type: FK CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: orders FK_85e28015ae789392a28f75883a4; Type: FK CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_85e28015ae789392a28f75883a4" FOREIGN KEY ("carId") REFERENCES public.cars(id);


--
-- Name: cars_items FK_f1eb59f4aeafd23b61187837396; Type: FK CONSTRAINT; Schema: public; Owner: compass_car
--

ALTER TABLE ONLY public.cars_items
    ADD CONSTRAINT "FK_f1eb59f4aeafd23b61187837396" FOREIGN KEY ("carId") REFERENCES public.cars(id);


--
-- PostgreSQL database dump complete
--

