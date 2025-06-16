import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="card w-full max-w-sm bg-white text-black shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-semibold text-center mb-4">Login</h1>
          <form>
            <fieldset className="fieldset">
              <legend className="text-base">Email</legend>
              <input type="email" className="input input-neutral text-white" name="email" placeholder="Masukkan email" />

              <legend className="text-base">Password</legend>
              <label className="input input-neutral text-white">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Masukkan password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="label">
                  <FontAwesomeIcon className="text-white w-5" icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </label>

              <button className="btn btn-primary mt-4">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
