export function loadStyling() {
  const targetRows = document.querySelectorAll("tbody > tr:nth-child(odd)");
  const themeColor = "#e5e4be";
  targetRows.forEach((row) => {
    row.style.backgroundColor = themeColor;
  });
  document.body.style.backgroundImage =
    "linear-gradient(45deg, transparent, transparent, transparent, transparent, transparent, #e5e4be), linear-gradient(315deg, transparent, transparent, transparent, transparent, transparent, #e5e4be), linear-gradient(0deg, transparent, transparent, transparent, transparent, transparent, #ffa300)"
}
