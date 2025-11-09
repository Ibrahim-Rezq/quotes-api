# Quotes API

A full-stack **Next.js 14** project for managing and displaying quotes.  
Built with **TypeScript**, **Prisma**, **NextAuth**, and **Tailwind CSS**, this app serves as both an **API** and a **frontend interface** for managing user-generated quotes.

---

## 🌐 Live Demo
[View Live on Vercel](https://quotes-api-five.vercel.app)

---

## 🎯 Purpose
This project was created to practice **backend integration within a modern Next.js application** — exploring database design, authentication, and API route handling with Prisma ORM.  
The current version focuses on:
- Creating and managing quote entries via the database
- Authentication setup using **NextAuth.js** with **Prisma Adapter**
- Email integration using **Nodemailer**
- Styling with **Tailwind CSS** and **DaisyUI**

---

## 💡 Learning Takeaways
Working on this project helped me:
- Understand **Prisma schema design** and **database migrations**
- Integrate **NextAuth** with a Prisma backend
- Manage **environment variables** securely through `.env` files
- Create RESTful **API endpoints** in the new App Router of Next.js 14
- Implement responsive UI components using **Tailwind** and **DaisyUI**

---

## 🧩 Technologies Used
- **Next.js 14**
- **TypeScript**
- **Prisma ORM**
- **NextAuth.js**
- **Tailwind CSS** + **DaisyUI**
- **Zod** (validation)
- **React Hook Form**
- **Nodemailer**

---

## ⚙️ API Endpoints

| Method | Endpoint             | Description |
|--------|----------------------|--------------|
| `GET`  | `/api/quotes`        | Fetch all quotes |
| `GET`  | `/api/quotes/[id]`   | Get a single quote by ID |
| `POST` | `/api/quotes`        | Add a new quote |
| `DELETE` | `/api/quotes/[id]` | Delete a quote |
| `PUT`  | `/api/quotes/[id]`   | Update an existing quote |

*(Endpoints are subject to change as new features are implemented.)*

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Ibrahim-Rezq/quotes_api.git
cd quotes_api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your details:

```bash
DATABASE_URL="your_database_connection_url"
AUTH_SECRET="your_nextauth_secret"

# Email setup for authentication
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_SERVER_HOST=""
EMAIL_SERVER_PORT=""
EMAIL_FROM=""
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Start the development server

```bash
npm run dev
```

App runs on [http://localhost:3000](http://localhost:3000)

---

## 🧠 Prisma Commands

| Command                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| `npx prisma migrate dev`    | Apply and generate new migrations during development |
| `npx prisma migrate deploy` | Apply migrations in production                       |
| `npx prisma studio`         | Open Prisma’s database GUI                           |
| `npx prisma generate`       | Regenerate Prisma client                             |

---

## 🧰 Scripts

| Script          | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Start Next.js in development mode                        |
| `npm run build` | Build the project for production                         |
| `npm run start` | Start the production server                              |
| `npm run lint`  | Run ESLint                                               |
| `postinstall`   | Automatically generates Prisma client after installation |

---

## 🗺️ Roadmap / To-Do

* [ ] Improve dashboard UI for managing quotes (add/edit/delete)
* [ ] Implement role-based access for multiple users
* [ ] Add “public” and “private” quote options
* [ ] Allow users to **comment on quotes**
* [ ] Introduce **sharing functionality** for quotes
* [ ] Enhance quote display and search UX
* [ ] Refine email templates for authentication and notifications

*(Future vision: evolve into a “mini Goodreads for quotes” — a social platform for discovering, saving, and discussing memorable lines.)*

---

## 📝 Environment Variables

| Variable                | Description                         |
| ----------------------- | ----------------------------------- |
| `DATABASE_URL`          | Connection string for your database |
| `AUTH_SECRET`           | Secret used for NextAuth encryption |
| `EMAIL_SERVER_USER`     | SMTP username                       |
| `EMAIL_SERVER_PASSWORD` | SMTP password                       |
| `EMAIL_SERVER_HOST`     | SMTP host                           |
| `EMAIL_SERVER_PORT`     | SMTP port                           |
| `EMAIL_FROM`            | Sender address for outgoing emails  |

---

## 👨‍💻 Author

Created by [**Ibrahim Rezq**](https://github.com/Ibrahim-Rezq) as part of a full-stack learning journey focused on modern web development.

---

## ⚖️ License

This project is licensed under the **MIT License** — feel free to use, modify, and build upon it.

