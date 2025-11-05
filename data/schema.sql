create table if not exists videos (
	id serial primary key,
	title text not null,
	description text not null,
	url text not null,
	created_at timestamp default now()
);
