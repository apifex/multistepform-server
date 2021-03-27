import {NextFunction, Request, Response} from 'express';
import passport from "../services/passport/passport-local";

const createCookieFromToken = (user:any, statusCode: number, req: Request, res: Response) => {
  const token = user.generateVerificationToken();
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "http",
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "signup",
      { session: false },
      async (err, user, info) => {
        try {
          if (err || !user) {
            const { statusCode = 400, message } = info;
            return res.status(statusCode).json({
              status: "error",
              error: {
                message,
              },
            });
          }
          createCookieFromToken(user, 201, req, res);
        } catch (error) {
          throw new Error('some error on signup');
        }
      }
    )(req, res, next);
  }


export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err || !user) {
        let message = err;
        if (info) {
          message = info.message;
        }
        return res.status(401).json({
          status: "error",
          error: {
            message,
          },
        });
      }
      // generate a signed son web token with the contents of user object and return it in the response
      createCookieFromToken(user, 200, req, res);
    })(req, res, next);
  }

export const protectedRoute = async (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Yes you are. You are a Thor-n times developer",
      },
    });
  }