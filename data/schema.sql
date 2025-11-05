create table if not exists videos (
	id serial primary key,

	title text not null,
	description text not null,
	url text not null,

	created_at timestamp default now(),
	updated_at timestamp default now()
);

create table if not exists comments (
	id serial primary key,

	body text not null,

	created_at timestamp default now(),
	updated_at timestamp default now()
);

create table if not exists video_comments (
	id serial primary key,

	comment_id integer not null references comments(id) on delete cascade,
	video_id integer not null references videos(id) on delete cascade
);

create or replace function update_updated_at()
returns trigger as $$
begin
	new.updated_at = now();

	return new;
end;
$$ language plpgsql;

drop trigger if exists videos_updated_at on videos;
create trigger videos_updated_at
before update on videos
for each row
execute function update_updated_at();

drop trigger if exists comments_updated_at on comments;
create trigger comments_updated_at
before update on comments
for each row
execute function update_updated_at();
