import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const signupSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(15, { message: "First name must be below 15 characters" }),

  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(15, { message: "Last name must be below 15 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(30, { message: "Email must be below 30 characters" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be below 20 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&#$^])[A-Za-z\d@!%*?&#$^]{8,20}$/,
      {
        message:
          "Password must include at least one uppercase, one lowercase, one number, and one special character (@!%*?&)",
      }
    ),
});

export default function validateSignup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        errors: err.flatten().fieldErrors,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

