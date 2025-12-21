# Quotes API (Now a Quote Vault!)

> What started as a simple API project turned into a full-blown personal quote collection app. Sometimes the best projects are the ones that evolve naturally.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://quotes-api-five.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

![Project Screenshot](./screenshot.png)

---

## What This Thing Actually Does

So here's the story: I originally set out to build a RESTful API for quotes. You know, something other developers could use. But as I was building it, I realized I actually wanted a place to save and organize my own favorite quotes. So it kinda... evolved. Now it's more of a personal quote vault with a nice UI, backed by all the robust stuff I built for the API version.

Think of it as your digital quote journal - a place where you can save those lines that hit different, organize them, and actually find them later when you need them.

---

## What You Can Actually Do With It

### Quote Management

- **Full CRUD Operations**: Create, read, update, and delete quotes through a dashboard that doesn't suck
- **Interactive Modals**: Clean interfaces for adding and editing quotes (no page refreshes, everything's smooth)
- **Server Actions**: All the backend magic happens through Next.js Server Actions - it's fast and feels native

### User Stuff

- **Secure Authentication**: Sign in and out without worrying about security. NextAuth.js handles all that
- **Session Persistence**: Your login sticks around thanks to Prisma adapter integration
- **Email Sign-In**: Uses Nodemailer for email-based authentication (no password to remember!)

### For Everyone, Everywhere

- **Multi-Language Support**: Built-in internationalization (i18n) so the app speaks your language
- **Language Switcher**: Toggle between languages on the fly
- **Translation Files**: Currently supports English and Arabic (stored in `public/messages`)

### It Actually Looks Good

- **Theme Toggle**: Switch between light and dark mode because your eyes matter
- **Responsive Design**: Works on your phone, tablet, whatever - Tailwind CSS makes sure of it
- **Modern UI Components**: Using ShadCN/UI for that polished look without reinventing the wheel

---

## The Tech Behind It

I chose these tools for specific reasons, not just because they're trendy:

| Technology       | What It Does    | Why I Picked It                                                                                       |
| ---------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| **Next.js 14+**  | React Framework | The App Router is genuinely good - server components, built-in routing, and it just works             |
| **TypeScript**   | Type Safety     | Catches dumb mistakes before they become bugs. The autocomplete alone is worth it                     |
| **Prisma**       | Database ORM    | Makes talking to the database actually enjoyable. The type safety carries through from DB to frontend |
| **NextAuth.js**  | Authentication  | Didn't want to roll my own auth and deal with security nightmares. This just handles it               |
| **PostgreSQL**   | Database        | Reliable, powerful, and plays nice with Prisma. No weird surprises                                    |
| **Tailwind CSS** | Styling         | Utility classes mean I can build fast without writing custom CSS for everything                       |
| **ShadCN/UI**    | UI Components   | Beautiful components that are actually customizable. Not another rigid component library              |

---

## Getting It Running

### What You Need First

- Node.js (v18 or newer recommended)
- A PostgreSQL database (local or hosted, doesn't matter)
- npm, yarn, or pnpm (pick your poison)

### Setup Steps

**1. Clone it down**

```bash
git clone https://github.com/Ibrahim-Rezq/quotes_api.git
cd quotes_api
```

**2. Install the dependencies**

```bash
npm install
```

**3. Set up your environment**

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

Your `.env` should look like this:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quotes_db"
AUTH_SECRET="put-a-random-string-here"
```

That's it. Just these two variables - nothing crazy.

**4. Database setup**

Run the migrations to set up your database schema:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**5. Fire it up**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you should be good to go!

---

## Handy Commands

| Command                  | What It Does                          |
| ------------------------ | ------------------------------------- |
| `npm run dev`            | Starts the dev server with hot reload |
| `npm run build`          | Builds for production                 |
| `npm run start`          | Runs the production build             |
| `npm run lint`           | Checks your code for issues           |
| `npx prisma studio`      | Opens a GUI to browse your database   |
| `npx prisma migrate dev` | Creates a new database migration      |

---

## What I Learned Building This

This project taught me way more than I expected, honestly.

### The Tricky Parts

**Database Design**: Getting the schema right took some iteration. Balancing what I needed now vs. what I might need later was trickier than I thought.

**Auth Flow**: Implementing NextAuth properly with email sign-in wasn't plug-and-play. Had to really understand how sessions work and how Prisma stores them.

**Type Safety Everywhere**: Keeping types consistent from the database schema → API → frontend components required some planning, but Prisma made it way easier than doing it manually.

**Server Actions**: Coming from the traditional API route approach, Server Actions felt weird at first. But once it clicked, the code got so much cleaner.

### Things That Clicked

- **Prisma's DX is unreal**: The auto-generated types and Prisma Studio made database work actually fun
- **Server Components are powerful**: Not having to worry about client bundles for everything changed how I structure things
- **TypeScript pays off**: Yeah, there's more upfront setup, but catching errors at compile-time saved me hours of debugging
- **Good UI libraries matter**: ShadCN/UI let me focus on features instead of styling buttons for the hundredth time

---

## What's Coming Next

Some features I actually want to build (not just a wishlist):

- [ ] **Public/Private Quote Toggle** - Let users choose which quotes are visible to others
- [ ] **Enhanced Dashboard** - Drag-and-drop organization, better filtering
- [ ] **Social Sharing** - Generate nice quote cards to share on social media
- [ ] **Advanced Search** - Filter by author, tags, date added, whatever
- [ ] **Quote Categories/Tags** - Organize quotes by themes or topics
- [ ] **Export Options** - Download your quotes as PDF, JSON, or Markdown

The long-term vision? Turn this into a "mini Goodreads for quotes" - a place where you can not just store quotes, but discover new ones, see what others are reading, and actually engage with the words that matter.

---

## Want to Contribute?

If you want to add something or fix a bug:

1. Fork the repo
2. Create a branch (`git checkout -b feature/something-cool`)
3. Make your changes
4. Push it up (`git push origin feature/something-cool`)
5. Open a PR

I'll review it when I can!

---

## License

MIT License - use it however you want, build on it, break it, whatever. Just don't blame me if something goes wrong.

---

## About Me

**Ibrahim Rezq**  
Building stuff on the web and learning as I go.

[![GitHub](https://img.shields.io/badge/GitHub-Ibrahim--Rezq-181717?style=flat&logo=github)](https://github.com/Ibrahim-Rezq)

---

<div align="center">

**If this helped you in any way, a star would be cool ⭐**

Built with coffee and curiosity ☕

</div>
