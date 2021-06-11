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
    `<b>Congratulations!</b>${name}
    You are Selected for Club`
  )
}

module.exports = { ...defaultConfig, ...STATUS ,...JWT_SECRET,selectionMAil};
