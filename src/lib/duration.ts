export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function minutesBetween(dep: string, arr: string): number {
  const depDate = new Date(dep)
  const arrDate = new Date(arr)
  return Math.round((arrDate.getTime() - depDate.getTime()) / 60000)
}
