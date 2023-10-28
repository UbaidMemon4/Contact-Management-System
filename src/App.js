import "./App.css";
import { useState } from "react";

function App() {
  const CONTACT = localStorage.getItem("contact");

  const initialValue = CONTACT ? JSON.parse(CONTACT) : [];
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState(initialValue);
  const [contactId, setContactId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (contactId) {
      const updated = contact.map((contact) => {
        return contact.id === contactId
          ? {
              ...contact,
              userName: userName,
              contactNumber: contactNumber,
              email: email,
              gender: gender,
              age: age,
            }
          : contact;
      });

      setContact(updated);
      localStorage.setItem("contact", JSON.stringify(updated));
      setContactId("");
    } else {
      const updated = [
        ...contact,
        {
          userName: userName,
          contactNumber: contactNumber,
          email: email,
          gender: gender,
          age: age,
          id: Math.random(),
        },
      ];
      setContact(updated);
    }
    setUserName("");
    setContactNumber("");
    setEmail("");
    setGender("");
    setAge("");
  };
  const handleOnClick = (c) => {
    const update = contact.filter((t) => t.id !== c.id);
    setContact(update); 
    localStorage.setItem("contact", JSON.stringify(update));
  };

  const handleOnEdit = (t) => {
    setContactId(t.id);
    setUserName(t.userName);
    setEmail(t.email);
    setGender(t.gender);
    setAge(t.age);
  };
  return (
    <div>
      <h1 className="contact_heading">Contact </h1>
      <div className="form">
        <form onSubmit={onSubmit}>
          <label>Enter Your User Name</label>
          <input
            value={userName}
            className="user_name"
            placeholder="Enter Your User Name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <label>Enter Your Contact Number</label>
          <input
            value={contactNumber}
            className="contact_number"
            placeholder="Enter Your Contact Number"
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
          />
          <br />
          <label>Enter Your Email</label>
          <input
            value={email}
            className="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label>Select Your Gender</label>
          <select
            value={gender}
            className="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option>Select</option>

            <option value={"male"}> Male</option>
            <option value={"female"}>Female</option>
          </select>
          <br />
          <label>Enter Your age</label>
          <input
            value={age}
            className="age"
            defaultValue={0}
            type="number"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <br />
          <button type="submit" className="create_button">
            {contactId ? "Update" : "Create"}
          </button>
        </form>
        <h1 className="contact_heading">Contact List</h1>
        <div className="todo-container"></div>

        {contact.map((c) => {
          return (
            <div key={c.id} className="contact-card">
              <p><b>User Name : </b>{c.userName}</p>
              <p><b>Contact Number : </b>{c.contactNumber}</p>
              <p><b>Email : </b>{c.email}</p>
              <p><b>Gender : </b>{c.gender}</p>
              <p><b>Age : </b>{c.age}</p>
              <button
                onClick={() => {
                  handleOnEdit(c);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleOnClick(c)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
