import React, { useState, useEffect } from "react";
import { hackerPost, logo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { sinupSchema } from "../../schemas";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const [lEmail, setLEmail] = useState("");
  const [lPass, setLPass] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [buyUser, setBuyUser] = useState([]);
  const [farmUser, setFarmUser] = useState([]);
  const navigate = useNavigate();
  const regBlock = () => {
    setModal(!modal);
  };
  const farmerCollectionRef = collection(db, "farmers");
  const buyerCollectionRef = collection(db, "buyers");

  useEffect(() => {
    const getFarmers = async () => {
      const data = await getDocs(farmerCollectionRef);
      setFarmers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFarmers();
  }, []);

  useEffect(() => {
    const getBuyers = async () => {
      const data = await getDocs(buyerCollectionRef);
      setBuyers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBuyers();
  }, []);

  useEffect(() => {
    const getBuy = async () => {
      setBuyUser(
        buyers.filter((item) =>
          Object.values(item)
            .join("")
            .toLowerCase()
            .includes(lEmail.toLowerCase())
        )
      );
    };
    getBuy();
  }, [lEmail, buyers]);

  useEffect(() => {
    const getFarm = async () => {
      setFarmUser(
        farmers.filter((item) =>
          Object.values(item)
            .join("")
            .toLowerCase()
            .includes(lEmail.toLowerCase())
        )
      );
    };
    getFarm();
  }, [lEmail, farmers]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      remail: "",
      rpass: "",
      rcpass: "",
    },
    validationSchema: sinupSchema,
    onSubmit: async (values) => {
      try {
        await createUserWithEmailAndPassword(auth, values.remail, values.rpass);
        await signOut(auth);
        setModal(!modal);
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const resetPassword = () => {
    if (lEmail.length !== 0) {
      sendPasswordResetEmail(auth, lEmail)
        .then(() => {
          alert("Password reset mail sent sucessfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
        });
    } else {
      alert("Please provide the valid email address !");
    }
  };

  const toLogin = async () => {
    if (category.length !== 0) {
      try {
        await signInWithEmailAndPassword(auth, lEmail, lPass);

        if (category.includes("Farmer")) {
          if (farmUser.length !== 0) {
            navigate("/FarmerSection");
          } else {
            navigate("/FarmerReg");
          }
        } else {
          navigate("/BuyRegister");
          if (buyUser.length !== 0) {
            navigate("/BuyerSection");
          } else {
            navigate("/BuyerReg");
          }
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    } else {
      alert("Select the signIn type !");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex items-start overflow-hidden">
        <div className="relative w-1/2 h-full flex-col sm:flex hidden">
          <div className="absolute top-[50%] left-[10%] flex flex-col">
            <h1 className="text-3xl text-white font-bold my-4">
              Turn your ideas into reality
            </h1>
            <p className="text-xl text-white font-normal">
              Start for free and get attractive offers from the community
            </p>
          </div>
          <img
            src={hackerPost}
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full back-image flex flex-col p-5 justify-between items-center sm:w-1/2 sm:p-20">
          <span className="absolute top-0 bottom-0 right-0 px-2 py-3">
            <Link to="/">
              <svg
                className="fill-current h-10 w-10 text-black-500 close-link"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </Link>
          </span>
          <img
            src={logo}
            alt="bank"
            className="absolute top-0 bottom-0  px-4 py-3 rounded-full"
          />
          <h1 className="w-full text-center mx-auto mt-12 text-xl text-white font-bold mr-auto sm:max-w-[550px] sm:mt-0">
            #Our Farmer Our Pride
          </h1>

          <div className="w-full flex flex-col max-w-[350px]  sm:max-w-[550px] ">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-2xl font-bold mb-1 text-white">Sign In</h3>
              <p className="text-sm mb-2 font-semibold text-white">
                Welcome Back! Please enter your details.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <label>
                <select
                  id="category"
                  name="category"
                  className={`p-2 mb-1 rounded-md sm:text-l text-l font-semibold border border-black/40 cursor-pointer`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option
                    value=""
                    className="rounded-md font-semibold border border-black/40"
                  >
                    Select a category
                  </option>
                  <option
                    value="Farmer"
                    className="rounded-md font-semibold border border-black/40"
                  >
                    Farmer
                  </option>
                  <option
                    value="Buyer"
                    className="rounded-md font-semibold border border-black/40"
                  >
                    Buyer
                  </option>
                </select>
              </label>
              <input
                type="email"
                id="lemail"
                name="lemail"
                placeholder="Email"
                className={`w-full text-white py-2 my-1 text-xl bg-transparent border-b border-black outline-none focus:outline-none`}
                value={lEmail}
                onChange={(e) => setLEmail(e.target.value)}
              />
              <input
                type="password"
                id="lpass"
                name="lpass"
                placeholder="Password"
                className={`w-full text-white py-2 my-1 bg-transparent border-b text-xl border-black outline-none focus:outline-none`}
                value={lPass}
                onChange={(e) => setLPass(e.target.value)}
              />
            </div>
            <div className="w-full flex items-center justify-between my-1">
              <div className="w-full flex items-center">
                <input type="checkbox" id="check" className="w-4 h-4 mr-2" />
                <p className="text-sm text-white">Remember me for 30 days</p>
              </div>
              <button
                onClick={resetPassword}
                className="font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-white text-sm sm:text-l"
              >
                Forgot Password ?
              </button>
            </div>
            <div className="w-full flex flex-col my-3">
              <button
                type="submit"
                onClick={toLogin}
                className=" cursor-pointer button-link w-full text-white  font-bold rounded-md p-3 text-center flex items-center justify-center text-l sm:text-xl"
              >
                Sign In
              </button>
            </div>
            <div className="w-full flex items-center justify-center relative py-2">
              <div className="w-full h-[1px] bg-black/40"></div>
              <p className="text-lg absolute text-black/80 back-or text-white">
                or
              </p>
            </div>
            <div className="w-full text-white my-3 font-bold  border border-black/40 rounded-md p-3 text-center flex items-center justify-center cursor-pointer button-link text-l sm:text-xl">
              Sign In with Google
            </div>
          </div>

          <div className="w-full flex items-center justify-center my-1">
            <p className="text-sm font-normal text-white sm:text-l">
              Dont have a account?{" "}
              <button onClick={regBlock}>
                <span className="font-semibold underline underline-offset-2 cursor-pointer sm:font-bold">
                  Sign Up for free
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Register account */}
      {modal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <form
            onSubmit={handleSubmit}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="flex min-h-full items-end justify-center p-20 text-center sm:items-center sm:p-0">
              <div className="back-sinup relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-[600px] min-w-[250px] sm:my-8 sm:w-full sm:max-w-[600px] sm:min-w-[300px]">
                <div className=" px-6 pb-8 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                        className="fill-current h-10 w-10 text-black-500 close-link"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        onClick={regBlock}
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-2xl font-semibold mb-2">Sign Up</h3>
                      <p className="text-sm mb-2">
                        Welcome! Please enter your details.
                      </p>
                      <div className="mt-2">
                        <div className="w-full flex flex-col">
                          <input
                            type="email"
                            id="remail"
                            name="remail"
                            placeholder="Email"
                            className={`w-full text-black text-xl py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                              errors.remail ? "input_Error" : ""
                            }`}
                            value={values.remail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.remail && touched.remail && (
                            <p className="error font-semibold">
                              {errors.remail}
                            </p>
                          )}
                          <input
                            type="password"
                            id="rpass"
                            name="rpass"
                            placeholder="Password"
                            className={`w-full text-black text-xl py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                              errors.rpass ? "input_Error" : ""
                            }`}
                            value={values.rpass}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.rpass && touched.rpass && (
                            <p className="error font-semibold">
                              {errors.rpass}
                            </p>
                          )}
                          <input
                            type="password"
                            id="rcpass"
                            name="rcpass"
                            placeholder="Confirm Password"
                            className={`w-full text-black py-2 my-2 text-xl bg-transparent border-b border-black outline-none focus:outline-none ${
                              errors.rcpass ? "input_Error" : ""
                            }`}
                            value={values.rcpass}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.rcpass && touched.rcpass && (
                            <p className="error font-semibold">
                              {errors.rcpass}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col my-4 px-8 py-3 ">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer button-link"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
