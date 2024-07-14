# RetroRings
![image](https://github.com/user-attachments/assets/d986caff-7642-40dc-a389-09c771e95f82)

Welcome to **RetroRings**, an RPG-themed project developed by team **try{CatchUs}** for the #CodedexSummerHackathon2024. This project is part of **Track 3: Predict 2024 Olympic Champions**. Our team comprises three dedicated developers:
- [@FireHead90544](https://github.com/FireHead90544): Backend Developer & System Designing
- [@AndreiBalan-dev](https://github.com/AndreiBalan-dev): Frontend Developer & API Integrations
- [@TCYTseven](https://github.com/TCYTseven): Algorithmist & Model Designing

### **This project was done in 24 hours.**

## [Live Demo](https://try-catch-us.vercel.app/)
Ready to analyze & predict the Olympics? Check out RetroRings in action!

## Project Structure

### Data Analysis & Prediction API
Our backend API is built using FastAPI, with data analysis performed using Pandas and predictions generated using a PyTorch model.

- **Location**: `api` folder
- **Tech Stack**: FastAPI, Pandas, PyTorch, Scikit-Learn

#### API Routes
- All the API routes are `GET` accessible, refer to the [API Docs](https://trycatchus.onrender.com/docs) for info about available endpoints.

### Data Visualization UI
Our frontend application is built using Next.js, React, and TailwindCSS, with Chart.js for data visualization. It provides an intuitive interface to visualize the predictions from our API.

- **Location**: `app` folder
- **Tech Stack**: Next.js, React, TailwindCSS, Chart.js

## Usage Instructions

### How it works?
- Deploy the FastAPI app.
- Integrate the API host to environment variables.
- Deploy the Next.js app.

### Setup

1. **Clone the repository**
    ```sh
    git clone https://github.com/AndreiBalan-dev/tryCatchUs.git
    cd tryCatchUs
    ```

2. **Backend (API) Setup**
    ```sh
    cd api
    pip install virtualenv
    virtualenv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    uvicorn app:app --reload
    ```

3. **Frontend Setup**
    ```sh
    cd app
    npm install
    npm run dev
    ```

4. **Access the application**
    - API: `http://127.0.0.1:8000`
    - Frontend: `http://localhost:3000`

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/AndreiBalan-dev/tryCatchUs/blob/main/LICENSE) file for details.

## Acknowledgements
We would like to thank the #CodedexSummerHackathon2024 for organizing this amazing hackathons.

## Contact
- [@FireHead90544](https://github.com/FireHead90544)
- [@AndreiBalan-dev](https://github.com/AndreiBalan-dev)
- [@TCYTseven](https://github.com/TCYTseven)

Feel free to reach out to us for any queries or collaboration opportunities!
