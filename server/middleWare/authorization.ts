import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export const authorizationUser = async (req:any, res:Response, next:NextFunction) => {
  const sessionCookie = req.cookies?.session;
  if(sessionCookie){
    getAuth()
    .verifySessionCookie(sessionCookie, true )
    .then((claims) => {
     if(claims.admin) {
      req.user = claims;
      // console.log(dispatch)
      return next();
     }
     req.user = claims;
     return next();
    })
    .catch((error) => {
      console.log(error)
      return res.status(401).send('unauthorization')
    });
  }
  else{
    return res.status(401).send('unauthorization');
  }
};

export const authorizationAdmin = async (req:any, res:Response, next:NextFunction) => {
const sessionCookie = req.cookies?.session;
if(sessionCookie){
  getAuth()
  .verifySessionCookie(sessionCookie, true /** checkRevoked */)
  .then((claims) => {
    if (claims.admin === true) {
    req.user = claims;
    return next();
    }else{
      return res.status(401).send('no admin')
    }
  }).catch((error)=>{
    console.log(error)
    return res.status(401).send('unauthorization')
  })
}else{
  return res.status(401).send('unauthorization');
}
};

export const checkAdminStatus = async (req: Request) => {
  const sessionCookie = req.cookies?.session;
  try {
    if (sessionCookie) {
      const claims = await getAuth().verifySessionCookie(sessionCookie, true);
      if (claims && claims.admin === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return false;
  }
};
