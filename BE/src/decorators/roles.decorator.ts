import { SetMetadata } from '@nestjs/common';

// Декорируем роли
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
