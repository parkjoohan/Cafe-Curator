import React, { useState } from "react";

export default function SignupForm() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation:"",
  });

  const [passwordCorrect,setpasswordCorrect] = useState(false);

  const isCorrect = e => {
    if ((e.target.value) == details.password){
      console.log('correct!')
    } else {console.log('incorrect!')}
  };

  return (
    <form>
      <div className="form-inner">
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            // value={details.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            // value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            // value={details.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">PasswordConfirmation:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>isCorrect(e)}
            // value={details.password}
          />
        </div>
        <input type="submit" value="회원가입" />
        
        <button> 회원가입 </button>
      </div>
    </form>
  );
}