import React, { InputHTMLAttributes } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Input as InputShadcnUI } from '@/components/ui/input'

interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control?: Control<T>
  name?: Path<T>
  label: string
  errors?: FieldErrors<T>
}

export default function Input<T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: InputProps<T>) {
  return (
    <>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <InputShadcnUI
              placeholder={label}
              onChange={onChange}
              value={value}
              type="text"
              {...rest}
            />
          )}
        />
      ) : (
        <InputShadcnUI placeholder={label} type="text" {...rest} />
      )}
    </>
  )
}
