//Styles
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../assets/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/Icons/EyeSlashFilledIcon";


// Logic
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";





const endpoint = "http://localhost:8000/api/login";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [errrorusername, setErrorUsername] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [erroraccount, setErrorAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState("");
  const navigate = useNavigate();
  const {verifyToken} = useParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (verifyToken && verifyToken.length === 40) {
          const response = await axios.get(`http://localhost:8000/api/verify/${verifyToken}`);
          setVerified(response.data.success);
          setTimeout(() => {
            setVerified('')
          }, 5000)
        }
      } catch (error) {
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    verifyEmail(); 
  }, [verifyToken, navigate]); 



  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(endpoint, data);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setTimeout(() => {
        window.location.href = "http://localhost:5173/feed"
      }, 1000);
    } catch (error) {
      console.log(error)
      setErrorAccount(error.response.data.error)
      setErrorUsername(error.response.data.errors.username)
      setErrorPassword(error.response.data.errors.password)


      setTimeout(() => {
        setErrorAccount('')
        setErrorUsername('')
        setErrorPassword('')
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="text-white fixed top-5 left-0 right-0 flex justify-center mt-2">
        <h1 className="font-title text-4xl">Twingram</h1>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="fixed top-[15%] px-6 text-[15px] smaller:text-[16.5px]">

        </div>
        <div className="text-center">
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="text"
                variant="underlined"
                label="Username"
                {...register("username")}
                className="max-w-[230px]"
              />
              {errrorusername && (<p className="my-1 text-[12px] smaller:text-[14.5px]">{errrorusername}</p>)}
              {!errrorusername && (!errorpassword || errorpassword ) && (<p className="my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>)}
            </div>

            <div>
              <Input
                variant="underlined"
                label="Password"
                className="max-w-[230px]"
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

              {verified && <p className="my-1 text-[12px] smaller:text-[14.5px]">{verified}</p>}
              {!errorpassword && ((!errrorusername && !erroraccount && !verified) || errrorusername) && (<p className="my-1 text-[12px] smaller:text-[14.5px]">&nbsp;</p>)}
              {!!erroraccount && (<p className="my-1 text-[12px] smaller:text-[14.5px] max-w-[230px] text-center">{erroraccount}</p>)}



              {errorpassword && (<p className="my-1 text-[12px] smaller:text-[14.5px]">{errorpassword}</p>)}
              



              
                
            </div>

            <div className="mt-2 mb-2">
              <Button 
                type="submit" 
                className="bg-gradient-to-tr from-[#212130] via-[#00008B] to-[#39304A] text-white py-2 px-8 rounded focus:outline-none"
                disabled={isSubmitting || loading}
                isLoading={(!erroraccount && !errorpassword && !errrorusername) && isSubmitting || loading}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div>
            <p>Don{`'`}t have an account? <Link to="/register" className="underline hover:text-yellow-500 duration-400">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
