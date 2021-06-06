import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}