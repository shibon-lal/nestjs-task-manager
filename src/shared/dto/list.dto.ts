import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class ListDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  per_page = 10;
}
