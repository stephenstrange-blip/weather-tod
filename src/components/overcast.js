export function loadStyling() {
  const targetRows = document.querySelectorAll("tbody > tr:nth-child(odd)");
  const themeColor = "#8b92b7";
  targetRows.forEach((row) => {
    row.style.backgroundColor = themeColor;
  });
  document.body.style.backgroundImage =
    "linear-gradient(45deg, transparent, transparent, transparent, transparent, transparent, #8b92b7), linear-gradient(315deg, transparent, transparent, transparent, transparent, transparent, #8b92b7)";
}
