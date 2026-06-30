import { pool } from "../db";
import bcrypt from "bcryptjs";

export async function findUserByUsername(
  username: string
) {
  const result = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      password_hash
    FROM public.users
    WHERE username = $1 OR email = $1
    `,
    [username]
  );

  return result.rows[0];
}

export async function findValidUser(
  username: string
) {
  const result = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      password_hash
    FROM public.users
    WHERE (username = $1 OR email = $1) and isverified=1
    `,
    [username]
  );

  return result.rows[0];
}

export async function registerUser(
  username: string,
  email: string,
  phoneno: string,
  password: string,
  companyName: string,
  jobTitle: string,
  profession: string,
) {
  const hash = await bcrypt.hash(password,10);

  const result =
    await pool.query(
      `
      INSERT INTO public.users
      (    username, email, phone_no, password_hash , company_name, job_title, profession )
      VALUES
      (    $1, $2, $3, $4, $5, $6, $7 )
      RETURNING
      id, username, email
      `,
      [
        username, email, phoneno, hash, companyName, jobTitle, profession
      ]
    );

    return result.rows[0];
}


export async function verifyUser(
  username: string,
) {
  // const hash = await bcrypt.hash(password,10);

  const result =
    await pool.query(
      `
      UPDATE public.users SET isverified=1 WHERE username= $1 OR email= $1
      RETURNING username
      `,
      [ username, ]
    );

    return result.rows[0];
}


export async function changePassword(
  email: string,
  password: string,
) {
  const hash = await bcrypt.hash(password,10);

  const result = await pool.query(
      `
      UPDATE public.users SET password_hash=$2 
      where email=$1 or username =$1
      RETURNING
      username, email
      `,
      [ email, hash ]
    );

    return result.rows[0];
}