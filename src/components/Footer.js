import React from "react";

export default function Footer() {
  var today = new Date();
  var year = today.getFullYear();
  return (
    <footer>
      <a href="https://www.twitter.com/glauberamos">
        &copy;{year} - glauberamos
      </a>
    </footer>
  );
}
