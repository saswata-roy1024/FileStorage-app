# FileStorage-app
Welcome to the File Storage Application! This robust and user-friendly platform allows you to securely upload, store, download, and share your files with ease. Whether you're looking to save important documents, share photos with friends, or access your files on the go, our application has you covered.

# Features

* Upload Files: Easily upload files of any type to your personal storage space.
* Store Securely: Keep your files safe with our secure storage solutions.
* Download Anytime: Access and download your files from anywhere, at any time.
* Share with Others: Share files with friends, family, or colleagues with just a few clicks.
* Save Shared Files: Conveniently save files that others have shared with you to your own storage.
    

# Getting Started

1. Sign Up: Create an account to get started.
2. Upload Files: Use the intuitive interface to upload your files.
3. Manage Your Storage: Organize and manage your files within your personal storage.
4. Share Files: Share files by generating shareable links or directly sending them to others.
5. Download and Save: Download your files whenever needed and save files shared by others to your storage.

# Installation

  1. Clone the repository: git clone https://github.com/saswata-roy1024/FileStorage-app.git
  2. Install dependencies:~
        * Setup Client:
              - Go to client: cd client
              - Install dependencies: npm install
        * Setup Server:
              - Go to server: cd server
              - Install dependencies: npm install
  3. Set up environment variables:~
     ** create a dotenv file **
   
    PORT = 8000
    SESSION_SECRET = your_secret
    JWT_SECRET = your_secret
    MONGODB_URI = mongodb_connection_url
    CLOUDINARY_NAME = cloudinary_account_name
    CLOUDINARY_KEY = cloudinary_key
    CLOUDINARY_SECRET = cloudinary_secret
    ORIGIN_URL = http://localhost:5000
    CLIENT_ID = google_console_client_id
    CLIENT_SECRET = google_console_client_secret
    EMAIL_ID = sender_email_address 
    EMAIL_NODEMAILER_PASSWORD = password_of_less_secure_app_access_google
