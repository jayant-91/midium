import { signupInput } from "@jayantdotcom/medium_common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
	const [postInputs, setPostInputs] = useState<signupInput>({
		name: "",
		username: "",
		password: "",
	});

    async function sendRequest() {
        try {
            setLoading(true);
            const url = `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`;
            const response = await axios.post(url, postInputs);
            console.log(response);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            setLoading(false);
            navigate("/blogs")
        } catch(e) {
            // alert the user here the request failed 
            setLoading(false);
            alert(`something went wrong can't ${type === "signin" ? "signin" : "signup"}`);
        }
    }

	return (
		<div className="h-screen flex justify-center flex-col">
			<div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-400">
                            {type === "signup" ? "Already have an account?" : "Create an account?"}
                            <Link
                                className="pl-2 text-green-500 underline"
                                to={type === "signin" ? "/signup" : "/signin"}
                            >
                                {type === "signin" ? "Sign up":"Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup"? <LabelledInput      // This pag ewill apear only in signup page 
                            key={1}
                            title="Name"
                            placeholder="Donald J Trump"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs, // Existing username, password and name
                                    name: e.target.value, // override to name
                                });
                            }}
                        />:null}
                        <LabelledInput
                            key={2}
                            title="Email"
                            placeholder="donaldjtrump@hotmail.com"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs, // Existing username, password and name
                                    username: e.target.value, // override to username
                                });
                            }}
                            type="email"
                        />
                        <LabelledInput
                            key={3}
                            title="Password"
                            placeholder="hdjJ7@x*0$2W?3v&d!P"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs, // Existing username, password and name
                                    password: e.target.value, // override to password
                                });
                            }}
                            type="password"
                        />
                        <button onClick={sendRequest} type="button" className="mt-6 w-full flex justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {loading ? 
                                (<img className="w-5 h-5 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon"></img>) :
                                 (type === "signup" ? "Sign Up" : "Sign In") 
                            }
                        </button>
                    </div>
                </div>
			</div>
		</div>
	);
};

interface LabelledInput {
	title: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}
function LabelledInput({ title, placeholder, onChange, type }: LabelledInput) {
	return (
		<div>
			<label className="block mb-2 text-sm font-semibold text-white dark:text-black">
				{title}
			</label>
			<input
				onChange={onChange}
				type={type || "text"}
				className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
