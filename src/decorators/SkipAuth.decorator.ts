import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE_KEY = 'public-route';
export const SkipAuth = () => SetMetadata(PUBLIC_ROUTE_KEY, true);