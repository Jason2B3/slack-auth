import fetch from "node-fetch";

export const sendEmail = async function ({ targetEmail, subject, message }) {
  const SENDGRID_API = process.env.SENDGRID_API;
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

  const request = await fetch(SENDGRID_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ targetEmail }],
          subject,
        },
      ],
      from: {
        email: "jason2b3@gmail.com",
        name: "Test SendGrid",
      },
      content: [
        {
          type: "text/html",
          value: message,
        },
      ],
    }),
  });
  console.log(request, 101)
};
