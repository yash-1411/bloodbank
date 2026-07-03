import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {

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

  async function handleSubmit() {

    if (!form.name || !form.usn) {
      setMessage("Please fill all fields.");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)

      });

      const data = await res.json();

      setMessage(data.message);

      if (res.ok) {

        alert("Registration Successful");

        router.push("/login");

      }

    }

    catch (error) {

      console.log(error);

      setMessage("Registration Failed");

    }

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Register</h1>

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

      <button onClick={handleSubmit}>
        Register
      </button>

      <p style={{ color: "green" }}>
        {message}
      </p>

    </div>

  );

}
