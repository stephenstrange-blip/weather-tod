export function loadStyling() {
  const targetRows = document.querySelectorAll("tbody > tr:nth-child(odd)");
  const themeColor = "#a8e3fd";
  targetRows.forEach((row) => {
    row.style.backgroundColor = themeColor;
  });
  document.body.style.backgroundImage =
    "linear-gradient(15deg, transparent, transparent, transparent, transparent, transparent, #8b92b7), linear-gradient(345deg, transparent, transparent, transparent, transparent, transparent, #8B92CE), linear-gradient(0deg, transparent, transparent, transparent, transparent, transparent, #a8e3fd)";
}
