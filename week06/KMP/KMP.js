//生成prefix Table, n为pattern长度
function prefixTable(pattern, prefix, n) {
  prefix[0] = 0 // prefix 初始
  let len = 0 // 最长公共前后缀长度
  let i = 1
  while (i < n) {
    if (pattern[i] === pattern[len]) {
      len++
      prefix[i] = len
      i++
    } else {
      if (len > 0) {
        len = prefix[len - 1]
      } else {
        prefix[i] = len
        i++
      }
    }
  }
}

//prefix Table整体后移一位，设置第0项为-1
function shiftPrefixTable(prefix, n) {
  for (let i = n - 1; i > 0; i--) {
    prefix[i] = prefix[i - 1]
  }
  prefix[0] = -1
}

//kmp算法
function kmpSearch(text, pattern) {
  const patArray = pattern.split('')
  const patLength = patArray.length
  const textArray = text.split('')
  const textLength = text.length

  const prefixArray = new Array(patLength)
  prefixTable(patArray, prefixArray, patLength)
  shiftPrefixTable(prefixArray, patLength)

  let i = 0
  let j = 0
  while (i < textLength) {
    if (j === patLength - 1 && textArray[i] === patArray[j]) {
      console.log('Found pattern at', i - j)
      j = prefixArray[j]
    }
    if (textArray[i] === patArray[j]) {
      i++
      j++
    } else {
      j = prefixArray[j]
      if (j === -1) {
        i++
        j++
      }
    }
  }
}
kmpSearch('ATGTGAGCTGGTGTGTGCFAA', 'GTGTGCF')
