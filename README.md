### Make sure you have docker installed

1. Run

   ```shell
   docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

   ```

2. Copy .env.example to .env
3. ```
   cd backend/ && pnpm install && pnpm run db:migrate && pnpm run db:gen
   ```
4. `pnpm run seed`
5. `pnpm run dev`
6. `cd ../frontend/`
7. Copy .env.example to .env
8. `pnpm install && pnpm run dev`
