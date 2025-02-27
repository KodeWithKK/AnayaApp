MANUAL SQL TYPE FIXE

- ```sql
  DROP TYPE IF EXISTS media_type CASCADE;
  CREATE TYPE media_type AS ENUM('image', 'video', 'animated_gif');
  ```
