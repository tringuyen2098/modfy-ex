export const role = {
    normal : 1,
    customer : 2,
    system : 100
  }
  
export const status = {
  active : 1,
  inactive : 2
}

export const gender = {
  man : 1,
  female : 2,
  preferNotSay: 3
}

export const table = {
  users: 'Users'
}

export const orderStatus = {
  created: 1,
  accepted: 2,
  shipping: 3,
  shipped: 4,
  completed: 5,
  canceled: 6,
  failed: 7
}

export const paymentStatus = {
  paid: 1,
  notPaid: 2
}

export const productType = {
  master: 1,
  variant: 2,
  normal: 3,
  set: 4
}

export const keyAuthen = process.env.SECRET_KEY + 'Modfy' + process.env.GEN_SALT;