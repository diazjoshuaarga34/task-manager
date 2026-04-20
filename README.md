# Task Manager (Symfony)

A simple Task Management System built with Symfony, featuring CRUD operations with AJAX and modal interactions.

---

## Features

- Create, Read, Update, Delete Tasks
- AJAX-based updates
- Modal UI for edit/delete
- Flash messages for user feedback

---

## Requirements

- PHP >= 8.4
- Composer
- Symfony CLI
- Node.js (optional, if using assets)

---

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/your-username/your-repo.git
```

2. Go to project directory:

```
cd your-repo
```

3. Install dependencies:

```
composer install
```

4. Configure environment:

```
cp .env .env.local
```

5. Setup database:

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

6. Run the server:

```
symfony server:start
```

---

## Project Structure

- `assets/js/` → JavaScript (AJAX, modals)
- `src/` → Controllers, Entities, Form
- `templates/` → Twig files

---

## Notes

- Uses Symfony ImportMap for JS
- AJAX handled in `assets/js/`

---

## Author

Joshua Diaz / PRMSU - Santa Cruz
