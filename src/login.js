import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    usn: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  async function handleLogin() {

    if (!form.name || !form.usn) {

      setMessage("Please fill all fields.");

      return;

    }

    try {

      const res = await fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)

      });

      const data = await res.json();

      setMessage(data.message);

      if (res.ok && data.message === "login successful") {

        sessionStorage.setItem("usn", form.usn);
        sessionStorage.setItem("name", form.name);

        router.push("/profile");

      }

    }

    catch (error) {

      console.log(error);

      setMessage("Unable to connect to server.");

    }

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Login</h1>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="usn"
        placeholder="Enter USN"
        value={form.usn}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p style={{ color: "green" }}>
        {message}
      </p>

    </div>

  );

}
