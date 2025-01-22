import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const Contact = () => {

  const ref = useRef()

  const apiUrl = process.env.REACT_APP_API_URL;
  const [statusMessage, setStatusMessage] = useState(""); // To store the success or error message
  const [isSuccess, setIsSuccess] = useState(false); // To track the success state
  let [token, setToken] = useState()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    enquiry: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    enquiry: "",
    token: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the specific field (email, message, or any other field) in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Dynamically update the field based on name attribute
    }));
  };

  const validateForm = () => {
    const newErrors = { firstname: "", lastname: "", email: "" };
    let isValid = true;
    if (!token) {
      newErrors.token = "This is required to be verified";
      isValid = false;
    }
    // Validate Name
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
    }
    if (formData.enquiry.length < 10) {
      newErrors.enquiry = "The enquiry must be at least 10 characters long.";
      isValid = false;
    }

    // Validate Email
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      formData.token = token;
      console.log("Form submitted successfully:", formData);
      try {
        fetch(
          `${apiUrl}/clients/new_dawn/contact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        ).then(async response => {
          if (response.status === 429) {
            // Handle rate limiting
            const errorText = await response.text();
            throw new Error(`Rate limit exceeded. Details: ${errorText}`);
          }

          if (response.ok) {
            setIsSuccess(true);
            setStatusMessage("Email sent successfully!");
            setFormData({ firstname: "", lastname: "", email: "", enquiry: "" }); // Clear the form
              ref.current?.reset()
            token = null;
            setTimeout(() => {
              setStatusMessage("");
              setIsSuccess(false);
            }, 5000);
          }
        })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.error('Error:', error);
          });

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
              <textarea type="text" id="email" value={formData.enquiry} pattern=".*" name="enquiry"
                onChange={handleChange} rows="4"
                className="p-1.5 w-full border border-black font-trirong_reg resize-none" />
              {errors.enquiry && <span className="text-red-500 text-sm font-trirong_light">{errors.enquiry}</span>}
            </div>
            <div>
              <Turnstile ref={ref} siteKey="0x4AAAAAAA59u5SDqngiNfFs"
                onSuccess={setToken}
                options={{
                  theme: 'light',
                }}
              />{" "}
              {errors.token && <span className="text-red-500 text-sm font-trirong_light">{errors.token}</span>}
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className='py-2 px-8 bg-[#9db39f] text-center w-1/2 font-trirong_reg'>Submit</button>
            </div>
            {statusMessage && (
              <p className="font-trirong_light" style={{ color: isSuccess ? "green" : "red" }}>{statusMessage}</p>
            )}
          </div>

        </form>

      </div>

    </div>
  );
}

export default Contact;