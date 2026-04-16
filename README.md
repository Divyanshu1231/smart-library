📚  **Smart Library Borrowing System**

A backend-based web application to manage book borrowing, cost calculation, overdue tracking, and user balances using REST APIs.

**🚀 Features**
🔐 User Authentication (Signup, Login, Profile) using JWT
📚 View list of available books (20 predefined books)
📖 Borrow books with validation rules
💰 Cost calculation (price per day × number of days)
⏳ Overdue fee calculation
📊 Active borrow tracking
🔄 Return/Submit borrowed books
📜 Borrow history tracking
💳 Payment history (pending/paid)
📈 Dashboard summary (balance, borrows, history)

**🛠️ Tech Stack**
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Tools: Postman, GitHub


**📂 Project Structure**
backend/
 ├── src/
 │   ├── config/
 │   ├── model/
 │   ├── routes/
 │   ├── middleware/
 │   ├── data/
 │
 ├── server.js
 ├── .env


**⚙️ Setup Instructions**

**1. Clone the repository**
git clone https://github.com/Divyanshu1231/your-repo-name.git
cd your-repo-name
**2. Install dependencies**
npm install
**3. Create .env file**
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
**4. Run server**
node server.js
Server will start at:
http://localhost:5000

**📌 API Endpoints**
**🔐 Auth**
POST /auth/signup
POST /auth/login
GET /auth/profile
**📚 Books**
GET /books
GET /books/:bookId
**📖 Borrow**
POST /borrow/validate
POST /borrow/calculate
POST /borrow
**📊 Borrows**
GET /borrows/active
GET /borrows/:borrowId/summary
POST /borrows/:borrowId/submit
GET /borrows/history
**💳 Payments**
GET /payments/history
**📈 Dashboard**
GET /dashboard/summary
**🔄 Borrow Flow**
1-  User logs in
2-  Views available books
3-  Validates borrow request
4-  Calculates cost
5-  Borrows a book
6-  Views active borrow
7-  Returns book (submit)
8-  System calculates late fee
9-  Updates balance & histor

**📸 API Testing**
All APIs are tested using Postman.
Sample screenshots are included in the submission.

**👤 Author**
Divyanshu Srivastava
GitHub: https://github.com/Divyanshu1231
LinkedIn: https://linkedin.com/in/divyanshu-srivastava-b043b1240


**📌 Note**
Only one book can be borrowed at a time.
Borrow is allowed only if no pending balance exists.
Books are stored in MongoDB and seeded initially.

**⭐ Future Improvements**
Frontend integration (React / Android)
Payment gateway integration
Admin panel for book management
