-- public.assets definition

-- Drop table

-- DROP TABLE public.assets;

CREATE TABLE public.assets (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	amount numeric NULL,
	CONSTRAINT assets_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	username varchar(50) NULL,
	"password" varchar(100) NULL,
	email varchar(100) NULL,
	"money" numeric NULL DEFAULT 100,
	isactive bool NULL DEFAULT true,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.alerts definition

-- Drop table

-- DROP TABLE public.alerts;

CREATE TABLE public.alerts (
	id serial4 NOT NULL,
	price int4 NOT NULL,
	id_user int4 NOT NULL,
	asset varchar NOT NULL,
	CONSTRAINT alerts_pkey PRIMARY KEY (id),
	CONSTRAINT alerts_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.notifications definition

-- Drop table

-- DROP TABLE public.notifications;

CREATE TABLE public.notifications (
	id_user int4 NOT NULL,
	id_post int4 NOT NULL,
	is_liked bool NOT NULL,
	CONSTRAINT notifications_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.posts definition

-- Drop table

-- DROP TABLE public.posts;

CREATE TABLE public.posts (
	id serial4 NOT NULL,
	"content" varchar(255) NOT NULL,
	likes numeric NULL DEFAULT 0,
	replies numeric NULL DEFAULT 0,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	id_user int4 NOT NULL,
	CONSTRAINT posts_pkey PRIMARY KEY (id),
	CONSTRAINT posts_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.replies definition

-- Drop table

-- DROP TABLE public.replies;

CREATE TABLE public.replies (
	id serial4 NOT NULL,
	"content" varchar(255) NOT NULL,
	likes numeric NULL DEFAULT 0,
	replies numeric NULL DEFAULT 0,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	id_user int4 NOT NULL,
	id_post int4 NOT NULL,
	CONSTRAINT replies_pkey PRIMARY KEY (id),
	CONSTRAINT replies_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT replies_fk_1 FOREIGN KEY (id_post) REFERENCES public.posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.social definition

-- Drop table

-- DROP TABLE public.social;

CREATE TABLE public.social (
	id_follower int4 NOT NULL,
	id_following int4 NOT NULL,
	CONSTRAINT social_fk FOREIGN KEY (id_follower) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT social_fk_1 FOREIGN KEY (id_following) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.users_likes definition

-- Drop table

-- DROP TABLE public.users_likes;

CREATE TABLE public.users_likes (
	id_user int4 NOT NULL,
	id_post int4 NOT NULL,
	CONSTRAINT users_likes_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT users_likes_fk_1 FOREIGN KEY (id_post) REFERENCES public.posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT users_likes_fk_2 FOREIGN KEY (id_post) REFERENCES public.replies(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.wallets definition

-- Drop table

-- DROP TABLE public.wallets;

CREATE TABLE public.wallets (
	id serial4 NOT NULL,
	id_user int4 NULL,
	"name" varchar(100) NULL,
	CONSTRAINT wallets_pkey PRIMARY KEY (id),
	CONSTRAINT wallets_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.wallets_assets definition

-- Drop table

-- DROP TABLE public.wallets_assets;

CREATE TABLE public.wallets_assets (
	id_wallet int4 NOT NULL,
	id_asset int4 NULL,
	CONSTRAINT wallets_assets_fk FOREIGN KEY (id_wallet) REFERENCES public.wallets(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT wallets_assets_fk_1 FOREIGN KEY (id_asset) REFERENCES public.assets(id) ON DELETE CASCADE ON UPDATE CASCADE
);