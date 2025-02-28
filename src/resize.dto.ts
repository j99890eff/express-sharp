/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-magic-numbers */
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import 'reflect-metadata'
import { GravityEnum } from 'sharp'
import { Transform } from './decorators'
import { format } from './interfaces'

export class ResizeDto {
  constructor(args: Partial<ResizeDto>) {
    Object.assign(this, args)
  }

  @IsOptional()
  @IsIn(['heic', 'heif', 'jpeg', 'jpg', 'png', 'raw', 'tiff', 'webp'])
  @IsString()
  public format?: format

  @Transform(Number)
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsInt()
  @Min(1)
  @Max(10000)
  public height?: number

  @Transform(Number)
  @IsNumber()
  @Min(1)
  @Max(10000)
  public width: number = 500

  @Transform(Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public quality: number = 80

  @Transform((value) => value === 'true')
  @IsBoolean()
  public progressive: boolean = false

  @Transform((value) => value === 'true')
  @IsBoolean()
  public crop: boolean = false

  @IsIn([
    'north',
    'northeast',
    'southeast',
    'south',
    'southwest',
    'west',
    'northwest',
    'east',
    'center',
    'centre',
  ])
  @IsOptional()
  public gravity?: keyof GravityEnum

  public url?: string
}
