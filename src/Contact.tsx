import {ChangeEvent, FormEvent, useRef, useState} from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
interface FormData {
  /** The text to display inside the button */
  firstname: string;
  lastname: string;
  email: string;
  enquiry: string;
  token: string;
}

interface Errors {
  firstname?: string;
  lastname?: string;
  email?: string;
  enquiry?: string;
  token?: string;
}

const Contact = () => {

  const turnstileRef = useRef<any>(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    enquiry: "",
    token: "",
  });

  const [errors, setErrors] = useState<Errors>({});


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Dynamically update the field based on name attribute
    }));
  };

  const handleTokenSuccess = (receivedToken: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      token: receivedToken, // Update the token in the form data
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    let isValid = true;

    if (!formData.token) {
      newErrors.token = "Verification is required";
      isValid = false;
    }
    if (!formData.firstname) {
      newErrors.firstname = "First Name is required";
      isValid = false;
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last Name is required";
      isValid = false;
    }
    if (!formData.enquiry) {
      newErrors.enquiry = "Enquiry is required";
      isValid = false;
    } else if (formData.enquiry.length < 10) {
      newErrors.enquiry = "The enquiry must be at least 10 characters long.";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      console.log("Form submitted successfully:", formData);
      try {
        axios.post(
          `${apiUrl}/clients/new_dawn/contact`, formData
        ).then(async response => {
          if (response.status === 200) {
            setIsSuccess(true);
            setStatusMessage("Email sent successfully!");
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              enquiry: "",
              token: "",
            });
              turnstileRef.current?.reset()
            setTimeout(() => {
              setStatusMessage("");
              setIsSuccess(false);
            }, 5000);
          }
        })
          .catch(error => {
            console.error('Error:', error);
          })
        .finally(() => {
          setLoading(false);
        })

      }
      finally {
      }
    }
  };

  return (
    <div id="contact" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
      <div className='text-center space-y-6 max-w-4xl md:w-full'>
        <h1 className='text-3xl font-trirong_reg'>Please do get in touch...</h1>
        <p className='text-left text-sm font-trirong_light'>I will get back to you as soon as possible.</p>
        <form onSubmit={handleSubmit} className='text-left '>
          <div className="mb-5 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="first-name" className="block mb-2 text-sm text-black font-trirong_light">First Name</label>
                <input type="text" id="first-name" value={formData.firstname} name="firstname"
                  onChange={handleChange} className="p-1.5 w-full border border-black font-trirong_reg" />
                {errors.firstname && <span className="text-red-500 text-sm font-trirong_light">{errors.firstname}</span>}

              </div>
              <div className="flex-1">
                <label htmlFor="last-name" className="block mb-2 text-sm text-black font-trirong_light">Last Name</label>
                <input type="text" id="last-name" value={formData.lastname} name="lastname"
                  onChange={handleChange} className="p-1.5 w-full border border-black font-trirong_reg" />
                {errors.lastname && <span className="text-red-500 text-sm font-trirong_light">{errors.lastname}</span>}

              </div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-black font-trirong_light">Email</label>
              <input type="email" id="email" value={formData.email} pattern=".*" name="email"
                onChange={handleChange} style={{ textTransform: 'none' }}
                className="p-1.5 w-full border border-black font-trirong_reg" />
              {errors.email && <span className="text-red-500 text-sm font-trirong_light">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-black font-trirong_light">Please tell me a little bit about your enquiry</label>
              <textarea  value={formData.enquiry} name="enquiry"
                onChange={handleChange} rows={4}
                className="p-1.5 w-full border border-black font-trirong_reg resize-none" />
              {errors.enquiry && <span className="text-red-500 text-sm font-trirong_light">{errors.enquiry}</span>}
            </div>
            <div>
              <Turnstile ref={turnstileRef} siteKey="0x4AAAAAAA59u5SDqngiNfFs"
                 onSuccess={handleTokenSuccess}
                 options={{
                  theme: 'light',
                }}
              />{" "}
              {errors.token && <span className="text-red-500 text-sm font-trirong_light">{errors.token}</span>}
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className='py-2 px-8 bg-[#9db39f] text-center w-1/2 font-trirong_reg'>
                {isLoading ? (
                    <div className='flex items-center justify-center opacity-70'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                              opacity="0.5"/>
                        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                          <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite"
                                            to="360 12 12" type="rotate"/>
                        </path>
                      </svg>
                    </div>
                ) : (
                    <p>Submit</p>
                )
                }
              </button>
            </div>
            {statusMessage && (
                <p className="font-trirong_light" style={{color: isSuccess ? "green" : "red"}}>{statusMessage}</p>
            )}
          </div>

        </form>

      </div>

    </div>
  );
}

export default Contact;