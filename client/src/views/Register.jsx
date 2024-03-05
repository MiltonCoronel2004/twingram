//Styles
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../assets/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/Icons/EyeSlashFilledIcon";
import {Button} from "@nextui-org/react";

//Loginc
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api/register";

const Register = () => {
  //Styles
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  //Logic
  const { register, handleSubmit, formState: { isSubmitting }  } = useForm();
  const [verify, setVerify] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoint, data);
      setVerify(response.data.message);
      if (response.data.message) {
        setLoading(true)
        setTimeout(() => {
          navigate("/")
        }, 7000);
      }
    } catch (error) {
      setErrors(error.response.data.errors);
      setTimeout(() => {
        setErrors("");
      }, 4000);
    }
  };



  return (
    <div className="flex flex-col h-screen">
      <div className="text-white fixed top-5 left-0 right-0 flex justify-center 2">
        <h1 className="font-title text-4xl">Twingram</h1>
      </div>
      <div className="flex justify-center items-center flex-grow">
      <div className="fixed top-[15%] px-6 text-[15px] smaller:text-[16.5px]">
        {verify && <p className="text-center">{verify}</p>}
      </div>
        <div className="text-center mt-5">
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <Input
                type="text"
                variant="underlined"
                label="Username"
                {...register("username")}
                className="max-w-xs 1"
              />
              {errors && errors.username && <p className="my-1 text-[12px] smaller:text-[14.5px]">{errors.username}</p>}
              {!errors && <p className="text-transparent my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>}
              {errors && !errors.username &&<p className="text-transparent my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>}
            </div>

            <div>
              <Input
                variant="underlined"
                label="Email"
                className="max-w-xs 1"
                {...register("email")}
              />
              {errors && errors.email && <p className="my-1 text-[12px] smaller:text-[14.5px]">{errors.email}</p>}
              {!errors && <p className="text-transparent my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>}
              {errors && !errors.email &&<p className="text-transparent my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>}
            </div>

            <div>
              <Input
                variant="underlined"
                label="Password"
                className="max-w-xs"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                {...register("password")}
              />
              {errors && errors.password && <p className="my-1 text-[12px] smaller:text-[14.5px]">{errors.password}</p>}
              {!errors && <p className="text-transparent my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>}
              {errors && !errors.password &&<p className="text-transparent my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>}

            </div>

            <div className="mt-2 mb-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-tr from-[#212130] via-[#00008B] to-[#39304A] text-white py-2 px-8 rounded focus:outline-none"
                  isLoading={!errors && isSubmitting || loading}
                >
                  Sign up
                </Button>
            </div>
          </form>

          <div>
            <p>
              Already have an account?{" "}
              <Link to="/" className="underline hover:text-yellow-500 duration-400">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
