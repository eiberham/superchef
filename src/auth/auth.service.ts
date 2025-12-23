import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { GetUserByEmailUsecase } from '../users/application/get-user-by-email.usecase'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
        private readonly jwtService: JwtService) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.getUserByEmailUsecase.getUserByEmail(email)
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const payload = { sub: user.id, email: user.email }
        const token = await this.jwtService.signAsync(payload)
        return token
    }
}
