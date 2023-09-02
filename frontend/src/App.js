import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateBook from './pages/Admin/CreateBook';
import Users from './pages/Admin/Users';
import ManageBook from './pages/Admin/ManageBook';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Issues from './pages/user/Issues';
import UpdateBook from './pages/Admin/UpdateBook';
import ManageOrders from './pages/Admin/ManageOrders';
import BookPage from './pages/user/BookPage';
import IssuedBooks from './pages/Admin/IssuedBooks';
import OrderBook from './pages/user/OrderBook';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>} />
          <Route path="user/orders" element={<Orders/>} />
          <Route path="user/order" element={<OrderBook/>} />
          <Route path="user/profile" element={<Profile/>} />
          <Route path="user/issues" element={<Issues/>} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-book" element={<CreateBook/>} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/manage-book" element={<ManageBook/>} />
          <Route path="admin/issued-books" element={<IssuedBooks/>} />
          <Route path="admin/manage-orders" element={<ManageOrders/>} />
          <Route path="admin/manage-book/:id" element={<UpdateBook/>} />
        </Route>

        <Route path="/:id" element={<BookPage/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
