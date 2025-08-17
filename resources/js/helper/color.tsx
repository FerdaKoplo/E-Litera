export const getTypeColor = (type: string) => {
  const colors = ["text-red-500", "text-blue-500 font-semibold bg-blue-200 py-1 px-2 rounded-full", "text-green-500 font-semibold bg-green-200 py-1 px-2 rounded-full", "text-violet-500 font-semibold bg-violet-200 py-1 px-2 rounded-full"]
  const index = Math.abs([...type].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length
  return colors[index]
}
