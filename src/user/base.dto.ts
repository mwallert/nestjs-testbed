import { ApiProperty } from "@nestjs/swagger";

export class BaseDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ nullable: true })
    deleted_at: Date;

    @ApiProperty({ nullable: true })
    deleted_by: string;
}