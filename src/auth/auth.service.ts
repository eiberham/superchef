import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../users/user.service'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, 
        private readonly jwtService: JwtService) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.getUserByEmail(email)
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const payload = { sub: user.id, email: user.email }
        const token = await this.jwtService.signAsync(payload)
        return token
    }
}
