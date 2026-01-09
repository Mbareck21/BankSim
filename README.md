# BankSim

![Landing Page Screenshot](./landing%20page%20screenshot.png)

BankSim is a lightweight web application that simulates a personal banking dashboard. It allows users to simulate creating an account, logging in, and performing basic banking operations. This project serves as a practical example of front-end development using modern CSS frameworks and vanilla JavaScript.

## Technologies Used

*   **HTML5** - Structure and layout.
*   **Tailwind CSS** - Utility-first CSS framework for styling (loaded via CDN).
*   **JavaScript (ES6+)** - Client-side logic for authentication and UI interactions.
*   **Font Awesome** - Icons for the UI.

## Features

*   **User Authentication Simulation**:
    *   **Sign Up**: Create a new simulated account (data stored in `sessionStorage`).
    *   **Login**: Access the dashboard using created credentials.
    *   **Validation**: Real-time feedback for input errors.
*   **Dashboard**:
    *   View account balance (simulated).
    *   Simulate deposits and withdrawals.
    *   View transaction history.
*   **Responsive Design**: optimized for desktop and mobile viewing.

## Getting Started

Since this project relies on client-side technologies and CDNs, no build step is required.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mbareck21/BankSim.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd BankSim
    ```
3.  **Run the Application:**
    *   Simply open the `bankSimulator.html` file in your preferred web browser.
    *   *Note: For the best experience, use a modern browser like Chrome, Firefox, or Edge.*

## File Structure

*   `bankSimulator.html`: The main landing page containing the login form.
*   `signUp.html`: Registration page for new users.
*   `securedPage.html`: The main banking dashboard accessible after login.
*   `unauthorizedPage.html`: Fallback page for restricted access attempts.
*   `utils.js`: Utility functions (e.g., error handling UI).
*   `logIn.js` & `signUp.js`: Logic for handling user authentication events.
*   `secured.js`: Logic controlling the dashboard functionality.

## Disclaimer

This is a **simulation** for educational purposes. No real money is involved, and data is only persisted temporarily in your browser's session storage. Closing the browser tab/window will clear your user data.

---
© 2023 Mohamed M. All Rights Reserved.