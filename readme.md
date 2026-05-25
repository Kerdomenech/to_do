# To Do App

A modern and responsive To-Do application built with Vite, Tailwind CSS, and JSON Server. It helps users manage daily tasks with a clean interface and useful productivity features.

## Features

✅ Add new tasks  
✅ Delete tasks  
✅ Mark tasks as completed  
✅ Search tasks in real time  
✅ Filter tasks:
- All
- Pending
- Completed

✅ Dark mode with local storage persistence  
✅ Session persistence for filters and search  
✅ Task completion counter  
✅ Responsive design  

---

## Technologies Used

- HTML
- JavaScript (Vanilla JS)
- Vite
- Tailwind CSS
- JSON Server

---

## Project Structure

```bash
to_do/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── counter.js
│   ├── main.js
│   └── style.css
│
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Kerdomenech/to_do.git
```

Move to the project folder:

```bash
cd to_do
```

Install dependencies:

```bash
npm install
```

---

## Run the Application

Start the Vite development server:

```bash
npm run dev
```

Start JSON Server:

```bash
npx json-server db.json
```

The application will run on:

```bash
http://localhost:5173
```

API endpoint:

```bash
http://localhost:3000/todos
```

---

## How It Works

Users can:

1. Create tasks
2. Search tasks instantly
3. Filter by status
4. Mark tasks as completed
5. Remove tasks
6. Switch between light and dark themes

The application saves:

- Dark mode preferences using `localStorage`
- Search and filter states using `sessionStorage`

---

## Future Improvements

- Edit existing tasks
- Add due dates
- User authentication
- Categories/tags
- Notifications
- Drag and drop task sorting

---

## Author

Developed by Kerlys Bello & Joel

GitHub:
https://github.com/Kerdomenech

---

## License

This project is available for educational and personal use.
