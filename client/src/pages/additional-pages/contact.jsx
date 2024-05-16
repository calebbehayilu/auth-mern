import React, { useState } from "react";
import Inputs from "../../components/input";
import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Error from "../../components/error";
import Success from "../../components/success";

const validateContact = z.object({
  email: z.string({ required_error: "Email can`t be empty" }).email(),
  subject: z.string({ required_error: "Subject can`t be empty" }),
  message: z.string({ required_error: "Message can`t be empty" }),
});

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(validateContact) });

  const onSend = async (data) => {
    setIsLoading(true);

    apiClient
      .post("/contact", data)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setMessage("Message have sent success");
        }
      })
      .catch((res) => {
        console.log(res);
        setIsLoading(false);

        return setError(res.message);
      });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl font-semibold mb-3">Contact</h1>
        <div className="lg:max-w-2xl">
          {error && <Error error={error} />}
          {message && <Success message={message} />}
          <form className="mb-6" onSubmit={handleSubmit(onSend)}>
            <Inputs
              type="text"
              title="Email"
              register={register}
              name="email"
              placeholder="name@company.com"
              error={errors.email}
            />
            <Inputs
              type="text"
              title="Subject"
              register={register}
              name="subject"
              placeholder="Let us know what you need."
              error={errors.subject}
            />
            <div className="my-3 ">
              <label htmlFor="" className="m-2 my-4 text-lg py-3">
                Your Message
              </label>
              <textarea
                {...register("message")}
                name="message"
                className="textarea textarea-bordered w-full h-28"
                placeholder="Your Message"
              ></textarea>
              {errors.message && (
                <span className="text-error">{errors.message.message}</span>
              )}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <h1>Send</h1>
              )}
            </button>
          </form>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:underline">
              qitirtiri@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:underline">
              912-456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
