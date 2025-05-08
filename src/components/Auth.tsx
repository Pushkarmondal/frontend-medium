import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignUpSchema } from '@nishitcodes100x/medium-common'
import { Button } from "./Button"
import axios from 'axios';
import { SIGNUP_URL } from "../Config";

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
      const navigate = useNavigate();
      const [postInput, setPostInputs] = useState<SignUpSchema>({
            username: "",
            email: "",
            password: ""
      })

      async function onhandle() {
            try {
                  const response = await axios.post(SIGNUP_URL, postInput)
                  console.log("Signup response data:", response.data);

                  // Fix: Extract the token with proper fallback
                  const jwt = response.data.token || response.data.jwt;
                  localStorage.setItem('jwt', jwt);
                  console.log("Token saved to localStorage:", jwt);

                  navigate("/blogs")
            } catch (error) {
                  console.log("Error while signup", error);
            }
      }

      return <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 p-8  shadow-xl/30 rounded-xl w-[90%] max-w-md bg-white">
                  <div className="text-center">
                        <div className="text-4xl font-normal">
                              {type === 'signup' ? 'Signup' : 'Signin'} Component!
                        </div>

                        <div className="text-slate-700 mt-4">
                              {type === 'signin' ? "Don't have an account? " : "Already have an account? "}
                              <Link
                                    className="underline text-blue-500"
                                    to={type === 'signin' ? '/signup' : "/signin"}>
                                    {type === 'signin' ? 'Sign up' : 'Sign in'}
                              </Link>
                        </div>
                  </div>
                  <LabelledInput label="Name" placeholder="Enter your username..." onChange={(e) => {
                        setPostInputs(c => ({
                              ...c,
                              username: e.target.value
                        }))
                  }} />
                  <LabelledInput label="Email" placeholder="Enter your Email..." onChange={(e) => {
                        setPostInputs(c => ({
                              ...c,
                              email: e.target.value
                        }))
                  }} />
                  <LabelledInput label="Password" type={"password"} placeholder="Enter password..." onChange={(e) => {
                        setPostInputs(c => ({
                              ...c,
                              password: e.target.value
                        }))
                  }} />
                  <div className="flex justify-center">
                        <Button type={type.toLowerCase() as 'signup' | 'signin'} onClick={onhandle} />
                  </div>
            </div>
      </div>
}

interface LabelledInputType {
      label: string,
      placeholder: string,
      onChange: (e: ChangeEvent<HTMLInputElement>) => void
      type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
      return <div>
            <div>
                  <label className="block mb-1 text-sm font-medium text-gray-800">{label}</label>
                  <input
                        onChange={onChange}
                        type={type || "text"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={placeholder}
                        required
                  />
            </div>
      </div>
}