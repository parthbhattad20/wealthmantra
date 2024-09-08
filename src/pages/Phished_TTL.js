import React from "react";
import imageSrc from "../phished.jpg";
import logoSrc from "../PhishInstinct_Logo_black.png";

const Phished_TTL = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="">
        <img className="lg:w-3/4" src={logoSrc} alt="Logo"/>
        <img src={imageSrc} alt="Phishing" className="w-3/4" />
      </div>
      <div className="mx-4 mr-6 mt-6 text-md">
        <p className="text-justify">
          Hello,
          <br />
          <strong>
            This was a “Phishing Test” conducted by InfoSec Team.
          </strong>{" "}
          Most targeted spear-phishing attacks are distributed through emails or
          URLs such as this. Attackers use this technique to breach networks and
          gain access to confidential information. This test was created to
          raise awareness within the organization about such phishing attacks.
          Continue to stay alert and report suspicious incidents. Protect
          yourself, your customers, and Tata Technologies!
          <br />
          <br />
          Please ensure to verify below points when you receive a suspicious
          email:
        </p>
        <ul>
          <li>- Don’t trust urgent demands and links provided in an email.</li>
          <li>
            - Never give personal or any important information upon email request.
          </li>
          <li>- Look carefully at the web address.</li>
          <li>
            - Don’t open unexpected and suspicious email attachments or instant
            message download links.
          </li>
        </ul>
        <br></br>
        <p className="text-justify">
          There is very little risk in opening emails, but opening attachments
          or clicking on links in emails can be dangerous. Attackers can email
          you infected attachments or send links that take you to websites that
          trick you into revealing your information or silently hacking your
          computer. Do not open attachments or click on links that seem strange
          or suspicious. If you are not sure about an email, forward it to{" "}
          <a href="mailto:Infosec@tatatechnologies.com">
            <strong>Infosec@tatatechnologies.com</strong>
          </a>
          .<br />
          <br />
          Please keep in mind that this assessment is designed to help you learn
          about security challenges. If you have any queries related to
          cybersecurity, feel free to contact InfoSec at{" "}
          <a href="mailto:Infosec@tatatechnologies.com">
            <strong>Infosec@tatatechnologies.com</strong>
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Phished_TTL;
