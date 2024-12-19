import { SetMetadata } from '@nestjs/common';
import { Role } from '../users/users.schema';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
