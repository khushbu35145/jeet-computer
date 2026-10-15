import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import { AdminUser } from '../models/AdminUser';

const createFirstAdmin = async () => {
  try {
    console.log('[First-Admin Setup] Connecting to database...');
    await connectDB();

    const username = process.env.ADMIN_INIT_USERNAME || process.argv[2] || 'jeetadmin';
    const email = process.env.ADMIN_INIT_EMAIL || process.argv[3] || 'admin@jeeteducation.com';
    const rawPassword = process.env.ADMIN_INIT_PASSWORD || process.argv[4] || 'Jeet@Pali2026Secure!';
    const name = process.env.ADMIN_INIT_NAME || 'JEET Super Administrator';

    // Check if an admin with this username or email already exists
    const existing = await AdminUser.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
    });

    if (existing) {
      console.log(`⚠️  Admin account already exists for '${existing.username}' (${existing.email}).`);
      console.log('To change password, log into the dashboard or use the forgot-password flow.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    const newAdmin = await AdminUser.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      passwordHash,
      name,
      role: 'superadmin',
      isActive: true
    });

    console.log('=======================================================');
    console.log('✅ FIRST ADMIN ACCOUNT PROVISIONED SUCCESSFULLY');
    console.log(`👤 Username: ${newAdmin.username}`);
    console.log(`📧 Email:    ${newAdmin.email}`);
    console.log(`🛡️  Role:     ${newAdmin.role}`);
    console.log('🔑 Password: [SET AS CONFIGURED - NEVER COMMITTED TO VCS]');
    console.log('=======================================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to provision admin account:', (error as Error).message);
    process.exit(1);
  }
};

createFirstAdmin();
