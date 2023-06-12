import React, {useState} from "react";

function Login() {
    const [loginOption, setLoginOption] = useState("Student");

    function handleOptionChange(event) {
        setLoginOption(event.target.value);
    }

    return (
    <div className="form-container">
    <form method="post" action="/auth/login" className="login-form">
        <p>Login as: </p>
        <select value={loginOption} onChange={handleOptionChange}>
            <option>Student</option>
            <option>Teacher</option>
            <option>Admin</option>
        </select><br />
        <h3>Login as {loginOption}</h3>
        <input type="text" name="email" placeholder="Enter Email" /><br />
        <input type="password" name="password" placeholder="Enter Password" /><br />
        <input type="submit" value="Login"/><br />
    </form>
    </div>
    )
}

export default Login