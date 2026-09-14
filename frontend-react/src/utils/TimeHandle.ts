export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getDaysSinceCreated = (createdAt: string): number => {
  const created = new Date(createdAt);
  const today = new Date();

  // Ignore time and compare only dates
  created.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference = today.getTime() - created.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24));
};