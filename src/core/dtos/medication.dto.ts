import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicationDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsNotEmpty({ message: 'Dosage is required' })
  @IsString({ message: 'Dosage must be a string' }) // Or IsNumber if it's a number
  dosage: string; // Consider Number if it's a numeric dosage

  @IsNotEmpty({ message: 'Frequency is required' })
  @IsString({ message: 'Frequency must be a string' })
  frequency: string;

  @IsNotEmpty({ message: 'Expiration date is required' })
  expirationDate: Date;

  @IsNotEmpty({ message: 'Duration is required' })
  @IsString({ message: 'Duration must be a string' })
  duration: string;

  @IsNotEmpty({ message: 'Doctor ID is required' })
  docId: number;

  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {
  @IsNotEmpty()
  medicationId: number;
}
