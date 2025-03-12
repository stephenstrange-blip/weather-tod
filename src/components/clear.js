export function loadStyling() {
  const targetRows = document.querySelectorAll("tbody > tr:nth-child(odd)");
  const themeColor = "#a1c9eb";
  targetRows.forEach((row) => {
    row.style.backgroundColor = themeColor;
  });
  document.body.style.backgroundImage =
    "linear-gradient(45deg, transparent, transparent, transparent, transparent, transparent, #a1c9eb), linear-gradient(315deg, transparent, transparent, transparent, transparent, transparent, #a1c9eb)";
}
