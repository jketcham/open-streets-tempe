import { useTheme } from "../ThemeProvider";

export default function Footer() {
  const theme = useTheme();

  return (
    <footer className={`min-h-64 ${theme.bg} text-white p-6 sm:p-10`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <div>
          <ul className="space-y-2">
            <li>
              <p>
                PO Box 1884
                <br />
                Tempe, AZ 85280
              </p>
            </li>

            <li>
              <p>A program of Tempe Bicycle Action Group</p>
            </li>

            <li>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://biketempe.org?utm_source=open-streets-tempe&utm_campaign=landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.biketempe.org
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="mb-2 text-lg font-bold sm:mb-4">Get Involved</h1>
          <ul className="space-y-2">
            <li>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://biketempe.org/volunteer?utm_source=open-streets-tempe&utm_campaign=landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Volunteer
              </a>
            </li>

            <li>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="mailto:info@openstreetstempe.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sponsor
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="mb-2 text-lg font-bold sm:mb-4">Follow us</h1>
          <ul className="space-y-2">
            <li>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://instagram.com/openstreetstempe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
