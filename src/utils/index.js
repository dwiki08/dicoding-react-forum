export default function postedAt(date) {
  const dateNow = new Date();
  const datePosted = new Date(date);
  const dateDifferent = dateNow - datePosted;
  const dateDifferentInDays = Math.floor(dateDifferent / (1000 * 3600 * 24));
  const dateDifferentInHours = Math.floor(dateDifferent / (1000 * 3600));
  const dateDifferentInMinutes = Math.floor(dateDifferent / (1000 * 60));
  const dateDifferentInSeconds = Math.floor(dateDifferent / 1000);

  if (dateDifferentInDays > 180) {
    return showFormattedDate(date);
  }
  if (dateDifferentInDays > 0) {
    return `${Math.floor(dateDifferentInDays)} day(s) ago`;
  }
  if (dateDifferentInHours > 0) {
    return `${Math.floor(dateDifferentInHours)} hour(s) ago`;
  }
  if (dateDifferentInMinutes > 0) {
    return `${Math.floor(dateDifferentInMinutes)} minute(s) ago`;
  }
  if (dateDifferentInSeconds > 0) {
    return `${Math.floor(dateDifferentInSeconds)} second(s) ago`;
  }
  return "just now";
}

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
