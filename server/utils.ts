export const divideArray = function <T> (target:T[], n:number) {
  const results:T[][] = []
  let idx = 0
  while (idx + n < target.length) {
    const result = target.slice(idx, idx + n)
    results.push(result)
    idx = idx + n
  }
  const rest = target.slice(idx, target.length + 1)
  results.push(rest)
  return results
}
