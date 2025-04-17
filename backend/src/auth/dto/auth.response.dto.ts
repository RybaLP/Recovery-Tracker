import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImxvZ2luIjoiandvcmthMSIsImlhdCI6MTY4MTc3NjQ3NCwiZXhwIjoxNjgxNzg0NDc0fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJlbWVtYmVtZSI6dHJ1ZSwiaWF0IjoxNjgxNzc2NDc0LCJleHAiOjE2ODQzNjgzNzR9.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy' })
    refreshToken : string;
}