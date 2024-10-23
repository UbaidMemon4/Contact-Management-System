import "./App.css";
import { useState } from "react";
import { PhoneOutlined } from "@ant-design/icons";
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
    <div className="ContactApp">
      <div>
        <h1 className="contact_heading">
          <PhoneOutlined /> Add Contact
        </h1>
      </div>
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
            required
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
            required
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
            required
          />
          <br />
          <label>Select Your Gender</label>
          <select
            value={gender}
            className="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            required
          >
            <option>Select</option>

            <option value={"male"}> Male</option>
            <option value={"female"}>Female</option>
          </select>
          <br />
          <label>Enter Your age</label>
          <input
            placeholder="0"
            value={age}
            className="age"
            defaultValue={0}
            type="number"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            required
          />
          <br />
          <button type="submit" className="create_button">
            {contactId ? "Update Contact" : "Create Contact"}
          </button>
        </form>
      </div>

      <h1 className="contact_heading">Contact List</h1>
      <div className="contact-card">
        {contact.map((contactData) => {
          return (
            <div key={contactData.id}>
              <p>
                <b>User Name : </b>
                {contactData.userName}
              </p>
              <p>
                <b>Contact Number : </b>
                {contactData.contactNumber}
              </p>
              <p>
                <b>Email : </b>
                {contactData.email}
              </p>
              <p>
                <b>Gender : </b>
                {contactData.gender}
              </p>
              <p>
                <b>Age : </b>
                {contactData.age}
              </p>
              <div className="buttons">
                <button
                  onClick={() => {
                    handleOnEdit(contactData);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleOnClick(contactData)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
