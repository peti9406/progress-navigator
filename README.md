<!-- README TOP -->
<div id="readme-top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="/frontend/src/assets/icon.png" alt="Logo" width="160">

<h3 >Progress Navigator</h3>

  <p >
    Progress tracking application.
    <br />
    <a href="https://github.com/peti9406/progress-navigator/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/peti9406/progress-navigator/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details >
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

ProgressNavigator is a personalized learning management application that allows users to create, track, and manage
custom learning roadmaps. The platform helps learners organize their goals, monitor their progress, and stay motivated
throughout their learning journey.

### Core Features:

* Set New Goals
* Progress Towards Goals
* Track Your Progression

<p>(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Frontend
* [![JavaScript][Javascript.com]][Javascript-url]
* [![React][React.com]][React-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]
* [![dnd-kit][dnd-kit.com]][dnd-kit-url]
* [![radix-ui][radix-ui.com]][radix-ui-url]
* [![axios][axios.com]][axios-url]

#### Backend
* [![PHP][PHP.com]][PHP-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![PHPUnit][phpunit.com]][phpunit-url]

#### Database
* [![MySQL][MySQL.com]][MySQL-url]

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

You can run the project locally on your computer or with docker.
Please follow the instructions.
Currently, this is only a test environment.

### Prerequisites

- A valid **Gemini API key** (used as the primary AI provider)
- A valid **OpenRouter API key** (used as a fallback AI provider)
- An **SMTP email service** configured for sending emails

**For the project to run locally on your computer, you need:**

* Node.js >= 18
* npm (for installing dependencies)
* PHP >= 8.2
* Composer (for installing dependencies)

**Or if you want it to run with docker:**

Docker Desktop (Windows/Mac) <br>
Docker Engine (Linux)

### Installation

#### Run locally

1. **Clone the repository**
    ```sh
    git clone https://github.com/peti9406/progress-navigator.git
    cd progress-navigator
    ```
2. **Install server dependencies**
    ```bash
    cd backend
    composer install
    ```
3. **Create the environment file**
    ```bash
    cp .env.example .env
    ```
4. **Configure the environment variables**
   Set the following values in your `.env` file:
    ```env
    MAIL_USERNAME=
    MAIL_PASSWORD=
    MAIL_FROM_ADDRESS=
    GEMINI_API_KEY=
    OPENROUTER_API_KEY=
    ```
5. **Generate the encryption key required for the application to run securely.**
    ```bash
    php artisan key:generate
    ```
6. **Create the database tables based on the migration files.**
   ```bash
   php artisan migrate
    ```
7. **Install client dependencies**
    ```bash
    cd ../frontend
    npm install
    ```
8. **Run the application**

   Open **two terminals**:

    - **Server**
        ```bash
        cd backend
        php artisan serve
        ```
    - **Client**
        ```bash
        cd frontend
        npm run dev
        ```
9. **Open the application in your browser**

    - Frontend: [http://localhost:5173](http://localhost:5173)

#### Run with Docker

1. **Clone the repository**
    ```sh
    git clone https://github.com/peti9406/progress-navigator.git
    cd progress-navigator
    ```
2. **Navigate to the backend folder**
    ```bash
    cd backend
    ```
3. **Create the environment file**
    ```bash
    cp .env.example .env
    ```
4. **Configure the environment variables**
   Set the following values in your `.env` file:
    ```env
    MAIL_USERNAME=
    MAIL_PASSWORD=
    MAIL_FROM_ADDRESS=
    GEMINI_API_KEY=
    OPENROUTER_API_KEY=
    ```
5. **Build the Docker containers**
    ```bash
    docker-compose build
    ```
6. **Start the containers in detach mode**
    ```bash
   docker-compose up-d
   ```
7. **Access the backend application container**
    ```bash
   docker exec -it backend sh
   ```
8. **Create the database tables based on the migration files.**
   ```bash
   php artisan migrate
    ```
9. **Open the application in your browser**

    - Frontend: [http://localhost:5173](http://localhost:5173)

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This application helps users track and manage their goals by breaking them down into actionable steps and monitoring progress over time.

### Basic Flow
1. Register on the platform
2. Verify your email address 
   > Email verification is handled via SMTP using Gmail in development.
3. Create a new goal
4. Add steps to the goal
5. Mark steps as completed
6. Track progress using the progression bar
7. Delete or archive goals when finished
8. Use AI to assist with goal completion or setting a new goal

### Screenshots

#### Registration
* Email must be unique
* Password must be at least 6 characters
![Registration](./screenshots/register.png)

#### Goal management
![Goals](./screenshots/goals.png)

#### Progress tracking
![Progress](./screenshots/progress.png)

#### Dark mode
![Dark](./screenshots/dark.png)

#### AI assisted goal setting
![AiOptions](./screenshots/ainewgoal.png)

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Roadmap

This roadmap outlines the planned features and improvements for the project.<br>
Items may change as the project evolves.

- [x] Authentication & authorization
- [x] Goal management
- [x] Progress tracking
- [x] UI improvements
- [x] Light/Dark mode
- [x] Docker
- [x] AI integration
- [ ] Deployment

## Contact

Péter Török - p.torok0694@gmail.com

Project Link: https://github.com/peti9406/progress-navigator

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/peti9406/progress-navigator.svg?style=for-the-badge

[contributors-url]: https://github.com/peti9406/progress-navigator/graphs/contributors

[stars-shield]: https://img.shields.io/github/stars/peti9406/progress-navigator.svg?style=for-the-badge

[stars-url]: https://github.com/peti9406/progress-navigator/stargazers

[issues-shield]: https://img.shields.io/github/issues/peti9406/progress-navigator.svg?style=for-the-badge

[issues-url]: https://github.com/peti9406/progress-navigator/issues

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://www.linkedin.com/in/p%C3%A9ter-t%C3%B6r%C3%B6k-95372315a/

[product-screenshot]: public/images/planner-bg.jpg

<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->

[Javascript.com]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

[Javascript-url]: https://www.javascript.com/

[MySQL.com]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white

[MySQL-url]: https://www.mysql.com/

[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white

[Laravel-url]: https://laravel.com

[React.com]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black

[React-url]: https://react.dev/

[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white

[Tailwind-url]: https://tailwindcss.com/

[PHP.com]: https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white

[PHP-url]: https://www.php.net/

[dnd-kit.com]: https://img.shields.io/badge/dnd--kit-0B5FFF?style=for-the-badge&logo=react&logoColor=white
[dnd-kit-url]: https://dndkit.com/

[radix-ui.com]: https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white
[radix-ui-url]: https://www.radix-ui.com/

[axios.com]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/

[phpunit.com]: https://img.shields.io/badge/PHPUnit-366488?style=for-the-badge&logo=phpunit&logoColor=white
[phpunit-url]: https://phpunit.de/
