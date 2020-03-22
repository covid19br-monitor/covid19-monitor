import React from "react";

export default function Footer() {
  var today = new Date();
  var year = today.getFullYear();
  return (
    <footer>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.twitter.com/_juanmnl"
      >
        &copy;{year} - juanmnl
      </a>
      <br />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.twitter.com/glauberamos"
      >
        &copy;{year} - glauberamos
      </a>
    </footer>
  );
}
