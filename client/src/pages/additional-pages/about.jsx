import React from "react";

const AboutPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl font-semibold mb-3">About</h1>
        <div className="max-w-2xl">
          <p>
            Welcome to <b>Qitir Tiri</b>, where connecting job seekers with
            opportunities is our top priority.Our mission is to simplify the job
            search process by providing a user-friendly platform that connects
            talented individuals with their dream careers.
          </p>
          <div className="p-5">
            <p>
              We have features like : <br />
            </p>
            <ul className=" px-3 list-disc">
              <li> Searching</li>
              <li> Posting</li>
              <li> Accepting</li>
              <li> Requesting, and more…</li>
            </ul>
          </div>
          <p>
            At <b>Qitir Tiri</b>, we believe in transparency, integrity, and
            equal opportunity for all job seekers.
          </p>
          <div className="p-5">
            The team that has worked on this project from the start includes:
            <ul className=" px-3 list-disc">
              <li>Hidaya Salih</li>
              <li>Kaleb Behayilu</li>
              <li>Kibkab Melaku</li>
              <li>Ibsa Ibrahim</li>
              <li>A/hakim Abdala</li>
            </ul>
          </div>
          <div className="p-5">
            With the help of:
            <ul className="px-3 list-disc">
              <li>Mr. Gemmachis T.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
