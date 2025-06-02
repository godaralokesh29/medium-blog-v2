import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { SignupInput } from "@godara_29/medium-common-v2"

export const Auth = ({type}: {type: "signup" | "signin"}) => {

  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendRequest () {
    try{
      setIsLoading(true);
      setError("");
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
const token = response.data.token || response.data.jwt; // handle both signup and signin
localStorage.setItem("token", token);
navigate("/blogs");
    } catch (e: any) {
      setError(e.response?.data?.message || "Dont use Your initially hardcoded Credentials. Erase and type again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)]">
            Welcome to Tech Talks
          </h1>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
            {type === "signin" ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={type === "signin" ? "/" : "/signin"}
              className="font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors duration-200"
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {type === "signup" && (
              <LabelledInput label="Name" placeholder="Lokesh Godara" onChange={(e) =>{
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                })
              }}/>
            )}

            <LabelledInput label="Email" type="email" placeholder="lokesh@example.com" onChange={(e) =>{
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }}/>

            <LabelledInput label="Password" type="password" placeholder="••••••••" onChange={(e) =>{
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            }}/>
          </div>

          <button
            onClick={sendRequest}
            disabled={isLoading}
            className="btn-primary w-full flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>{type === "signup" ? "Create account" : "Sign in"}</span>
            )}
          </button>

          <div className="text-center text-sm text-[var(--muted-foreground)]">
            By {type === "signup" ? "creating" : "signing in to"} an account, you agree to our{" "}
            <Link to="/terms" className="text-[var(--primary)] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[var(--primary)] hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}

interface LabelledInputType{
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
  return <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
            {label}
          </label>
          <input onChange={onChange} type={type || "text"} className="input-field" placeholder={placeholder} required />
        </div>
}

export default Auth