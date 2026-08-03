# УЖКК Студент Ниш

Званични сајт УЖКК Студент Ниш — вести, тим, млађе категорије, галерија и контакт.

Стек: TanStack Start, React, Vite, Tailwind CSS, Cloudflare Workers.

## Development

Potreban je **Node.js 22+**.

```sh
npm i
cp .env.example .env   # ADMIN_PASSWORD=student
npm run dev
```

App radi na [http://localhost:3303](http://localhost:3303).

### Admin (vesti + ceo sajt)

- URL: [http://localhost:3303/admin](http://localhost:3303/admin)
- Lozinka: `ADMIN_PASSWORD` iz `.env` (podrazumevano `student`)
- Sekcije: Вести, Тим, Галерија, Клуб, Млађе, Контакт, Почетна, Сајт/футер
- **Storage: Cloudflare R2** (bucket `uzkk-content`)
- Lokalno: S3 API token u `.env` (`R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY`)
- Produkcija (Workers): `CONTENT` binding u `wrangler.jsonc`
- Mediji se serviraju preko `/api/r2/...`

```sh
npx wrangler login
npx wrangler r2 bucket create uzkk-content
# Token: Dashboard → R2 → Manage R2 API Tokens → Object Read & Write
# zatim popuni R2_* u .env (vidi .env.example)
```

## Build & deploy (Cloudflare Workers)

```sh
npx wrangler login
echo "tvoja-lozinka" | npx wrangler secret put ADMIN_PASSWORD
npm run deploy
```

Sajt ide na `*.workers.dev` (R2 bucket `uzkk-content` preko `CONTENT` bindinga).
Custom domen: Cloudflare Dashboard → Workers → uzkk-student → Settings → Domains.
