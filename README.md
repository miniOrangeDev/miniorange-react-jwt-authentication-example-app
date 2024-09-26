
## Set Up and Run the React Project

# Installation

In the project directory, you can run:

### `npm install`

This will install all the necessary dependencies. The page will automatically reload when you make changes. You may also see any lint errors in the console.

## Configure MiniOrange

### 1. Create a React JWT Application in the miniOrange Dashboard

Visit the [miniOrange Dashboard](https://login.xecurify.com) and create a new React JWT Application.

### 2. Configure Your React Application

If you're using an existing React application, make sure the following settings are properly configured:

- **Redirect URL**: `http://localhost:3002`
- **Logout URL**: `http://localhost:3002`

These URLs should reflect the origins where your application is running. Allowed Callback URLs may also include a path, depending on where you're handling the callback in your app.

### 3. Set miniOrange as the Primary Identity Provider

- In the "Primary Identity Provider" section, select **miniOrange**.
- Click **Save**.

### 4. Download the RSA256 Certificate

- Go to **Apps**, and from the dropdown next to your configured React App, click **Select**.
- Click on **Certificate** to download the RSA256 certificate.
- Place the downloaded certificate in the `src` folder of your miniOrange React app.
- In `Home.js`, ensure the certificate is imported with the name `RSA256Cert.crt`. If you change the file name, update the import statement accordingly.

### 5. Set Up Endpoints

- Click **Edit** from the dropdown next to your app in the miniOrange dashboard.
- Scroll down to the **Endpoints** section.
- As miniOrange is the primary Identity Provider, copy the **SSO URL for using miniOrange as Authentication Source** provided in the Endpoints section.
- In `App.js`, replace `<SSO URL>` in the following line:

    ```jsx
    <Nav.Link href="<SSO URL>">Login</Nav.Link>
    ```

  with the copied **SSO URL**.

### 7. Configure Single Logout (SLO) URL in Home.js

- Copy the **Single Logout URL** from the Endpoints section.
- In `Home.js`, locate the following line:

    ```javascript
    window.location.href = "<SLO_URL>";
    ```

  Replace `<SLO_URL>` with the copied **Single Logout URL**.

### 8. Create a User in miniOrange

If you haven't already, create a user in miniOrange.

### 9. Run the Application

Navigate to `http://localhost:3002`. Your `miniorange-react-connector-starter-app` should now be running.

### 10. Test the Login

Click the **Login** button. You’ll be redirected to the miniOrange login page. Enter the user’s credentials, and you’ll be logged into the miniOrange React app.
