import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export default class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
  
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
}