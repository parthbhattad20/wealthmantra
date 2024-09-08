import React from 'react';
import imageSrc from '../phished.jpg';
import logoSrc from '../PhishInstinct_Logo_black.png';

const Phished = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oops!</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Poppins', sans-serif;
            }
            .image, .text {
              flex: 1;
              padding: 1%;
              text-align: left;
            }
            .text p {
              // font-size: 2.5rem;
              text-align: justify;
            }
            .text ul {
              list-style-type: disc;
              padding-left: 1.5em;
            }
            .text li {
              // font-size: 1.2rem;
              line-height: 2;
            }
            @media (max-width: 768px) {
              .container {
                flex-direction: column;
              }
              .image, .text {
                display: flex;
                justify-content: center;
                padding: 20px;
                text-align: center;
              }
              
              .text li {
                font-size: 1.2rem;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="image">
            <img src={logoSrc} width="50%" alt="" />
            <img src={imageSrc} alt="" width="70%" />
          </div>
          <div className="text">
            <p>
              Hello,
              <br></br>
              <strong>
                This was a “Phishing Test” conducted by InfoSec Team.
              </strong>{" "}
              Most targeted spear-phishing attacks are distributed through
              emails or URLs such as this. Attackers use this technique to
              breach networks and gain access to confidential information. This
              test was created to raise awareness within the organization about
              such phishing attacks. Continue to stay alert and report
              suspicious incidents. Protect yourself, your customers, and Tata
              Technologies!<br></br>
              <br></br>
              Please ensure to verify below points when you receive a suspicious
              email:
              <ul>
                <li>
                  Don’t trust urgent demands and links provided in an email.
                </li>
                <li>
                  Never give personal or any important information upon email
                  request.
                </li>
                <li>Look carefully at the web address.</li>
                <li>
                  Don’t open unexpected and suspicious email attachment or
                  instant message download link.
                </li>
              </ul>
              <br></br>
              There is very little risk in opening emails, but opening
              attachments or clicking on links in emails can be dangerous.
              Attackers can email you infected attachments or send links that
              take you to websites that trick you to reveal your information or
              silently hack your computer. Do not open attachments or click on
              links that seem strange or suspicious. If you are not sure about
              an email, forward it to{" "}
              <a href="mailto:Infosec@tatatechnologies.com">
                <strong>Infosec@tatatechnologies.com</strong>
              </a>
              .<br></br>
              <br></br>
              Please keep in mind that this assessment is designed to help you
              learn about security challenges. If you have any queries related
              to cybersecurity, feel free to contact InfoSec
              <a href="mailto:Infosec@tatatechnologies.com">
                <strong>Infosec@tatatechnologies.com</strong>
              </a>
              .
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Phished;