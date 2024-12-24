import type { LoaderFunction } from "@remix-run/node";
import {
  ThemeColor,
  getThemeBackgroundColor,
  getThemeColor,
  themeMap,
} from "~/components/ThemeProvider";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const theme = (url.searchParams.get("theme") || "tachi") as ThemeColor;
  const themeColors = themeMap[theme];
  const bgColor = getThemeBackgroundColor(theme);
  const iconColor = getThemeColor(themeColors.textOnLight);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0">
    <defs>
      <clipPath id="circle">
        <path d="M 187.5 0 C 83.945312 0 0 83.945312 0 187.5 C 0 291.054688 83.945312 375 187.5 375 C 291.054688 375 375 291.054688 375 187.5 C 375 83.945312 291.054688 0 187.5 0 Z M 187.5 0 " clip-rule="nonzero"/>
      </clipPath>
      <clipPath id="rider">
        <path d="M 100.558594 69.769531 L 274.558594 69.769531 L 274.558594 305.269531 L 100.558594 305.269531 Z M 100.558594 69.769531 " clip-rule="nonzero"/>
      </clipPath>
    </defs>
    <g clip-path="url(#circle)">
      <rect x="-37.5" width="450" fill="${bgColor}" y="-37.499999" height="449.999989" fill-opacity="1"/>
    </g>
    <g clip-path="url(#rider)">
      <path fill="${iconColor}" d="M 166.597656 208.808594 C 166.597656 208.808594 160.90625 206.679688 158.78125 204.195312 C 149.738281 193.636719 158.417969 174.363281 156.652344 173.679688 C 154.890625 172.957031 153.808594 175.082031 150.636719 176.164062 C 147.429688 177.246094 142.132812 175.445312 139.648438 170.472656 C 137.164062 165.5 138.242188 154.148438 140.007812 147.414062 C 141.773438 140.675781 166.273438 128.964844 166.273438 128.964844 C 166.273438 128.964844 165.554688 119.019531 164.148438 119.019531 C 162.742188 119.019531 156.691406 114.769531 155.285156 113.6875 C 153.878906 112.609375 148.1875 103.023438 153.160156 87.0625 C 158.058594 71.066406 185.046875 62.886719 198.195312 77.082031 C 211.347656 91.277344 196.429688 108.679688 196.429688 111.886719 C 196.429688 115.09375 191.820312 124.679688 195.027344 127.164062 C 198.230469 129.648438 242.222656 138.875 246.871094 136.386719 C 251.484375 133.902344 258.582031 134.261719 260.707031 134.980469 C 262.832031 135.703125 265.320312 136.386719 265.320312 141.359375 C 265.320312 146.332031 261.429688 146.691406 257.859375 148.097656 C 254.292969 149.503906 249.683594 158.042969 245.070312 159.808594 C 240.460938 161.570312 233.722656 159.808594 231.921875 159.085938 C 230.15625 158.367188 216.644531 160.132812 216.644531 160.132812 L 216.28125 181.0625 C 216.28125 181.0625 229.074219 197.386719 233.324219 198.828125 C 237.578125 200.230469 236.171875 200.59375 241.503906 205.5625 C 246.835938 210.535156 248.601562 225.453125 248.960938 228.984375 C 249.324219 232.550781 255.339844 246.746094 255.339844 249.554688 C 255.339844 252.367188 252.851562 255.25 252.851562 255.25 C 252.851562 255.25 257.464844 258.09375 261.03125 258.816406 C 264.597656 259.535156 270.617188 262.023438 270.617188 265.554688 C 270.617188 269.085938 271.335938 274.054688 273.101562 275.136719 C 274.867188 276.21875 274.183594 277.984375 272.382812 279.75 C 270.617188 281.515625 264.921875 281.515625 258.90625 281.515625 C 252.890625 281.515625 247.558594 280.433594 246.117188 279.027344 C 244.710938 277.625 242.910156 268.039062 242.910156 268.039062 C 242.910156 268.039062 237.578125 266.957031 238.65625 268.761719 C 239.703125 270.527344 238.65625 293.621094 237.9375 296.105469 C 237.214844 298.59375 230.480469 308.175781 219.128906 304.285156 C 207.78125 300.394531 205.292969 276.578125 205.292969 276.578125 C 204.933594 274.453125 203.167969 272.6875 197.476562 272.6875 C 191.78125 272.6875 191.421875 268.074219 191.097656 260.617188 C 190.738281 253.160156 186.125 259.898438 185.082031 261.339844 C 184 262.742188 179.027344 263.464844 172.292969 262.742188 C 165.554688 262.023438 162.707031 256.003906 162.707031 256.003906 C 162.707031 256.003906 140.691406 260.257812 135.722656 260.617188 C 130.75 260.976562 133.234375 260.257812 130.027344 270.5625 C 126.820312 280.867188 122.210938 281.910156 111.90625 280.144531 C 101.636719 278.378906 101.277344 259.933594 100.878906 255.320312 C 100.519531 250.710938 103.007812 236.875 114.03125 235.433594 C 125.019531 234.027344 127.867188 244.296875 128.949219 245.015625 C 130.027344 245.738281 131.433594 245.375 133.199219 243.9375 C 134.964844 242.53125 134.28125 239.324219 142.421875 229.019531 C 150.601562 218.714844 166.5625 215.867188 166.5625 215.867188 L 166.5625 208.769531 Z M 113.347656 269.839844 C 113.347656 269.839844 116.191406 259.898438 111.222656 251.035156 C 106.25 242.171875 106.609375 259.898438 106.609375 259.898438 C 109.816406 280.46875 113.347656 269.839844 113.347656 269.839844 Z M 166.238281 243.574219 C 167.644531 241.808594 174.742188 225.8125 163.753906 228.660156 C 149.664062 232.296875 141.378906 248.546875 141.378906 248.546875 C 150.960938 251.394531 166.238281 243.574219 166.238281 243.574219 Z M 210.265625 262.058594 C 212.753906 262.058594 206.015625 271.28125 210.625 281.945312 C 215.238281 292.613281 215.957031 290.808594 215.238281 272.003906 C 214.519531 253.195312 209.222656 248.222656 209.222656 248.222656 C 206.015625 251.789062 207.816406 262.058594 210.300781 262.058594 Z M 210.265625 262.058594 " fill-opacity="1" fill-rule="nonzero"/>
    </g>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
