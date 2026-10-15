import mongoose from 'mongoose';
import { AuditLog } from '../models/AuditLog';
import { AuthenticatedRequest } from '../middleware/auth';

interface AuditLogOptions {
  req?: AuthenticatedRequest;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
  performedBy?: string;
  adminEmail?: string;
}

export const logAdminAction = async (options: AuditLogOptions): Promise<void> => {
  try {
    // If database connection is not active (e.g. unit tests or server offline), avoid buffering delay
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const performedBy = options.performedBy || options.req?.user?.username || 'system';
    const adminEmail = options.adminEmail || options.req?.user?.email;
    const ipAddress = options.req?.ip || options.req?.headers['x-forwarded-for']?.toString();
    const userAgent = options.req?.headers['user-agent'];

    await AuditLog.create({
      action: options.action,
      performedBy,
      adminEmail,
      entityType: options.entityType,
      entityId: options.entityId,
      details: options.details,
      ipAddress,
      userAgent
    });
  } catch (error) {
    // Non-blocking error for audit logging
    console.error('[AuditService Error] Failed to write audit log:', (error as Error).message);
  }
};
