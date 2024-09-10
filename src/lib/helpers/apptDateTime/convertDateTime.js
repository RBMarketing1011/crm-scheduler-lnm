export const convertDate = (x) =>
{
  return new Date(x).toLocaleDateString()
}

export const convertTime = (x) =>
{
  return new Date(x).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}