import React, { ReactNode } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { bootstrap } from "@/store/auth.slice";
import { User } from "@/typings/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const { status, data: user } = useQuery('bootstrap', () => dispatch(bootstrap()))

  if (['idle', 'loading'].includes(status)) {
    return <Spin size='large' />
  }
  return <>{children}</>
}