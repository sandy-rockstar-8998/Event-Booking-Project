import './App.css'
import Navbar1 from './nav1'
import { Router, Routes, Route } from "react-router-dom"
import Contact from './contact';
import Footer from './footerpage';
import FormExample from './RegisterForm';
import PreviewData from './preview';
import Menuu from './Home';
import LoginPage from './loginpage';
import AdminDashboard from './Admin-Dashboard';
import AddEmployee from './Add-Employee';
import EmployeeDetails from './Emp-Profile';
import TotalBooking from './TotalBooking';
import Signup from './signup-page';
import CustomerEvent from './customerpage';

function App() {

  return (
    <>
      <Navbar1/>
      <main style={{ marginBottom: "300px" }}>
          <Routes>
            <Route path='/' element = {<Menuu/>} />
            <Route path='/contact' element = {<Contact/>} />
            <Route path='/form' element ={<FormExample/>} />
            <Route path='/preview' element ={<PreviewData/>} />
            <Route path='/bookings' element ={<TotalBooking/>} />
            <Route path='/login' element ={<LoginPage/>} />
            <Route path='/signup' element ={<Signup/>} />
            <Route path='/admin' element ={<AdminDashboard/>} />
            <Route path='/add_employee' element ={<AddEmployee/>} />
            <Route path='/emp_profile' element ={<EmployeeDetails/>} />
            <Route path='/events/:type' element ={<CustomerEvent/>} />
          </Routes>
        </main>
    <Footer/>
    </>
  )
}

export default App
