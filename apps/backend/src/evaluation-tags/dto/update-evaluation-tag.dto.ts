import {IUpdateEvaluationTag} from '@heimdall/interfaces';
import {IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min} from 'class-validator';

export class UpdateEvaluationTagDto implements IUpdateEvaluationTag {
  @IsNotEmpty()
  @IsNumberString()
  @Min(1)
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly key: string;

  @IsOptional()
  @IsString()
  readonly value: string;

  constructor(dto: UpdateEvaluationTagDto) {
    this.id = dto.id;
    this.key = dto.key;
    this.value = dto.value;
  }
}
