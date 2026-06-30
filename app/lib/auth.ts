import jwt from "jsonwebtoken";
import { signupSchema } from '@/app/lib/passwschema';

const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key";

export interface JwtPayload {
  userId: number;
  username: string;
}

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch {
    return null;
  }
}

export async function registerUser(prevState: any, formData: FormData) {
  // Convert FormData to a plain object
  const rawFields = Object.fromEntries(formData.entries());
  
  // Validate data against the Zod schema
  const validatedFields = signupSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    // Return structured errors if validation fails
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Proceed with registration logic (e.g., hashing password, saving to DB)
  // const { email, password } = validatedFields.data;

  return { success: true, errors: {} };
}