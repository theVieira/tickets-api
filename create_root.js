/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require("dotenv");
const { sign } = require("jsonwebtoken");

config();

const baseUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET_KEY ?? "";
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

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

const create = async () => {
  const res = await fetch(baseUrl + "/tech/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: USERNAME,
      password: PASSWORD,
      admin: true,
      create_ticket: true,
      delete_ticket: true,
      phone: "(00) 00000-0000",
      color: "#CECECE",
    }),
  });

  const data = await res.json();

  return console.log(data);
};

create();
