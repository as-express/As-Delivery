import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class fileDto {
    @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  public readonly file: any
  @IsString()
  public readonly user_id: string;
}
