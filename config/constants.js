require("dotenv").config();
const defaultConfig = {
  PORT: process.env.PORT || 3000,
};
const STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  SEMIACTIVE: 2,
};

const JWT_SECRET={
  JWT_SECRET:process.env.JWT_SECRET
}

const selectionMAil=(name)=>{
  return(
    `<b style="display:block text-align:center">Congratulations!</b> 
    <div style="text-align:center">${name}</div>
    <div style="text-align:center">You are Selected for Club<div>`
  )
}
const rejectctionMAil=(name)=>{
  return(
    `<div>Hey ${name}
    You are <b>not</b> Selected for Club
    <div>Better luck next Time!</div>`
  )
}

module.exports = { ...defaultConfig, ...STATUS ,...JWT_SECRET,selectionMAil};
