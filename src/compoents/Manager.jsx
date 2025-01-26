import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [editingPasswordId, setEditingPasswordId] = useState(null); // Track password being edited

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };


  const EncriptPassword = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const savePassword = () => {
    if (editingPasswordId) {
      // Update existing password
      const updatedPasswords = passwordArray.map((item) =>
        item.id === editingPasswordId
          ? { ...item, ...form }
          : item
      );
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setEditingPasswordId(null);
      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } else {
      // Add a new password
      const newPassword = { ...form, id: uuidv4() };
      const updatedPasswords = [...passwordArray, newPassword];
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast.success("Password saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }

    // Clear the form
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast.info("Password deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit); // Populate the form with the selected password data
    setEditingPasswordId(id); // Set the password being edited
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass<span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your Own Password Manager
        </p>

        {/* Form Section */}
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-700 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-700 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-700 w-full p-4 py-1"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                className="absolute right-[10px] top-[8px] cursor-pointer"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                <img
                  src={showPassword ? "/eye.jpg" : "/eyeclose.jpg"}
                  alt={showPassword ? "Hide" : "Show"}
                  width={30}
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-200 rounded-full border-green-900 px-2 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
            ></lord-icon>
            {editingPasswordId ? "Update Password" : "Save Password"}
          </button>
        </div>

        {/* Password Display Section */}
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No passwords to show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 border-white text-center">
                      <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank" rel="noreferrer">
                          {item.site}
                        </a>
                        <div
                          className="size-7 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "19px",
                              height: "19px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div
                          className="size-7 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "19px",
                              height: "19px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div
                          className="size-7 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "19px",
                              height: "19px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"


                          ></lord-icon>
                          </div>
                          <div
                          className="size-7 cursor-pointer"
                          onClick={() => EncriptPassword(item.password)}
                        ></div>
                          <div>
                          <lord-icon
                             style={{
                              width: "19px",
                              height: "19px",
                              
                            }}
                            src="https://cdn.lordicon.com/dicvhxpz.json"
                            trigger="hover"
                            >
                          </lord-icon>
                          </div>
                        </div>
                      
                    </td>
                    <td className="py-2 border-white text-center">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
