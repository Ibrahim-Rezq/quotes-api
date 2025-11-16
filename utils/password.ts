import crypto from 'crypto'
export function saltAndHashPassword(password: string): string {
    const salt = process.env.PASSWORD_SALT || 'default_salt'
    return crypto.createHmac('sha256', salt).update(password).digest('hex')
}
