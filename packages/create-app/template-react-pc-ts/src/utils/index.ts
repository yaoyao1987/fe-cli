// 类型守卫
export const isError = (value: any): value is Error => value?.message