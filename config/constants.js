require("dotenv").config();
const defaultConfig = {
  PORT: process.env.PORT || 3000,
};
const STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  SEMIACTIVE: 2,
};

const JWT_SECRET = {
  JWT_SECRET: process.env.JWT_SECRET,
};

const selectionMAil = (name) => {
  return `<body style="padding:100px;">
  <h2>Unnat Technical Club</h2>
  <h3>Request Accepted!!!</h3>
  <p>Hey ${name} Your request for membership in the technical team of Unnat technical club has accepted.
      <br>Now you can login as a member of the club using same credentials and from now you
      can contribute in the club, can discuss with other club members and authorities.

      <hr>
     <br> <b>Best of Luck!!!</b>
  </p>
</body>`;
};
const rejectctionMAil = (name) => {
  return `<body style="padding:100px;">
  <h2>Unnat Technical Club</h2>
  <h3>Better Luck Next Time!!!</h3>
  <p>Hey ${name} Your request for membership in the technical team of Unnat technical club has rejected.
      <br>Unfortunatey you failed to meet cetain criterias and expectations from the club authorities for now.
      We reuqest you to wait for next club recruitments to apply again for club membership.
      <br>
      You can still contribute to the club, by writing your suggestioins on club website.

      <hr>
      We wish you <b>Best of Luck!!!</b> for next time...
  </p>
</body>`;
};

const removeMemberMAil = (name) => {
  return `<div style="text-align:center">Hey ${name}</div>
  <div style="text-align:center">You are <b>removed</b> from the Club</div><br/>
    <div style="text-align:center">By Unnat technical Club Administrator</div>`;
};

module.exports = {
  ...defaultConfig,
  ...STATUS,
  ...JWT_SECRET,
  selectionMAil,
  rejectctionMAil,
  removeMemberMAil,
};
