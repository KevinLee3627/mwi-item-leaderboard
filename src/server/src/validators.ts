import z from 'zod';

export const positiveNumberSchema = z.coerce
  .number()
  .positive({ message: 'Should be positive.' })
  .int({ message: 'Should be an integer.' });

export const integerSchema = z.coerce.number().int();

export const existingStringSchema = z.string().nonempty();
