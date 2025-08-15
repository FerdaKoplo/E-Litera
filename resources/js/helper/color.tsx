export const getTypeColor = (type: string) => {
  switch (type) {
    case "Special": return "text-blue-600";
    case "Premium": return "text-green-600";
    case "Basic": return "text-yellow-600";
    default: return "text-gray-500";
  }
}
