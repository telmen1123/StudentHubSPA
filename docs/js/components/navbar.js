
export function mountNavbar(root) {
    if (!root) return;
  
    root.innerHTML = `
      <nav class="navbar student-navbar" role="navigation">
        <div class="container">
  
          <div class="navbar-brand">
            <a class="navbar-item student-brand" href="#/">
              <span class="icon mr-2">
                <i class="fas fa-graduation-cap"></i>
              </span>
              StudentHub
            </a>
  
            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="studentNavbarMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
  
          <div id="studentNavbarMenu" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" href="#/">Нүүр</a>
              <a class="navbar-item" href="#/courses">Хичээлүүд</a>
              <a class="navbar-item" href="#/schedule">Хуваарь</a>
              <a class="navbar-item" href="#/assignments">Даалгавар</a>
              <a class="navbar-item" href="#/grades">Дүн</a>
            </div>
          </div>
  
        </div>
      </nav>
    `;
  
    const burger = root.querySelector(".navbar-burger");
    const menu = root.querySelector("#studentNavbarMenu");
  
    function updateActiveMenu() {
      const currentPath = window.location.hash || "#/";
  
      root.querySelectorAll(".navbar-menu .navbar-item")
        .forEach((link) => {
          const isActive =
            link.getAttribute("href") === currentPath;
  
          link.classList.toggle("is-active", isActive);
  
          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
    }
  
    burger.addEventListener("click", () => {
      const isActive = burger.classList.toggle("is-active");
  
      menu.classList.toggle("is-active", isActive);
      burger.setAttribute("aria-expanded", String(isActive));
    });
  
    root.querySelectorAll(".navbar-item").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("is-active");
        menu.classList.remove("is-active");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  
    window.addEventListener("hashchange", updateActiveMenu);
  
    updateActiveMenu();
  }
  