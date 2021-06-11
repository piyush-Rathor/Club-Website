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
  return `<div style="text-align:center"><b>Congratulations!</b></div>
    <div style="text-align:center">${name}</div><br/>
    <div style="text-align:center">You are Selected for Club<div>`;
};
const rejectctionMAil = (name) => {
  return `<div style="text-align:center">Hey ${name}</div>
  <div style="text-align:center">You are <b>not</b> Selected for Club</div><br/>
    <div style="text-align:center">Better luck next Time!</div>`;
};

const removeMemberMAil = (name) => {
  return `<div style="text-align:center">Hey ${name}</div>
  <div style="text-align:center">You are <b>removed</b> from the Club</div><br/>
    <div style="text-align:center">By Unnat technical Club Administrator</div>`;
};

module.exports = { ...defaultConfig, ...STATUS, ...JWT_SECRET, selectionMAil ,rejectctionMAil,removeMemberMAil};
