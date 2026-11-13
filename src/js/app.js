
import { mountNavbar } from "./components/navbar.js";
import { mountFooter } from "./components/footer.js";

import { initRouter } from "./router.js";
import { routes } from "./routes.js";

import { initI18n } from "./i18n/i18n.js";

initI18n();

const navbarRoot = document.getElementById("navbar");
const footerRoot = document.getElementById("footer");

mountNavbar(navbarRoot);

mountFooter(footerRoot);

initRouter(routes);

window.addEventListener("languageChanged", () => {

  mountFooter(footerRoot);

  window.dispatchEvent(
    new Event("hashchange")
  );
});
