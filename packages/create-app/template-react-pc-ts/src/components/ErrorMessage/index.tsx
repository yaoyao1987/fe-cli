import React from 'react'
import { Typography } from 'antd'
import { isError } from '@/utils';

export const ErrorMessage = ({ error }: { error: unknown }) => {
  console.log('ErrorMessage error :>> ', error);
  console.log('isError(error) :>> ', isError(error));
  if (isError(error)) {
    return <Typography.Text type='danger'>{error?.message}</Typography.Text>
  }
  return null;
}