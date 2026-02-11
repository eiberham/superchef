import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(){}
  welcome(): string {
    return 'Welcome to superchef!';
  }
}
