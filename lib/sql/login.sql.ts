export function staffLogin(): string {
  return `SELECT id, email, password_hash AS "passwordHash", active FROM staff_accounts WHERE email = $1`;
}
