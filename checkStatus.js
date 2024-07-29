/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require("dotenv");
const { sign } = require("jsonwebtoken");

config();

const baseUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET_KEY ?? "";
const USERNAME = process.env.USERNAME;

const token = sign(
  {
    name: USERNAME,
    status: "active",
    permissions: {
      admin: true,
      create_ticket: true,
      delete_ticket: true,
    },
  },
  SECRET
);

async function checkStatus() {
  const res = await fetch(baseUrl + "/ticket/list/all", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  const progress = data.filter((ticket) => ticket.status == "progress");

  const now = new Date();

  progress.forEach(async (el) => {
    const timeProgress = new Date(el.progress);
    const timeDiff = now.getTime() - timeProgress.getTime();
    const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
    if (diffInHours == 0) {
      const res = await fetch(baseUrl + "/ticket/open", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          id: el.id,
        }),
      });

      const data = await res.json();
      console.log(data);
    }
  });
}

setTimeout(() => checkStatus(), 1000 * 60 * 60 * 6);
