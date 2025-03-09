# SpiritX_ByteBuilders_01

## Instructions to Run the Project

### Prerequisites

- Node.js (version X.X.X)
- npm (version X.X.X) or yarn (version X.X.X)
- PHP (version X.X.X)
- Composer (version X.X.X)
- A web server (e.g., Apache, Nginx)
- A database server (e.g., MySQL, PostgreSQL)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/SpiritX_ByteBuilders_01.git
   cd SpiritX_ByteBuilders_01
   ```

2. Install PHP dependencies:

   ```sh
   composer install
   ```

3. Install JavaScript dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

4. Copy the `.env.example` file to `.env` and configure your environment variables:

   ```sh
   cp .env.example .env
   ```

5. Generate an application key:
   ```sh
   php artisan key:generate
   ```

### Database Setup & Configuration

1. Configure your database settings in the `.env` file:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   ```

2. Run the database migrations:

   ```sh
   php artisan migrate
   ```

3. (Optional) Seed the database with sample data:

   ```sh
   php artisan db:seed
   ```

4. (Optional) Import the database dump if provided:
   ```sh
   mysql -u your_database_user -p your_database_name < path/to/dump.sql
   ```

### Running the Project

1. Start the development server:

   ```sh
   php artisan serve
   ```

2. Start the Vite development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Assumptions Made During Development

- The project assumes a typical Laravel application structure.
- The user has basic knowledge of Laravel, PHP, and JavaScript.
- The environment variables are correctly set up in the `.env` file.
- The database server is running and accessible with the provided credentials.

## Additional Features

- **User Authentication**: Implemented using Laravel Breeze with Inertia.js and React.
- **Password Strength Indicator**: Real-time password strength evaluation during registration.
- **Responsive Design**: The application is designed to be responsive and mobile-friendly.
- **Dark Mode Support**: The application supports dark mode for better user experience in low-light environments.
- **Real-time Validation**: Form fields are validated in real-time as the user types.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
