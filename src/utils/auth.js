const bcrypt = require('bcrypt');
const { pool } = require('./database');
const { BCRYPT_ROUNDS } = require('../config/constants');

const USER_RE = /^[A-Za-z0-9_]{3,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegistration(username, password, email) {
  if (!USER_RE.test(username)) return 'Username 3-24 karakter, hanya huruf, angka, dan _. ';
  if (!password || password.length < 8 || password.length > 72) return 'Password harus 8-72 karakter.';
  if (!EMAIL_RE.test(email) || email.length > 254) return 'Email tidak valid.';
  return null;
}

async function createAccount(username, password, email) {
  const error = validateRegistration(username, password, email);
  if (error) throw new Error(error);
  const [exists] = await pool.execute('SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1', [username, email]);
  if (exists.length) throw new Error('Username atau email sudah terdaftar.');
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const [result] = await pool.execute('INSERT INTO users (username,password_hash,email) VALUES (?,?,?)', [username, hash, email]);
  return { id: result.insertId, username };
}

async function login(username, password, discordId) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
  if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) throw new Error('Username atau password salah.');
  const user = rows[0];
  if (user.discord_id && user.discord_id !== discordId) throw new Error('Akun ini sudah terhubung ke Discord lain.');
  if (!user.discord_id) await pool.execute('UPDATE users SET discord_id = ? WHERE id = ?', [discordId, user.id]);
  await pool.execute('UPDATE users SET last_login = NOW(), is_logged_in = 1 WHERE id = ?', [user.id]);
  return { id: user.id, username: user.username };
}

async function changePassword(userId, currentPassword, newPassword) {
  if (!newPassword || newPassword.length < 8 || newPassword.length > 72) throw new Error('Password baru harus 8-72 karakter.');
  const [rows] = await pool.execute('SELECT password_hash FROM users WHERE id = ?', [userId]);
  if (!rows.length || !(await bcrypt.compare(currentPassword, rows[0].password_hash))) throw new Error('Password saat ini salah.');
  const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await pool.execute('UPDATE users SET password_hash = ? WHERE id = ?', [hash, userId]);
}

async function logoutUser(userId) { await pool.execute('UPDATE users SET is_logged_in = 0 WHERE id = ?', [userId]); }
module.exports = { createAccount, login, changePassword, logoutUser, validateRegistration };
