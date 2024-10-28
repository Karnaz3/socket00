import { SetMetadata } from '@nestjs/common';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AdminRoleEnum[]) => SetMetadata(ROLES_KEY, roles);
