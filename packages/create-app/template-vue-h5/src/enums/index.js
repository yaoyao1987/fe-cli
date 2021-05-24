import enumUtil from '@/utils/enum'

const enums = [
  {
    name: '是否',
    code: 'yesOrNo',
    values: [
      { name: '是', code: 'YES', value: '1' },
      { name: '否', code: 'NO', value: '0' }
    ]
  }
]

export default enumUtil.format(enums)
