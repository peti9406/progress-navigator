<!-- README TOP -->
<div id="readme-top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div >
    <img src="/frontend/src/assets/icon.png" alt="Logo" width="80">

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
<details>
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

Core Features:

* Set New Goals
* Progress Towards Goals
* Track Your Progression

<p>(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![JavaScript][Javascript.com]][Javascript-url]
* [![MySQL][MySQL.com]][MySQL-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![React][React.com]][React-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

You can run the project with docker or on your own computer.
Please follow the instructions.
Currently, this is only a test environment.

### Prerequisites

For the project to run locally on your computer, you need:

* Node.js >= 18
* npm (for installing dependencies)
* PHP >= 8.2
* Composer (for installing dependencies)

### Installation

**Before deciding how to run the application check out the /client/vite.config.js and set the proxy!**

#### Run locally

1. **Clone the repository**
    ```sh
    git clone https://github.com/peti9406/progress-navigator.git
    cd rogress-navigator
    ```
2. **Install server dependencies**

    ```bash
    cd backend
    composer install
    ```

3. **Install client dependencies**
    ```bash
    cd ../frontend
    npm install
    ```
4. **Run the application**

   Open **two terminals**:

    - **Server**
        ```bash
        cd backend
        php artisan serve
        ```
    - **Client**
        ```bash
        cd client
        npm run dev
        ```

5. **Open the application in your browser**

    - Frontend: [http://localhost:5173](http://localhost:5173)

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Under work!

<p>(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

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
