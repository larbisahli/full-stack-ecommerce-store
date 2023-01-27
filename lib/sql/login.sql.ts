export function staffLogin(): string {
  return `SELECT id, email, password_hash AS "passwordHash", active FROM staff_accounts WHERE email = $1`;
}

export function staff(): string {
  return `SELECT id, active FROM staff_accounts WHERE id = $1`;
}
