export default function formatDate(newDate) {
  const formattedDate = new Date(newDate);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  const date = formattedDate.getDate();

  return `${year}-${month}-${date}`;
}
