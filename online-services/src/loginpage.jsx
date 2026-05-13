import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();
    const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
    },
    form: {
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "300px",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    };
   const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch("http://127.0.0.1:8000/login/",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username);
        window.dispatchEvent(new Event("storage"));
        navigate("/admin")
      }else {
        setError(data.error)
      }
    }catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        <input type="text" name="username" placeholder="User Name" value={form.username} onChange={handleChange} style={styles.input} required/>

        <input type="password" name="password" placeholder="Enter Password" value={form.password} onChange={handleChange} style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p>
        Don't have an account ? <Link to="/signup" style={{textDecoration:"none"}}>Sign Up</Link>
      </p>
      </form>
      
    </div>
  );
}


export default LoginPage;