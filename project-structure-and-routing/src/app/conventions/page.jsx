export default function ConventionPage() {
  return (
    <div className="p-3">
      <div className="boder">
        <div className="text-3xl text-amber-300">Files name convention:</div>
        <ul>
          <li>Mostly Used: </li>
          <li>page.js/jsx/tsx = Page Contant</li>
          <li>layout.js/jsx/tsx = Shared UI</li>
          <li>loading.js/jsx/tsx = Lading UI</li>
          <li>error.js/jsx/tsx = Error Boundaries</li>
          <li>route.js/jsx/tsx = APIs</li>
          <li>not-found.js/jsx/tsx = 404 Page</li>
        </ul>
      </div>

      <div className="border border-amber-400">
             <ul>
          <li>Type, folders and files: </li>
          <li>Static route</li>
          <li>Nasted route</li>
          <li>Dynamic route</li>
          <li>Catch-all route</li>
          <li>Optional catch‑all</li>
          <li>route groups</li>
          <li>parallal route</li>
          <li>intercepting route</li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
